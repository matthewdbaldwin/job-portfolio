// Re-randomize the nebula colors per request — disables full-route caching.
export const dynamic = 'force-dynamic'

import { Nav } from '@/components/nav'
import { BlackWipe, HeritageBackdrop, NebulaBackground } from '@/components/nebula-background'
import { ScrollVelocity } from '@/components/scroll-velocity'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Work } from '@/components/sections/work'
import { Skills } from '@/components/sections/skills'
import { Portfolio } from '@/components/sections/portfolio'
import { Testimonials } from '@/components/sections/testimonials'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <HeritageBackdrop />
      <BlackWipe />
      <NebulaBackground />
      <ScrollVelocity />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
