import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlaneScene from './PlaneScene'
import CarScene from './CarScene'

// The dashboard demo only appears after the intro scenes, so defer its bundle.
const HeroDemoAnimation = lazy(() => import('./HeroDemoAnimation'))

// Scene durations in ms
const SCENE_DURATION_MS = 5500  // plane + car each
const SCENES = ['plane', 'car', 'dashboard']

// Progress bar fills across the total duration of each intro scene
function SceneProgressBar({ active, durationMs }) {
    return (
        <motion.div
            className="h-full rounded-full"
            style={{ background: 'currentColor' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={active ? { scaleX: 1 } : { scaleX: 0 }}
            transition={active ? { duration: durationMs / 1000, ease: 'linear' } : { duration: 0 }}
        />
    )
}

export default function HeroShowcase() {
    const [sceneIdx, setSceneIdx] = useState(0)

    // Advance through intro scenes then stay on dashboard
    useEffect(() => {
        if (sceneIdx >= SCENES.length - 1) return
        const timer = setTimeout(() => setSceneIdx(i => i + 1), SCENE_DURATION_MS)
        return () => clearTimeout(timer)
    }, [sceneIdx])

    const scene = SCENES[sceneIdx]

    return (
        <div className="relative w-full h-full">

            {/* ── Scene content ── */}
            <AnimatePresence mode="wait">
                {scene === 'plane' && (
                    <motion.div key="plane" className="absolute inset-0"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.65 }}
                    >
                        <PlaneScene />
                    </motion.div>
                )}
                {scene === 'car' && (
                    <motion.div key="car" className="absolute inset-0"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.65 }}
                    >
                        <CarScene />
                    </motion.div>
                )}
                {scene === 'dashboard' && (
                    <motion.div key="dashboard" className="absolute inset-0"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.65 }}
                    >
                        <Suspense fallback={<div className="absolute inset-0 rounded-2xl bg-[#0d1117]" aria-hidden="true" />}>
                            <HeroDemoAnimation />
                        </Suspense>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Scene indicator dots (only during intro) ── */}
            {sceneIdx < 2 && (
                <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {['plane', 'car', 'dashboard'].map((s, i) => {
                        const isActive = i === sceneIdx
                        const isDone = i < sceneIdx
                        return (
                            <div
                                key={s}
                                className="relative flex items-center"
                                style={{ width: isActive ? 48 : 8, height: 8, transition: 'width 0.3s ease' }}
                            >
                                <div
                                    className="w-full h-full rounded-full overflow-hidden"
                                    style={{
                                        background: isDone ? 'rgba(0,245,255,0.5)' : 'rgba(255,255,255,0.15)',
                                    }}
                                >
                                    {isActive && (
                                        <SceneProgressBar active durationMs={SCENE_DURATION_MS} />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <span style={{
                        fontFamily: 'monospace', fontSize: 8, letterSpacing: 2,
                        color: 'rgba(255,255,255,0.4)',
                    }}>
                        {scene === 'plane' ? 'AEROSPACE' : 'AUTOMOTIVE'}
                    </span>
                </motion.div>
            )}
        </div>
    )
}
