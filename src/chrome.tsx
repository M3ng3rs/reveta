import { useEffect, useState, type ReactNode } from 'react'
import { asset } from './asset'
import { clockTime, spark } from './data'
import { useReveta } from './state'

export function useFit() {
  const [fit, setFit] = useState({ scale: 1, compact: false })
  useEffect(() => {
    const measure = () => {
      const compact = window.innerWidth < 540
      const scale = Math.min((window.innerHeight - 112) / 908, (window.innerWidth - 32) / 440, 1.12)
      setFit({ scale: Math.max(scale, 0.48), compact })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  return fit
}

export function StatusBar({ light }: { light: boolean }) {
  const [time, setTime] = useState(() => clockTime())
  useEffect(() => {
    const id = window.setInterval(() => setTime(clockTime()), 10000)
    return () => window.clearInterval(id)
  }, [])
  const color = light ? '#141414' : '#fff'
  return (
    <div className="status" style={{ color }}>
      <span className="status-time">{time}</span>
      <span className="status-icons" aria-hidden>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
          <rect x="0" y="8" width="3" height="4" rx="0.6" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.6" />
          <rect x="9" y="3" width="3" height="9" rx="0.6" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.6" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1.2 4.6C3.6 2.3 6.6 1 8 1s4.4 1.3 6.8 3.6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M3.4 7c1.4-1.3 3-2 4.6-2s3.2.7 4.6 2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="8" cy="10" r="1.15" fill={color} />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={color} fill="none" />
          <rect x="2" y="2" width="15" height="8" rx="1.4" fill={color} />
          <rect x="22.4" y="3.6" width="1.6" height="4.8" rx="0.6" fill={color} />
        </svg>
      </span>
    </div>
  )
}

export function Island() {
  const { island, frozen, actions, stage, setTab } = useReveta()
  const pending = (['hulu', 'xfinity', 'bonus'] as const).filter((id) => {
    const s = actions[id]
    return s === 'open' || s === 'offer' || s === 'working'
  }).length
  const live =
    island ??
    (stage === 'main' && frozen
      ? 'Card frozen'
      : stage === 'main' && pending > 0
        ? `${pending} for you`
        : null)

  if (!live) return <div className="island" aria-hidden />

  return (
    <button
      type="button"
      className="island live"
      onClick={() => {
        if (stage === 'main') setTab('mind')
      }}
    >
      <i className={frozen && !island ? 'pip freeze' : 'pip'} />
      <span>{live}</span>
    </button>
  )
}

export function HomeBar() {
  return <div className="home-ind" aria-hidden />
}

export function Sparkline() {
  const w = 362
  const h = 72
  const min = Math.min(...spark)
  const max = Math.max(...spark)
  const pts = spark.map((v, i) => {
    const x = (i / (spark.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * (h - 10) - 4
    return [x, y] as const
  })
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const last = pts[pts.length - 1]
  const fill = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gain)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--gain)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#sparkfill)" />
      <path d={line} fill="none" stroke="var(--gain)" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--gain)" />
    </svg>
  )
}

function Contactless() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8.2 8c2.6 1.8 2.6 6.2 0 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 5.5c3.8 2.8 3.8 10.2 0 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.6 3.2c5 3.8 5 13.8 0 17.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function MetalCard({
  frozen,
  onClick,
  number,
  tilt,
}: {
  frozen?: boolean
  onClick?: () => void
  number?: string
  tilt?: boolean
}) {
  const { cardLook } = useReveta()
  const light = cardLook.skin === 'ivory'
  const word = light ? asset('brand/wordmark.png') : asset('brand/wordmark-white.png')
  const inner = (
    <>
      <span className="sheen" aria-hidden>
        <i />
      </span>
      <span className="metal-top">
        <span className="chip" aria-hidden />
        <Contactless />
      </span>
      <span className="metal-num">{number ?? '••••  ••••  ••••  4419'}</span>
      <span className="metal-foot">
        <span>
          {cardLook.wordmark ? <img className="brand-word card" src={word} alt="Reveta." /> : null}
          <strong>{(cardLook.holder || 'Your name').toUpperCase()}</strong>
        </span>
        <span className="visa">VISA</span>
      </span>
      {frozen ? <span className="frost">Frozen</span> : null}
    </>
  )
  const cls = `metal skin-${cardLook.skin}${tilt ? ' tilt' : ''}${frozen ? ' frozen' : ''}`
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {inner}
      </button>
    )
  }
  return <div className={cls}>{inner}</div>
}

export function SheetFrame({
  light,
  children,
  onClose,
}: {
  light?: boolean
  children: ReactNode
  onClose: () => void
}) {
  return (
    <div className="sheet-root">
      <button type="button" className="backdrop" aria-label="Dismiss" onClick={onClose} />
      <div className={light ? 'sheet light' : 'sheet'} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  )
}
