import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

const WORDS = [
  'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for',
  'not', 'on', 'with', 'as', 'you', 'do', 'at', 'this', 'but', 'from',
  'they', 'say', 'will', 'one', 'all', 'would', 'there', 'what', 'so',
  'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
  'we', 'him', 'her', 'them', 'our', 'your', 'its', 'my', 'his', 'their',
  'see', 'look', 'come', 'know', 'take', 'think', 'make', 'find', 'give', 'use',
  'move', 'live', 'run', 'walk', 'fall', 'pull', 'push', 'hold', 'turn', 'keep',
  'now', 'just', 'also', 'back', 'only', 'then', 'still', 'down', 'over', 'even',
  'here', 'never', 'around', 'again', 'away', 'before', 'after', 'through', 'between',
  'new', 'old', 'high', 'long', 'big', 'small', 'deep', 'far', 'fast', 'slow',
  'good', 'bad', 'hot', 'cold', 'hard', 'soft', 'clear', 'dark', 'open', 'lost',
  'world', 'way', 'day', 'man', 'woman', 'time', 'hand', 'life', 'place', 'end',
  'night', 'home', 'door', 'mind', 'eye', 'face', 'body', 'sky', 'fire', 'water',
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
  // solarpunk
  'algae', 'bamboo', 'canopy', 'compost', 'mycelium', 'permaculture',
  'rewild', 'spire', 'symbiosis', 'terrarium', 'biolume', 'biome',
  'commune', 'collective', 'rhizome', 'spore', 'habitat', 'flourish',
  'lantern', 'moss', 'fern', 'bloom', 'fungal', 'greenhouse', 'harvest',
  // exoplanets
  'Kepler22b', 'Kepler452b', 'Kepler186f', 'Kepler62f', 'Kepler69c',
  'HD209458b', 'HD189733b', 'GJ1214b', 'GJ667Cc', 'GJ436b',
  'TRAPPIST1b', 'TRAPPIST1e', 'TRAPPIST1f', 'CoRoT7b', 'CoRoT2b',
  '55Cancri', '51Pegasi', 'Proxima b', 'LHS1140b', 'K2-18b',
  // stars
  'Sirius', 'Vega', 'Rigel', 'Betelgeuse', 'Aldebaran', 'Arcturus',
  'Capella', 'Deneb', 'Altair', 'Fomalhaut', 'Pollux', 'Regulus',
  'Spica', 'Antares', 'Procyon', 'Achernar', 'Canopus', 'Mimosa',
  'Acrux', 'Hadar', 'Shaula', 'Nunki', 'Alnitak', 'Alnilam',
  'Mintaka', 'Bellatrix', 'Saiph', 'Zuben', 'Algol', 'Mira',
  'Castor', 'Adhara', 'Elnath', 'Alioth', 'Dubhe', 'Merak',
  'Alkaid', 'Mizar', 'Alcor', 'Thuban', 'Polaris', 'Schedar',
  // dystopian
  'blackout', 'quarantine', 'lockdown', 'clone',
  // akira
  'Tetsuo', 'Kaneda', 'Capsule', 'Esper', 'mutant', 'psychic',
  'telekinesis', 'NeoTokyo', 'Colonel', 'Miyako', 'Otomo', 'psionic',
  'awakening', 'containment', 'corruption', 'rebirth', 'biker', 'Kei',
  // pod
  'sulfur', 'volcanic', 'lava', 'canyon', 'nitro', 'turbo',
  'skid', 'checkpoint', 'circuit', 'geyser', 'eruption', 'magma',
  'plume', 'vent', 'terrain', 'exhaust', 'rival', 'wreck',
  'Ignis', 'Vulcan', 'Stinger', 'Raptor', 'Stratos', 'Kronos',
  'Apex', 'Zephyr', 'Iguana', 'Shark', 'Venom', 'Blaze',
]

const NUM_STARS = 80
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

