"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export function HeartAnimation() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const newHearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      size: 16 + Math.random() * 24,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary/60 animate-float-up"
          fill="currentColor"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            width: heart.size,
            height: heart.size,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
