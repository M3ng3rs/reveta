import type { ActionId, Institution, MindItem, Tx } from './types'

export const advantageTotal = 186.4
export const spentTotal = 2847.19
export const leftToSpend = 1144
export const spark = [12, 18, 22, 40, 48, 51, 70, 88, 96, 110, 128, 140, 164, 186.4]

export const transactions: Tx[] = [
  {
    id: 'sg',
    merchant: 'Sweetgreen',
    letter: 'S',
    tint: '#16382a',
    ink: '#b7f0c8',
    amount: 18.4,
    day: 'Today',
    time: '12:14 PM',
    category: 'Dining',
    routedTo: 'Amex Gold •••• 1004',
    reason:
      'Dining is 4× Membership Rewards on Amex Gold right now. Debit would have earned nothing, so the charge went to Gold.',
    advantage: 1.1,
    subscription: false,
    optimized: true,
    code: 'MCC 5812 · Restaurants',
  },
  {
    id: 'blue',
    merchant: 'Blue Bottle',
    letter: 'B',
    tint: '#1d2a3a',
    ink: '#d5e4f5',
    amount: 6.75,
    day: 'Today',
    time: '9:02 AM',
    category: 'Dining',
    routedTo: 'Amex Gold •••• 1004',
    reason: 'Coffee codes as dining. Gold’s 4× beat every other card in the wallet.',
    advantage: 0.41,
    subscription: false,
    optimized: true,
    code: 'MCC 5812 · Restaurants',
  },
  {
    id: 'uber',
    merchant: 'Uber',
    letter: 'U',
    tint: '#1a1a1a',
    ink: '#ffffff',
    amount: 24.6,
    day: 'Today',
    time: '8:41 AM',
    category: 'Transport',
    routedTo: 'Sapphire Reserve •••• 2290',
    reason:
      'Rides are 3× on Sapphire Reserve. That beat Amex Gold on this merchant, so Reveta sent it to Chase.',
    advantage: 1.11,
    subscription: false,
    optimized: true,
    code: 'MCC 4121 · Rideshare',
  },
  {
    id: 'wf',
    merchant: 'Whole Foods',
    letter: 'W',
    tint: '#12331f',
    ink: '#d5f5c8',
    amount: 86.22,
    day: 'Yesterday',
    time: '6:02 PM',
    category: 'Groceries',
    routedTo: 'Amex Gold •••• 1004',
    reason:
      'Groceries are 4× on Amex Gold, valued here at 1.5¢ a point. Sapphire would have earned 1×.',
    advantage: 5.17,
    subscription: false,
    optimized: true,
    code: 'MCC 5411 · Groceries',
  },
  {
    id: 'cvs',
    merchant: 'CVS',
    letter: 'C',
    tint: '#3a1218',
    ink: '#ffc9c9',
    amount: 14.28,
    day: 'Yesterday',
    time: '2:11 PM',
    category: 'Shopping',
    routedTo: 'Sapphire Reserve •••• 2290',
    reason: 'Pharmacy is 1× on the cards you hold. Sapphire kept the charge so it still counts toward the bonus.',
    advantage: 0.21,
    subscription: false,
    optimized: false,
    code: 'MCC 5912 · Pharmacy',
  },
  {
    id: 'shell',
    merchant: 'Shell',
    letter: 'S',
    tint: '#3a2a10',
    ink: '#ffd27a',
    amount: 52.18,
    day: 'Sunday',
    time: '9:18 AM',
    category: 'Transport',
    routedTo: 'Sapphire Reserve •••• 2290',
    reason:
      'Neither linked card has a gas bonus. Sapphire at 1× was as good as Gold. A 5% gas card would have kept about $1.80 more — that’s part of the $41 still on the table.',
    advantage: 0.78,
    subscription: false,
    optimized: false,
    code: 'MCC 5541 · Fuel',
  },
  {
    id: 'hulu',
    merchant: 'Hulu',
    letter: 'H',
    tint: '#102033',
    ink: '#9fd0ff',
    amount: 17.99,
    day: 'Oct 16',
    time: 'Subscription',
    category: 'Subscriptions',
    routedTo: 'Sapphire Reserve •••• 2290',
    reason:
      'Streaming doesn’t hit a bonus category on either card. Same 1× everywhere. The real save is canceling it — Hulu hasn’t been opened in 97 days.',
    advantage: 0.27,
    subscription: true,
    optimized: false,
    code: 'MCC 4899 · Streaming',
  },
  {
    id: 'icloud',
    merchant: 'Apple',
    letter: 'A',
    tint: '#242424',
    ink: '#f2f2f2',
    amount: 2.99,
    day: 'Oct 16',
    time: 'Subscription',
    category: 'Subscriptions',
    routedTo: 'Sapphire Reserve •••• 2290',
    reason: 'iCloud is a recurring 1× charge. Nothing to reroute. It’s in use, so Mind won’t suggest canceling it.',
    advantage: 0.04,
    subscription: true,
    optimized: false,
    code: 'MCC 5818 · Digital services',
  },
  {
    id: 'coned',
    merchant: 'Con Edison',
    letter: 'C',
    tint: '#2a2418',
    ink: '#f0d7a2',
    amount: 142.1,
    day: 'Oct 14',
    time: 'Bill',
    category: 'Bills',
    routedTo: 'Sapphire Reserve •••• 2290',
    reason:
      'Utilities don’t earn a category bonus on the cards you linked. Reveta paid it on time from the card so the bill didn’t slip.',
    advantage: 2.13,
    subscription: false,
    optimized: false,
    code: 'MCC 4900 · Utilities',
  },
  {
    id: 'apple-store',
    merchant: 'Apple Store',
    letter: 'A',
    tint: '#242424',
    ink: '#f2f2f2',
    amount: 29,
    day: 'Oct 18',
    time: '3:44 PM',
    category: 'Shopping',
    routedTo: 'Apple Card •••• 5518',
    reason: 'Apple Card pays 3% at Apple. Nothing else in the wallet comes close, so the charge stayed there.',
    advantage: 0.87,
    subscription: false,
    optimized: true,
    code: 'MCC 5732 · Electronics',
  },
  {
    id: 'amazon',
    merchant: 'Amazon',
    letter: 'A',
    tint: '#1a2430',
    ink: '#d6e6f5',
    amount: 42.18,
    day: 'Oct 13',
    time: '11:20 AM',
    category: 'Shopping',
    routedTo: 'Venture X •••• 8842',
    reason: 'No category bonus. Venture X miles beat a flat 1×, so Amazon went there.',
    advantage: 0.84,
    subscription: false,
    optimized: true,
    code: 'MCC 5942 · Online retail',
  },
  {
    id: 'starbucks',
    merchant: 'Starbucks',
    letter: 'S',
    tint: '#14301f',
    ink: '#d8f3df',
    amount: 5.85,
    day: 'Oct 15',
    time: '8:05 AM',
    category: 'Dining',
    routedTo: 'Chase Debit •••• 4821',
    reason: 'This one missed the route and landed on debit. It earned nothing. Gold would have kept about 35¢.',
    advantage: 0,
    subscription: false,
    optimized: false,
    code: 'MCC 5814 · Coffee',
  },
]

