"""Build the published RCA case-study reports from the application exports.

The desktop application's PDF export repeats computations and prints identical
tables more than once. This script lays out a consolidated edition of the two
homepage case-study reports with reportlab and reuses the export's vector
figures by overlaying clipped regions of the original pages with PyMuPDF.

Every number below is copied from the application export in ``source/``.
Original evidence identifiers are kept so each value stays traceable.

Usage (from the website root, Windows):
    python scripts/rca_reports/build_rca_reports.py
"""

from __future__ import annotations

import pathlib
import re
from typing import Any, Callable

import fitz  # PyMuPDF
from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.platypus import (BaseDocTemplate, CondPageBreak, Flowable, Frame, KeepTogether,
                                NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle)
from reportlab.platypus.tableofcontents import TableOfContents

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[1]
SOURCE = HERE / 'source'
OUTPUT = SITE / 'public' / 'reports'
LOGO = SITE / 'public' / 'logo.png'
FONT_DIR = pathlib.Path('C:/Windows/Fonts')

NAVY = colors.HexColor('#18334a')
INK = colors.HexColor('#202020')
MUTED = colors.HexColor('#607d8b')
NOTE_INK = colors.HexColor('#455a64')
RULE = colors.HexColor('#b0bec5')
HEAD_FILL = colors.HexColor('#eceff1')
NOTE_FILL = colors.HexColor('#eef4f8')

PAGE_W, PAGE_H = A4
MARGIN_X = 42.5
TOP = 64
BOTTOM = 60
CONTENT_W = PAGE_W - 2 * MARGIN_X
EDITION_DATE = '15 November 2026'
PREPARED_WITH = ('MachinePulseAI Agent with a local Qwen3-Coder-30B-A3B-Instruct model (int4, OpenVINO). '
                 'The operator planned the investigation steps and corrected the report.')
SOFTWARE = 'MachinePulseAI desktop application, early access (November 2026)'


# Reproducible output: no build timestamp or random document ID in the PDF.
rl_config.invariant = 1


def register_fonts() -> None:
    """Register Segoe UI, the typeface used by the application export."""
    for name, file in (('Segoe', 'segoeui.ttf'), ('Segoe-Bold', 'segoeuib.ttf'),
                       ('Segoe-Semi', 'seguisb.ttf'), ('Segoe-Italic', 'segoeuii.ttf')):
        pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / file)))
    pdfmetrics.registerFontFamily('Segoe', normal='Segoe', bold='Segoe-Bold',
                                  italic='Segoe-Italic', boldItalic='Segoe-Bold')


def styles() -> dict[str, ParagraphStyle]:
    """Paragraph styles matching the application report."""
    base = dict(fontName='Segoe', textColor=INK)
    return {
        'kicker': ParagraphStyle('kicker', fontName='Segoe-Semi', fontSize=9, leading=12, textColor=MUTED, spaceAfter=10),
        'title': ParagraphStyle('title', fontName='Segoe-Bold', fontSize=27, leading=32, textColor=NAVY, spaceAfter=4),
        'subtitle': ParagraphStyle('subtitle', fontName='Segoe', fontSize=13, leading=17, textColor=MUTED, spaceAfter=22),
        'lead': ParagraphStyle('lead', fontSize=11, leading=16, spaceAfter=18, **base),
        'h1': ParagraphStyle('h1', fontName='Segoe-Bold', fontSize=13, leading=17, textColor=NAVY, spaceBefore=12, spaceAfter=6),
        'h2': ParagraphStyle('h2', fontName='Segoe-Bold', fontSize=10.6, leading=14, textColor=NAVY, spaceBefore=10, spaceAfter=4),
        'h3': ParagraphStyle('h3', fontName='Segoe-Semi', fontSize=9.6, leading=13, textColor=NAVY, spaceBefore=8, spaceAfter=4),
        'body': ParagraphStyle('body', fontSize=9.6, leading=13.6, spaceAfter=6, **base),
        'bullet': ParagraphStyle('bullet', fontSize=9.6, leading=13.6, leftIndent=12, bulletIndent=2, spaceAfter=2, **base),
        'caption': ParagraphStyle('caption', fontSize=8.6, leading=11.8, spaceBefore=4, spaceAfter=10, **base),
        'tcaption': ParagraphStyle('tcaption', fontSize=8.8, leading=12, spaceBefore=6, spaceAfter=4, **base),
        'note': ParagraphStyle('note', fontName='Segoe', fontSize=8.4, leading=11.6, textColor=NOTE_INK, spaceBefore=3, spaceAfter=8),
        'cell': ParagraphStyle('cell', fontSize=8.6, leading=11, **base),
        'cell_r': ParagraphStyle('cell_r', fontSize=8.6, leading=11, alignment=TA_RIGHT, **base),
        'head': ParagraphStyle('head', fontName='Segoe-Semi', fontSize=8.6, leading=11, textColor=INK),
        'head_r': ParagraphStyle('head_r', fontName='Segoe-Semi', fontSize=8.6, leading=11, textColor=INK, alignment=TA_RIGHT),
        'callout': ParagraphStyle('callout', fontSize=10, leading=14.4, **base),
        'toc0': ParagraphStyle('toc0', fontSize=9.6, leading=15, **base),
        'toc1': ParagraphStyle('toc1', fontSize=9.2, leading=14, leftIndent=16, **base),
        'tocfig': ParagraphStyle('tocfig', fontSize=9, leading=13.4, **base),
    }


def plain(markup: str) -> str:
    """Strip inline markup for table-of-contents text."""
    return re.sub(r'<[^>]+>', '', markup)


class FigureClip(Flowable):
    """Reserve space for a vector figure copied from the application export.

    The position is recorded while drawing; ``overlay_figures`` later places the
    clipped source page region there, so the plot stays vector and identical to
    what the application rendered.
    """

    def __init__(self, registry: dict, key: str, page_no: int, clip: tuple, width: float) -> None:
        super().__init__()
        self.registry = registry
        self.key = key
        self.page_no = page_no
        x0, y0, x1, y1 = clip
        self.clip = fitz.Rect(x0, y0 + 2, x1, y1)
        self.width = width
        self.height = width * self.clip.height / self.clip.width
        self.hAlign = 'CENTER'

    def wrap(self, avail_width: float, avail_height: float) -> tuple[float, float]:
        """Return the reserved figure size."""
        return self.width, self.height

    def draw(self) -> None:
        """Record where the figure lands; the last build pass wins."""
        x, y = self.canv.absolutePosition(0, 0)
        self.registry[self.key] = (self.canv.getPageNumber(), x, y, self.width, self.height,
                                   self.page_no, tuple(self.clip))


