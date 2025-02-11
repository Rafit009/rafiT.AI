import { useState, useEffect } from "react"

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrameId: number

    const updateMousePosition = (ev: MouseEvent) => {
      cancelAnimationFrame(animationFrameId) // Cancel the previous frame if still pending
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: ev.clientX, y: ev.clientY })
      })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return mousePosition
}

