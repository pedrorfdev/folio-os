import { Scene } from '../components/scene/Scene'
import { BgOverlay } from '../components/scene/BgOverlay'
import { Nav } from '../components/sections/Nav'
import { HomeView } from '../components/sections/HomeView'

export const Home = () => {
  return (
    <main style={{ background: 'var(--black)', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Scene />
      <BgOverlay />
      <Nav />
      <HomeView />
    </main>
  )
}