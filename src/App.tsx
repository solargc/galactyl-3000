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
  'liftoff', 'reentry', 'jettison', 'deorbit', 'approach',
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
  'algae', 'bamboo', 'canopy', 'compost', 'mycelium', 'permaculture',
  'rewild', 'spire', 'symbiosis', 'terrarium', 'biolume', 'biome',
  'commune', 'collective', 'rhizome', 'spore', 'habitat', 'flourish',
  'lantern', 'moss', 'fern', 'bloom', 'fungal', 'greenhouse', 'harvest',
  'Kepler22b', 'Kepler452b', 'Kepler186f', 'Kepler62f', 'Kepler69c',
  'HD209458b', 'HD189733b', 'GJ1214b', 'GJ667Cc', 'GJ436b',
  'TRAPPIST1b', 'TRAPPIST1e', 'TRAPPIST1f', 'CoRoT7b', 'CoRoT2b',
  '55Cancri', '51Pegasi', 'ProximaB', 'LHS1140b', 'K2-18b',
  'Sirius', 'Vega', 'Rigel', 'Betelgeuse', 'Aldebaran', 'Arcturus',
  'Capella', 'Deneb', 'Altair', 'Fomalhaut', 'Pollux', 'Regulus',
  'Spica', 'Antares', 'Procyon', 'Achernar', 'Canopus', 'Mimosa',
  'Acrux', 'Hadar', 'Shaula', 'Nunki', 'Alnitak', 'Alnilam',
  'Mintaka', 'Bellatrix', 'Saiph', 'Zuben', 'Algol', 'Mira',
  'Castor', 'Adhara', 'Elnath', 'Alioth', 'Dubhe', 'Merak',
  'Alkaid', 'Mizar', 'Alcor', 'Thuban', 'Polaris', 'Schedar',
  'meteor', 'meteorite', 'astronaut', 'cosmonaut', 'universe', 'supernova',
  'telescope', 'observatory', 'mission', 'countdown', 'abort', 'debris',
  'impact', 'vacuum', 'oxygen', 'fuel', 'payload', 'cargo', 'spacewalk',
  'tether', 'splashdown', 'microgravity', 'weightless', 'cosmic', 'interstellar',
  'neutron', 'dwarf', 'atmosphere',
  'blackout', 'quarantine', 'lockdown', 'clone',
  'Tetsuo', 'Kaneda', 'Capsule', 'Esper', 'mutant', 'psychic',
  'telekinesis', 'NeoTokyo', 'Colonel', 'Miyako', 'Otomo', 'psionic',
  'awakening', 'containment', 'corruption', 'rebirth', 'biker', 'Kei',
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
const KEY_BOOST = 3
const WORD_BONUS = 20
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