export const institutions: Institution[] = [
  { id: 'chase', name: 'Chase', hint: 'Checking and cards', color: '#0d5c8c' },
  { id: 'bofa', name: 'Bank of America', hint: 'Bank', color: '#c41230' },
  { id: 'wells', name: 'Wells Fargo', hint: 'Bank', color: '#d71e28' },
  { id: 'amex', name: 'American Express', hint: 'Cards', color: '#016fd0' },
  { id: 'citi', name: 'Citi', hint: 'Cards and bank', color: '#003b70' },
  { id: 'capone', name: 'Capital One', hint: 'Cards and bank', color: '#d03027' },
  { id: 'ally', name: 'Ally', hint: 'Savings', color: '#6b2d8b' },
  { id: 'apple', name: 'Apple Card', hint: 'Card', color: '#333333' },
  { id: 'sofi', name: 'SoFi', hint: 'Bank', color: '#00857d' },
  { id: 'schwab', name: 'Charles Schwab', hint: 'Brokerage', color: '#00a0df' },
]

export const passes = [
  { id: 'reveta', name: 'Reveta', network: 'Visa', last4: '4419', face: 'reveta' },
  { id: 'sapphire', name: 'Sapphire Reserve', network: 'Visa', last4: '2290', face: 'sapphire' },
  { id: 'gold', name: 'Amex Gold', network: 'Amex', last4: '1004', face: 'gold' },
  { id: 'apple', name: 'Apple Card', network: 'Mastercard', last4: '5518', face: 'titanium' },
  { id: 'venture', name: 'Venture X', network: 'Visa', last4: '8842', face: 'venture' },
  { id: 'debit', name: 'Chase Debit', network: 'Visa', last4: '4821', face: 'debit' },
] as const

