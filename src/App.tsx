import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

const WORDS = [
  'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for',
  'not', 'on', 'with', 'as', 'you', 'do', 'at', 'this', 'but', 'from',
  'they', 'say', 'will', 'one', 'all', 'would', 'there', 'what', 'so',
  'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
  'speed', 'galaxy', 'stars', 'warp', 'space', 'laser', 'orbit', 'comet',
  'nebula', 'void', 'cosmos', 'thrust', 'engine', 'pilot', 'asteroid',
  'spaceship', 'rocket', 'shuttle', 'station', 'satellite', 'capsule', 'lander',
  'cockpit', 'helm', 'airlock', 'viewport', 'bridge', 'booster', 'nozzle',
  'throttle', 'heading', 'bearing', 'trajectory', 'waypoint', 'intercept',
  'liftoff', 'reentry', 'jettison', 'deorbit', 'rendezvous', 'approach',
  'pitch', 'roll', 'yaw', 'parsec', 'lightyear', 'redshift', 'blueshift',
  'photon', 'pulsar', 'quasar', 'signal', 'reactor', 'hyperdrive',
  'plasma', 'gravity', 'solar', 'lunar', 'stellar', 'nova', 'probe',
  'beacon', 'module', 'hull', 'shield', 'sensor', 'cluster', 'binary',
  'vector', 'vortex', 'flux', 'drift', 'burst', 'flare', 'pulse',
  'corona', 'eclipse', 'zenith', 'apogee', 'crater', 'launch', 'dock',
  'dark', 'light', 'matter', 'quantum', 'wormhole', 'blackhole', 'event',
  'horizon', 'dimension', 'anomaly', 'rift', 'surge', 'ion', 'core',
  'unit', 'droid', 'servo', 'relay', 'grid', 'node', 'circuit', 'valve',
  'cable', 'radar', 'sonar', 'scope', 'dial', 'lever', 'switch', 'panel',
  'deck', 'bay', 'hatch', 'port', 'tower', 'array', 'link', 'feed',
  'code', 'data', 'byte', 'cycle', 'clock', 'sync', 'boot', 'core',
  'alloy', 'chrome', 'steel', 'coil', 'piston', 'gear', 'frame', 'beam',
  'Matrix', 'Neo', 'Morpheus', 'Oracle', 'Zion', 'Agent', 'Cipher',
  'R2D2', 'C3PO', 'HAL9000', 'TRON', 'Skynet', 'GLaDOS', 'SHODAN',
  'Robby', 'Terminator', 'Replicant', 'Nexus6', 'Blade', 'Runner',
  'Weyland', 'Nostromo', 'Discovery', 'HAL',
  'Omega3', 'Axiom', 'EVE', 'WALL-E', 'Colossus',
  'Cylon', 'Dalek', 'TARDIS', 'Spock', 'Borg', 'JARVIS',
  '42', 'Zaphod', 'Marvin', 'Vogon', 'Magrathea', 'Hooloovoo', 'Slartibartfast',
  'Arrakis', 'Atreides', 'Spice', 'Kwisatz',
  'sun', 'moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn',
  'Uranus', 'Neptune', 'Pluto', 'Europa', 'Titan', 'Ganymede', 'Io',
  'Phobos', 'Deimos', 'Ceres', 'Eris', 'Sedna', 'Halley', 'Hubble',
  'MilkyWay', 'Andromeda', 'Orion', 'Cassini', 'Voyager', 'Kepler',
]

const NUM_STARS = 250
const MAX_Z = 1000
const FOCAL_LENGTH = 500
const IDLE_SPEED = 1.5
const KEY_BOOST = 5
const WORD_BONUS = 40
const MAX_SPEED = 100

interface Star {
  x: number
  y: number
  z: number
  prevZ: number
  hue: number
}

function createStar(spread: boolean): Star {
  const z = spread ? Math.random() * MAX_Z : MAX_Z
  return {
    x: (Math.random() - 0.5) * MAX_Z * 1.5,
    y: (Math.random() - 0.5) * MAX_Z * 1.5,
    z,
    prevZ: z,
    hue: Math.random() * 360,
  }
}