function TimerDisplay({ timeLeft }: { timeLeft: number }) {
  const t = 1 - timeLeft / 100
  const g = Math.round(220 - t * 170)
  const b = Math.round(60 + t * 160)
  const size = 0.5 + t * 12.5
  const glow = 6 + t * 60
  const opacity = 0.3 + t * 0.7
  const color = `rgba(255, ${g}, ${b}, ${opacity})`
  return (
    <div className="timer" style={{
      fontSize: `${size}rem`,
      color,
      textShadow: `0 0 ${glow}px ${color}`,
    }}>
      {timeLeft}
    </div>
  )
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const speedRef = useRef(IDLE_SPEED)
  const flashRef = useRef(0)
  const roundRef = useRef(0)
  const timeLeftRef = useRef(100)
  const gameOverRef = useRef(false)
  const rafRef = useRef(0)

  const [words, setWords] = useState(() => randomChunk(10))
  const [wordIndex, setWordIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [wpm, setWpm] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(100)
  const [timerStarted, setTimerStarted] = useState(false)

  const gameOver = timerStarted && timeLeft === 0
  const shakeClass = !timerStarted || gameOver ? '' : timeLeft < 5 ? ' shake-mid' : timeLeft < 15 ? ' shake-low' : ''
  gameOverRef.current = gameOver

  useEffect(() => {
    if (gameOver) flashRef.current = 1
  }, [gameOver])

  useEffect(() => {
    if (!gameOver) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return
      setWords(randomChunk(10))
      setWordIndex(0)
      setTyped('')
      setWpm(0)
      setStreak(0)
      setTimeLeft(100)
      setTimerStarted(false)
      roundRef.current = 0
      speedRef.current = IDLE_SPEED
      completionTimesRef.current = []
      setTimeout(() => document.getElementById('input')?.focus(), 0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [gameOver])

  const completionTimesRef = useRef<number[]>([])
  const wordStartRef = useRef(Date.now())

  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timerStarted, timeLeft])

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

      if (gameOverRef.current) {
        speedRef.current = Math.max(IDLE_SPEED, speedRef.current * 0.97)
      } else {
        const progress = 1 - timeLeftRef.current / 100
        const minSpeed = IDLE_SPEED + progress * progress * 80
        speedRef.current = Math.max(minSpeed, speedRef.current * 0.96)
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      ctx.fillRect(0, 0, W, H)

      if (flashRef.current > 0) {
        if (gameOverRef.current) {
          const f = flashRef.current
          const alpha = f > 0.5 ? (1 - f) * 2 : f * 2
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
          ctx.fillRect(0, 0, W, H)
          flashRef.current = Math.max(0, flashRef.current - 0.012)
        } else {
          const p = Math.min(roundRef.current / 8, 1)
          const g = Math.round(235 * (1 - p) + 60 * p)
          const b = Math.round(50 * (1 - p) + 200 * p)
          const alpha = flashRef.current * (0.06 + p * 0.18)
          ctx.fillStyle = `rgba(255, ${g}, ${b}, ${alpha})`
          ctx.fillRect(0, 0, W, H)
          flashRef.current = Math.max(0, flashRef.current - 0.04)
        }
      }

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
      if (gameOver) return
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
            roundRef.current += 1
            flashRef.current = 1
            speedRef.current = Math.min(speedRef.current + 60, MAX_SPEED)
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
        if (!timerStarted) setTimerStarted(true)
      }
      setTyped(val)
    },
    [typed, words, wordIndex, timerStarted, gameOver],
  )

  return (
    <div className="game" onClick={() => document.getElementById('input')?.focus()}>
      <div className="aurora" />
      <canvas ref={canvasRef} />

      <TimerDisplay timeLeft={timeLeft} />

      <div className={`hud${shakeClass}`}>
        <div className={`stats${gameOver ? ' stats-final' : ''}`}>
          <span className="stat-number">{wpm}</span>
          <span className="stat-label">WPM</span>
          <span className="stat-number">{streak}</span>
          <span className="stat-label">words</span>
        </div>

        {!gameOver && (
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
        )}

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
          disabled={gameOver}
        />
      </div>
    </div>
  )
}