export type PassId = (typeof passes)[number]['id']

export function txOrder(day: string) {
  const order = ['Today', 'Yesterday', 'Sunday', 'Oct 18', 'Oct 16', 'Oct 15', 'Oct 14', 'Oct 13']
  const index = order.indexOf(day)
  return index === -1 ? 99 : index
}

export function chargedTo(routedTo: string): string {
  const hit = catalog.find((card) => routedTo.includes(card.last4))
  return hit?.id ?? 'reveta'
}

export const starterIds = ['sapphire', 'gold', 'apple', 'venture', 'debit']

export type WalletCard = {
  id: string
  issuer: string
  name: string
  network: string
  last4: string
  face: string
  edge: string
}

export const catalog: WalletCard[] = [
  { id: 'sapphire', issuer: 'Chase', name: 'Sapphire Reserve', network: 'Visa', last4: '2290', face: 'sapphire', edge: '3× travel and dining' },
  { id: 'gold', issuer: 'American Express', name: 'Amex Gold', network: 'Amex', last4: '1004', face: 'gold', edge: '4× dining and groceries' },
  { id: 'apple', issuer: 'Apple', name: 'Apple Card', network: 'Mastercard', last4: '5518', face: 'titanium', edge: '3% at Apple' },
  { id: 'venture', issuer: 'Capital One', name: 'Venture X', network: 'Visa', last4: '8842', face: 'venture', edge: '2× on everything' },
  { id: 'debit', issuer: 'Chase', name: 'Chase Debit', network: 'Visa', last4: '4821', face: 'debit', edge: 'Earns nothing' },
  { id: 'flex', issuer: 'Chase', name: 'Freedom Flex', network: 'Mastercard', last4: '4412', face: 'freedom', edge: '5% this quarter' },
  { id: 'platinum', issuer: 'American Express', name: 'Amex Platinum', network: 'Amex', last4: '3001', face: 'platinum', edge: '5× flights' },
  { id: 'citi', issuer: 'Citi', name: 'Double Cash', network: 'Mastercard', last4: '7720', face: 'citi', edge: '2% on everything' },
  { id: 'discover', issuer: 'Discover', name: 'Discover it', network: 'Discover', last4: '9091', face: 'discover', edge: '5% rotating' },
  { id: 'savor', issuer: 'Capital One', name: 'Savor', network: 'Mastercard', last4: '2264', face: 'savor', edge: '3% dining' },
  { id: 'autograph', issuer: 'Wells Fargo', name: 'Autograph', network: 'Visa', last4: '6188', face: 'wells', edge: '3× travel' },
  { id: 'custom', issuer: 'Bank of America', name: 'Customized Cash', network: 'Visa', last4: '1544', face: 'bofa', edge: '3% in your category' },
  { id: 'sofi', issuer: 'SoFi', name: 'SoFi Unlimited', network: 'Visa', last4: '8802', face: 'sofi', edge: '2% unlimited' },
  { id: 'united', issuer: 'Chase', name: 'United Explorer', network: 'Visa', last4: '4470', face: 'united', edge: '2× United' },
  { id: 'bonvoy', issuer: 'American Express', name: 'Bonvoy', network: 'Amex', last4: '6619', face: 'bonvoy', edge: '6× Marriott' },
]