function randomChunk(n: number): string[] {
  return Array.from({ length: n }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
}

function project(x: number, y: number, z: number, cx: number, cy: number) {
  const scale = FOCAL_LENGTH / z
  return { sx: x * scale + cx, sy: y * scale + cy, size: scale * 1.5 }
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const speedRef = useRef(IDLE_SPEED)
  const rafRef = useRef(0)

  const [words, setWords] = useState(() => randomChunk(10))
  const [wordIndex, setWordIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [wpm, setWpm] = useState(0)
  const [streak, setStreak] = useState(0)

  const completionTimesRef = useRef<number[]>([])
  const wordStartRef = useRef(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current!
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    starsRef.current = Array.from({ length: NUM_STARS }, () => createStar(true))
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const tick = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2

      speedRef.current = Math.max(IDLE_SPEED, speedRef.current * 0.96)

      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      ctx.fillRect(0, 0, W, H)

      for (const star of starsRef.current) {
        star.prevZ = star.z
        star.z -= speedRef.current
        if (star.z <= 0) {
          Object.assign(star, createStar(false))
          continue
        }

        const cur = project(star.x, star.y, star.z, cx, cy)
        const prev = project(star.x, star.y, star.prevZ, cx, cy)

        const lightness = Math.round(40 + (1 - star.z / MAX_Z) * 60)
        ctx.strokeStyle = `hsl(${star.hue}, 80%, ${lightness}%)`
        ctx.lineWidth = Math.max(0.4, cur.size * 0.3)
        ctx.beginPath()
        ctx.moveTo(prev.sx, prev.sy)
        ctx.lineTo(cur.sx, cur.sy)
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value

      if (val.endsWith(' ')) {
        const attempt = val.trimEnd()
        if (attempt === words[wordIndex]) {
          const now = Date.now()
          const elapsed = now - wordStartRef.current
          completionTimesRef.current.push(elapsed)
          if (completionTimesRef.current.length > 50) completionTimesRef.current.shift()

          const totalMs = completionTimesRef.current.reduce((a, b) => a + b, 0)
          const avgMsPerWord = totalMs / completionTimesRef.current.length
          setWpm(Math.round(60000 / avgMsPerWord))

          wordStartRef.current = Date.now()
          speedRef.current = Math.min(speedRef.current + WORD_BONUS, MAX_SPEED)
          setStreak((s) => s + 1)

          if (wordIndex + 1 >= words.length) {
            setWords(randomChunk(10))
            setWordIndex(0)
          } else {
            setWordIndex((i) => i + 1)
          }
          setTyped('')
        } else {
          setTyped(attempt)
        }
        return
      }

      if (val.length > typed.length) {
        speedRef.current = Math.min(speedRef.current + KEY_BOOST, MAX_SPEED)
      }
      setTyped(val)
    },
    [typed, words, wordIndex],
  )

  return (
    <div className="game" onClick={() => document.getElementById('input')?.focus()}>
      <div className="aurora" />
      <canvas ref={canvasRef} />

      <div className="hud">
        <div className="stats">
          <span className="stat">{wpm} <small>WPM</small></span>
          <span className="stat">{streak} <small>words</small></span>
        </div>

        <div className="word-row">
          {words.map((w, wi) => {
            if (wi < wordIndex) {
              return <span key={wi} className="word done">{w}</span>
            }
            if (wi === wordIndex) {
              return (
                <span key={wi} className="word">
                  {w.split('').map((ch, i) => {
                    const cls =
                      i < typed.length
                        ? typed[i] === ch ? 'ch correct' : 'ch wrong'
                        : 'ch'
                    return <span key={i} className={cls}>{ch}</span>
                  })}
                </span>
              )
            }
            return <span key={wi} className="word upcoming">{w}</span>
          })}
        </div>

        <input
          id="input"
          className="type-input"
          value={typed}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setWords(randomChunk(10))
              setWordIndex(0)
              setTyped('')
            }
          }}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
