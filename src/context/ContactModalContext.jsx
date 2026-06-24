import { createContext, useContext, useState, useCallback } from 'react'

// ─── Contact / Demo Modal Context ──────────────────────────────────────────────
// Replaces the previous `window.openContactModal` global. Any component can call
// `useContactModal().open()` to trigger the global demo-request modal without
// prop drilling and without polluting the window object.

const ContactModalContext = createContext(null)

export function ContactModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    return (
        <ContactModalContext.Provider value={{ isOpen, open, close }}>
            {children}
        </ContactModalContext.Provider>
    )
}

export function useContactModal() {
    const ctx = useContext(ContactModalContext)
    if (!ctx) {
        throw new Error('useContactModal must be used within a ContactModalProvider')
    }
    return ctx
}
