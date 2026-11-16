import { useState } from 'react'
import { asset } from './asset'
import { Surface } from './screens'
import { RevetaProvider } from './state'
import { useFit } from './chrome'
import type { Finish } from './types'

const finishes: { id: Finish; name: string; color: string }[] = [
  { id: 'orange', name: 'Cosmic Orange', color: '#e07a3a' },
  { id: 'silver', name: 'Silver', color: '#d5d7da' },
  { id: 'blue', name: 'Deep Blue', color: '#243858' },
]

export default function App() {
  const fit = useFit()
  const [finish, setFinish] = useState<Finish>('orange')
  const finishName = finishes.find((item) => item.id === finish)?.name ?? 'Cosmic Orange'

  if (fit.compact) {
    return (
      <RevetaProvider>
        <div className="glass fullscreen native">
          <Surface />
        </div>
      </RevetaProvider>
    )
  }

  return (
    <RevetaProvider>
      <div className="stage">
        <div className="slot" style={{ width: 440 * fit.scale, height: 908 * fit.scale }}>
          <div className="device" style={{ transform: `scale(${fit.scale})` }}>
            <div className={`chassis finish-${finish}`}>
              <span className="hw side" />
              <span className="hw vu" />
              <span className="hw vd" />
              <span className="hw power" />
              <div className="glass">
                <Surface />
              </div>
            </div>
          </div>
        </div>
        <div className="caption">
          <img className="brand-word stage" src={asset('brand/wordmark.png')} alt="Reveta" />
          <p>iPhone 17 Pro · {finishName}</p>
          <div className="finishes">
            {finishes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === finish ? 'swatch on' : 'swatch'}
                style={{ background: item.color }}
                aria-label={item.name}
                onClick={() => setFinish(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </RevetaProvider>
  )
}
