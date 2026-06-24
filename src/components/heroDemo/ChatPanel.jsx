import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LLM_MESSAGES } from './constants.js'

/** Typewriter text */
function Typewriter({ text, speed = 28, onDone }) {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        setDisplayed('')
        setDone(false)
        let i = 0
        const iv = setInterval(() => {
            i++
            setDisplayed(text.slice(0, i))
            if (i >= text.length) {
                clearInterval(iv)
                setDone(true)
                onDone?.()
            }
        }, speed)
        return () => clearInterval(iv)
    }, [text, speed])

    return (
        <span className="whitespace-pre-wrap">
            {displayed}
            {!done && <span className="inline-block w-0.5 h-3 bg-current ml-0.5 animate-pulse align-middle" />}
        </span>
    )
}

/** LLM chat panel */
export default function ChatPanel({ phase }) {
    const [visibleMessages, setVisibleMessages] = useState([])
    const [typingIdx, setTypingIdx] = useState(-1)

    useEffect(() => {
        if (phase < 3) {
            setVisibleMessages([])
            setTypingIdx(-1)
            return
        }
        // Show user message immediately
        setVisibleMessages([LLM_MESSAGES[0]])
        const t1 = setTimeout(() => {
            setVisibleMessages(LLM_MESSAGES.slice(0, 2))
            setTypingIdx(1)
        }, 600)
        const t2 = setTimeout(() => {
            setVisibleMessages(LLM_MESSAGES.slice(0, 3))
            setTypingIdx(2)
        }, 2200)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [phase])

    const msgContainerRef = useRef(null)
    useEffect(() => {
        if (msgContainerRef.current) {
            msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight
        }
    }, [visibleMessages])

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <div className="w-5 h-5 rounded-md bg-[#a855f7]/20 border border-[#a855f7]/30 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">Smart Assistant</span>
                <span className="ml-auto flex items-center gap-1 text-[9px] text-green-400">
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    online
                </span>
            </div>

            {/* Messages */}
            <div ref={msgContainerRef} className="flex-1 overflow-y-auto flex flex-col gap-2.5 px-3 py-3" style={{ scrollbarWidth: 'none' }}>
                <AnimatePresence>
                    {visibleMessages.map((msg, i) => (
                        <motion.div
                            key={msg.role + '-' + i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'agent' && (
                                <div className="w-4 h-4 rounded-full bg-[#a855f7]/30 flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5">
                                    <span className="text-[6px] text-[#a855f7]">AI</span>
                                </div>
                            )}
                            <div
                                className={`max-w-[85%] rounded-xl px-3 py-2 text-[10px] leading-relaxed ${msg.role === 'user'
                                    ? 'bg-white/8 text-slate-300 rounded-br-sm'
                                    : msg.highlight
                                        ? 'bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-bl-sm'
                                        : 'bg-white/4 border border-white/8 text-slate-400 rounded-bl-sm'
                                    }`}
                            >
                                {i === typingIdx
                                    ? <Typewriter text={msg.text} speed={msg.highlight ? 18 : 30} />
                                    : <span className="whitespace-pre-wrap">{msg.text}</span>
                                }
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input bar (decorative) */}
            <div className="px-3 pb-3">
                <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5">
                    <span className="text-[9px] text-slate-600 flex-1">Ask about your data...</span>
                    <svg className="w-3 h-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
