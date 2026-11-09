"""Crop verified side padding and label the website's Turkish product movies."""

from __future__ import annotations

import argparse
import logging
import os
from pathlib import Path
import subprocess
import tempfile

import imageio_ffmpeg


def prepare_video(source: Path, destination: Path, poster_time: float) -> None:
    """Encode the visible frame while preserving the original audio and timeline.

    Args:
        source: Original 2560 by 1440 delivered movie.
        destination: Website MP4 to prepare with fast-start metadata.
        poster_time: Position used for the website's still image.
    """
    # All 58 delivered chapters were independently sampled: visible horizontal
    # bounds are x=174..2385. The entire 1440px height, including subtitles, stays.
    font = Path(os.environ['WINDIR']) / 'Fonts' / 'segoeui.ttf'
    if not font.is_file():
        raise FileNotFoundError(f'Caption font not found: {font}')
    font_filter = font.as_posix().replace(':', r'\:')
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='mpai-web-video-') as temporary:
        work = Path(temporary)
        (work / 'disclosure.txt').write_text(
            'Gerçek uygulama · Sentetik gösterim verisi', encoding='utf-8',
        )
        # Segoe UI 22px: label ends at x=435. Every delivered English subtitle
        # starts at x>=642 after the crop (longest 42px line measures 928px).
        filters = (
            'crop=2212:1440:174:0,'
            f"drawtext=fontfile='{font_filter}':textfile=disclosure.txt:"
            'fontsize=22:fontcolor=0x94a3b8:x=24:y=1372'
        )
        subprocess.run([
            ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
            '-i', str(source.resolve()), '-map', '0:v:0', '-map', '0:a:0',
            '-vf', filters, '-c:v', 'libx264', '-preset', 'veryfast',
            '-crf', '18', '-threads', '4', '-pix_fmt', 'yuv420p',
            '-c:a', 'copy', '-movflags', '+faststart', str(destination.resolve()),
        ], cwd=work, check=True)
    subprocess.run([
        ffmpeg, '-v', 'error', '-y', '-ss', str(poster_time),
        '-i', str(destination), '-frames:v', '1', '-vf', 'scale=1106:720',
        '-c:v', 'libwebp', '-quality', '85', str(destination.with_suffix('.webp')),
    ], check=True)


def main() -> None:
    """Prepare all three same-origin movies from an explicit delivery folder."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format='%(message)s')
    for name, stem, timestamp in (
        ('website_preview_TR_EN.mp4', 'overview', 8),
        ('introduction_TR_EN.mp4', 'introduction', 65),
        ('MachinePulseAI_Phase1_TR_EN.mp4', 'product-tour', 505),
    ):
        prepare_video(args.source / name, args.output / f'{stem}.mp4', timestamp)
        logging.info('Prepared %s', stem)


if __name__ == '__main__':
    main()
