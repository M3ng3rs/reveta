import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { openingThread, stamp, starterIds, catalog } from './data'
import type {
  ActionId,
  ActionStatus,
  AddonId,
  Audit,
  CardLook,
  CardSkin,
  DesignFrom,
  MindItem,
  Push,
  Sheet,
  Stage,
  Tab,
} from './types'

type Addons = Record<AddonId, boolean>
type Actions = Record<ActionId, ActionStatus>

type Reveta = {
  stage: Stage
  tab: Tab
  push: Push
  sheet: Sheet
  flow: boolean
  addons: Addons
  frozen: boolean
  actions: Actions
  audit: Audit[]
  messages: MindItem[]
  atm: boolean
  wallet: boolean
  island: string | null
  bankName: string
  profile: { name: string; email: string }
  cardLook: CardLook
  designFrom: DesignFrom
  intro: number
  goWelcome: () => void
  goSignup: () => void
  goSignin: () => void
  backFromSignup: () => void
  backToSignup: () => void
  goConnect: () => void
  enterApp: () => void
  goReady: () => void
  goDesign: (from: DesignFrom) => void
  finishDesign: () => void
  backDesign: () => void
  signUp: (name: string, email: string) => void
  signIn: (email: string) => void
  updateLook: (patch: Partial<CardLook>) => void
  nextIntro: () => void
  skipIntro: () => void
  finishIntro: () => void
  replay: () => void
  setTab: (tab: Tab) => void
  openCard: () => void
  closeCard: () => void
  pass: string | null
  openPass: (id: string) => void
  closePass: () => void
  linkedIds: string[]
  linkCard: (id: string) => void
  unlinkCard: (id: string) => void
  openSheet: (sheet: Sheet) => void
  closeSheet: () => void
  connectBank: (name: string) => void
  holdIsland: (text: string | null) => void
  flash: (text: string) => void
  toggleFreeze: () => void
  toggleAtm: () => void
  addToWallet: () => void
  subscribeFlow: () => void
  cancelFlow: () => void
  subscribeAddon: (id: AddonId) => void
  cancelAddon: (id: AddonId) => void
  approve: (id: ActionId) => void
  acceptOffer: () => void
  skipAction: (id: ActionId) => void
  sendMind: (text: string) => void
}

const Ctx = createContext<Reveta | null>(null)

function freshActions(): Actions {
  return { hulu: 'open', xfinity: 'open', bonus: 'open' }
}

function freshAddons(): Addons {
  return { mind: false, shield: false, grow: false }
}

const defaultLook = (): CardLook => ({
  skin: 'graphite' as CardSkin,
  holder: 'Reda Essebar',
  wordmark: true,
})

function softLaunch() {
  if (typeof window === 'undefined') return false
  const q = new URLSearchParams(window.location.search)
  return q.get('soft') === '1' || q.get('demo') === '1'
}

