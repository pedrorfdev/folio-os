import { useEffect, useRef, useState } from 'react'

export const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const root = el.closest('[data-case-scroll]') as HTMLElement | null

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entra quando aparece, sai quando desaparece por baixo
        if (entry.isIntersecting) {
          setInView(true)
        } else if (entry.boundingClientRect.top > 0) {
          // elemento saiu por baixo (usuário scrollou pra cima)
          setInView(false)
        }
        // se saiu por cima (scrollou pra baixo passando), mantém visível
      },
      { threshold, root }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}