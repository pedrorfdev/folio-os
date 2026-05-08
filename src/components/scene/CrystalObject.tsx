import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import type { Mesh } from 'three'
import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

type GeometryType = 'icosahedron' | 'octahedron' | 'torusknot' | 'dodecahedron'

const Geometry = ({ type }: { type: GeometryType }) => {
  switch (type) {
    case 'icosahedron': return <icosahedronGeometry args={[1.2, 1]} />
    case 'octahedron': return <octahedronGeometry args={[1.3, 0]} />
    case 'torusknot': return <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
    case 'dodecahedron': return <dodecahedronGeometry args={[1.1, 0]} />
  }
}

export const CrystalObject = () => {
  const meshRef = useRef<Mesh>(null)
  const activeSlug = usePortfolioStore((s) => s.activeSlug)
  const cursorX = usePortfolioStore((s) => s.cursorX)
  const cursorY = usePortfolioStore((s) => s.cursorY)

  const activeProject = projects.find((p) => p.slug === activeSlug)
  const geometry = activeProject?.geometry ?? 'icosahedron'
  const color = activeProject?.accent ?? '#6b5fff'

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.3
    meshRef.current.rotation.x += (cursorY * 0.3 - meshRef.current.rotation.x) * 0.05
  })

  return (
    <mesh ref={meshRef}>
      <Geometry type={geometry} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        thickness={0.5}
        roughness={0.05}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.06}
        color={color}
      />
    </mesh>
  )
}