class Report:
    """Collects the story for one report and numbers its tables and figures."""

    def __init__(self, title: str, source: pathlib.Path) -> None:
        self.title = title
        self.source = source
        self.st = styles()
        self.story: list[Flowable] = []
        self.registry: dict[str, tuple] = {}
        self.figures = 0
        self.tables = 0

    # -- text ---------------------------------------------------------------
    def add(self, *items: Flowable) -> None:
        """Append flowables to the story."""
        self.story.extend(items)

    def p(self, text: str, style: str = 'body') -> Paragraph:
        """Build a paragraph."""
        return Paragraph(text, self.st[style])

    def section(self, text: str, min_space: float = 160) -> None:
        """Numbered top-level section heading (listed in the contents)."""
        self.add(CondPageBreak(min_space))
        para = self.p(text, 'h1')
        para.toc_entry = ('TOCEntry', 0, plain(text))
        self.add(para)

    def subsection(self, text: str, min_space: float = 160) -> None:
        """Second-level heading (listed in the contents); never left alone at a page foot."""
        self.add(CondPageBreak(min_space))
        para = self.p(text, 'h2')
        para.toc_entry = ('TOCEntry', 1, plain(text))
        para.keepWithNext = True
        self.add(para)

    def heading(self, text: str) -> None:
        """Unlisted third-level heading."""
        self.add(CondPageBreak(90))
        para = self.p(text, 'h3')
        para.keepWithNext = True
        self.add(para)

    def bullets(self, items: list[str]) -> None:
        """Append a bullet list."""
        for item in items:
            self.add(Paragraph(item, self.st['bullet'], bulletText='•'))
        self.add(Spacer(1, 4))

    def callout(self, text: str) -> None:
        """Shaded box used for the verdict and edition note."""
        box = Table([[Paragraph(text, self.st['callout'])]], colWidths=[CONTENT_W])
        box.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), NOTE_FILL),
            ('LINEBEFORE', (0, 0), (0, -1), 2.5, NAVY),
            ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
        ]))
        self.add(box, Spacer(1, 6))

    # -- tables and figures -------------------------------------------------
    def grid(self, rows: list[list[str]], widths: list[float], align: str | None = None,
             header: bool = True) -> Table:
        """Bordered table; ``align`` is one letter per column (L or R)."""
        align = align or 'L' * len(widths)
        data = []
        for index, row in enumerate(rows):
            is_head = header and index == 0
            data.append([Paragraph(str(cell), self.st[('head' if is_head else 'cell') + ('_r' if a == 'R' else '')])
                         for cell, a in zip(row, align)])
        table = Table(data, colWidths=widths, repeatRows=1 if header else 0, hAlign='LEFT')
        commands: list[tuple] = [
            ('GRID', (0, 0), (-1, -1), 0.5, RULE),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 4), ('RIGHTPADDING', (0, 0), (-1, -1), 4),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ]
        if header:
            commands.append(('BACKGROUND', (0, 0), (-1, 0), HEAD_FILL))
        table.setStyle(TableStyle(commands))
        return table

    def table(self, title: str, rows: list[list[str]], widths: list[float], align: str | None = None,
              note: str | None = None, keep: bool = True) -> None:
        """Numbered table with caption (listed in the list of tables)."""
        if sum(widths) > CONTENT_W + 1:
            raise ValueError(f'Table "{title}" is wider than the page: {sum(widths):.0f} pt')
        self.tables += 1
        caption = Paragraph(f'<b>Table {self.tables}:</b> {title}', self.st['tcaption'])
        caption.toc_entry = ('TOCTab', 0, f'Table {self.tables}\u2003{plain(title)}')
        caption.keepWithNext = True
        items: list[Flowable] = [caption, self.grid(rows, widths, align)]
        if note:
            items.append(self.p(note, 'note'))
        else:
            items.append(Spacer(1, 6))
        self.add(KeepTogether(items) if keep else items[0], *([] if keep else items[1:]))

    def figure(self, title: str, page_no: int, clip: tuple, caption: str, scale: float = 1.0) -> None:
        """Numbered vector figure from the export (listed in the list of figures)."""
        self.figures += 1
        key = f'fig{self.figures}'
        head = self.p(title, 'h3')
        figure = FigureClip(self.registry, key, page_no, clip, CONTENT_W * scale)
        cap = Paragraph(f'<b>Figure {self.figures}:</b> {caption}', self.st['caption'])
        cap.toc_entry = ('TOCFig', 0, f'Figure {self.figures}\u2003{plain(title)}')
        self.add(KeepTogether([head, figure, cap]))

    def hypothesis(self, name: str, status: str, statement: str, supporting: str,
                   counter: str, reason: str | None = None) -> None:
        """One tested explanation with its evidence."""
        items = [self.p(f'{name} \u2014 {status}', 'h3'), self.p(statement)]
        rows = [['Supporting evidence', supporting], ['Counterevidence', counter]]
        if reason:
            rows.append(['Reason', reason])
        items.append(self.grid(rows, [120, CONTENT_W - 120], header=False))
        items.append(Spacer(1, 8))
        self.add(KeepTogether(items))

    # -- front matter -------------------------------------------------------
    def cover(self, kicker: str, subtitle: str, lead: str, facts: list[list[str]], edition_note: str) -> None:
        """Title page: identity, verdict and the edition note."""
        self.add(Spacer(1, 70), self.p(kicker.upper(), 'kicker'), self.p(self.title.split(' \u2014 ')[0], 'title'),
                 self.p(subtitle, 'subtitle'), self.p(lead, 'lead'))
        table = self.grid([[f'<b>{k}</b>', v] for k, v in facts], [118, CONTENT_W - 118], header=False)
        table.setStyle(TableStyle([('BACKGROUND', (0, 0), (0, -1), HEAD_FILL),
                                   ('TOPPADDING', (0, 0), (-1, -1), 4.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5.5)]))
        self.add(table, Spacer(1, 16))
        self.callout(edition_note)
        self.add(NextPageTemplate('body'), PageBreak())

    def contents(self) -> None:
        """Contents, list of figures and list of tables on one page."""
        st = self.st
        toc = TableOfContents(dotsMinLevel=0, levelStyles=[st['toc0'], st['toc1']])
        figs = TableOfContents(notifyKind='TOCFig', dotsMinLevel=0, levelStyles=[st['tocfig']])
        tabs = TableOfContents(notifyKind='TOCTab', dotsMinLevel=0, levelStyles=[st['tocfig']])
        self.add(self.p('Contents', 'h1'), toc, self.p('List of figures', 'h2'), figs,
                 self.p('List of tables', 'h2'), tabs, PageBreak())


