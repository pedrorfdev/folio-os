import { useEffect } from 'react'
import { usePortfolioStore } from '../store/portfolio.store'

export function useMousePosition() {
  const setCursor = usePortfolioStore((s) => s.setCursor)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setCursor(x, y)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [setCursor])
}