import { useEffect, useRef, useState } from 'react'

export const useInView = (threshold = 0.4) => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const root = el.closest('[data-case-scroll]') as HTMLElement | null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        root,
        rootMargin: '0px 0px -15% 0px', // só dispara quando 15% do bottom já passou
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}