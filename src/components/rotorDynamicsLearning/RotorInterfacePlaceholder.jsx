import { useTranslation } from 'react-i18next'

export default function RotorInterfacePlaceholder() {
    const { t } = useTranslation()
    const groups = t('rotorLearn.interface.groups', { returnObjects: true })

    return (
        <div>
            <div
                className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-[#00f5ff]/25 bg-black/20 p-8 text-center"
                aria-label={t('rotorLearn.interface.placeholderTitle')}
            >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
                <div className="relative max-w-xl">
                    <span className="inline-flex rounded-full border border-[#00f5ff]/25 bg-[#00f5ff]/[0.05] px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-[#00f5ff]">
                        {t('rotorLearn.interface.status')}
                    </span>
                    <div className="mx-auto mt-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] text-2xl text-slate-500">
                        ☐
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">
                        {t('rotorLearn.interface.placeholderTitle')}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                        {t('rotorLearn.interface.placeholderBody')}
                    </p>
                    <p className="mt-4 text-xs text-slate-600">
                        {t('rotorLearn.interface.placeholderNote')}
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold text-white">
                    {t('rotorLearn.interface.controlsTitle')}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                    {t('rotorLearn.interface.controlsIntro')}
                </p>
                <div className="mt-6 grid gap-3 lg:grid-cols-2">
                    {groups.map((group) => (
                        <details
                            key={group.name}
                            className="group rounded-2xl border border-white/10 bg-white/[0.025] open:border-[#00f5ff]/25"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-white">
                                {group.name}
                                <span className="text-lg font-normal text-[#00f5ff] transition group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <div className="border-t border-white/8 px-5 pb-5">
                                <p className="py-4 text-xs leading-5 text-slate-500">
                                    {group.desc}
                                </p>
                                <dl className="divide-y divide-white/8">
                                    {group.controls.map((control) => (
                                        <div key={control.name} className="py-4">
                                            <dt className="text-sm font-semibold text-[#00f5ff]">
                                                {control.name}
                                            </dt>
                                            <dd className="mt-1 text-[13px] leading-6 text-slate-400">
                                                {control.desc}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    )
}
