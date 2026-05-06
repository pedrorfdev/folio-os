import { Scene } from '../components/scene/Scene'
import { BgOverlay } from '../components/scene/BgOverlay'

export const Home = () => {
  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'var(--black)',
        overflow: 'hidden',
      }}
    >
      <BgOverlay />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        <Scene />
      </div>
    </main>
  )
}