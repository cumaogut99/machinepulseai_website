// Numbered marker placed over an application screenshot. Shared by every
// interface tour so marker size and states stay consistent site-wide. The
// marker is deliberately compact (22 px desktop, 18 px mobile): it must point at
// a control without hiding it.
export default function TourHotspot({ number, label, selected, onSelect, style }) {
    return (
        <button
            type="button"
            aria-label={`${number}. ${label}`}
            aria-pressed={selected}
            onClick={onSelect}
            style={style}
            className={`absolute flex h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[9px] font-bold leading-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan sm:h-[22px] sm:w-[22px] sm:text-[10px] ${
                selected
                    ? 'border-neon-cyan bg-neon-cyan text-black shadow-glow-cyan'
                    : 'border-white/80 bg-black/80 text-white hover:border-neon-cyan hover:text-neon-cyan'
            }`}
        >
            {number}
        </button>
    )
}
