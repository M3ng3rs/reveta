import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { asset } from './asset'
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  Gauge,
  PieChart,
  Plus,
  Receipt,
  Search,
  Shield,
  Snowflake,
  Sparkles,
  TrendingUp,
  UserRound,
  Wallet,
  X,
} from 'lucide-react'
import {
  actionCopy,
  advantageTotal,
  budgets,
  chargedTo,
  catalog,
  freshCharges,
  goals,
  institutions,
  leftToSpend,
  monthName,
  plus,
  pulse,
  recurring,
  spentTotal,
  todayLine,
  transactions,
  txOrder,
  usd,
  walletAccounts,
} from './data'
import { HomeBar, Island, MetalCard, SheetFrame, Sparkline, StatusBar } from './chrome'
import { Signin, Signup, Studio } from './enter'
import { PaceDial } from './gauge'
import { useReveta } from './state'
import type { ActionId, Tab, Tx } from './types'

function Welcome() {
  const { goSignup, goSignin, enterApp } = useReveta()
  return (
    <section className="welcome screen-in">
      <img className="brand-word" src={asset('brand/wordmark-white.png')} alt="Reveta." />
      <h1 className="display">
        Your money
        <br />
        just got
        <br />
        <em>a brain.</em>
      </h1>
      <p className="lede">
        One card that picks the best card you already own. Free to hold. We earn when you spend.
      </p>
      <ul className="beats">
        <li>
          <strong>Card</strong>
          <span>Free. A share of the transaction fee.</span>
        </li>
        <li>
          <strong>Flow</strong>
          <span>Budgeting. $9.99 a month.</span>
        </li>
        <li>
          <strong>Mind, Shield, Grow</strong>
          <span>Add-ons. The card works without them.</span>
        </li>
      </ul>
      <div className="spacer" />
      <button type="button" className="btn" onClick={goSignup}>
        Get the card
      </button>
      <button type="button" className="btn text" onClick={goSignin}>
        I already have one
      </button>
      <button type="button" className="btn text" onClick={enterApp}>
        Look around first
      </button>
    </section>
  )
}

function Connect() {
  const { goSignup, openSheet } = useReveta()
  return (
    <section className="connect screen-in">
      <button type="button" className="back" onClick={goSignup}>
        <ChevronLeft size={22} strokeWidth={1.75} />
        Back
      </button>
      <div className="steps" aria-hidden>
        <i className="on" />
        <i className="now" />
        <i />
      </div>
      <h1 className="display small">
        Link what you
        <br />
        already have.
      </h1>
      <p className="lede">
        Plaid links the accounts you already have. Read-only. The card is issued through Lithic or
        Stripe Issuing, which is why it stays free.
      </p>
      <div className="banks">
        {institutions.slice(0, 8).map((bank) => (
          <span key={bank.id}>
            <i style={{ background: bank.color }} />
            {bank.name}
          </span>
        ))}
      </div>
      <button type="button" className="btn" onClick={() => openSheet({ type: 'plaid' })}>
        Continue with Plaid
      </button>
      <button type="button" className="btn text" onClick={() => openSheet({ type: 'link' })}>
        Add cards one by one
      </button>
      <p className="fine">Preview only. No bank password is collected here.</p>
    </section>
  )
}

function Ready() {
  const { addToWallet, enterApp, wallet } = useReveta()
  return (
    <section className="ready screen-in">
      <img className="brand-word" src={asset('brand/wordmark-white.png')} alt="Reveta" />
      <h1 className="display small">
        It’s the card.
        <br />
        <em>No monthly fee.</em>
      </h1>
      <MetalCard />
      <ul className="checks">
        <li>Plaid linked, read-only</li>
        <li>Routing on for the cards you already hold</li>
        <li>We earn a share of the transaction fee</li>
      </ul>
      <div className="spacer" />
      <button type="button" className="btn" onClick={wallet ? enterApp : addToWallet}>
        {wallet ? 'Go to the card' : 'Add to Apple Wallet'}
      </button>
      {wallet ? null : (
        <button type="button" className="btn text" onClick={enterApp}>
          Not now
        </button>
      )}
    </section>
  )
}

function Quick({
  label,
  onClick,
  children,
  hot,
}: {
  label: string
  onClick: () => void
  children: ReactNode
  hot?: boolean
}) {
  return (
    <button type="button" className="quick" onClick={onClick}>
      <span className={hot ? 'qicon hot' : 'qicon'}>{children}</span>
      {label}
    </button>
  )
}

function TxButton({ tx, onOpen }: { tx: Tx; onOpen: (id: string) => void }) {
  return (
    <button type="button" className="trow" onClick={() => onOpen(tx.id)}>
      <span className="mark" style={{ background: tx.tint, color: tx.ink }}>
        {tx.letter}
      </span>
      <span>
        <span className="t-name">{tx.merchant}</span>
        <span className="t-sub">
          {tx.category} · {tx.routedTo.split(' ·')[0]}
        </span>
      </span>
      <span>
        <span className="t-amt">{usd(tx.amount)}</span>
        <span className="t-gain">{plus(tx.advantage)}</span>
      </span>
    </button>
  )
}

function bookFor(linkedIds: string[]) {
  return [...transactions, ...linkedIds.flatMap((id) => freshCharges[id] ?? [])]
}

function WalletStack() {
  const { openPass, frozen, linkedIds, openSheet } = useReveta()
  const rest = catalog.filter((card) => linkedIds.includes(card.id))
  const book = bookFor(linkedIds)
  return (
    <div className="stack">
      <div className="stack-front">
        <MetalCard frozen={frozen} onClick={() => openPass('reveta')} />
      </div>
      {rest.map((card, index) => {
        const last = book.find((tx) => chargedTo(tx.routedTo) === card.id)
        return (
          <button
            key={card.id}
            type="button"
            className={`peek face-${card.face}`}
            style={{ zIndex: 40 - index }}
            onClick={() => openPass(card.id)}
          >
            <span>
              <strong>{card.name}</strong>
              <small>
                {last ? `${last.merchant} · ${last.day} ${last.time}` : card.edge}
              </small>
            </span>
            <b>{card.last4}</b>
          </button>
        )
      })}
      <button type="button" className="add-card" style={{ zIndex: 1 }} onClick={() => openSheet({ type: 'link' })}>
        <Plus size={18} strokeWidth={1.75} />
        <span>
          <strong>Add a card</strong>
          <small>Search any issuer. Read-only. No password.</small>
        </span>
      </button>
    </div>
  )
}

