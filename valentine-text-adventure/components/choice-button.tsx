"use client"

import { useState, useEffect } from "react"

interface ChoiceButtonProps {
  text: string
  index: number
  onClick: () => void
}

export function ChoiceButton({ text, index, onClick }: ChoiceButtonProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 150)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 text-lg md:text-xl bg-secondary hover:bg-primary hover:text-primary-foreground border border-border rounded transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      {">"} {text}
    </button>
  )
}
