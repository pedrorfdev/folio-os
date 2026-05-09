import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (itemCount: number, staggerMs = 120) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const root = el.closest('[data-case-scroll]') as HTMLElement | null
    const scrollContainer = root ?? document.documentElement

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect()
      const containerHeight = root?.clientHeight ?? window.innerHeight

      // quanto do elemento está visível (0 a 1)
      const visible = 1 - Math.max(0, Math.min(1,
        (rect.top) / containerHeight
      ))

      // mapeia visibilidade pra quantidade de itens visíveis
      const count = Math.round(visible * (itemCount + 1))
      setVisibleCount(Math.max(0, Math.min(itemCount, count)))
    }

    scrollContainer.addEventListener('scroll', checkVisibility, { passive: true })
    checkVisibility() // checa na montagem
    return () => scrollContainer.removeEventListener('scroll', checkVisibility)
  }, [itemCount])

  return { ref, visibleCount }
}