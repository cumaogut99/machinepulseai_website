/** Source badge (aircraft or car) */
export default function SourceBadge({ icon, label, active }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-500 ${active
            ? 'border-[#00f5ff]/30 bg-[#00f5ff]/8 text-[#00f5ff]'
            : 'border-white/8 bg-white/[0.02] text-slate-500'
            }`}>
            <span className="text-base">{icon}</span>
            <div>
                <div className={`text-[9px] font-semibold ${active ? 'text-[#00f5ff]' : 'text-slate-500'}`}>{label}</div>
                {active && (
                    <div className="text-[7px] text-[#00f5ff]/60 flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-[#00f5ff] animate-pulse inline-block" />
                        LIVE
                    </div>
                )}
            </div>
        </div>
    )
}
