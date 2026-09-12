'use client'

import { useEffect } from 'react'
import { useMotionValueEvent, useScroll, useSpring, useVelocity } from 'motion/react'

/**
 * Reads scroll velocity and writes a normalized [-1, 1] value to
 * `--scroll-velocity` on <html>. CSS uses this to amplify nebula motion
 * when the user scrolls quickly. Velocity is spring-smoothed so the value
 * decays naturally when scrolling stops.
 */
export function ScrollVelocity() {
  const { scrollY } = useScroll()
  const rawVelocity = useVelocity(scrollY)
  const smooth = useSpring(rawVelocity, {
    stiffness: 160,
    damping: 28,
    mass: 0.5,
  })

  useMotionValueEvent(smooth, 'change', (v) => {
    const normalized = Math.max(-1, Math.min(1, v / 1800))
    document.documentElement.style.setProperty(
      '--scroll-velocity',
      normalized.toString()
    )
  })

  // Reset on unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--scroll-velocity')
    }
  }, [])

  return null
}
