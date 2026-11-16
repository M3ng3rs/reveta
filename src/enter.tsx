import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { asset } from './asset'
import { MetalCard } from './chrome'
import { useReveta } from './state'
import type { CardSkin } from './types'

const skins: { id: CardSkin; name: string; swatch: string }[] = [
  { id: 'graphite', name: 'Graphite', swatch: 'linear-gradient(145deg,#3a403c,#111)' },
  { id: 'ivory', name: 'Ivory', swatch: 'linear-gradient(145deg,#fff,#d9d2c4)' },
  { id: 'midnight', name: 'Midnight', swatch: 'linear-gradient(145deg,#3d5c8a,#12182a)' },
  { id: 'signal', name: 'Signal', swatch: 'linear-gradient(145deg,#173024,#070807)' },
]

function Steps({ now }: { now: 1 | 2 | 3 }) {
  return (
    <div className="steps" aria-hidden>
      <i className={now === 1 ? 'now' : 'on'} />
      <i className={now === 2 ? 'now' : now > 2 ? 'on' : ''} />
      <i className={now === 3 ? 'now' : ''} />
    </div>
  )
}

export function Signup() {
  const { goSignin, signUp, backFromSignup } = useReveta()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit() {
    if (name.trim().length < 2) {
      setError('Add the name that should sit on the card.')
      return
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Use a real email shape. Nothing leaves this phone.')
      return
    }
    if (password.length < 6) {
      setError('Password needs at least 6 characters.')
      return
    }
    signUp(name.trim(), email.trim())
  }

  return (
    <section className="auth screen-in">
      <button type="button" className="back" onClick={backFromSignup}>
        <ChevronLeft size={22} strokeWidth={1.75} />
        Back
      </button>
      <Steps now={1} />
      <h1 className="display small">
        Create
        <br />
        your Reveta.
      </h1>
      <p className="lede">The card is free. This account is how you get it.</p>
      <label className="field">
        <span>Name on the card</span>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Reda Essebar" />
      </label>
      <label className="field">
        <span>Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" placeholder="you@email.com" />
      </label>
      <label className="field">
        <span>Password</span>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password" placeholder="At least 6 characters" />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="mark-plate">
        <img src={asset('brand/mark-white.png')} alt="" />
        <div>
          <strong>Free to hold.</strong>
          <span>We earn when you spend. Stripe does not charge in this preview.</span>
        </div>
      </div>
      <button type="button" className="btn" onClick={submit}>
        Continue
      </button>
      <button type="button" className="linkish" onClick={goSignin}>
        I already have one
      </button>
    </section>
  )
}

export function Signin() {
  const { backToSignup, signIn } = useReveta()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit() {
    if (!email.includes('@') || password.length < 6) {
      setError('Email and a password of at least 6 characters.')
      return
    }
    signIn(email.trim())
  }

  return (
    <section className="auth screen-in">
      <button type="button" className="back" onClick={backToSignup}>
        <ChevronLeft size={22} strokeWidth={1.75} />
        Back
      </button>
      <h1 className="display small">
        Welcome
        <br />
        back.
      </h1>
      <p className="lede">Sign in and the card, the pace, and Mind are where you left them.</p>
      <label className="field">
        <span>Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" placeholder="you@email.com" />
      </label>
      <label className="field">
        <span>Password</span>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="Your password" />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="mark-plate">
        <img src={asset('brand/mark-white.png')} alt="" />
        <div>
          <strong>Welcome back.</strong>
          <span>The card, the pace, and Mind are where you left them.</span>
        </div>
      </div>
      <button type="button" className="btn" onClick={submit}>
        Sign in
      </button>
      <button type="button" className="linkish" onClick={backToSignup}>
        Create an account
      </button>
    </section>
  )
}

export function Studio() {
  const { cardLook, updateLook, finishDesign, backDesign, profile, designFrom } = useReveta()
  return (
    <section className="studio screen-in">
      <button type="button" className="back" onClick={backDesign}>
        <ChevronLeft size={22} strokeWidth={1.75} />
        Back
      </button>
      {designFrom === 'connect' ? <Steps now={3} /> : null}
      <h1 className="display small">
        How it sits
        <br />
        in Wallet.
      </h1>
      <p className="lede">The pass Apple Wallet will show.</p>
      <div className="wallet-preview">
        <MetalCard tilt />
      </div>
      <div className="skins">
        {skins.map((skin) => (
          <button
            key={skin.id}
            type="button"
            className={cardLook.skin === skin.id ? 'skin on' : 'skin'}
            onClick={() => updateLook({ skin: skin.id })}
          >
            <b style={{ background: skin.swatch }} />
            {skin.name}
          </button>
        ))}
      </div>
      <label className="field">
        <span>Name on the card</span>
        <input
          value={cardLook.holder}
          onChange={(e) => updateLook({ holder: e.target.value })}
          placeholder={profile.name}
        />
      </label>
      <div className="group">
        <button type="button" className="srow" onClick={() => updateLook({ wordmark: !cardLook.wordmark })}>
          <span className="grow">
            <span className="t-name">Wordmark</span>
            <small>{cardLook.wordmark ? 'Reveta. on the face' : 'Name only'}</small>
          </span>
          <span className={cardLook.wordmark ? 'switch on' : 'switch'} aria-hidden>
            <i />
          </span>
        </button>
      </div>
      <div className="spacer" />
      <button type="button" className="btn" onClick={finishDesign}>
        Use this card
      </button>
    </section>
  )
}