class ReportDoc(BaseDocTemplate):
    """A4 document with a cover template and a body template."""

    def __init__(self, path: pathlib.Path, report: Report) -> None:
        super().__init__(str(path), pagesize=A4, leftMargin=MARGIN_X, rightMargin=MARGIN_X,
                         topMargin=TOP, bottomMargin=BOTTOM, title=report.title, author='MachinePulseAI',
                         subject='Root-cause investigation report (guided synthetic demonstration)',
                         creator='MachinePulseAI', keywords='MachinePulseAI, root cause, vibration, agent')
        frame = Frame(MARGIN_X, BOTTOM, CONTENT_W, PAGE_H - TOP - BOTTOM, id='body',
                      leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([PageTemplate('cover', [frame], onPage=draw_cover),
                               PageTemplate('body', [frame])])

    def afterFlowable(self, flowable: Flowable) -> None:
        """Feed headings and captions to the contents lists."""
        entry = getattr(flowable, 'toc_entry', None)
        if entry:
            self.notify(entry[0], (entry[1], entry[2], self.page))


def draw_cover(canvas: rl_canvas.Canvas, doc: BaseDocTemplate) -> None:
    """Logo and wordmark on the title page."""
    canvas.saveState()
    size = 34
    canvas.drawImage(str(LOGO), MARGIN_X, PAGE_H - 62 - size + 8, size, size, mask='auto')
    canvas.setFont('Segoe-Bold', 13)
    canvas.setFillColor(NAVY)
    canvas.drawString(MARGIN_X + size + 8, PAGE_H - 62 - 12, 'MachinePulse')
    width = pdfmetrics.stringWidth('MachinePulse', 'Segoe-Bold', 13)
    canvas.setFillColor(colors.HexColor('#0097a7'))
    canvas.drawString(MARGIN_X + size + 8 + width, PAGE_H - 62 - 12, 'AI')
    canvas.restoreState()


def numbered_canvas(title: str) -> type:
    """Canvas class that writes the running header and 'Page X of Y' footer."""

    class NumberedCanvas(rl_canvas.Canvas):
        def __init__(self, *args: Any, **kwargs: Any) -> None:
            super().__init__(*args, **kwargs)
            self._saved: list[dict] = []

        def showPage(self) -> None:  # noqa: N802 - reportlab API
            self._saved.append(dict(self.__dict__))
            self._startPage()

        def save(self) -> None:
            total = len(self._saved)
            for state in self._saved:
                self.__dict__.update(state)
                self._chrome(total)
                super().showPage()
            super().save()

        def _chrome(self, total: int) -> None:
            page = self._pageNumber
            self.saveState()
            self.setFont('Segoe', 8.2)
            self.setFillColor(MUTED)
            self.setStrokeColor(RULE)
            self.setLineWidth(0.5)
            if page > 1:
                y = PAGE_H - 40
                self.drawString(MARGIN_X, y, 'MachinePulseAI | Engineering')
                self.drawRightString(PAGE_W - MARGIN_X, y, title)
                self.line(MARGIN_X, y - 6, PAGE_W - MARGIN_X, y - 6)
            self.line(MARGIN_X, 46, PAGE_W - MARGIN_X, 46)
            self.drawString(MARGIN_X, 34, 'Synthetic demonstration data')
            self.drawRightString(PAGE_W - MARGIN_X, 34, f'Page {page} of {total}')
            self.restoreState()

    return NumberedCanvas


def overlay_figures(path: pathlib.Path, report: Report) -> None:
    """Place the clipped vector figures from the export into the reserved boxes."""
    source = fitz.open(report.source)
    doc = fitz.open(path)
    for page_no, x, y, width, height, src_page, clip in report.registry.values():
        rect = fitz.Rect(x, PAGE_H - (y + height), x + width, PAGE_H - y)
        doc[page_no - 1].show_pdf_page(rect, source, src_page - 1, clip=fitz.Rect(clip))
    doc.save(str(path) + '.tmp', garbage=4, deflate=True, no_new_id=True)
    doc.close()
    pathlib.Path(str(path) + '.tmp').replace(path)


def build(report: Report, filename: str) -> pathlib.Path:
    """Lay out, number and finish one report."""
    path = OUTPUT / filename
    doc = ReportDoc(path, report)
    doc.multiBuild(report.story, canvasmaker=numbered_canvas(report.title))
    overlay_figures(path, report)
    return path


# -- report content -----------------------------------------------------------

AIR_IDENTITY_ROWS = [
    ['Created', '2026-11-13 18:41:54 UTC (application export)'],
    ['This edition', f'{EDITION_DATE} \u2014 consolidated for publication'],
    ['Status', 'Draft engineering assessment'],
    ['Prepared with', PREPARED_WITH],
    ['Software', SOFTWARE],
]


def aircraft() -> Report:
    """Aircraft gearbox vibration case."""
    r = Report('Aircraft gearbox vibration \u2014 guided synthetic demonstration',
               SOURCE / 'aircraft_app_export.pdf')
    W = CONTENT_W
    r.cover(
        'Root-cause investigation report', 'Guided synthetic demonstration',
        'Gearbox vibration rose during flight and recurred in a separate ground check after the primary '
        'accelerometer was remounted. This report records how the investigation tested the candidate '
        'explanations against the recorded data.',
        [
            ['Verdict', 'Outer-race bearing fault \u2014 provisionally supported; physical inspection required'],
            ['Recordings', 'flight_daq.mpai and ground_check.mpai (24 channels, 614,400 rows each at 12.8 kHz); '
                           'mission_computer.csv (650 channels, 960 rows)'],
            ['Reference documents', 'AIR-SETUP-R2 (setup.md), AIR-QUALITY-R2 (quality.md) and machine.json, revision R2'],
            ['Prepared with', PREPARED_WITH],
            ['Status', 'Draft engineering assessment'],
            ['Created', '13 November 2026 (application export)'],
        ],
        '<b>About this edition.</b> The application export repeated several computations and printed their '
        'identical results more than once. This edition merges those repeats, combines identical tables and '
        'keeps the original evidence identifiers, so every value can be traced to the export. Measured values, '
        'hypotheses and conclusions are unchanged. All data in this case are synthetic demonstration data.')
    r.contents()

    # 1 -----------------------------------------------------------------------
    r.section('1. Executive assessment')
    r.callout('<b>Verdict:</b> Both accelerometers show the bearing outer-race defect frequency (BPFO, '
              'approximately 107.4 Hz) with five harmonics \u2014 in flight and again in the separate ground '
              'check after the primary sensor was remounted. An outer-race-related mechanism is provisionally '
              'supported and requires physical inspection.')
    r.add(r.p('Provisional engineering assessment from the recorded evidence; the physical cause still requires '
              'confirmation by inspection.', 'note'))
    r.table('Explanations tested', [
        ['Explanation', 'Result', 'Evidence'],
        ['Outer-race bearing fault', 'Supported (provisional)', 'Supporting: [E17] [E18] [E19] [E20]'],
        ['Primary-sensor installation problem alone', 'Rejected', 'Counterevidence: [E17] [E18] [E19] [E20]'],
    ], [190, 120, W - 310])
    r.table('BPFO signature checks', [
        ['Recording', 'Sensor', 'Result', 'Harmonics found', 'Mean prominence ratio', 'Evidence'],
        ['flight_daq.mpai', 'sensor_a', 'supported', '5', '84.0166', '[E13] [E17]'],
        ['flight_daq.mpai', 'sensor_b', 'supported', '5', '53.3397', '[E14] [E18]'],
        ['ground_check.mpai', 'sensor_a', 'supported', '5', '89.4179', '[E15] [E19]'],
        ['ground_check.mpai', 'sensor_b', 'supported', '5', '56.8554', '[E16] [E20]'],
    ], [100, 62, 70, 78, 110, W - 420], 'LLLRRL',
        note='Prominence is the line amplitude divided by the local median noise floor; it is not a probability '
             'or a calibrated SNR.')
    r.heading('Recommended next step')
    r.add(r.p('Inspect the bearing and its mounting, then repeat matched measurements.'))

    # 2 -----------------------------------------------------------------------
    r.section('2. Scope and operating conditions')
    r.add(r.p('Operator-planned synthetic demonstration with operator report corrections, following AIR-SETUP-R2 '
              'and AIR-QUALITY-R2 (revision R2). Shaft speed was steady at 1,200 rpm (measured shaft_rpm mean, '
              'standard deviation 0 rpm) in both DAQ recordings. The mission computer reports NP_RPM 1,200 and '
              'ENGINE_TORQUE 59.9\u201360.1 in both analysed windows.'))
    r.heading('Reference documents')
    r.bullets(['quality.md (revision R2; source SHA256 b091bcef64337bd9)',
               'machine.json (revision R2; source SHA256 aceaaa70ccaec892)',
               'setup.md (revision R2; source SHA256 95b5456a15946872)'])

    # 3 -----------------------------------------------------------------------
    r.section('3. Data quality and preparation')
    r.add(r.p('All three sources were profiled completely. No non-finite values or timestamp gaps were found. '
              'The sources use separate clocks and no cross-source alignment was measured, so comparisons '
              'between them rely on the documented setup rather than on shared time.'))
    r.table('Recording quality summary', [
        ['Source', 'Channels', 'Rows', 'Start row', 'Non-finite', 'Timestamp gaps', 'Evidence'],
        ['mission_computer.csv', '650', '960', '0', '0 / 650', '0 / 650', '[E02]'],
        ['flight_daq.mpai', '24', '614,400', '0', '0 / 24', '0 / 24', '[E03]'],
        ['ground_check.mpai', '24', '614,400', '0', '0 / 24', '0 / 24', '[E04]'],
    ], [118, 56, 62, 54, 64, 82, W - 436], 'LRRRRRL',
        note='Counts show affected / assessed channels. The channel profiles do not assess clipping against '
             'declared sensor ranges.')

    # 4 -----------------------------------------------------------------------
    r.section('4. Measured findings')
    r.add(r.p('The mission computer\u2019s gearbox vibration monitor rises from a mean of 0.112330 g in the early '
              'window to 0.401811 g in the late window at 1,200 rpm. Four bearing-signature checks \u2014 both '
              'sensors, in flight and in the ground check \u2014 support BPFO at 107.4 Hz with five harmonics. '
              'Order analysis with the physical keyphasor covers flight_daq sensor_a only.'))

    r.subsection('4.1 Mission-computer gearbox monitor')
    r.table('Early and late controller windows [E06] [E08]', [
        ['Window', 'Channel', 'RMS', 'Crest factor', 'Excess kurtosis', 'Minimum', 'Maximum'],
        ['Early, rows 39\u2013198', 'GBX_MONITOR_RMS', '0.197916', '6.52613', '48.3399', '0.0832551', '1.29162'],
        ['', 'NP_RPM', '1,200', '1', '\u2014', '1,200', '1,200'],
        ['', 'ENGINE_TORQUE', '60.0067', '1.00156', '-1.36589', '59.9', '60.1'],
        ['Late, rows 639\u2013798', 'GBX_MONITOR_RMS', '0.423474', '3.75277', '74.5248', '0.35875', '1.5892'],
        ['', 'NP_RPM', '1,200', '1', '\u2014', '1,200', '1,200'],
        ['', 'ENGINE_TORQUE', '60.0186', '1.00136', '-1.41877', '59.9', '60.1'],
    ], [96, 104, 56, 62, 72, 60, W - 450], 'LLRRRRR',
        note='160 samples per window. \u2014: kurtosis is undefined for a constant channel.')
    r.table('Strongest associations with GBX_MONITOR_RMS \u2014 Relationship Explorer [E05]', [
        ['Target', 'Channel', 'Pearson r', 'Valid pairs', 'Status'],
        ['GBX_MONITOR_RMS', 'VHF_PTT', '0.807543', '960', 'Valid'],
        ['GBX_MONITOR_RMS', 'GBX_VIB_HIGH', '0.67434', '960', 'Valid'],
        ['GBX_MONITOR_RMS', 'OIL_TEMP_GBX', '-0.204023', '960', 'Valid'],
        ['GBX_MONITOR_RMS', 'AUX_0396', '0.163755', '960', 'Valid'],
    ], [130, 130, 80, 80, W - 420], 'LLRRL',
        note='Display excerpt: rows 1\u20134 of 649. The analysis uses the complete result.')
    r.add(r.p('The coefficients compare paired samples within the controller source at the reported lag. They do '
              'not establish DAQ-to-controller synchronization or a physical cause. Similar coefficients for '
              'multiple channels do not constitute independent corroboration; check derived channels and '
              'collinearity.'))

    r.subsection('4.2 Accelerometer levels')
    r.table('Accelerometer statistics, complete records [E11] [E12]', [
        ['Recording', 'Channel', 'RMS (g)', 'Crest factor', 'Excess kurtosis', 'Minimum (g)', 'Maximum (g)'],
        ['flight_daq.mpai', 'sensor_a', '0.171174', '6.82186', '4.63631', '-0.990556', '1.16773'],
        ['flight_daq.mpai', 'sensor_b', '0.119389', '6.45312', '3.26223', '-0.687852', '0.770432'],
        ['ground_check.mpai', 'sensor_a', '0.171149', '6.83178', '4.63725', '-0.964351', '1.16925'],
        ['ground_check.mpai', 'sensor_b', '0.119371', '6.41141', '3.26911', '-0.687273', '0.765334'],
    ], [100, 60, 62, 64, 76, 72, W - 434], 'LLRRRRR', note='614,400 samples per channel, starting at row 0.')
    r.add(r.p('Levels agree closely between the flight and the ground check. The sensor_a / sensor_b RMS ratio is '
              '1.43375 in flight [E11] and 1.43376 in the ground check [E12]. This scalar ratio compares the '
              'recorded selection and units; sensor roles and transfer paths must be checked before assigning a '
              'physical cause.'))

    r.subsection('4.3 Bearing envelope analysis')
    r.add(r.p('Bearing &amp; Gear Fault Diagnosis analysed the complete record of each sensor in both recordings. '
              'The four analyses [E13]\u2013[E16] use identical processing.'))
    r.table('Processing and operating conditions [E13]\u2013[E16]', [
        ['Parameter', 'Value', 'Parameter', 'Value'],
        ['Sample rate (Hz)', '12,800', 'Speed (rpm)', '1,200'],
        ['Envelope band (Hz)', '3200 to 6400', 'Speed standard deviation (rpm)', '0'],
        ['Envelope FFT size', '1,048,576', 'Speed reference', 'measured_channel_mean'],
        ['Frequency resolution (Hz)', '0.012207', 'Speed channel', 'shaft_rpm'],
        ['Window', 'Hann (envelope domain)', 'Rolling elements', '13'],
        ['Averaging', 'Arithmetic mean of segment magnitudes', 'Pitch diameter (mm)', '60'],
        ['Segments / overlap fraction', '1 / 0.5', 'Element diameter (mm)', '10.43'],
        ['Amplitude convention', 'One-sided peak amplitude, Hann coherent-gain corrected', 'Contact angle (deg)', '0'],
    ], [112, 150, 140, W - 402])
    r.figure('Envelope spectrum \u2014 flight_daq.mpai / sensor_a [E13]', 5, (43, 465, 553, 615),
             'Complete record analysed (Min-Max display reduction), 0\u20131,526 Hz. Measured BPFO lines (solid '
             'blue): 107.397, 214.807, 322.205, 429.602 and 537.012 Hz.')
    r.figure('Bearing-frequency detail \u2014 flight_daq.mpai / sensor_a [E13]', 6, (43, 90, 553, 315),
             'Detail to 496 Hz. Dashed amber markers are reference frequencies, not detected peaks: BPFI '
             '152.598 Hz, BPFO 107.402 Hz, BSF 55.788 Hz, FTF 8.26167 Hz, 1\u00d7 shaft 20 Hz, 2\u00d7 and '
             '3\u00d7 BPFO. Solid blue lines are the measured BPFO harmonics.')
    r.figure('Envelope spectrum \u2014 ground_check.mpai / sensor_a [E15]', 11, (43, 258, 553, 408),
             'Separate ground check after the primary sensor was remounted. The same BPFO family is present at '
             '107.397, 214.807, 322.205, 429.602 and 537.012 Hz.')
    r.table('Differential signature checks [E13]\u2013[E16]', [
        ['Family', 'Reference (Hz)', 'flight_daq sensor_a', 'flight_daq sensor_b', 'ground_check sensor_a',
         'ground_check sensor_b'],
        ['BPFO', '107.402', 'supported \u00b7 5 \u00b7 84.0166', 'supported \u00b7 5 \u00b7 53.3397',
         'supported \u00b7 5 \u00b7 89.4179', 'supported \u00b7 5 \u00b7 56.8554'],
        ['BPFI', '152.598', 'insufficient \u00b7 1 \u00b7 20.4598', 'insufficient \u00b7 1 \u00b7 60.2573',
         'insufficient \u00b7 1 \u00b7 16.517', 'insufficient \u00b7 1 \u00b7 44.1449'],
        ['BSF', '55.788', 'insufficient \u00b7 0', 'insufficient \u00b7 0', 'insufficient \u00b7 0', 'insufficient \u00b7 0'],
        ['FTF', '8.26167', 'insufficient \u00b7 0', 'insufficient \u00b7 0', 'insufficient \u00b7 0', 'insufficient \u00b7 0'],
    ], [42, 64, 101, 101, 101, W - 409], 'LRLLLL',
        note='Each cell: result \u00b7 unique harmonics \u00b7 mean prominence ratio. No sidebands were counted in '
             'any analysis. Insufficient means the tested spectrum lacks qualifying evidence; it does not '
             'establish absence. Sideband counts exclude carriers discarded for overlap; raw modulation may '
             'remain unqualified.')
    r.table('Measured BPFO harmonic lines [E13]\u2013[E16]', [
        ['Harmonic', 'Measured (Hz)', 'Deviation (Hz)', 'Peak amplitude (g) flight sensor_a',
         'flight sensor_b', 'ground sensor_a', 'ground sensor_b'],
        ['1', '107.397', '-0.00420573', '0.00591496', '0.0032501', '0.00591292', '0.00326532'],
        ['2', '214.807', '0.00379557', '0.00507472', '0.00286072', '0.00500364', '0.00283476'],
        ['3', '322.205', '-0.000410156', '0.00434819', '0.0025937', '0.00439597', '0.0025509'],
        ['4', '429.602', '-0.00461589', '0.00373297', '0.00229591', '0.00383717', '0.00222979'],
        ['5', '537.012', '0.00338542', '0.00334364', '0.00198093', '0.00336717', '0.00194593'],
    ], [50, 66, 74, 92, 76, 76, W - 434], 'RRRRRRR',
        note='Measured frequencies and deviations are identical in the four analyses. Amplitudes are one-sided '
             'peak values, Hann coherent-gain corrected.')

    r.subsection('4.4 Spectrum in the early and late flight windows')
    r.add(r.p('FFT Spectrum Analysis compared sensor_a and sensor_b in flight over two 8-second windows: samples '
              '25,600\u2013128,000 (2\u201310 s) [E07] and 409,600\u2013512,000 (32\u201340 s) [E09].'))
    r.figure('FFT spectrum, early window \u2014 flight_daq.mpai [E07]', 17, (43, 258, 553, 408),
             '102,401 of 614,400 samples analysed from sample 25,600 (Min-Max display reduction). dB amplitude '
             'from the cached native spectrum; both channels use the same amplitude convention.')
    r.figure('FFT spectrum, late window \u2014 flight_daq.mpai [E09]', 18, (43, 90, 553, 240),
             '102,401 of 614,400 samples analysed from sample 409,600 (Min-Max display reduction).')
    r.table('FFT processing [E07] [E09]', [
        ['Parameter', 'Value', 'Parameter', 'Value'],
        ['Sample rate (Hz)', '12,800', 'Window', 'Hann'],
        ['FFT size', '8,192', 'Averaging', 'Linear, 25 averages'],
        ['Frequency resolution (Hz)', '1.5625', 'Amplitude convention', 'Peak, coherent-gain window correction'],
    ], [120, 100, 120, W - 340])

    r.subsection('4.5 Order analysis with the physical keyphasor', min_space=340)
    r.table('Measured-encoder order analysis coverage [E10]', [
        ['Recording', 'Physical encoder', 'Vibration channel', 'Rows', 'Evidence'],
        ['flight_daq.mpai', 'keyphasor', 'sensor_a', '614,400', '[E10]'],
    ], [130, 110, 110, 80, W - 430], 'LLLRL')
    r.figure('Order map \u2014 flight_daq.mpai / sensor_a [E10]', 19, (43, 90, 553, 345),
             'Order Tracking with the physical keyphasor at a steady 1,200 rpm (12,800 Hz, Hann window).',
             scale=0.9)

    # 5 -----------------------------------------------------------------------
    r.section('5. Engineering interpretation')
    r.add(r.p('A bearing-related mechanism is provisional. Repeat evidence weakens primary-sensor installation '
              'alone.'))
    r.hypothesis('Outer-race bearing fault', 'supported',
                 'Both sensors in flight and ground support approximately 107.4 Hz BPFO. An outer-race-related '
                 'mechanism is provisional and requires physical inspection.',
                 '[E17], [E18], [E19], [E20]', 'None recorded')
    r.hypothesis('Primary-sensor installation problem', 'rejected',
                 'Tested explanation: a primary-sensor installation problem alone explains the recurring '
                 'vibration.',
                 'None recorded', '[E17], [E18], [E19], [E20]',
                 'The same family persists on independent sensors in the separate ground check after '
                 'primary-sensor remount.')

    # 6 -----------------------------------------------------------------------
    r.section('6. Uncertainty and follow-up')
    r.heading('Uncertainty')
    r.add(r.p('Physical damage remains unverified.'))
    r.heading('Recommended checks')
    r.add(r.p('Inspect bearing and mounting, then repeat matched measurements.'))
    r.heading('Required follow-up and limitations')
    r.bullets(['Supported hypotheses are provisional; physical cause and repair effectiveness require independent '
               'verification.',
               'Rejection concerns the tested explanation in recorded conditions; it does not rule out every '
               'physical defect.'])

    # 7 -----------------------------------------------------------------------
    r.section('7. Technical appendix \u2014 evidence register', min_space=320)
    r.add(r.p('Evidence identifiers are those of the application export. Repeats are later runs of the same '
              'computation that returned identical values; they are merged into the first identifier. [E28] '
              'recorded an earlier PDF export and is not a computation.'))
    r.heading('Report identity')
    r.add(r.grid(AIR_IDENTITY_ROWS, [100, W - 100], header=False), Spacer(1, 8))
    r.table('Source register', [
        ['Source', 'Recording', 'Analysed file state'],
        ['S01', 'Reference material', 'Not recorded'],
        ['S02', 'mission_computer.csv', 'mission_computer_75686d8b78c1.mpai: 5.46 MB, modified 2026-11-13 21:09:10 +0300'],
        ['S03', 'flight_daq.mpai', '127.76 MB, modified 2026-11-13 21:08:33 +0300'],
        ['S04', 'ground_check.mpai', '127.76 MB, modified 2026-11-13 21:08:34 +0300'],
        ['S05', 'Reference material', 'Not recorded'],
    ], [50, 120, W - 170])
    r.table('Applicable reference register', [
        ['Reference', 'Document', 'Revision', 'Evidence'],
        ['AIR-QUALITY-R2', 'quality.md', 'R2', '[E01]'],
        ['AIR-SETUP-R2', 'setup.md', 'R2', '[E01]'],
        ['machine.json', 'machine.json', 'R2', '[E01]'],
    ], [140, 140, 80, W - 360])
    r.table('Computation receipts', [
        ['Evidence', 'Source', 'Computation', 'Channels', 'Selection', 'Repeats'],
        ['[E01]', 'S01', 'Reference lookup', '\u2014', 'Reference only', '\u2014'],
        ['[E02]', 'S02', 'Channel Profile', 'All 650 channels', '960 samples from 0', '[E21] [E29]'],
        ['[E03]', 'S03', 'Channel Profile', 'All 24 channels', '614,400 samples from 0', '[E23] [E30]'],
        ['[E04]', 'S04', 'Channel Profile', 'All 24 channels', '614,400 samples from 0', '[E27] [E31]'],
        ['[E05]', 'S02', 'Relationship Explorer', 'GBX_MONITOR_RMS against all channels', '960 samples from 0', '\u2014'],
        ['[E06]', 'S02', 'Channel Profile', 'GBX_MONITOR_RMS, NP_RPM, ENGINE_TORQUE', '160 samples from 39', '[E22]'],
        ['[E07]', 'S03', 'FFT Spectrum Analysis', 'sensor_a, sensor_b', '102,401 samples from 25,600', '\u2014'],
        ['[E08]', 'S02', 'Channel Profile', 'GBX_MONITOR_RMS, NP_RPM, ENGINE_TORQUE', '160 samples from 639', '[E24]'],
        ['[E09]', 'S03', 'FFT Spectrum Analysis', 'sensor_a, sensor_b', '102,401 samples from 409,600', '\u2014'],
        ['[E10]', 'S03', 'Order Tracking', 'shaft_rpm, keyphasor, sensor_a', '614,400 samples from 0', '\u2014'],
        ['[E11]', 'S03', 'Channel Profile', 'sensor_a, sensor_b', '614,400 samples from 0', '[E26]'],
        ['[E12]', 'S04', 'Channel Profile', 'sensor_a, sensor_b', '614,400 samples from 0', '[E25]'],
        ['[E13]', 'S03', 'Bearing &amp; Gear Fault Diagnosis', 'shaft_rpm, sensor_a', '614,400 samples from 0', '\u2014'],
        ['[E14]', 'S03', 'Bearing &amp; Gear Fault Diagnosis', 'shaft_rpm, sensor_b', '614,400 samples from 0', '\u2014'],
        ['[E15]', 'S04', 'Bearing &amp; Gear Fault Diagnosis', 'shaft_rpm, sensor_a', '614,400 samples from 0', '\u2014'],
        ['[E16]', 'S04', 'Bearing &amp; Gear Fault Diagnosis', 'shaft_rpm, sensor_b', '614,400 samples from 0', '\u2014'],
        ['[E17]', 'S03', 'BPFO signature check \u2014 supported', 'shaft_rpm, sensor_a', '614,400 samples from 0', '\u2014'],
        ['[E18]', 'S03', 'BPFO signature check \u2014 supported', 'shaft_rpm, sensor_b', '614,400 samples from 0', '\u2014'],
        ['[E19]', 'S04', 'BPFO signature check \u2014 supported', 'shaft_rpm, sensor_a', '614,400 samples from 0', '\u2014'],
        ['[E20]', 'S04', 'BPFO signature check \u2014 supported', 'shaft_rpm, sensor_b', '614,400 samples from 0', '\u2014'],
    ], [46, 40, 118, 138, 104, W - 446], keep=False)
    return r


def brake() -> Report:
    """Braking judder case."""
    r = Report('Braking judder \u2014 guided synthetic demonstration', SOURCE / 'brake_app_export.pdf')
    W = CONTENT_W
    r.cover(
        'Root-cause investigation report', 'Guided synthetic demonstration',
        'Steering-wheel judder appeared during braking and persisted in a repeat recording after the primary '
        'sensor was remounted. This report records how the investigation tested the candidate explanations '
        'against the recorded data.',
        [
            ['Verdict', 'Front-left (FL) brake disc thickness variation \u2014 provisionally supported; '
                        'inspection required'],
            ['Recordings', 'daq.mpai and repeat.mpai (24 channels, 409,600 rows each at 6.4 kHz); metrology.csv '
                           '(5 channels, 12 rows); controller.csv (800 channels, 3,200 rows)'],
            ['Reference documents', 'BRAKE-SETUP-R1 (setup.md) and BRAKE-QUALITY-R1 (quality.md), revision R1'],
            ['Prepared with', PREPARED_WITH],
            ['Status', 'Draft engineering assessment'],
            ['Created', '13 November 2026 (application export)'],
        ],
        '<b>About this edition.</b> The application export repeated several computations and split some '
        'paragraphs across pages. This edition merges the repeats, combines identical tables and keeps the '
        'original evidence identifiers, so every value can be traced to the export. Measured values, hypotheses '
        'and conclusions are unchanged. All data in this case are synthetic demonstration data.')
    r.contents()

    # 1 -----------------------------------------------------------------------
    r.section('1. Executive assessment')
    r.callout('<b>Verdict:</b> The measurements support FL disc-thickness variation as a likely source of '
              'braking-specific wheel-order excitation; the documented steering response may amplify it. Physical '
              'causation remains provisional.')
    r.add(r.p('Provisional engineering assessment from the recorded evidence; the physical cause still requires '
              'confirmation by inspection.', 'note'))
    r.table('Explanations tested', [
        ['Explanation', 'Result', 'Evidence'],
        ['Brake disc thickness variation', 'Supported (provisional)', 'Supporting: [E02] [E03] [E04] [E11] [E13]'],
        ['Sensor mounting problem alone', 'Rejected', 'Counterevidence: [E02] [E03] [E11] [E13]'],
    ], [170, 120, W - 290])
    r.table('Key measurements', [
        ['Measurement', 'Value', 'Comparison', 'Evidence'],
        ['steering_accel 1X peak at 798.732 rpm', '0.205628 g during braking', '0.00411901 g during coast',
         '[E11] [E13]'],
        ['FL disc thickness range', '0.030 mm (27.985\u201328.015 mm)',
         'Fixture limit 0.015 mm; other corners 0.002 mm', '[E04]'],
        ['hub_a / hub_b RMS, complete record', '0.0559551 / 0.0493958 g (daq.mpai)',
         '0.0559485 / 0.0494028 g after primary remount (repeat.mpai)', '[E02] [E03]'],
    ], [140, 130, 170, W - 440])
    r.heading('Recommended next step')
    r.add(r.p('Independently inspect the FL disc, hub and brake assembly, then repeat the same measured-speed '
              'comparison after intervention.'))

    # 2 -----------------------------------------------------------------------
    r.section('2. Scope and operating conditions')
    r.add(r.p('Operator-planned synthetic demonstration with operator report corrections, following BRAKE-SETUP-R1 '
              'and BRAKE-QUALITY-R1 (revision R1). The DAQ and repeat recordings use source-local clocks; no '
              'cross-source alignment was measured or applied. Braking occupies 0\u20138 s and coasting 8\u201316 s '
              'of the DAQ recording.'))
    r.heading('Reference documents')
    r.bullets(['BRAKE-QUALITY-R1 (revision R1; source SHA256 4ecc4044ca3b253f)',
               'BRAKE-SETUP-R1 (revision R1; source SHA256 8865cf79fa17562e)'])

    # 3 -----------------------------------------------------------------------
    r.section('3. Data quality and preparation')
    r.add(r.p('The documented WHL_SPD_FL code 6553.5 was replaced with NaN on a derived channel, preserving raw '
              'data and gaps [E05]. Native output verification found 33 non-finite values among 3,200 rows '
              '[E06]. No undocumented unit or polarity correction was applied. The comparisons use magnitude/RMS '
              'rather than correlation sign.'))
    r.table('Recording quality summary', [
        ['Source', 'Channels', 'Rows', 'Start row', 'Non-finite', 'Timestamp gaps', 'Evidence'],
        ['daq.mpai', '24', '409,600', '0', '0 / 24', '0 / 24', '[E02]'],
        ['repeat.mpai', '24', '409,600', '0', '0 / 24', '0 / 24', '[E03]'],
        ['metrology.csv', '5', '12', '0', '0 / 5', '0 / 5', '[E04]'],
        ['controller.csv (corrected WHL_SPD_FL)', '1', '3,200', '0', '1 / 1', '0 / 1', '[E06]'],
        ['controller.csv', '800', '3,200', '0', '0 / 800', '0 / 800', '[E07]'],
    ], [140, 52, 56, 50, 60, 80, W - 438], 'LRRRRRL',
        note='Counts show affected / assessed channels. The channel profiles do not assess clipping against '
             'declared sensor ranges.')
    r.table('Wheel-speed channel before and after correction', [
        ['Channel', 'RMS', 'Sample std', 'Mean', 'Minimum', 'Maximum', 'Valid / total', 'Evidence'],
        ['WHL_SPD_FL__find_replace', '91.7249', '17.3232', '90.0747', '60.15', '120', '3,167 / 3,200', '[E06]'],
        ['WHL_SPD_FL (raw, with code 6553.5)', '671.738', '653.3', '\u2014', '\u2014', '\u2014', '3,200 / 3,200', '[E07]'],
    ], [138, 50, 54, 50, 50, 50, 68, W - 460], 'LRRRRRRL',
        note='The corrected channel\u2019s crest factor is 1.30826 and its excess kurtosis -1.19999 [E06]. '
             '\u2014: not reported for the raw channel.')

    # 4 -----------------------------------------------------------------------
    r.section('4. Measured findings')
    r.add(r.p('Physical-encoder order analysis covers the complete 0\u20138 s braking and 8\u201316 s coast '
              'windows. At the same native row of 798.732 rpm (800 rpm requested), steering_accel 1X peak '
              'amplitudes are 0.205628 g during braking and 0.00411901 g during coast. These are peak magnitudes, '
              'not total RMS. Full-record hub_a/hub_b RMS values are 0.0559551/0.0493958 g in the DAQ recording and '
              '0.0559485/0.0494028 g in the primary-remounted repeat, each over 409,600 samples. Calibrated FL '
              'thickness spans 27.985\u201328.015 mm: its peak-to-peak range of 0.030 mm exceeds the fixture limit '
              'of 0.015 mm. Other corners have 0.002 mm ranges.'))

    r.subsection('4.1 Order analysis: braking versus coast')
    r.table('Order Tracking analyses on daq.mpai', [
        ['Analysis', 'Physical encoder', 'Vibration channel', 'Rows analysed', 'Evidence'],
        ['Braking window, 0\u20138 s', 'wheel_encoder', 'steering_accel', '51,201 from row 0', '[E10], read-back [E11]'],
        ['Coast window, 8\u201316 s', 'wheel_encoder', 'steering_accel', '51,201 from row 51,200',
         '[E12], read-back [E13]'],
        ['Complete record', 'wheel_encoder', 'steering_accel', '409,600 from row 0', '[E09]'],
    ], [120, 90, 90, 104, W - 404], 'LLLRL', note='All three analyses: sample rate 6,400 Hz, Hann window, '
                                                 'wheel_rpm as the speed channel.')
    r.figure('Order map, braking window \u2014 daq.mpai / steering_accel [E10]', 4, (43, 141, 553, 396),
             'Braking, 0\u20138 s. The colour scale reaches about 0.25 g.', scale=0.9)
    r.figure('Order map, coast window \u2014 daq.mpai / steering_accel [E12]', 5, (43, 90, 553, 345),
             'Coasting, 8\u201316 s. The colour scale reaches only about 0.03 g; compare with Figure 1.', scale=0.9)
    r.figure('Order map, complete record \u2014 daq.mpai / steering_accel [E09]', 5, (43, 503, 553, 758),
             'Complete record, 409,600 samples.', scale=0.9)

    r.subsection('4.2 Accelerometer levels before and after remounting')
    r.table('Requested channel measurements [E02] [E03]', [
        ['Recording', 'Channel', 'Unit', 'RMS', 'Sample std', 'Valid / total'],
        ['daq.mpai', 'steering_accel', 'g', '0.0709294', '0.0709295', '409,600 / 409,600'],
        ['daq.mpai', 'hub_a', 'g', '0.0559551', '0.0559552', '409,600 / 409,600'],
        ['daq.mpai', 'hub_b', 'g', '0.0493958', '0.0493958', '409,600 / 409,600'],
        ['repeat.mpai', 'steering_accel', 'g', '0.0709275', '0.0709276', '409,600 / 409,600'],
        ['repeat.mpai', 'hub_a', 'g', '0.0559485', '0.0559486', '409,600 / 409,600'],
        ['repeat.mpai', 'hub_b', 'g', '0.0494028', '0.0494028', '409,600 / 409,600'],
    ], [100, 100, 40, 80, 80, W - 400], 'LLLRRR',
        note='Separate-source statistics do not establish time alignment or matching operating conditions. Use '
             'the documented setup and intervention before interpreting differences.')

    r.subsection('4.3 Brake disc metrology')
    r.table('Disc thickness by corner \u2014 Channel Profile / metrology [E04]', [
        ['Channel', 'Samples', 'RMS', 'Crest factor', 'Excess kurtosis', 'Minimum', 'Maximum', 'Range'],
        ['angle_deg', '12', '194.808', '1.69398', '-1.21678', '0', '330', '\u2014'],
        ['thickness_FL (mm)', '12', '28', '1.00054', '-1.5', '27.985', '28.015', '0.030'],
        ['thickness_FR (mm)', '12', '28', '1.00004', '-1.5', '27.999', '28.001', '0.002'],
        ['thickness_RL (mm)', '12', '28', '1.00004', '-1.5', '27.999', '28.001', '0.002'],
        ['thickness_RR (mm)', '12', '28', '1.00004', '-1.5', '27.999', '28.001', '0.002'],
    ], [104, 50, 56, 62, 74, 56, 56, W - 458], 'LRRRRRRR',
        note='Range is maximum minus minimum. The documented fixture limit is 0.015 mm.')

    r.subsection('4.4 Controller relationships')
    r.table('Strongest associations with EPS_TORQUE_RMS \u2014 Relationship Explorer [E08]', [
        ['Target', 'Channel', 'Pearson r', 'Valid pairs', 'Status'],
        ['EPS_TORQUE_RMS', 'AUX_0129', '-0.83906', '3,200', 'Valid'],
        ['EPS_TORQUE_RMS', 'AUX_0354', '-0.838976', '3,200', 'Valid'],
        ['EPS_TORQUE_RMS', 'AUX_0309', '-0.838817', '3,200', 'Valid'],
        ['EPS_TORQUE_RMS', 'AUX_0759', '-0.838777', '3,200', 'Valid'],
    ], [130, 130, 80, 80, W - 420], 'LLRRL',
        note='Display excerpt: rows 1\u20134 of 799. The analysis uses the complete result.')
    r.add(r.p('The coefficients compare paired samples within the controller source at the reported lag. They do '
              'not establish DAQ-to-controller synchronization or a physical cause. Similar coefficients for '
              'multiple channels do not constitute independent corroboration; check derived channels and '
              'collinearity.'))

    # 5 -----------------------------------------------------------------------
    r.section('5. Engineering interpretation')
    r.add(r.p('The combined measurements support FL brake excitation associated with excessive disc-thickness '
              'variation. A documented steering response near 14 Hz may amplify the excitation; resonance alone '
              'does not identify its source. The persistent independent responses weaken a primary-mounting-only '
              'explanation. The much smaller coast response also weakens a wheel-imbalance-only explanation, '
              'without excluding residual imbalance.'))
    r.hypothesis('Brake disc thickness variation', 'supported',
                 'The measurements support FL disc-thickness variation as a likely source of braking-specific '
                 'wheel-order excitation; the documented steering response may amplify it. Physical causation '
                 'remains provisional.',
                 '[E04], [E11], [E13], [E02], [E03]', 'None recorded',
                 'The calibrated FL thickness range exceeds the documented fixture limit, the same-speed steering '
                 '1X amplitude is braking-specific, and both independent sensor responses persist after '
                 'primary-only remounting.')
    r.hypothesis('Sensor mounting problem', 'rejected',
                 'Tested explanation: a primary-sensor mounting problem alone explains the braking-specific '
                 'steering judder.',
                 'None recorded', '[E02], [E03], [E11], [E13]',
                 'A difference between two sensors alone does not establish mounting damage. Both independent '
                 'responses persist in the remount-only repeat, and the steering 1X response is much larger during '
                 'braking than coast at the same measured speed. This rejects the installation-only explanation '
                 'without excluding every installation issue.')

    # 6 -----------------------------------------------------------------------
    r.section('6. Uncertainty and follow-up')
    r.heading('Uncertainty')
    r.add(r.p('The association does not prove the complete physical causal chain, a successful repair or '
              'operational release. The limit is a synthetic fixture specification, not a maintenance authority.'))
    r.heading('Recommended checks')
    r.add(r.p('Independently inspect the FL disc, hub and brake assembly, then repeat the same measured-speed '
              'comparison after intervention.'))
    r.heading('Required follow-up and limitations')
    r.bullets(['Independent FL disc/hub inspection.',
               'Matched post-intervention braking/coast repeat.',
               'Supported hypotheses are provisional; physical cause and repair effectiveness require independent '
               'verification.',
               'Rejection concerns the tested explanation in recorded conditions; it does not rule out every '
               'physical defect.'])

    # 7 -----------------------------------------------------------------------
    r.section('7. Technical appendix \u2014 evidence register', min_space=320)
    r.add(r.p('Evidence identifiers are those of the application export. Repeats are later runs of the same '
              'computation that returned identical values; they are merged into the first identifier. [E14] '
              'recorded an earlier PDF export and is not a computation.'))
    r.heading('Report identity')
    r.add(r.grid([
        ['Created', '2026-11-13 07:40:41 UTC (application export)'],
        ['This edition', f'{EDITION_DATE} \u2014 consolidated for publication'],
        ['Status', 'Draft engineering assessment'],
        ['Prepared with', PREPARED_WITH],
        ['Software', SOFTWARE],
    ], [100, W - 100], header=False), Spacer(1, 8))
    r.table('Source register', [
        ['Source', 'Recording', 'Analysed file state'],
        ['S01', 'Reference material', 'Not recorded'],
        ['S02', 'daq.mpai', '85.18 MB, modified 2026-11-13 10:33:09 +0300'],
        ['S03', 'repeat.mpai', '85.18 MB, modified 2026-11-13 10:33:09 +0300'],
        ['S04', 'metrology.csv', 'metrology_7867df0ccf44.mpai: 6.53 kB, modified 2026-11-13 10:34:01 +0300'],
        ['S05', 'controller.csv', 'controller_1f81f73d60b3.mpai: 23.71 MB, modified 2026-11-13 10:34:35 +0300'],
        ['S06', 'Reference material', 'Not recorded'],
    ], [50, 120, W - 170])
    r.table('Applicable reference register', [
        ['Reference', 'Document', 'Revision', 'Evidence'],
        ['BRAKE-QUALITY-R1', 'quality.md', 'R1', '[E01]'],
        ['BRAKE-SETUP-R1', 'setup.md', 'R1', '[E01]'],
    ], [140, 140, 80, W - 360])
    r.table('Computation receipts', [
        ['Evidence', 'Source', 'Computation', 'Channels', 'Selection', 'Repeats'],
        ['[E01]', 'S01', 'Reference lookup', '\u2014', 'Reference only', '\u2014'],
        ['[E02]', 'S02', 'Channel Profile', 'All 24 channels', '409,600 samples from 0', '[E16]'],
        ['[E03]', 'S03', 'Channel Profile', 'All 24 channels', '409,600 samples from 0', '[E15]'],
        ['[E04]', 'S04', 'Channel Profile', 'All 5 channels', '12 samples from 0', '[E17]'],
        ['[E05]', 'S05', 'Find and replace: WHL_SPD_FL 6553.5 \u2192 NaN', 'WHL_SPD_FL', 'Derived channel; raw data kept', '\u2014'],
        ['[E06]', 'S05', 'Channel Profile', 'WHL_SPD_FL__find_replace', '3,200 samples from 0', '\u2014'],
        ['[E07]', 'S05', 'Channel Profile', 'All 800 channels', '3,200 samples from 0', '[E18]'],
        ['[E08]', 'S05', 'Relationship Explorer', 'EPS_TORQUE_RMS against all channels', '3,200 samples from 0', '\u2014'],
        ['[E09]', 'S02', 'Order Tracking', 'wheel_rpm, wheel_encoder, steering_accel', '409,600 samples from 0', '\u2014'],
        ['[E10]', 'S02', 'Order Tracking', 'wheel_rpm, wheel_encoder, steering_accel', '51,201 samples from 0', '\u2014'],
        ['[E11]', 'S02', 'Result read-back of [E10]', 'steering_accel', '51,201 samples from 0', '\u2014'],
        ['[E12]', 'S02', 'Order Tracking', 'wheel_rpm, wheel_encoder, steering_accel', '51,201 samples from 51,200', '\u2014'],
        ['[E13]', 'S02', 'Result read-back of [E12]', 'steering_accel', '51,201 samples from 51,200', '\u2014'],
    ], [46, 40, 130, 134, 110, W - 460], keep=False)
    return r


def main() -> None:
    """Build both reports into public/reports."""
    register_fonts()
    builders: list[tuple[Callable[[], Report], str]] = [(aircraft, 'rca-aircraft.pdf'), (brake, 'rca-brake.pdf')]
    for factory, filename in builders:
        path = build(factory(), filename)
        pages = fitz.open(path).page_count
        print(f'{path.relative_to(SITE)}: {pages} pages, {path.stat().st_size / 1024:.0f} KB')


if __name__ == '__main__':
    main()
