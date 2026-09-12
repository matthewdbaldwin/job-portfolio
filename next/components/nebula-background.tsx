// Randomize per request — every page load gets a fresh meteor shower and
// a different palette rotation around the OKLCH wheel.
const rand = (min: number, max: number) => Math.random() * (max - min) + min

const METEOR_COUNT = 28

type Meteor = {
  id: number
  top: number      // vh — starting position
  left: number     // vw — starting position
  width: number    // px — tail length
  duration: number // s
  delay: number    // s (negative, drops meteor into mid-cycle on first paint)
  hueOffset: number
  alpha: number
}

function buildMeteors(): Meteor[] {
  return Array.from({ length: METEOR_COUNT }, (_, i) => ({
    id: i,
    top: rand(-20, 35),
    left: rand(20, 115),
    width: rand(110, 340),
    duration: rand(4.5, 11),
    delay: -rand(0, 14),
    hueOffset: rand(-40, 200),
    alpha: rand(0.45, 0.85),
  }))
}

function randomNebulaVars(): React.CSSProperties {
  return {
    // Hue seed — rotates whole palette by a random amount around OKLCH wheel
    '--nebula-hue-seed': `${rand(0, 360)}deg`,
  } as React.CSSProperties
}

export function NebulaBackground() {
  const styles = randomNebulaVars()
  const meteors = buildMeteors()

  return (
    <div
      aria-hidden
      className="nebula pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={styles}
    >
      {/* Aurora ribbon — slow-rotating conic gradient adds curved depth */}
      <div className="aurora-ribbon" />

      {/* Meteor shower — many small trails, each randomized, all rotated 135°
          so they sweep from upper-right toward bottom-left. */}
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={
            {
              top: `${m.top}vh`,
              left: `${m.left}vw`,
              width: `${m.width}px`,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              '--meteor-hue': `${m.hueOffset}deg`,
              '--meteor-alpha': m.alpha,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Grain — filmic noise overlay */}
      <div className="grain absolute inset-0 mix-blend-overlay" />
    </div>
  )
}

export function HeritageBackdrop() {
  return (
    <div
      aria-hidden
      className="heritage-backdrop pointer-events-none fixed inset-x-0 top-0 h-[100dvh] -z-30 overflow-hidden"
    />
  )
}

export function BlackWipe() {
  return (
    <div
      aria-hidden
      className="black-wipe pointer-events-none fixed inset-0 -z-20"
    />
  )
}
