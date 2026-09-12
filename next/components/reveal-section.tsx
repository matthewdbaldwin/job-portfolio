'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import { type ReactNode } from 'react'

type Props = Omit<HTMLMotionProps<'section'>, 'children'> & {
  children: ReactNode
}

/**
 * Section wrapper that lazy-reveals when scrolled into view.
 * IntersectionObserver via motion's whileInView — works everywhere, no
 * dependency on the scroll-timeline browser feature. Once revealed, stays
 * revealed (viewport.once: true).
 */
export function RevealSection({ children, ...props }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 64, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px -15% 0px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