export function RevetaProvider({ children }: { children: ReactNode }) {
  const soft = softLaunch()
  const [stage, setStage] = useState<Stage>(soft ? 'main' : 'intro')
  const [tab, setTabState] = useState<Tab>('card')
  const [push, setPush] = useState<Push>('none')
  const [pass, setPass] = useState<string | null>(null)
  const [linkedIds, setLinkedIds] = useState<string[]>([...starterIds])
  const [sheet, setSheet] = useState<Sheet>({ type: 'none' })
  const [flow, setFlow] = useState(false)
  const [addons, setAddons] = useState<Addons>(freshAddons)
  const [frozen, setFrozen] = useState(false)
  const [actions, setActions] = useState<Actions>(freshActions)
  const [audit, setAudit] = useState<Audit[]>([])
  const [messages, setMessages] = useState<MindItem[]>(openingThread)
  const [atm, setAtm] = useState(false)
  const [wallet, setWallet] = useState(false)
  const [island, setIslandState] = useState<string | null>(null)
  const [bankName, setBankName] = useState('Chase')
  const [profile, setProfile] = useState({
    name: soft ? 'Reda' : 'Reda Essebar',
    email: soft ? 'reda@reveta.app' : '',
  })
  const [cardLook, setCardLook] = useState<CardLook>(() =>
    soft ? { ...defaultLook(), holder: 'Reda' } : defaultLook(),
  )
  const [designFrom, setDesignFrom] = useState<DesignFrom>('connect')
  const [intro, setIntro] = useState(0)
  const [signupFrom, setSignupFrom] = useState<'intro' | 'app'>('intro')
  const actionsRef = useRef(actions)
  actionsRef.current = actions
  const timer = useRef<number | null>(null)
  const gen = useRef(0)

  function holdIsland(text: string | null) {
    if (timer.current) window.clearTimeout(timer.current)
    setIslandState(text)
  }

  function flash(text: string) {
    if (timer.current) window.clearTimeout(timer.current)
    setIslandState(text)
    timer.current = window.setTimeout(() => setIslandState(null), 2600)
  }

  function log(title: string, detail: string) {
    setAudit((prev) => [{ id: crypto.randomUUID(), title, detail, time: stamp() }, ...prev])
  }

  function resetStory() {
    gen.current += 1
    holdIsland(null)
    setTabState('card')
    setPush('none')
    setSheet({ type: 'none' })
    setFlow(false)
    setAddons(freshAddons())
    setFrozen(false)
    setActions(freshActions())
    setAudit([])
    setMessages(openingThread)
    setAtm(false)
    setWallet(false)
    setBankName('Chase')
    setProfile({ name: 'Reda Essebar', email: '' })
    setCardLook(defaultLook())
    setDesignFrom('connect')
    setPass(null)
    setLinkedIds([...starterIds])
  }

  function goWelcome() {
    setStage('welcome')
  }

  function goSignup() {
    setSignupFrom('app')
    setStage('signup')
  }

  function goSignin() {
    setStage('signin')
  }

  function backToSignup() {
    setStage('signup')
  }

  function backFromSignup() {
    if (signupFrom === 'intro') {
      setStage('intro')
      setIntro(99)
      return
    }
    setStage('main')
    setTabState('you')
    setPush('none')
  }

  function goConnect() {
    setStage('connect')
  }

  function enterApp() {
    setStage('main')
    setTabState('card')
    setPush('none')
    setPass(null)
  }

  function goReady() {
    setSheet({ type: 'none' })
    setStage('ready')
  }

  function goDesign(from: DesignFrom) {
    setDesignFrom(from)
    setSheet({ type: 'none' })
    setStage('design')
  }

  function finishDesign() {
    if (designFrom === 'main') {
      setStage('main')
      setPush('card')
      return
    }
    setStage('ready')
  }

  function backDesign() {
    if (designFrom === 'main') {
      setStage('main')
      setPush('card')
      return
    }
    setStage('connect')
  }

  function signUp(name: string, email: string) {
    setProfile({ name, email })
    setCardLook((prev) => ({ ...prev, holder: name }))
    setStage('connect')
  }

  function signIn(email: string) {
    const local = email.split('@')[0]?.replace(/[._-]/g, ' ') || 'Member'
    const name = local.replace(/\b\w/g, (letter) => letter.toUpperCase())
    setProfile({ name, email })
    setCardLook((prev) => ({ ...prev, holder: name }))
    setStage('main')
    setTabState('card')
    setPush('none')
    setPass(null)
  }

  function updateLook(patch: Partial<CardLook>) {
    setCardLook((prev) => ({ ...prev, ...patch }))
  }

  function replay() {
    resetStory()
    setSignupFrom('intro')
    setIntro(0)
    setStage('intro')
  }

  function nextIntro() {
    setIntro((step) => step + 1)
  }

  function skipIntro() {
    setSignupFrom('intro')
    setStage('signup')
  }

  function finishIntro() {
    setSignupFrom('intro')
    setStage('signup')
  }

  function setTab(next: Tab) {
    setTabState(next)
    setPush('none')
    setPass(null)
    setSheet({ type: 'none' })
  }

  function openCard() {
    setPass(null)
    setPush('card')
  }

  function closeCard() {
    setPush('none')
  }

  function openPass(id: string) {
    setPush('none')
    setSheet({ type: 'none' })
    setPass(id)
  }

  function closePass() {
    setPass(null)
  }

  function linkCard(id: string) {
    const card = catalog.find((item) => item.id === id)
    setLinkedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    flash(card ? `${card.name} is in Wallet` : 'In your Wallet')
    const reveal = stage === 'main'
    window.setTimeout(() => {
      setSheet({ type: 'none' })
      if (reveal) setPass(id)
    }, 80)
  }

  function unlinkCard(id: string) {
    if (id === 'reveta') return
    setLinkedIds((prev) => prev.filter((item) => item !== id))
    setPass(null)
    flash('Removed from Wallet')
  }

  function openSheet(next: Sheet) {
    setSheet(next)
  }

  function closeSheet() {
    setSheet({ type: 'none' })
  }

  function connectBank(name: string) {
    setBankName(name)
  }

  function toggleFreeze() {
    setFrozen((on) => {
      flash(on ? 'Card active' : 'Card frozen')
      return !on
    })
  }

  function toggleAtm() {
    setAtm((on) => !on)
  }

  function addToWallet() {
    setWallet(true)
    setSheet({ type: 'wallet' })
    flash('In Apple Wallet')
  }

  function subscribeFlow() {
    setFlow(true)
    flash('Flow is on')
    log('Subscribed to Flow', '$9.99/mo · budgeting')
    window.setTimeout(() => setSheet({ type: 'none' }), 60)
  }

  function cancelFlow() {
    setFlow(false)
    setSheet({ type: 'none' })
    flash('Flow will end')
  }

  function subscribeAddon(id: AddonId) {
    setAddons((prev) => ({ ...prev, [id]: true }))
    const label = id === 'mind' ? 'Mind' : id === 'shield' ? 'Shield' : 'Grow'
    flash(`${label} added`)
    log(`Added ${label}`, 'Monthly add-on')
    window.setTimeout(() => setSheet({ type: 'none' }), 60)
  }

  function cancelAddon(id: AddonId) {
    setAddons((prev) => ({ ...prev, [id]: false }))
    const label = id === 'mind' ? 'Mind' : id === 'shield' ? 'Shield' : 'Grow'
    flash(`${label} removed`)
  }

  function startAction(id: ActionId) {
    const current = actionsRef.current[id]
    if (current !== 'open') return
    actionsRef.current = {
      ...actionsRef.current,
      [id]: id === 'xfinity' ? 'working' : 'done',
    }
    if (id === 'hulu') {
      setActions((prev) => ({ ...prev, hulu: 'done' }))
      log('Canceled Hulu', 'Saved $216/year')
      flash('Saved $216')
      return
    }
    if (id === 'bonus') {
      setActions((prev) => ({ ...prev, bonus: 'done' }))
      log('Bonus routing armed', 'Groceries and dining → Sapphire through Oct 26')
      flash('Routing armed')
      return
    }
    setActions((prev) => ({ ...prev, xfinity: 'working' }))
    flash('Calling Xfinity')
    const g = gen.current
    window.setTimeout(() => {
      if (gen.current !== g) return
      setActions((prev) => (prev.xfinity === 'working' ? { ...prev, xfinity: 'offer' } : prev))
      setMessages((prev) => [
        ...prev,
        {
          kind: 'text',
          id: crypto.randomUUID(),
          from: 'mind',
          text: 'Xfinity came back. $89.99 a month becomes $72.99. That’s $204 a year. Nothing changes until you approve the offer.',
        },
      ])
      flash('Offer ready')
    }, 1400)
  }

  function approve(id: ActionId) {
    startAction(id)
  }

  function acceptOffer() {
    if (actionsRef.current.xfinity !== 'offer') return
    actionsRef.current = { ...actionsRef.current, xfinity: 'done' }
    setActions((prev) => ({ ...prev, xfinity: 'done' }))
    log('Approved Xfinity rate', '$72.99/mo · saves $204/year')
    flash('Saved $204/yr')
    setMessages((prev) => [
      ...prev,
      {
        kind: 'text',
        id: crypto.randomUUID(),
        from: 'mind',
        text: 'Approved. The new Xfinity rate is $72.99. It’s in your action log.',
      },
    ])
  }

  function skipAction(id: ActionId) {
    const current = actionsRef.current[id]
    if (current === 'done') return
    actionsRef.current = { ...actionsRef.current, [id]: 'skipped' }
    setActions((prev) => ({ ...prev, [id]: 'skipped' }))
  }

  function sendMind(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const lower = trimmed.toLowerCase()
    const you: MindItem = { kind: 'text', id: crypto.randomUUID(), from: 'you', text: trimmed }

    const wantsHulu = lower.includes('hulu') || (lower.includes('cancel') && !lower.includes('xfinity'))
    const wantsNet = lower.includes('internet') || lower.includes('xfinity') || lower.includes('negotiat')
    const wantsBonus = lower.includes('bonus') || lower.includes('sapphire') || lower.includes('arm')

    if (!wantsHulu && !wantsNet && !wantsBonus) {
      setMessages((prev) => [
        ...prev,
        you,
        {
          kind: 'text',
          id: crypto.randomUUID(),
          from: 'mind',
          text: 'I can cancel Hulu, negotiate Xfinity, or point grocery and dining at the Sapphire bonus. I won’t do any of it unless you say so.',
        },
      ])
      return
    }

    const huluWas = actionsRef.current.hulu
    if (wantsHulu) startAction('hulu')
    if (wantsNet) startAction('xfinity')
    if (wantsBonus) startAction('bonus')

    let reply = 'On it.'
    if (wantsHulu && wantsNet) {
      reply =
        huluWas === 'done'
          ? 'Hulu is already canceled. Negotiation started. I’ll return with an approval summary before anything is finalized.'
          : 'Done. Saved $216/year on Hulu. Negotiation started. I’ll return with an approval summary before anything is finalized.'
    } else if (wantsHulu) {
      reply = huluWas === 'done' ? 'Hulu is already canceled.' : 'Done. Saved $216/year on Hulu.'
    } else if (wantsNet) {
      reply = 'Negotiation started. I’ll return with an approval summary before anything is finalized.'
    } else if (wantsBonus) {
      reply = 'Routing is armed. Grocery and dining go to Sapphire through Oct 26.'
    }

    setMessages((prev) => [
      ...prev,
      you,
      { kind: 'text', id: crypto.randomUUID(), from: 'mind', text: reply },
    ])
  }

  const value: Reveta = {
    stage,
    tab,
    push,
    sheet,
    flow,
    addons,
    frozen,
    actions,
    audit,
    messages,
    atm,
    wallet,
    island,
    bankName,
    profile,
    cardLook,
    designFrom,
    intro,
    goWelcome,
    goSignup,
    goSignin,
    backFromSignup,
    backToSignup,
    goConnect,
    enterApp,
    goReady,
    goDesign,
    finishDesign,
    backDesign,
    signUp,
    signIn,
    updateLook,
    nextIntro,
    skipIntro,
    finishIntro,
    replay,
    setTab,
    openCard,
    closeCard,
    pass,
    openPass,
    closePass,
    linkedIds,
    linkCard,
    unlinkCard,
    openSheet,
    closeSheet,
    connectBank,
    holdIsland,
    flash,
    toggleFreeze,
    toggleAtm,
    addToWallet,
    subscribeFlow,
    cancelFlow,
    subscribeAddon,
    cancelAddon,
    approve,
    acceptOffer,
    skipAction,
    sendMind,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useReveta() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useReveta must be used inside RevetaProvider')
  return ctx
}