function PlasticCard({ id }: { id: string }) {
  const { frozen } = useReveta()
  if (id === 'reveta') return <MetalCard frozen={frozen} />
  const pass = catalog.find((item) => item.id === id) ?? catalog[0]
  return (
    <div className={`metal face-${pass.face}`}>
      <span className="metal-top">
        <span className="chip" aria-hidden />
        <span className="visa">{pass.network}</span>
      </span>
      <span className="metal-num">••••  ••••  ••••  {pass.last4}</span>
      <span className="metal-foot">
        <span>
          <strong>{pass.name}</strong>
          <em>REDA ESSEBAR</em>
        </span>
      </span>
    </div>
  )
}

function PassView() {
  const { pass, closePass, openCard, linkedIds, unlinkCard } = useReveta()
  const id = pass ?? 'reveta'
  const card = id === 'reveta' ? null : catalog.find((item) => item.id === id)
  const rows = bookFor(linkedIds)
    .filter((tx) => (id === 'reveta' ? true : chargedTo(tx.routedTo) === id))
    .slice()
    .sort((a, b) => txOrder(a.day) - txOrder(b.day))
  const total = rows.reduce((sum, tx) => sum + tx.amount, 0)
  const groups: { day: string; items: Tx[] }[] = []
  for (const tx of rows) {
    const last = groups[groups.length - 1]
    if (!last || last.day !== tx.day) groups.push({ day: tx.day, items: [tx] })
    else last.items.push(tx)
  }
  return (
    <div className="scroll detail">
      <button type="button" className="back" onClick={closePass}>
        <ChevronLeft size={22} strokeWidth={1.75} />
        Wallet
      </button>
      <PlasticCard id={id} />
      <p className="figure sm">{usd(total)}</p>
      <p className="subline">
        {id === 'reveta'
          ? 'Every charge that came through Reveta.'
          : `Charged to ${card?.name ?? 'this card'}. ${card?.edge ?? ''}`}
      </p>
      {groups.map((group) => (
        <div key={group.day}>
          <p className="day">{group.day}</p>
          <div className="group">
            {group.items.map((tx) => (
              <div key={tx.id} className="trow static">
                <span className="mark" style={{ background: tx.tint, color: tx.ink }}>
                  {tx.letter}
                </span>
                <span>
                  <span className="t-name">{tx.merchant}</span>
                  <span className="t-sub">
                    {tx.time} · {id === 'reveta' ? tx.routedTo.split(' •')[0] : 'Charged this card'}
                  </span>
                </span>
                <span>
                  <span className="t-amt">{usd(tx.amount)}</span>
                  <span className="t-gain">{plus(tx.advantage)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {id === 'reveta' ? (
        <button type="button" className="btn quiet" onClick={openCard}>
          Card controls
        </button>
      ) : (
        <button type="button" className="btn quiet" onClick={() => unlinkCard(id)}>
          Remove from Wallet
        </button>
      )}
    </div>
  )
}

function CardHome() {
  const { frozen, toggleFreeze, openCard, addToWallet, openSheet, setTab, actions, flow } =
    useReveta()
  const month = monthName()
  const waiting = (['hulu', 'xfinity', 'bonus'] as const).filter((id) => {
    const s = actions[id]
    return s === 'open' || s === 'offer' || s === 'working'
  })
  return (
    <div className="scroll">
      <img className="brand-word home" src={asset('brand/wordmark-white.png')} alt="Reveta" />
      <p className="k">{month} advantage</p>
      <p className="figure">{usd(advantageTotal)}</p>
      <p className="subline">
        <span className="gain-text">Versus paying debit</span> · spent {usd(spentTotal)}
      </p>
      <Sparkline />
      <p className="label">Wallet</p>
      <WalletStack />
      <p className="hint">Tap a card to see who charged it. Add any card you already hold.</p>
      <div className="quicks">
        <Quick label={frozen ? 'Unfreeze' : 'Freeze'} onClick={toggleFreeze} hot={frozen}>
          <Snowflake size={18} strokeWidth={1.75} />
        </Quick>
        <Quick label="Details" onClick={openCard}>
          <CreditCard size={18} strokeWidth={1.75} />
        </Quick>
        <Quick label="Wallet" onClick={addToWallet}>
          <Wallet size={18} strokeWidth={1.75} />
        </Quick>
        <Quick label="Limits" onClick={() => openSheet({ type: 'limits' })}>
          <Gauge size={18} strokeWidth={1.75} />
        </Quick>
      </div>
      <PaceDial
        compact
        value={0.68}
        kicker="Spending pace"
        figure="On pace"
        caption="Day 20 of 31 · $4,200 month"
        onOpen={() => setTab('activity')}
      />
      {waiting.length > 0 ? (
        <>
          <p className="label">For you</p>
          <div className="group">
            {waiting.map((id) => (
              <button type="button" key={id} className="srow" onClick={() => setTab('mind')}>
                <span className="grow">
                  <span className="t-name">{actionCopy[id].title}</span>
                  <small>
                    {actions[id] === 'offer'
                      ? 'Offer ready'
                      : actions[id] === 'working'
                        ? 'In progress'
                        : 'Needs a yes'}
                  </small>
                </span>
                <ChevronRight size={18} strokeWidth={1.75} />
              </button>
            ))}
          </div>
        </>
      ) : null}
      {flow ? null : (
        <button type="button" className="upsell" onClick={() => setTab('flow')}>
          <span>Flow · budgeting is separate</span>
          <span>$9.99/mo</span>
        </button>
      )}
    </div>
  )
}

function Activity() {
  const { openSheet, linkedIds } = useReveta()
  const [filter, setFilter] = useState<'all' | 'optimized' | 'subscriptions'>('all')
  const rows = bookFor(linkedIds)
    .filter((tx) => {
      if (filter === 'optimized') return tx.optimized
      if (filter === 'subscriptions') return tx.subscription
      return true
    })
    .slice()
    .sort((a, b) => txOrder(a.day) - txOrder(b.day))
  const groups: { day: string; items: Tx[] }[] = []
  for (const tx of rows) {
    const last = groups[groups.length - 1]
    if (!last || last.day !== tx.day) groups.push({ day: tx.day, items: [tx] })
    else last.items.push(tx)
  }
  return (
    <div className="scroll">
      <p className="k">Spent in {monthName()}</p>
      <p className="figure">{usd(spentTotal)}</p>
      <p className="subline">
        <span className="gain-text">{plus(advantageTotal)} advantage</span> on the card
      </p>
      <div className="filters">
        {(
          [
            ['all', 'All'],
            ['optimized', 'Optimized'],
            ['subscriptions', 'Subscriptions'],
          ] as const
        ).map(([id, label]) => (
          <button key={id} type="button" className={filter === id ? 'on' : ''} onClick={() => setFilter(id)}>
            {label}
          </button>
        ))}
      </div>
      {groups.map((group) => (
        <div key={group.day}>
          <p className="day">{group.day}</p>
          <div className="group">
            {group.items.map((tx) => (
              <TxButton key={tx.id} tx={tx} onOpen={(id) => openSheet({ type: 'tx', id })} />
            ))}
          </div>
        </div>
      ))}
      {rows.length === 0 ? <p className="lede">Nothing in this filter.</p> : null}
    </div>
  )
}

function ActionCard({ id }: { id: ActionId }) {
  const { actions, approve, acceptOffer, skipAction } = useReveta()
  const status = actions[id]
  const copy = actionCopy[id]
  if (status === 'skipped') return null
  return (
    <article className="action">
      <h3>{copy.title}</h3>
      {status === 'done' ? (
        <p className="gain-text">
          {id === 'hulu'
            ? 'Canceled. $216 a year stays with you. It’s in the action log.'
            : id === 'bonus'
              ? 'Armed through Oct 26. Grocery and dining route to Sapphire.'
              : 'New rate $72.99. Saved $204 a year. Logged.'}
        </p>
      ) : status === 'working' ? (
        <p>Calling Xfinity. You’ll get the offer here before anything changes.</p>
      ) : status === 'offer' ? (
        <>
          <p>$89.99 → $72.99 a month. $204 a year. The old rate stays until you approve.</p>
          <div className="pair">
            <button type="button" className="solid" onClick={acceptOffer}>
              Approve offer
            </button>
            <button type="button" className="ghost" onClick={() => skipAction('xfinity')}>
              Leave it
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{copy.body}</p>
          <div className="pair">
            <button type="button" className="solid" onClick={() => approve(id)}>
              {copy.approve}
            </button>
            <button type="button" className="ghost" onClick={() => skipAction(id)}>
              {copy.skip}
            </button>
          </div>
        </>
      )}
    </article>
  )
}

function Mind() {
  const { messages, sendMind, addons, openSheet } = useReveta()
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const count = messages.length
  useEffect(() => {
    if (count > 4) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [count])

  return (
    <div className="fill">
      <div className="scroll mind-scroll">
        <p className="k">Mind</p>
        <h2 className="title">{todayLine()}</h2>
        <p className="plan-line">
          {addons.mind ? 'Add-on on · $14.99/mo' : 'Preview access · $14.99/mo add-on when you keep it'}
        </p>
        <div className="thread">
          {messages.map((item) =>
            item.kind === 'text' ? (
              <p key={item.id} className={item.from === 'you' ? 'bubble you' : 'bubble'}>
                {item.text}
              </p>
            ) : (
              <ActionCard key={item.id} id={item.actionId} />
            ),
          )}
          <div ref={endRef} />
        </div>
        {addons.mind ? null : (
          <button type="button" className="upsell" onClick={() => openSheet({ type: 'addon', id: 'mind' })}>
            <span>Keep Mind after this preview</span>
            <span>$14.99/mo</span>
          </button>
        )}
      </div>
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault()
          sendMind(text)
          setText('')
        }}
      >
        <div className="chips">
          <button
            type="button"
            onClick={() => {
              sendMind('Cancel Hulu. Negotiate internet.')
              setText('')
            }}
          >
            Cancel Hulu. Negotiate internet.
          </button>
        </div>
        <div className="composer-row">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell Mind what to do"
            aria-label="Message Mind"
            autoComplete="off"
          />
          <button type="submit" className="send" aria-label="Send">
            <ArrowUp size={18} strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  )
}

function Flow() {
  const { flow, subscribeFlow, actions, approve } = useReveta()
  if (!flow) {
    return (
      <div className="scroll">
        <p className="kicker">Flow</p>
        <h2 className="title">
          Budgeting,
          <br />
          as a service.
        </h2>
        <p className="lede tight">What’s left to spend, in envelopes. The card doesn’t need it.</p>
        <p className="price">
          $9.99 <span>/ month</span>
        </p>
        <ul className="checks">
          <li>Envelopes that follow the paycheck</li>
          <li>Subscriptions, found and priced</li>
          <li>Goals paced to what’s actually coming in</li>
        </ul>
        <button type="button" className="btn" onClick={subscribeFlow}>
          Subscribe
        </button>
        <p className="fine">Turns Flow on. This preview doesn’t charge you.</p>
      </div>
    )
  }

  return (
    <div className="scroll">
      <PaceDial
        value={0.7}
        kicker="Spending pace"
        figure={usd(leftToSpend)}
        caption="After rent, bills, and Tokyo. Through November 1."
        big
      />
      <p className="label">Envelopes</p>
      <div className="envelopes">
        {budgets.map((b) => (
          <div key={b.name} className="env">
            <div className="env-top">
              <span>{b.name}</span>
              <span>
                {usd(b.spent)} <em>of {usd(b.cap)}</em>
              </span>
            </div>
            <div className="track paper">
              <i style={{ width: `${Math.min(100, (b.spent / b.cap) * 100)}%`, background: b.color }} />
            </div>
          </div>
        ))}
      </div>
      <p className="label">Goals</p>
      <div className="envelopes">
      {goals.map((g) => (
        <div key={g.name} className="env">
          <div className="env-top">
            <span>{g.name}</span>
            <span>
              {usd(g.saved)} <em>of {usd(g.cap)}</em>
            </span>
          </div>
          <div className="track paper">
            <i style={{ width: `${(g.saved / g.cap) * 100}%`, background: '#141414' }} />
          </div>
        </div>
      ))}
      </div>
      <p className="label">Recurring</p>
      <div className="group">
      {recurring.map((item) => {
        const canceled = item.id === 'hulu' && actions.hulu === 'done'
        return (
          <div key={item.name} className="srow static">
            <span className="grow">
              <span className="t-name">{item.name}</span>
              <small>{canceled ? 'Canceled' : item.note}</small>
            </span>
            <span className="t-amt">{canceled ? '—' : usd(item.price)}</span>
            {item.id === 'hulu' && !canceled ? (
              <button type="button" className="mini" onClick={() => approve('hulu')}>
                Cancel
              </button>
            ) : null}
          </div>
        )
      })}
      </div>
    </div>
  )
}

function You() {
  const { flow, addons, openSheet, audit, replay, bankName, frozen, wallet, profile, goDesign, goSignup, linkedIds, openPass } =
    useReveta()
  const held = catalog.filter((card) => linkedIds.includes(card.id))
  return (
    <div className="scroll">
      <div className="who">
        <img className="app-glyph" src={asset('apple-touch-icon.png')} alt="" />
        <div>
          <div className="t-name lg">{profile.name}</div>
          <div className="t-sub">{profile.email || 'Sample wallet'}</div>
        </div>
        <button type="button" className="pulse-pill" onClick={() => openSheet({ type: 'pulse' })}>
          742
        </button>
      </div>

      <p className="label">The card</p>
      <div className="group">
        <button type="button" className="srow" onClick={() => goDesign('main')}>
          <span className="grow">
            <span className="t-name">Apple Wallet look</span>
            <small>Skin, name, wordmark</small>
          </span>
          <ChevronRight size={18} />
        </button>
        <button type="button" className="srow" onClick={() => openSheet({ type: 'limits' })}>
          <span className="grow">
            <span className="t-name">Reveta Visa •••• 4419</span>
            <small>{frozen ? 'Frozen' : 'Active'}{wallet ? ' · In Wallet' : ''}</small>
          </span>
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="label">Cards in Wallet</p>
      <div className="group">
        {held.map((card) => (
          <button key={card.id} type="button" className="srow" onClick={() => openPass(card.id)}>
            <span className="grow">
              <span className="t-name">{card.name}</span>
              <small>
                {card.issuer} · •••• {card.last4} · {card.edge}
              </small>
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
        <button type="button" className="srow" onClick={() => openSheet({ type: 'link' })}>
          <Plus size={18} strokeWidth={1.75} />
          <span className="grow">
            <span className="t-name">Link a card</span>
            <small>Any issuer you already have</small>
          </span>
        </button>
      </div>

      <p className="label">Linked · {bankName}</p>
      <div className="group">
        {walletAccounts.map((a) => (
          <div key={a.mask} className="srow static">
            <span className="grow">
              <span className="t-name">{a.name}</span>
              <small>•••• {a.mask} · {a.detail}</small>
            </span>
          </div>
        ))}
      </div>

      <div className="note">
        <p>
          The card is free. Visa pays interchange when you spend, and Reveta keeps a share. Flow is
          $9.99 a month. Everything else is an add-on.
        </p>
      </div>

      <p className="label">Services</p>
      <div className="group">
      <ServiceRow
        name="Flow"
        detail={flow ? 'Budgeting · on' : 'Budgeting · $9.99/mo'}
        on={flow}
        onOpen={() => openSheet({ type: 'flow' })}
      />
      <ServiceRow
        name="Mind"
        detail={addons.mind ? 'Agent · on' : 'Agent · $14.99/mo'}
        on={addons.mind}
        onOpen={() => openSheet({ type: 'addon', id: 'mind' })}
      />
      <ServiceRow
        name="Shield"
        detail={addons.shield ? 'Watching linked accounts' : 'Protection · $4.99/mo'}
        on={addons.shield}
        onOpen={() => openSheet({ type: 'addon', id: 'shield' })}
      />
      <ServiceRow
        name="Grow"
        detail={addons.grow ? 'Next sweep Friday · $120' : 'Save and debt · $6.99/mo'}
        on={addons.grow}
        onOpen={() => openSheet({ type: 'addon', id: 'grow' })}
      />
      </div>

      <p className="label">Action log</p>
      {audit.length === 0 ? (
        <p className="hint">Approved Mind actions show up here.</p>
      ) : (
        <div className="group">
          {audit.map((item) => (
            <div key={item.id} className="srow static">
              <span className="grow">
                <span className="t-name">{item.title}</span>
                <small>
                  {item.detail} · {item.time}
                </small>
              </span>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="btn" onClick={goSignup}>
        Get the card
      </button>
      <button type="button" className="btn quiet" onClick={replay}>
        See the intro
      </button>
      <p className="fine">
        Issued, in production, through Lithic or Stripe Issuing and their sponsor bank. This card
        cannot pay.
      </p>
    </div>
  )
}

function ServiceRow({
  name,
  detail,
  on,
  onOpen,
}: {
  name: string
  detail: string
  on: boolean
  onOpen: () => void
}) {
  return (
    <button type="button" className="srow" onClick={onOpen}>
      <span className={on ? 'switch on' : 'switch'} aria-hidden>
        <i />
      </span>
      <span className="grow">
        <span className="t-name">{name}</span>
        <small>{detail}</small>
      </span>
      <ChevronRight size={18} />
    </button>
  )
}

function CardDetail() {
  const { closeCard, frozen, toggleFreeze, addToWallet, wallet, goDesign } = useReveta()
  const [show, setShow] = useState(false)
  const number = show ? '4532  1891  2204  4419' : undefined
  return (
    <div className="scroll detail">
      <button type="button" className="back" onClick={closeCard}>
        <ChevronLeft size={22} strokeWidth={1.75} />
        Card
      </button>
      <h2 className="title">Reveta Card</h2>
      <MetalCard frozen={frozen} number={number} />
      <div className="group">
        <button type="button" className="srow" onClick={() => goDesign('main')}>
          <span className="grow">
            <span className="t-name">Apple Wallet look</span>
            <small>Graphite, ivory, midnight, signal</small>
          </span>
          <ChevronRight size={18} />
        </button>
        <button type="button" className="srow" onClick={() => setShow((v) => !v)}>
          <span className="qicon sm">{show ? <EyeOff size={18} /> : <Eye size={18} />}</span>
          <span className="grow">
            <span className="t-name">{show ? 'Hide number' : 'Show number'}</span>
            <small>Preview only. This card cannot pay.</small>
          </span>
        </button>
        <button type="button" className="srow" onClick={toggleFreeze}>
          <span className={frozen ? 'qicon sm hot' : 'qicon sm'}>
            <Snowflake size={18} />
          </span>
          <span className="grow">
            <span className="t-name">{frozen ? 'Unfreeze card' : 'Freeze card'}</span>
            <small>{frozen ? 'Purchases will decline' : 'Stops new purchases'}</small>
          </span>
        </button>
      </div>
      <button type="button" className="btn quiet" onClick={addToWallet}>
        {wallet ? 'In Apple Wallet' : 'Add to Apple Wallet'}
      </button>
      <div className="note">
        <p>
          The merchant pays interchange. You don’t pay it on top of the price. At checkout Reveta
          picks the best linked card in under half a second.
        </p>
      </div>
    </div>
  )
}

function TabBar() {
  const { tab, setTab, actions } = useReveta()
  const mindDot = (['hulu', 'xfinity', 'bonus'] as const).some((id) => {
    const s = actions[id]
    return s === 'open' || s === 'offer'
  })
  const items: { id: Tab; label: string; icon: ReactNode; dot?: boolean }[] = [
    { id: 'card', label: 'Card', icon: <CreditCard size={22} strokeWidth={1.75} /> },
    { id: 'activity', label: 'Activity', icon: <Receipt size={22} strokeWidth={1.75} /> },
    { id: 'mind', label: 'Mind', icon: <Sparkles size={22} strokeWidth={1.75} />, dot: mindDot },
    { id: 'flow', label: 'Flow', icon: <PieChart size={22} strokeWidth={1.75} /> },
    { id: 'you', label: 'You', icon: <UserRound size={22} strokeWidth={1.75} /> },
  ]
  return (
    <nav className="tabs">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={tab === item.id ? 'tab on' : 'tab'}
          onClick={() => setTab(item.id)}
        >
          <span className="tab-ico">
            {item.icon}
            {item.dot ? <i className="dot" /> : null}
          </span>
          {item.label}
        </button>
      ))}
    </nav>
  )
}

function TxSheet() {
  const { sheet, closeSheet } = useReveta()
  const tx = sheet.type === 'tx' ? transactions.find((item) => item.id === sheet.id) : undefined
  if (!tx) return null
  return (
    <SheetFrame onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
        <button type="button" className="icon-x" onClick={closeSheet} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <p className="k">{tx.merchant}</p>
      <p className="figure sm">{usd(tx.amount)}</p>
      <p className="subline">
        {tx.day} · {tx.time}
      </p>
      <div className="fact">
        <span>Routed to</span>
        <strong>{tx.routedTo}</strong>
      </div>
      <div className="fact">
        <span>Advantage vs debit</span>
        <strong className="gain-text">{plus(tx.advantage)}</strong>
      </div>
      <div className="fact">
        <span>Category</span>
        <strong>{tx.code}</strong>
      </div>
      <p className="lede tight">{tx.reason}</p>
    </SheetFrame>
  )
}

function PlaidSheet() {
  const { closeSheet, holdIsland, connectBank, goDesign, openSheet } = useReveta()
  const [phase, setPhase] = useState<'pick' | 'auth' | 'wait' | 'done'>('pick')
  const waitRef = useRef<number | null>(null)
  const phaseRef = useRef(phase)
  const holdRef = useRef(holdIsland)
  phaseRef.current = phase
  holdRef.current = holdIsland
  useEffect(() => {
    return () => {
      if (waitRef.current) window.clearTimeout(waitRef.current)
      if (phaseRef.current === 'wait') holdRef.current(null)
    }
  }, [])
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState(institutions[0])
  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return institutions
    return institutions.filter((item) => item.name.toLowerCase().includes(q))
  }, [query])

  function choose(id: string) {
    const found = institutions.find((item) => item.id === id) ?? institutions[0]
    setPicked(found)
    setPhase('auth')
  }

  function verify() {
    setPhase('wait')
    holdIsland(`Verifying ${picked.name}`)
    waitRef.current = window.setTimeout(() => {
      connectBank(picked.name)
      holdIsland(null)
      setPhase('done')
    }, 1100)
  }

  return (
    <SheetFrame light onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
        <button type="button" className="icon-x" onClick={closeSheet} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      {phase === 'pick' ? (
        <>
          <p className="plaid-mark">Plaid</p>
          <p className="plaid-sub">Reveta uses Plaid to connect your accounts</p>
          <label className="search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search banks and cards"
              aria-label="Search institutions"
            />
          </label>
          <div className="inst-list">
            {list.map((item) => (
              <button key={item.id} type="button" className="inst" onClick={() => choose(item.id)}>
                <span className="mark" style={{ background: item.color, color: '#fff' }}>
                  {item.name.slice(0, 1)}
                </span>
                <span>
                  <span className="t-name">{item.name}</span>
                  <span className="t-sub">{item.hint}</span>
                </span>
                <ChevronRight size={18} />
              </button>
            ))}
            {list.length === 0 ? <p className="plaid-sub">No institution by that name.</p> : null}
          </div>
          <p className="fine dark">
            Credentials go to Plaid and the bank. Reveta gets a token and read-only data, never the
            password.
          </p>
        </>
      ) : null}
      {phase === 'auth' ? (
        <div className="plaid-step">
          <span className="mark lg" style={{ background: picked.color, color: '#fff' }}>
            {picked.name.slice(0, 1)}
          </span>
          <h2>Continue to {picked.name}</h2>
          <p>
            In the real Link flow, {picked.name}’s own login opens here, including MFA. This preview
            does not ask for a password.
          </p>
          <button type="button" className="btn dark" onClick={verify}>
            Continue
          </button>
          <button type="button" className="btn text dark" onClick={() => setPhase('pick')}>
            Pick another
          </button>
        </div>
      ) : null}
      {phase === 'wait' ? (
        <div className="plaid-step">
          <div className="spinner" />
          <h2>Verifying with {picked.name}</h2>
          <p>Plaid is confirming the connection. Reveta is waiting on a token.</p>
        </div>
      ) : null}
      {phase === 'done' ? (
        <div className="plaid-step left">
          <h2>{picked.name} connected</h2>
          <p>
            Live Link would return only {picked.name}. This tour loads a sample wallet so routing,
            Flow, and Mind have real cards to work with.
          </p>
          {walletAccounts.map((a) => (
            <div key={a.mask} className="inst flat">
              <span className="mark" style={{ background: '#111', color: '#fff' }}>
                {a.name.slice(0, 1)}
              </span>
              <span>
                <span className="t-name">{a.name}</span>
                <span className="t-sub">
                  •••• {a.mask} · {a.detail}
                </span>
              </span>
            </div>
          ))}
          <button
            type="button"
            className="btn dark"
            onClick={() => goDesign('connect')}
          >
            Design the card
          </button>
          <button type="button" className="btn text dark" onClick={() => openSheet({ type: 'link' })}>
            Link another card
          </button>
        </div>
      ) : null}
    </SheetFrame>
  )
}

function FlowSheet() {
  const { closeSheet, subscribeFlow, flow, cancelFlow } = useReveta()
  const [openedOn] = useState(flow)
  return (
    <SheetFrame light onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
        <button type="button" className="icon-x" onClick={closeSheet} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <p className="plaid-mark">Stripe</p>
      <h2 className="sheet-title">{openedOn ? 'Flow is on' : 'Subscribe to Flow'}</h2>
      <p className="price dark">
        $9.99 <span>/ month</span>
      </p>
      <p className="plaid-sub">Billed to the Reveta Card •••• 4419. Cancel anytime.</p>
      {openedOn ? (
        <button type="button" className="btn dark" onClick={cancelFlow}>
          Cancel Flow
        </button>
      ) : (
        <button type="button" className="btn dark" onClick={subscribeFlow}>
          Pay $9.99
        </button>
      )}
      <p className="fine dark">Preview. You’re not charged. This turns Flow on.</p>
    </SheetFrame>
  )
}

function AddonSheet() {
  const { sheet, closeSheet, addons, subscribeAddon, cancelAddon } = useReveta()
  const id = sheet.type === 'addon' ? sheet.id : 'mind'
  const [openedOn] = useState(sheet.type === 'addon' ? addons[id] : false)
  if (sheet.type !== 'addon') return null
  const copy =
    id === 'mind'
      ? {
          name: 'Mind',
          price: '$14.99',
          body: 'Cancels, negotiates, and reroutes toward a bonus. Every move waits for your approval and lands in the log.',
          icon: <Sparkles size={18} />,
        }
      : id === 'shield'
        ? {
            name: 'Shield',
            price: '$4.99',
            body: 'Flags odd charges, helps you freeze, and reminds you when a return window or warranty is about to die.',
            icon: <Shield size={18} />,
          }
        : {
            name: 'Grow',
            price: '$6.99',
            body: 'Sweeps what’s safe to save after bills, and lines up a debt payoff when a balance is the expensive one.',
            icon: <TrendingUp size={18} />,
          }
  return (
    <SheetFrame onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
        <button type="button" className="icon-x" onClick={closeSheet} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <p className="k">Add-on</p>
      <h2 className="sheet-title">
        {copy.icon} {copy.name}
      </h2>
      <p className="price">
        {copy.price} <span>/ month</span>
      </p>
      <p className="lede tight">{copy.body}</p>
      {openedOn ? (
        <button type="button" className="btn" onClick={() => cancelAddon(id)}>
          Remove {copy.name}
        </button>
      ) : (
        <button type="button" className="btn" onClick={() => subscribeAddon(id)}>
          <Plus size={16} /> Add {copy.name}
        </button>
      )}
      <p className="fine">Preview. You’re not charged. This turns {copy.name} on.</p>
    </SheetFrame>
  )
}

function WalletSheet() {
  const { closeSheet, stage, enterApp } = useReveta()
  return (
    <SheetFrame onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
      </div>
      <img className="app-glyph lg" src={asset('apple-touch-icon.png')} alt="" />
      <h2 className="sheet-title">Added to Apple Wallet</h2>
      <p className="lede tight">
        On a real issue, this is a Visa pass you can tap. This one is a preview and can’t pay.
      </p>
      <button
        type="button"
        className="btn"
        onClick={() => {
          closeSheet()
          if (stage === 'ready') enterApp()
        }}
      >
        {stage === 'ready' ? 'Go to the card' : 'Done'}
      </button>
    </SheetFrame>
  )
}

function LimitsSheet() {
  const { closeSheet, atm, toggleAtm, frozen } = useReveta()
  return (
    <SheetFrame onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
        <button type="button" className="icon-x" onClick={closeSheet} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <h2 className="sheet-title">Limits</h2>
      <div className="fact">
        <span>Purchases</span>
        <strong>$2,500 / day</strong>
      </div>
      <div className="fact">
        <span>Contactless</span>
        <strong>$500</strong>
      </div>
      <button type="button" className="srow" onClick={toggleAtm}>
        <span className="grow">
          <span className="t-name">ATM</span>
          <small>{atm ? '$400 / day' : 'Off'}</small>
        </span>
        <span className={atm ? 'switch on' : 'switch'}>
          <i />
        </span>
      </button>
      <p className="fine">{frozen ? 'The card is frozen. Limits apply once it’s active.' : 'Limits apply to the Reveta Card, not the linked cards.'}</p>
    </SheetFrame>
  )
}

function PulseSheet() {
  const { closeSheet } = useReveta()
  return (
    <SheetFrame onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
        <button type="button" className="icon-x" onClick={closeSheet} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <p className="k">Pulse</p>
      <p className="figure sm">742</p>
      <p className="subline">Out of 900. Not a credit score.</p>
      {pulse.map((row) => (
        <div key={row.name} className="env">
          <div className="env-top">
            <span>{row.name}</span>
            <span>{row.score}</span>
          </div>
          <div className="track">
            <i style={{ width: `${row.score}%` }} />
          </div>
        </div>
      ))}
      <p className="lede tight">
        Built from the accounts Plaid reads and how the card is used. Rewards are doing the work.
        Debt is the drag.
      </p>
    </SheetFrame>
  )
}

function LinkSheet() {
  const { closeSheet, linkedIds, linkCard } = useReveta()
  const [query, setQuery] = useState('')
  const [issuer, setIssuer] = useState('All')
  const [pick, setPick] = useState<string | null>(null)
  const issuers = ['All', ...Array.from(new Set(catalog.map((card) => card.issuer)))]
  const q = query.trim().toLowerCase()
  const list = catalog.filter((card) => {
    const hit = !q || `${card.name} ${card.issuer} ${card.network}`.toLowerCase().includes(q)
    return hit && (issuer === 'All' || card.issuer === issuer)
  })
  const card = catalog.find((item) => item.id === pick) ?? null
  const held = card ? linkedIds.includes(card.id) : false
  return (
    <SheetFrame light onClose={closeSheet}>
      <div className="sheet-head">
        <div className="grabber" />
        <button type="button" className="icon-x" onClick={closeSheet} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      {card ? (
        <div className="plaid-step left">
          <button type="button" className="back dark" onClick={() => setPick(null)}>
            <ChevronLeft size={18} />
            All cards
          </button>
          <div className={`link-face face-${card.face}`}>
            <strong>{card.name}</strong>
            <span>
              {card.network} · •••• {card.last4}
            </span>
          </div>
          <h2>{card.edge}</h2>
          <p>
            {card.issuer} confirms the card through Plaid. Read-only. No password is stored. Reveta
            routes a purchase here only when this card beats the others in your Wallet.
          </p>
          <button type="button" className="btn dark" disabled={held} onClick={() => linkCard(card.id)}>
            {held ? 'Already in Wallet' : 'Add to Wallet'}
          </button>
        </div>
      ) : (
        <>
          <p className="plaid-mark">Add a card</p>
          <p className="plaid-sub">The cards you already hold. Reveta stays the one in front.</p>
          <label className="search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Chase, Amex, dining…"
              aria-label="Search cards"
            />
          </label>
          <div className="link-chips">
            {issuers.map((name) => (
              <button key={name} type="button" className={issuer === name ? 'on' : ''} onClick={() => setIssuer(name)}>
                {name === 'American Express' ? 'Amex' : name}
              </button>
            ))}
          </div>
          <div className="inst-list">
            {list.map((item) => {
              const inWallet = linkedIds.includes(item.id)
              return (
                <button key={item.id} type="button" className="inst" onClick={() => setPick(item.id)}>
                  <span className={`mark face-${item.face}`}>{item.name.slice(0, 1)}</span>
                  <span>
                    <span className="t-name">{item.name}</span>
                    <span className="t-sub">
                      {item.issuer} · {item.edge}
                      {inWallet ? ' · In Wallet' : ''}
                    </span>
                  </span>
                  <ChevronRight size={18} />
                </button>
              )
            })}
            {list.length === 0 ? <p className="plaid-sub">No card by that name.</p> : null}
          </div>
        </>
      )}
    </SheetFrame>
  )
}

function Sheets() {
  const { sheet } = useReveta()
  if (sheet.type === 'none') return null
  if (sheet.type === 'tx') return <TxSheet />
  if (sheet.type === 'plaid') return <PlaidSheet />
  if (sheet.type === 'link') return <LinkSheet />
  if (sheet.type === 'flow') return <FlowSheet />
  if (sheet.type === 'addon') return <AddonSheet />
  if (sheet.type === 'wallet') return <WalletSheet />
  if (sheet.type === 'limits') return <LimitsSheet />
  if (sheet.type === 'pulse') return <PulseSheet />
  return null
}

export function Surface() {
  const r = useReveta()
  const light = r.stage === 'main' && r.tab === 'flow' && r.flow && r.push === 'none'
  const theme = light ? 'app paper' : 'app'
  return (
    <div className={theme}>
      <StatusBar light={light} />
      <Island />
      {r.stage === 'intro' ? <Intro /> : null}
      {r.stage === 'welcome' ? <Welcome /> : null}
      {r.stage === 'signup' ? <Signup /> : null}
      {r.stage === 'signin' ? <Signin /> : null}
      {r.stage === 'connect' ? <Connect /> : null}
      {r.stage === 'design' ? <Studio /> : null}
      {r.stage === 'ready' ? <Ready /> : null}
      {r.stage === 'main' && r.pass ? <PassView /> : null}
      {r.stage === 'main' && !r.pass && r.push === 'card' ? <CardDetail /> : null}
      {r.stage === 'main' && !r.pass && r.push === 'none' && r.tab === 'card' ? <CardHome /> : null}
      {r.stage === 'main' && !r.pass && r.push === 'none' && r.tab === 'activity' ? <Activity /> : null}
      {r.stage === 'main' && !r.pass && r.push === 'none' && r.tab === 'mind' ? <Mind /> : null}
      {r.stage === 'main' && !r.pass && r.push === 'none' && r.tab === 'flow' ? <Flow /> : null}
      {r.stage === 'main' && !r.pass && r.push === 'none' && r.tab === 'you' ? <You /> : null}
      {r.stage === 'main' && !r.pass && r.push === 'none' ? <TabBar /> : null}
      <Sheets />
      <HomeBar />
    </div>
  )
}

type IntroScreen = {
  id: string
  kicker: string
  title: ReactNode
  body: string
  figure?: string
  caption?: string
  rows?: { name: string; detail: string }[]
  wordmark?: boolean
  lead?: boolean
}

const introScreens: IntroScreen[] = [
  {
    id: 'open',
    kicker: 'Reveta',
    wordmark: true,
    lead: true,
    title: (
      <>
        Your money
        <br />
        just got
        <br />
        <em>a brain.</em>
      </>
    ),
    body: 'One card that picks the best card you already own. Free to hold. We earn a share of the fee when you spend.',
  },
  {
    id: 'start',
    kicker: 'Startup',
    title: (
      <>
        Four steps.
        <br />
        Then it works.
      </>
    ),
    body: 'This is the whole setup. After it, the card is ready. Everything else is optional.',
    rows: [
      { name: 'Account', detail: 'Your name on the card. This is not a bank login.' },
      { name: 'Link', detail: 'Plaid connects cards you already have. Read-only.' },
      { name: 'Design', detail: 'Choose how it sits in Apple Wallet.' },
      { name: 'Spend', detail: 'Add it. Every tap is routed to the best card.' },
    ],
  },
  {
    id: 'card',
    kicker: 'The card',
    title: 'Free to hold.',
    figure: usd(advantageTotal),
    caption: `Ahead of debit · spent ${usd(spentTotal)}`,
    body: 'Each purchase goes to the card that earns the most. You don’t pay that fee on top of the price.',
  },
  {
    id: 'pace',
    kicker: 'Pace',
    title: 'On pace.',
    body: 'Home shows whether the month is running hot. Flow, if you want it, turns that into what’s left.',
  },
  {
    id: 'activity',
    kicker: 'Activity',
    title: (
      <>
        Every tap,
        <br />
        explained.
      </>
    ),
    body: 'Open any row and the reason for the route is right there.',
    rows: [
      { name: 'Sweetgreen', detail: 'Amex Gold · +$1.10' },
      { name: 'Uber', detail: 'Sapphire Reserve · +$1.11' },
      { name: 'Whole Foods', detail: 'Amex Gold · +$5.17' },
    ],
  },
  {
    id: 'mind',
    kicker: 'Mind',
    title: (
      <>
        It asks
        <br />
        before it acts.
      </>
    ),
    body: 'Cancel Hulu, unused for 97 days. Negotiate internet before it renews. Mind brings the offer back. Nothing is final until you approve. $14.99 a month if you keep it.',
  },
  {
    id: 'flow',
    kicker: 'Flow',
    title: (
      <>
        What’s left
        <br />
        to spend.
      </>
    ),
    figure: usd(leftToSpend),
    caption: 'After rent, bills, and Tokyo.',
    body: 'Envelopes, goals, and the bills already spoken for. $9.99 a month. The card works without it.',
  },
  {
    id: 'rest',
    kicker: 'The rest',
    title: (
      <>
        Optional,
        <br />
        on purpose.
      </>
    ),
    body: 'Turn these on when you want them. The card stays free either way.',
    rows: [
      { name: 'Shield', detail: 'Protection. $4.99 a month.' },
      { name: 'Grow', detail: 'Saving and debt. $6.99 a month.' },
      { name: 'Pulse', detail: '742. A score from 300 to 900. Not a credit score.' },
    ],
  },
]

function IntroArt({ id }: { id: string }) {
  if (id === 'open' || id === 'card') return <MetalCard />
  if (id === 'pace') {
    return <PaceDial big value={0.68} kicker="October" figure="On pace" caption="Day 20 of 31 · $4,200 month" />
  }
  if (id === 'mind') {
    return (
      <blockquote className="pull">
        Cancel Hulu.
        <br />
        <em>Negotiate internet.</em>
      </blockquote>
    )
  }
  if (id === 'flow') {
    return (
      <div className="env-mini">
        <div>
          <b>
            Groceries <em>69%</em>
          </b>
          <i>
            <span style={{ width: '69%' }} />
          </i>
        </div>
        <div>
          <b>
            Dining <em>83%</em>
          </b>
          <i>
            <span style={{ width: '83%' }} />
          </i>
        </div>
        <div>
          <b>
            Transport <em>64%</em>
          </b>
          <i>
            <span style={{ width: '64%' }} />
          </i>
        </div>
      </div>
    )
  }
  return null
}

function Intro() {
  const { intro, nextIntro, skipIntro, finishIntro, goSignin } = useReveta()
  const index = Math.min(intro, introScreens.length - 1)
  const step = introScreens[index]
  const last = index >= introScreens.length - 1

  return (
    <section className="intro screen-in" key={step.id}>
      <div className="intro-dots" aria-hidden>
        {introScreens.map((item, i) => (
          <i key={item.id} className={i <= index ? 'on' : ''} />
        ))}
      </div>
      {step.wordmark ? <img className="brand-word" src={asset('brand/wordmark-white.png')} alt="Reveta." /> : <p className="kicker">{step.kicker}</p>}
      <h1 className={step.lead ? 'display' : 'display small'}>{step.title}</h1>
      {step.figure ? <p className="figure">{step.figure}</p> : null}
      {step.caption ? <p className="subline">{step.caption}</p> : null}
      <p className="lede">{step.body}</p>
      {step.rows ? (
        <ul className="beats">
          {step.rows.map((row) => (
            <li key={row.name}>
              <strong>{row.name}</strong>
              <span>{row.detail}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="intro-art">
          <IntroArt id={step.id} />
        </div>
      )}
      {step.rows ? <div className="spacer" /> : null}
      {last ? (
        <button type="button" className="btn" onClick={finishIntro}>
          Create account
        </button>
      ) : (
        <>
          <button type="button" className="btn" onClick={nextIntro}>
            Next
          </button>
          <button type="button" className="btn text" onClick={skipIntro}>
            Skip
          </button>
        </>
      )}
      {last ? (
        <button type="button" className="linkish" onClick={goSignin}>
          I already have one
        </button>
      ) : null}
    </section>
  )
}