function TimerDisplay({ timeLeft, showTitle, isPaused }: { timeLeft: number, showTitle: boolean, isPaused: boolean }) {
  const t = 1 - timeLeft / 100
  const g = Math.round(220 - t * 40)
  const b = Math.round(180 + t * 40)
  const size = 0.5 + t * 12.5
  const opacity = 0.3 + t * 0.7
  const color = `rgba(255, ${g}, ${b}, ${opacity})`
  const textShadow = [
    `0 0 ${6  + t * 30}px ${color}`,
    `0 0 ${18 + t * 70}px rgba(255, ${g}, ${b}, ${opacity * 0.75})`,
    `0 0 ${40 + t * 120}px rgba(255, 140, 210, ${opacity * 0.5})`,
    `0 0 ${80 + t * 220}px rgba(240, 80, 200, ${opacity * 0.3})`,
    `0 0 ${140 + t * 360}px rgba(200, 40, 180, ${opacity * 0.15})`,
  ].join(', ')
  if (showTitle) {
    const gc = `rgba(255, 180, 242, 1)`
    const gs = [
      `0 0 20px rgba(255,140,242,0.9)`, `0 0 60px rgba(242,80,218,0.65)`,
      `0 0 120px rgba(212,50,198,0.42)`, `0 0 240px rgba(180,10,182,0.22)`,
      `0 0 420px rgba(160,0,180,0.10)`,
    ].join(', ')
    return (
      <div className="timer timer-end" style={{ color: gc, textShadow: gs }}>
        <div>GALACTYL</div>
        <div>3000</div>
        <div className="start-hint">{isPaused ? 'click to focus' : 'press space or enter to start'}</div>
      </div>
    )
  }
  return (
    <div className="timer" style={{ fontSize: `${size}rem`, color, textShadow }}>
      {timeLeft}
    </div>
  )
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<Star[]>([])
  const speedRef = useRef(IDLE_SPEED)
  const flashRef = useRef(0)
  const roundRef = useRef(0)
  const timeLeftRef = useRef(100)
  const gameOverRef = useRef(false)
  const gameOverTimeRef = useRef(0)
  const rafRef = useRef(0)
  const isPausedRef = useRef(!document.hasFocus())
  const flybyRemainingRef = useRef({ flyby: 4000, saturn: 20000, earth: 40000, lava: 60000, frozen: 78000 })
  const flybyScheduledAtRef = useRef(0)

  const [words, setWords] = useState(() => randomChunk(10))
  const [wordIndex, setWordIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [wpm, setWpm] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(100)
  const [timerStarted, setTimerStarted] = useState(false)
  const [fadeOpacity, setFadeOpacity] = useState(0)
  const [fadeDuration, setFadeDuration] = useState('0s')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [auroraAnim, setAuroraAnim] = useState<{cls: string, key: number}>({cls: '', key: 0})
  const [isPaused, setIsPaused] = useState(() => !document.hasFocus())
  const [gameKey, setGameKey] = useState(0)

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen()
    else document.exitFullscreen()
  }, [])
  const [flybyActive, setFlybyActive] = useState(false)
  const [saturnActive, setSaturnActive] = useState(false)
  const [earthActive, setEarthActive] = useState(false)
  const [lavaActive, setLavaActive] = useState(false)
  const [frozenActive, setFrozenActive] = useState(false)

  const gameOver = timerStarted && timeLeft === 0
  const isTitleScreen = !timerStarted || gameOver
  const shakeClass = !timerStarted || gameOver ? '' : timeLeft < 5 ? ' shake-mid' : timeLeft < 20 ? ' shake-low' : ''
  gameOverRef.current = gameOver

  useEffect(() => {
    if (!timerStarted || timeLeft !== 1) return
    setFadeDuration('0.8s')
    setFadeOpacity(1)
  }, [timeLeft, timerStarted])

  useEffect(() => {
    if (!gameOver) return
    gameOverTimeRef.current = Date.now()
    const t1 = setTimeout(() => {
      starsRef.current = Array.from({ length: NUM_STARS }, () => createStar(true))
      speedRef.current = IDLE_SPEED
    }, 400)
    const t2 = setTimeout(() => {
      setFadeDuration('1.4s')
      setFadeOpacity(0)
    }, 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [gameOver])

  useEffect(() => {
    if (!isTitleScreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      if (gameOver && Date.now() - gameOverTimeRef.current < 1000) return
      e.preventDefault()
      setWords(randomChunk(10))
      setWordIndex(0)
      setTyped('')
      setWpm(0)
      setStreak(0)
      setTimeLeft(100)
      setTimerStarted(true)
      roundRef.current = 0
      speedRef.current = IDLE_SPEED
      completionTimesRef.current = []
      wordStartRef.current = Date.now()
      setFadeOpacity(0)
      setFadeDuration('0s')
      setFlybyActive(false)
      setSaturnActive(false)
      setEarthActive(false)
      setLavaActive(false)
      setFrozenActive(false)
      flybyRemainingRef.current = { flyby: 4000, saturn: 20000, earth: 40000, lava: 60000, frozen: 78000 }
      flybyScheduledAtRef.current = 0
      setGameKey(k => k + 1)
      setTimeout(() => document.getElementById('input')?.focus(), 0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isTitleScreen, gameOver])

  const triggerMistake = useCallback(() => {
    flashRef.current = 1
    const el = gameRef.current
    if (el) {
      el.classList.remove('shake-mistake')
      void el.offsetWidth
      el.classList.add('shake-mistake')
    }
  }, [])

  const completionTimesRef = useRef<number[]>([])
  const wordStartRef = useRef(Date.now())
  const lastKeypressRef = useRef(0)

  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  useEffect(() => {
    if (!timerStarted) return
    if (isPaused) {
      if (flybyScheduledAtRef.current > 0) {
        const elapsed = Date.now() - flybyScheduledAtRef.current
        const r = flybyRemainingRef.current
        if (r.flyby > 0)  r.flyby  = Math.max(0, r.flyby  - elapsed)
        if (r.saturn > 0) r.saturn = Math.max(0, r.saturn - elapsed)
        if (r.earth > 0)  r.earth  = Math.max(0, r.earth  - elapsed)
        if (r.lava > 0)   r.lava   = Math.max(0, r.lava   - elapsed)
        if (r.frozen > 0) r.frozen = Math.max(0, r.frozen - elapsed)
        flybyScheduledAtRef.current = 0
      }
      return
    }
    flybyScheduledAtRef.current = Date.now()
    const r = flybyRemainingRef.current
    const timers: ReturnType<typeof setTimeout>[] = []
    if (r.flyby > 0)  timers.push(setTimeout(() => { r.flyby  = 0; setFlybyActive(true)   }, r.flyby))
    if (r.saturn > 0) timers.push(setTimeout(() => { r.saturn = 0; setSaturnActive(true)  }, r.saturn))
    if (r.earth > 0)  timers.push(setTimeout(() => { r.earth  = 0; setEarthActive(true)   }, r.earth))
    if (r.lava > 0)   timers.push(setTimeout(() => { r.lava   = 0; setLavaActive(true)    }, r.lava))
    if (r.frozen > 0) timers.push(setTimeout(() => { r.frozen = 0; setFrozenActive(true)  }, r.frozen))
    return () => timers.forEach(clearTimeout)
  }, [timerStarted, isPaused, gameKey])

  useEffect(() => { isPausedRef.current = isPaused }, [isPaused])

  useEffect(() => {
    const onBlur = () => setIsPaused(true)
    const onFocus = () => setIsPaused(false)
    const onVisibility = () => setIsPaused(document.hidden)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!timerStarted || timeLeft <= 0 || isPaused) return
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timerStarted, timeLeft, isPaused])

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
      } else if (!isPausedRef.current) {
        const progress = 1 - timeLeftRef.current / 100
        const minSpeed = IDLE_SPEED + progress * progress * 25
        const idle = Date.now() - lastKeypressRef.current > 300
        const decay = idle ? 0.96 : 0.988
        speedRef.current = Math.max(minSpeed, speedRef.current * decay)
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      ctx.fillRect(0, 0, W, H)

      if (flashRef.current > 0 && !gameOverRef.current) {
        ctx.fillStyle = `rgba(255, 160, 100, ${flashRef.current * 0.05})`
        ctx.fillRect(0, 0, W, H)
        flashRef.current = Math.max(0, flashRef.current - 0.06)
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

          const progress = 1 - timeLeftRef.current / 100
          const boostMult = 1 + progress * 3
          wordStartRef.current = Date.now()
          setAuroraAnim(prev => ({cls: 'aurora-pulse', key: prev.key + 1}))
          speedRef.current = Math.min(speedRef.current + WORD_BONUS * boostMult, MAX_SPEED)
          setStreak((s) => s + 1)

          if (wordIndex + 1 >= words.length) {
            setWords(randomChunk(10))
            setWordIndex(0)
            roundRef.current += 1
            speedRef.current = Math.min(speedRef.current + 30 * boostMult, MAX_SPEED)
            setAuroraAnim(prev => ({cls: 'aurora-surge', key: prev.key + 1}))
          } else {
            setWordIndex((i) => i + 1)
          }
          setTyped('')
        } else {
          triggerMistake()
          setTyped(attempt)
        }
        return
      }

      if (val.length > typed.length) {
        lastKeypressRef.current = Date.now()
        const progress = 1 - timeLeftRef.current / 100
        speedRef.current = Math.min(speedRef.current + KEY_BOOST * (1 + progress * 3), MAX_SPEED)
        const newCharPos = typed.length
        if (newCharPos < words[wordIndex].length && val[newCharPos] !== words[wordIndex][newCharPos]) {
          triggerMistake()
        }
      }
      setTyped(val)
    },
    [typed, words, wordIndex, gameOver, triggerMistake],
  )

  return (
    <div ref={gameRef} className="game" onClick={() => document.getElementById('input')?.focus()}>
      <div
        key={auroraAnim.key}
        className={`aurora${isTitleScreen ? ' aurora-idle' : ''}${auroraAnim.cls ? ' ' + auroraAnim.cls : ''}`}
        onAnimationEnd={() => setAuroraAnim(prev => ({...prev, cls: ''}))}
      />
      <canvas ref={canvasRef} />
      <div className="fade-overlay" style={{ opacity: fadeOpacity, transition: `opacity ${fadeDuration} ease` }} />
      {isPaused && timerStarted && !gameOver && (
        <div className="pause-overlay">
          <div className="pause-content">
            <div className="pause-message">PAUSED</div>
            <div className="pause-hint">focus window to resume</div>
          </div>
        </div>
      )}
      <button className="fullscreen-btn" onClick={(e) => { e.stopPropagation(); toggleFullscreen() }} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
        {isFullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        )}
      </button>

      {saturnActive && (
        <div className="saturn-flyby" onAnimationEnd={() => setSaturnActive(false)}>
          <div className="saturn-ring saturn-ring-back" />
          <div className="saturn-body" />
          <div className="saturn-ring saturn-ring-front" />
        </div>
      )}

      {earthActive && (
        <div className="earth-flyby" onAnimationEnd={() => setEarthActive(false)}>
          <div className="earth-moon" />
          <div className="earth-body" />
        </div>
      )}

      {lavaActive && (
        <div className="lava-flyby" onAnimationEnd={() => setLavaActive(false)}>
          <div className="lava-body" />
        </div>
      )}

      {frozenActive && (
        <div className="frozen-flyby" onAnimationEnd={() => setFrozenActive(false)}>
          <div className="frozen-body" />
        </div>
      )}

      {flybyActive && (
        <div className="flyby-title" onAnimationEnd={() => setFlybyActive(false)}>
          GALACTYL 3000
        </div>
      )}

      {timerStarted && !gameOver && timeLeft <= 10 && timeLeft > 0 && (
        <div className="damage-overlay" style={{ opacity: 0.4 + (5 - timeLeft) * 0.1 }} />
      )}

      {(!isPaused || isTitleScreen) && <TimerDisplay timeLeft={timeLeft} showTitle={isTitleScreen} isPaused={isPaused} />}

      <div className={`hud${shakeClass}`}>
        <div className={`stats${gameOver ? ' stats-final' : ''}`}>
          <span className="stat-number">{wpm}</span>
          <span className="stat-label">WPM</span>
          <span className="stat-number">{streak}</span>
          <span className="stat-label">words</span>
        </div>

        {timerStarted && !gameOver && (
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
          disabled={isTitleScreen}
        />
      </div>
    </div>
  )
}
