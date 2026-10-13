import { WIDGET_LEARNING } from '../data/widgetLearning.js'
import { vibrationControlTranslations } from '../data/learning/vibrationControls.js'
import { conceptLabTranslations } from '../data/learning/conceptLabs.js'

export const LEARNING_LABELS = {
    en: {
        back: 'Back to the module library', eyebrow: 'Product & learning guide', start: 'Explore the workflow',
        badges: ['Control guide', 'Worked example', 'Knowledge check'],
        card: 'Controls · theory · example · knowledge check',
        labTitle: 'Change a parameter, see the relationship', labIntro: 'Move the controls to explore the worked relationship. All values are synthetic and the stated assumptions still apply.',
        labFootnote: 'Scalar teaching model only. This does not run the application analysis or validate a real measurement.', labReset: 'Reset example',
        samples: 'samples',
        outcomes: 'What this guide helps you do', purpose: 'When to use it',
        nav: ['Workspace', 'Core ideas', 'Worked example', 'Workflow', 'Further reading'],
        workspace: 'Understand the workspace', workspaceIntro: 'Select a control to learn its purpose. This is a conceptual guide to the application workflow, not an application screenshot or a live analysis.',
        screenshotBadge: 'Real application window',
        screenshotIntro: 'This is the real MachinePulseAI window for this widget. Select a numbered marker or a control to learn its purpose.',
        screenshotCaption: 'Captured from the MachinePulseAI desktop application (Space theme) with synthetic demo data. Values shown are illustrative, not machine measurements.',
        screenshotAlt: '{{name}} window in the MachinePulseAI desktop application',
        source: 'What you need', controls: 'Controls to know', result: 'What you get',
        selectedControl: 'Selected control', concept: 'From a control to an engineering decision',
        theory: 'Build the mental model', theoryIntro: 'Understand what the calculation or view measures before interpreting its result.',
        equations: 'The relationship behind the result',
        example: 'Read a worked example', illustrative: 'Illustrative example · not measured machine data',
        check: 'Check your understanding', choose: 'Choose an answer, then check it.', submit: 'Check answer', retry: 'Try again', correct: 'Correct.', incorrect: 'Review the reasoning and try again.',
        workflow: 'Use it in a real workflow', mistakes: 'Common mistakes',
        references: 'Keep learning', referencesIntro: 'These references explain the underlying concepts. Application controls and availability are described from the local MachinePulseAI implementation.',
        next: 'Continue with a related module', open: 'Open guide',
    },
    tr: {
        back: 'Modül kütüphanesine dön', eyebrow: 'Ürün ve öğrenme rehberi', start: 'İş akışını keşfedin',
        badges: ['Kontrol rehberi', 'Çalışılmış örnek', 'Bilgi kontrolü'],
        card: 'Kontroller · teori · örnek · bilgi kontrolü',
        labTitle: 'Parametreyi değiştirin, ilişkiyi görün', labIntro: 'Çalışılmış ilişkiyi keşfetmek için kontrolleri hareket ettirin. Tüm değerler sentetiktir; belirtilen varsayımlar geçerlidir.',
        labFootnote: 'Yalnızca skaler eğitim modeli. Uygulama analizini çalıştırmaz veya gerçek ölçümü doğrulamaz.', labReset: 'Örneği sıfırla',
        samples: 'örnek',
        outcomes: 'Bu rehber size ne kazandırır?', purpose: 'Ne zaman kullanılır?',
        nav: ['Çalışma alanı', 'Temel kavramlar', 'Çalışılmış örnek', 'İş akışı', 'İleri okuma'],
        workspace: 'Çalışma alanını anlayın', workspaceIntro: 'Amacını öğrenmek için bir kontrol seçin. Bu uygulama akışının kavramsal rehberidir; uygulama ekran görüntüsü veya canlı analiz değildir.',
        screenshotBadge: 'Gerçek uygulama penceresi',
        screenshotIntro: 'Bu, widgetın MachinePulseAI uygulamasındaki gerçek penceresidir. Amacını öğrenmek için numaralı bir işarete veya bir kontrole tıklayın.',
        screenshotCaption: 'MachinePulseAI masaüstü uygulamasından (Space teması) sentetik demo verisiyle alınmıştır. Görünen değerler açıklayıcıdır; makine ölçümü değildir.',
        screenshotAlt: 'MachinePulseAI masaüstü uygulamasında {{name}} penceresi',
        source: 'Neye ihtiyaç var?', controls: 'Bilmeniz gereken kontroller', result: 'Ne elde edilir?',
        selectedControl: 'Seçili kontrol', concept: 'Kontrolden mühendislik kararına',
        theory: 'Zihinsel modeli kurun', theoryIntro: 'Sonucu yorumlamadan önce hesaplamanın veya görünümün neyi ölçtüğünü anlayın.',
        equations: 'Sonucun arkasındaki ilişki',
        example: 'Çalışılmış örneği okuyun', illustrative: 'Açıklayıcı örnek · gerçek makine ölçümü değildir',
        check: 'Bilginizi kontrol edin', choose: 'Bir yanıt seçip kontrol edin.', submit: 'Yanıtı kontrol et', retry: 'Yeniden deneyin', correct: 'Doğru.', incorrect: 'Açıklamayı inceleyip yeniden deneyin.',
        workflow: 'Gerçek iş akışında kullanın', mistakes: 'Yaygın hatalar',
        references: 'Öğrenmeye devam edin', referencesIntro: 'Bu kaynaklar temel kavramları açıklar. Uygulama kontrolleri ve kullanılabilirlik yerel MachinePulseAI uygulamasına göre anlatılır.',
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
