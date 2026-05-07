import { Scene } from '../components/scene/Scene'
import { BgOverlay } from '../components/scene/BgOverlay'
import { Nav } from '../components/sections/Nav'
import { HomeView } from '../components/sections/HomeView'
import { MenuOverlay } from '../components/sections/MenuOverlay'
import { ProjectPreview } from '../components/sections/ProjectPreview'

export const Home = () => {
  return (
    <main className="bg-black w-screen h-screen overflow-hidden">
      <Scene />
      <BgOverlay />
      <Nav />
      <HomeView />
      <ProjectPreview />
      <MenuOverlay />
    </main>
  )
}