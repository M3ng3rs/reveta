import { useEffect, useId, useState } from 'react'

export function PaceDial({
  value,
  kicker,
  figure,
  caption,
  big,
  compact,
  onOpen,
}: {
  value: number
  kicker: string
  figure: string
  caption: string
  big?: boolean
  compact?: boolean
  onOpen?: () => void
}) {
  const v = Math.min(1, Math.max(0, value))
  const gid = useId().replace(/:/g, '')
  const [live, setLive] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setLive(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const deg = live ? -100 + v * 200 : -100
  const arc = (
    <>
      <path
        d="M28 112 A 82 82 0 1 1 192 112"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M28 112 A 82 82 0 1 1 192 112"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="12"
        strokeLinecap="round"
        pathLength="100"
        strokeDasharray={`${Math.max(4, v * 100)} 100`}
      />
      <g
        style={{
          transform: `rotate(${deg}deg)`,
          transformOrigin: '110px 112px',
          transition: 'transform 1.05s cubic-bezier(.16,.84,.32,1)',
        }}
      >
        <line x1="110" y1="112" x2="110" y2="46" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="110" cy="112" r="5" fill="currentColor" />
      </g>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#21e07a" />
          <stop offset="58%" stopColor="#e2c15a" />
          <stop offset="100%" stopColor="#ff6a3d" />
        </linearGradient>
      </defs>
    </>
  )
  if (compact) {
    const inner = (
      <>
        <svg className="pace-svg" viewBox="0 0 220 132" aria-hidden>
          {arc}
        </svg>
        <span className="grow">
          <span className="t-name">{figure}</span>
          <span className="t-sub">{caption}</span>
        </span>
      </>
    )
    if (onOpen) {
      return (
        <button type="button" className="pace" onClick={onOpen}>
          {inner}
        </button>
      )
    }
    return <div className="pace">{inner}</div>
  }
  return (
    <div className="dial">
      <svg className="dial-svg" viewBox="0 0 220 132" aria-hidden>
        {arc}
      </svg>
      <p className="k">{kicker}</p>
      <p className={big ? 'figure big' : 'figure sm'}>{figure}</p>
      <p className="subline">{caption}</p>
    </div>
  )
}