export const freshCharges: Record<string, Tx[]> = {
  flex: [
    {
      id: 'flex-target',
      merchant: 'Target',
      letter: 'T',
      tint: '#3a1218',
      ink: '#ffd0d0',
      amount: 64.2,
      day: 'Yesterday',
      time: '4:18 PM',
      category: 'Shopping',
      routedTo: 'Freedom Flex •••• 4412',
      reason: 'This quarter’s 5% category is wholesale and target-style retail. Flex beat every other card in the wallet.',
      advantage: 3.21,
      subscription: false,
      optimized: true,
      code: 'MCC 5310 · Discount stores',
    },
  ],
  platinum: [
    {
      id: 'plat-delta',
      merchant: 'Delta',
      letter: 'D',
      tint: '#102033',
      ink: '#c5d7ee',
      amount: 248,
      day: 'Oct 18',
      time: '6:40 AM',
      category: 'Travel',
      routedTo: 'Amex Platinum •••• 3001',
      reason: 'Flights are 5× on Platinum. Sapphire’s 3× travel lost this one.',
      advantage: 12.4,
      subscription: false,
      optimized: true,
      code: 'MCC 3058 · Airline',
    },
  ],
  citi: [
    {
      id: 'citi-rent',
      merchant: 'Allstate',
      letter: 'A',
      tint: '#10233a',
      ink: '#d5e4f5',
      amount: 86,
      day: 'Oct 16',
      time: 'Bill',
      category: 'Bills',
      routedTo: 'Double Cash •••• 7720',
      reason: 'No category bonus anywhere. Double Cash’s flat 2% was the highest take.',
      advantage: 1.72,
      subscription: false,
      optimized: true,
      code: 'MCC 6300 · Insurance',
    },
  ],
  discover: [
    {
      id: 'disc-gas',
      merchant: 'Chevron',
      letter: 'C',
      tint: '#3a2a10',
      ink: '#ffd27a',
      amount: 41.1,
      day: 'Sunday',
      time: '5:12 PM',
      category: 'Transport',
      routedTo: 'Discover it •••• 9091',
      reason: 'Gas is the 5% quarter on Discover. That beat Sapphire’s plain 1×.',
      advantage: 2.06,
      subscription: false,
      optimized: true,
      code: 'MCC 5541 · Fuel',
    },
  ],
  savor: [
    {
      id: 'savor-dinner',
      merchant: 'Carbone',
      letter: 'C',
      tint: '#2a1214',
      ink: '#f0c9c4',
      amount: 96.4,
      day: 'Oct 15',
      time: '8:22 PM',
      category: 'Dining',
      routedTo: 'Savor •••• 2264',
      reason: 'Savor’s 3% dining edged Gold once the annual cap on the 4× was counted.',
      advantage: 2.89,
      subscription: false,
      optimized: true,
      code: 'MCC 5812 · Restaurants',
    },
  ],
  autograph: [
    {
      id: 'auto-hotel',
      merchant: 'Hyatt',
      letter: 'H',
      tint: '#1a2430',
      ink: '#d6e6f5',
      amount: 189,
      day: 'Oct 13',
      time: '3:05 PM',
      category: 'Travel',
      routedTo: 'Autograph •••• 6188',
      reason: 'Hotels are 3× on Autograph. It won against Venture’s flat 2×.',
      advantage: 5.67,
      subscription: false,
      optimized: true,
      code: 'MCC 7011 · Hotels',
    },
  ],
  custom: [
    {
      id: 'bofa-home',
      merchant: 'Home Depot',
      letter: 'H',
      tint: '#3a2410',
      ink: '#ffd7a8',
      amount: 54.9,
      day: 'Oct 16',
      time: '11:48 AM',
      category: 'Shopping',
      routedTo: 'Customized Cash •••• 1544',
      reason: 'Home improvement is the 3% category you set on this card.',
      advantage: 1.65,
      subscription: false,
      optimized: true,
      code: 'MCC 5200 · Home supply',
    },
  ],
  sofi: [
    {
      id: 'sofi-net',
      merchant: 'Xfinity',
      letter: 'X',
      tint: '#102033',
      ink: '#c5d7ee',
      amount: 89.99,
      day: 'Oct 14',
      time: 'Bill',
      category: 'Bills',
      routedTo: 'SoFi Unlimited •••• 8802',
      reason: 'A flat 2% with no cap. Bills don’t earn a category bonus on the other cards.',
      advantage: 1.8,
      subscription: true,
      optimized: true,
      code: 'MCC 4899 · Telecom',
    },
  ],
  united: [
    {
      id: 'ua-flight',
      merchant: 'United',
      letter: 'U',
      tint: '#0c1c33',
      ink: '#d5e2f5',
      amount: 176,
      day: 'Oct 18',
      time: '9:15 AM',
      category: 'Travel',
      routedTo: 'United Explorer •••• 4470',
      reason: 'United metal earns 2× on United and the free checked bag is worth more than a generic point.',
      advantage: 7.04,
      subscription: false,
      optimized: true,
      code: 'MCC 3000 · Airline',
    },
  ],
  bonvoy: [
    {
      id: 'bonvoy-stay',
      merchant: 'Marriott',
      letter: 'M',
      tint: '#1a140c',
      ink: '#f0e0c0',
      amount: 212,
      day: 'Sunday',
      time: '4:40 PM',
      category: 'Travel',
      routedTo: 'Bonvoy •••• 6619',
      reason: '6× at Marriott beat a general travel bonus. The stay also posts toward status.',
      advantage: 12.72,
      subscription: false,
      optimized: true,
      code: 'MCC 7011 · Hotels',
    },
  ],
}

