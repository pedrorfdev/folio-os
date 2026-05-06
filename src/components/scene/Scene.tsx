import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { CrystalObject } from './CrystalObject'

export const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#6b5fff" />
      <Environment preset="city" />
      <CrystalObject />
    </Canvas>
  )
}