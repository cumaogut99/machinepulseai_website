import { WIDGET_LEARNING } from '../data/widgetLearning.js'
import { vibrationControlTranslations } from '../data/learning/vibrationControls.js'
import { conceptLabTranslations } from '../data/learning/conceptLabs.js'

export const LEARNING_LABELS = {
    en: {
        back: 'Back to the module library', eyebrow: 'Usage guide', start: 'Go to the workspace',
        badges: ['Control guide', 'Example calculation', 'Knowledge check'],
        card: 'Controls · theory · example · knowledge check', cardNoCheck: 'Controls · theory · example',
        labTitle: 'Change a parameter, see the relationship', labIntro: 'Move the controls to explore the worked relationship. All values are synthetic and the stated assumptions still apply.',
        labFootnote: 'Scalar teaching model only. This does not run the application analysis or validate a real measurement.', labReset: 'Reset example',
        samples: 'samples',
        whyTitle: 'Why this is needed', outcomes: 'Topics covered in this guide', purpose: 'When to use it',
        nav: ['Interface', 'Key concepts', 'Example', 'Procedure', 'References'],
        workspace: 'Application interface', workspaceIntro: 'Select a control to learn its purpose. This is a conceptual guide to the application workflow, not an application screenshot or a live analysis.',
        screenshotBadge: 'Real application window',
        screenshotIntro: 'This is the real MachinePulseAI window for this widget. Select a numbered marker or a control to learn its purpose.',
        screenshotCaption: 'Captured from the MachinePulseAI desktop application (Space theme) with synthetic demo data. Values shown are illustrative, not machine measurements.',
        screenshotAlt: '{{name}} window in the MachinePulseAI desktop application',
        source: 'Required inputs', controls: 'Main controls', result: 'Outputs',
        selectedControl: 'Selected control', optionsTitle: 'Settings and when to choose them', controlGuide: 'Control reference: settings and when to choose them', concept: 'From a control to an engineering decision',
        theory: 'Key concepts', theoryIntro: 'The concepts below explain what the calculation or view measures and should be understood before its result is interpreted.',
        specEyebrow: '04.1 · Engineering and mathematical specification',
        equations: 'Core equations behind the controls and readouts',
        equationsIntro: 'Each equation is tagged with the workbench control or readout it governs. Use this reference to check definitions, units and assumptions before reporting a result.',
        example: 'Example calculation', illustrative: 'Illustrative example · not measured machine data',
        check: 'Check your understanding', choose: 'Choose an answer, then check it.', submit: 'Check answer', retry: 'Try again', correct: 'Correct.', incorrect: 'Review the reasoning and try again.',
        workflow: 'Procedure', mistakes: 'Common mistakes',
        references: 'References', referencesIntro: 'These references explain the underlying concepts. Application controls and availability are described from the local MachinePulseAI implementation.',
        next: 'Continue with a related module', open: 'Open guide',
    },
    tr: {
        back: 'Modül kütüphanesine dön', eyebrow: 'Kullanım rehberi', start: 'Çalışma ekranına geçin',
        badges: ['Kontrol rehberi', 'Örnek hesaplama', 'Bilgi kontrolü'],
        card: 'Kontroller · teori · örnek · bilgi kontrolü', cardNoCheck: 'Kontroller · teori · örnek',
        labTitle: 'Parametreyi değiştirin, ilişkiyi görün', labIntro: 'Çalışılmış ilişkiyi keşfetmek için kontrolleri hareket ettirin. Tüm değerler sentetiktir; belirtilen varsayımlar geçerlidir.',
        labFootnote: 'Yalnızca skaler eğitim modeli. Uygulama analizini çalıştırmaz veya gerçek ölçümü doğrulamaz.', labReset: 'Örneği sıfırla',
        samples: 'örnek',
        whyTitle: 'Neden ihtiyaç duyulur?', outcomes: 'Bu rehberde ele alınan konular', purpose: 'Ne zaman kullanılır',
        nav: ['Arayüz', 'Temel kavramlar', 'Örnek', 'Prosedür', 'Kaynaklar'],
        workspace: 'Uygulama arayüzü', workspaceIntro: 'Amacını öğrenmek için bir kontrol seçin. Bu uygulama akışının kavramsal rehberidir; uygulama ekran görüntüsü veya canlı analiz değildir.',
        screenshotBadge: 'Gerçek uygulama penceresi',
        screenshotIntro: 'Bu, widget’ın MachinePulseAI uygulamasındaki gerçek penceresidir. Amacını öğrenmek için numaralı bir işarete veya bir kontrole tıklayın.',
        screenshotCaption: 'MachinePulseAI masaüstü uygulamasından (Space teması) sentetik demo verisiyle alınmıştır. Görünen değerler açıklayıcıdır; makine ölçümü değildir.',
        screenshotAlt: 'MachinePulseAI masaüstü uygulamasında {{name}} penceresi',
        source: 'Gerekli girdiler', controls: 'Temel kontroller', result: 'Çıktılar',
        selectedControl: 'Seçili kontrol', optionsTitle: 'Ayarlar ve ne zaman seçilir', controlGuide: 'Kontrol rehberi: ayarlar ve ne zaman seçilir', concept: 'Kontrolden mühendislik kararına',
        theory: 'Temel kavramlar', theoryIntro: 'Aşağıdaki kavramlar hesaplamanın veya görünümün neyi ölçtüğünü açıklar; sonuç yorumlanmadan önce bilinmelidir.',
        specEyebrow: '04.1 · Teknik ve matematiksel spesifikasyon',
        equations: 'Arayüz kontrollerinin ve göstergelerin matematiksel karşılıkları',
        equationsIntro: 'Her denklem, ilgili olduğu arayüz kontrolü veya sonuç göstergesiyle etiketlenmiştir. Bir sonucu raporlamadan önce tanımları, birimleri ve kabulleri bu referanstan kontrol edin.',
        example: 'Örnek hesaplama', illustrative: 'Açıklayıcı örnek · gerçek makine ölçümü değildir',
        check: 'Bilginizi kontrol edin', choose: 'Bir yanıt seçip kontrol edin.', submit: 'Yanıtı kontrol et', retry: 'Yeniden deneyin', correct: 'Doğru.', incorrect: 'Açıklamayı inceleyip yeniden deneyin.',
        workflow: 'Uygulama prosedürü', mistakes: 'Sık yapılan hatalar',
        references: 'Kaynaklar', referencesIntro: 'Bu kaynaklar temel kavramları açıklar. Uygulama kontrolleri ve kullanılabilirlik yerel MachinePulseAI uygulamasına göre anlatılır.',
        next: 'İlgili modülle devam edin', open: 'Rehberi aç',
    },
}

const WIDGET_LEARNING_TRANSLATIONS = Object.fromEntries(['en', 'tr'].map((lang) => [lang, {
    common: LEARNING_LABELS[lang],
    pages: Object.fromEntries(Object.entries(WIDGET_LEARNING).map(([id, guide]) => [id, guide[lang]])),
    vibration: vibrationControlTranslations(lang),
    labs: conceptLabTranslations(lang),
}]))

export default WIDGET_LEARNING_TRANSLATIONS
