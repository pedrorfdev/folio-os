import { useRef, useState, useLayoutEffect } from 'react'
import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

type CardRect = { top: number; left: number; width: number; height: number }

const CARD_W = 320
const CARD_H = 427
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

// cores sólidas por projeto — fundo real, sem transparência
const solidBg: Record<string, string> = {
  praxis: '#0d0b1a',
  'evento-rsvp': '#1a0b12',
  'guia-ia': '#0b1a12',
  agro: '#1a130b',
}

export const ProjectPreview = () => {
  const { activeSlug, projectState, expandProject, clearProject } = usePortfolioStore()

  const isExpanded = projectState === 'expanded'
  const visibleSlug = activeSlug

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [expandedRects, setExpandedRects] = useState<Record<string, CardRect>>({})
  // controla se a transição está ativa — começa false, vira true após 1 frame
  const [animating, setAnimating] = useState<Record<string, boolean>>({})

  const handleExpand = (slug: string) => {
    const el = cardRefs.current[slug]
    if (!el) return

    const r = el.getBoundingClientRect()
    // salva rect ANTES de expandir
    setExpandedRects((prev) => ({
      ...prev,
      [slug]: { top: r.top, left: r.left, width: r.width, height: r.height },
    }))
    // desativa transição pra começar no clipFrom sem animar
    setAnimating((prev) => ({ ...prev, [slug]: false }))
    expandProject(slug)
  }

  // após expandProject, espera 1 frame e ativa a transição
  useLayoutEffect(() => {
    if (!isExpanded || !activeSlug) return
    const id = requestAnimationFrame(() => {
      setAnimating((prev) => ({ ...prev, [activeSlug]: true }))
    })
    return () => cancelAnimationFrame(id)
  }, [isExpanded, activeSlug])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    clearProject()
  }

  return (
    <>
      {projects.map((p) => {
        const isVisible = visibleSlug === p.slug
        const isThisExpanded = isExpanded && visibleSlug === p.slug
        const rect = expandedRects[p.slug]
        const isAnimating = animating[p.slug]

        const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
        const vh = typeof window !== 'undefined' ? window.innerHeight : 900

        const clipFrom = rect
          ? `inset(${rect.top}px ${vw - rect.left - rect.width}px ${vh - rect.top - rect.height}px ${rect.left}px)`
          : `inset(${vh / 2}px ${vw / 2}px ${vh / 2}px ${vw / 2}px)`

        const clipTo = 'inset(0px 0px 0px 0px)'

        return (
          <div key={p.slug}>

            {/* Card pequeno */}
            <div
              ref={(el) => { cardRefs.current[p.slug] = el }}
              className="fixed z-20 overflow-hidden"
              style={{
                ...p.cardPosition,
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                borderRadius: '12px',
                clipPath: isVisible && !isThisExpanded
                  ? 'inset(0% 0% 0% 0%)'
                  : 'inset(0% 100% 0% 0%)',
                transition: `clip-path 0.7s ${EASE}`,
                pointerEvents: isVisible && !isThisExpanded ? 'auto' : 'none',
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: solidBg[p.slug] ?? '#050608' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 65% 25%, ${p.accent}50 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute rounded-full blur-2xl opacity-40 pointer-events-none"
                style={{ background: p.accent, width: '140px', height: '140px', top: '25%', left: '25%' }}
              />
              <span
                className="absolute top-5 left-5 font-mono text-[11px] tracking-widest uppercase opacity-50"
                style={{ color: p.accent }}
              >
                {p.num}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); handleExpand(p.slug) }}
                className="absolute inset-0 group"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <span
                  className="absolute bottom-4 right-4 text-lg opacity-0 group-hover:opacity-100
                             translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                  style={{ color: p.accent }}
                >
                  ↗
                </span>
              </button>
            </div>

            {/* Seção expandida */}
            <div
              className="fixed z-30 overflow-hidden"
              style={{
                inset: 0,
                // começa no clipFrom sem transição, depois anima pra clipTo
                clipPath: isThisExpanded && isAnimating ? clipTo : clipFrom,
                transition: isThisExpanded && isAnimating
                  ? `clip-path 0.9s ${EASE}`
                  : 'none',
                pointerEvents: isThisExpanded ? 'auto' : 'none',
                // some completamente quando não expandido
                visibility: isThisExpanded ? 'visible' : 'hidden',
              }}
            >
              {/* Fundo sólido garantido */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: solidBg[p.slug] ?? '#050608' }}
              />
              {/* Gradiente sobre o sólido */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 70% 20%, ${p.accent}30 0%, transparent 55%)`,
                }}
              />
              {/* Glow */}
              <div
                className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: p.accent, width: '500px', height: '500px', top: '5%', right: '5%' }}
              />

              {/* Conteúdo */}
              <div
                className="absolute"
                style={{
                  top: '10%', left: '6%', right: '6%',
                  opacity: isThisExpanded && isAnimating ? 1 : 0,
                  transform: isThisExpanded && isAnimating ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.4s ease 0.6s, transform 0.5s ${EASE} 0.55s`,
                  pointerEvents: 'none',
                }}
              >
                <span
                  className="font-mono text-[11px] tracking-widest uppercase block mb-6 opacity-60"
                  style={{ color: p.accent }}
                >
                  {p.num} — {p.deliverables}
                </span>
                <h2
                  className="font-serif leading-none mb-8"
                  style={{
                    fontSize: 'clamp(56px, 8vw, 120px)',
                    letterSpacing: '-0.03em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {p.name}
                </h2>
                <div className="flex gap-16 border-t border-white/10 pt-6 mb-6">
                  {p.meta.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
                        {m.label}
                      </span>
                      <span className="text-[14px] text-text-secondary">{m.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-text-secondary text-[15px] leading-relaxed max-w-xl">
                  {p.description}
                </p>
              </div>

              {/* Botão voltar */}
              <button
                onClick={handleClose}
                className="absolute top-8 right-10 z-10 pointer-events-auto
                           flex items-center gap-2 px-4 py-2.5 rounded
                           border font-mono text-[11px] tracking-widest uppercase
                           text-text-secondary hover:text-text-primary
                           hover:border-white/20 transition-colors duration-200"
                style={{
                  borderColor: 'var(--color-border-hover)',
                  opacity: isThisExpanded && isAnimating ? 1 : 0,
                  transition: `opacity 0.3s ease 0.7s, color 0.2s, border-color 0.2s`,
                }}
              >
                <span>✕</span>
                <span>Voltar</span>
              </button>
            </div>

          </div>
        )
      })}
    </>
  )
}