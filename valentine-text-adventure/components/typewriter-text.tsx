"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterTextProps {
  text: string
  onComplete: () => void
  speed?: number
}

export function TypewriterText({ text, onComplete, speed = 20 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const indexRef = useRef(0)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    setDisplayedText("")
    indexRef.current = 0
    hasCompletedRef.current = false

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        const currentChar = text[indexRef.current]
        setDisplayedText(text.slice(0, indexRef.current + 1))
        indexRef.current++

        const delay = currentChar === "\n" ? 100 : speed
        setTimeout(typeNextChar, delay)
      } else {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true
          onComplete()
        }
      }
    }

    const timer = setTimeout(typeNextChar, speed)
    return () => clearTimeout(timer)
  }, [text, speed, onComplete])

  return (
    <pre className="whitespace-pre-wrap font-sans text-lg md:text-xl leading-relaxed text-foreground">
      {displayedText}
    </pre>
  )
}
