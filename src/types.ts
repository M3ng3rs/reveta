export type Stage = 'intro' | 'welcome' | 'signup' | 'signin' | 'connect' | 'design' | 'ready' | 'main'
export type CardSkin = 'graphite' | 'ivory' | 'midnight' | 'signal'
export type CardLook = { skin: CardSkin; holder: string; wordmark: boolean }
export type DesignFrom = 'connect' | 'main'
export type Tab = 'card' | 'activity' | 'mind' | 'flow' | 'you'
export type Push = 'none' | 'card'
export type Finish = 'silver' | 'orange' | 'blue'
export type AddonId = 'mind' | 'shield' | 'grow'
export type ActionId = 'hulu' | 'xfinity' | 'bonus'
export type ActionStatus = 'open' | 'working' | 'offer' | 'done' | 'skipped'

export type Sheet =
  | { type: 'none' }
  | { type: 'tx'; id: string }
  | { type: 'plaid' }
  | { type: 'link' }
  | { type: 'wallet' }
  | { type: 'limits' }
  | { type: 'flow' }
  | { type: 'addon'; id: AddonId }
  | { type: 'pulse' }

export type Tx = {
  id: string
  merchant: string
  letter: string
  tint: string
  ink: string
  amount: number
  day: string
  time: string
  category: string
  routedTo: string
  reason: string
  advantage: number
  subscription: boolean
  optimized: boolean
  code: string
}

export type MindItem =
  | { kind: 'text'; id: string; from: 'mind' | 'you'; text: string }
  | { kind: 'action'; id: string; actionId: ActionId }

export type Audit = { id: string; title: string; detail: string; time: string }

export type Institution = { id: string; name: string; hint: string; color: string }
