import { useReducedMotion } from 'framer-motion'

// ─── Reduced-motion helpers ─────────────────────────────────────────────────────
// Honour the user's OS-level "prefers-reduced-motion" setting. framer-motion's
// useReducedMotion() reads the media query reactively. These helpers let a
// component swap a rich animation for a static (zero-duration) one without
// branching all over the JSX.

/**
 * Returns true when the user has requested reduced motion.
 */
export function useReducedMotionSafe() {
    return useReducedMotion()
}

/**
 * Pick between an animated value and a reduced-motion fallback.
 * @param {boolean} reduce - result of useReducedMotionSafe()
 * @param {*} full - value to use when motion is allowed
 * @param {*} reduced - value to use when motion should be reduced
 */
export function motionValue(reduce, full, reduced) {
    return reduce ? reduced : full
}