export const walletAccounts = [
  { name: 'Chase Total Checking', mask: '4821', detail: '$4,280.55 available' },
  { name: 'Sapphire Reserve', mask: '2290', detail: 'Credit · $8,420 limit' },
  { name: 'Amex Gold', mask: '1004', detail: 'Charge card' },
  { name: 'Ally Savings', mask: '8831', detail: '$12,400.00' },
]

export const budgets = [
  { name: 'Groceries', spent: 312, cap: 450, color: '#1f8a78' },
  { name: 'Dining', spent: 248, cap: 300, color: '#e07a4c' },
  { name: 'Transport', spent: 96, cap: 150, color: '#3b6fd8' },
  { name: 'Shopping', spent: 140, cap: 200, color: '#c4962c' },
  { name: 'Fun', spent: 88, cap: 160, color: '#8a6ad4' },
]

export const goals = [
  { name: 'Tokyo', saved: 2400, cap: 4000 },
  { name: 'Emergency fund', saved: 8200, cap: 10000 },
]

export const recurring = [
  { id: 'hulu' as const, name: 'Hulu', price: 17.99, note: 'Unused 97 days' },
  { id: 'spotify', name: 'Spotify', price: 11.99, note: 'In use' },
  { id: 'nyt', name: 'New York Times', price: 17, note: 'In use' },
  { id: 'icloud', name: 'iCloud+', price: 2.99, note: 'In use' },
]

export const pulse = [
  { name: 'Liquidity', score: 82 },
  { name: 'Rewards', score: 91 },
  { name: 'Debt', score: 54 },
  { name: 'Savings', score: 77 },
  { name: 'Mix', score: 63 },
]

export const openingThread: MindItem[] = [
  {
    kind: 'text',
    id: 'brief',
    from: 'mind',
    text: 'Morning. Quick wins: Hulu hasn’t been opened in 97 days. Internet renews in 12 days. You’re $220 from a Sapphire bonus, with 6 days left.',
  },
  { kind: 'action', id: 'a-hulu', actionId: 'hulu' },
  { kind: 'action', id: 'a-xfinity', actionId: 'xfinity' },
  { kind: 'action', id: 'a-bonus', actionId: 'bonus' },
]

export const actionCopy: Record<
  ActionId,
  { title: string; body: string; approve: string; skip: string }
> = {
  hulu: {
    title: 'Cancel Hulu',
    body: 'No opens in 97 days. Canceling saves $17.99 a month, $216 a year. Mind stops at the confirmation until you approve.',
    approve: 'Cancel it',
    skip: 'Keep it',
  },
  xfinity: {
    title: 'Negotiate Xfinity',
    body: 'Renews in 12 days at $89.99. Mind can call and bring an offer back. The rate does not change until you approve it.',
    approve: 'Start the call',
    skip: 'Not now',
  },
  bonus: {
    title: 'Arm the Sapphire bonus',
    body: 'You’re $220 short, and the window closes in 6 days. Until Oct 26 the bonus is worth more than Amex points, so grocery and dining should go to Sapphire.',
    approve: 'Arm routing',
    skip: 'Leave it',
  },
}

export function usd(n: number) {
  const abs = Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${n < 0 ? '−' : ''}$${abs}`
}

export function plus(n: number) {
  return `+$${n.toFixed(2)}`
}

export function monthName() {
  return new Date().toLocaleDateString('en-US', { month: 'long' })
}

export function todayLine() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function clockTime(d = new Date()) {
  let h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  h = h % 12 || 12
  return `${h}:${m}`
}

export function stamp() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
