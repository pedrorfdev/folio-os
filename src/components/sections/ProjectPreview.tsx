import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const ProjectPreview = () => {
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug)
  const fixedSlug = usePortfolioStore((s) => s.fixedProjectSlug)
  const expandedSlug = usePortfolioStore((s) => s.expandedProjectSlug)
  const setExpandedProject = usePortfolioStore((s) => s.setExpandedProject)
  const setFixedProject = usePortfolioStore((s) => s.setFixedProject)
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject)

  const visibleSlug = expandedSlug ?? fixedSlug ?? activeSlug

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedProject(null)
    setFixedProject(null)
    setActiveProject(null)
  }

  return (
    <>
      {projects.map((p) => {
        const isVisible = visibleSlug === p.slug
        const isExpanded = expandedSlug === p.slug

        return (
          <div
            key={p.slug}
            className="fixed z-20"
            style={{
              // expanded: tela cheia partindo da posição do card
              // visible: posição do card
              // hidden: posição do card mas invisível
              ...(isExpanded
                ? { inset: 0 }
                : { ...p.cardPosition, width: '320px' }
              ),
              clipPath: isVisible ? 'inset(0% 0% 0% 0% round 12px)' : 'inset(0% 100% 0% 0% round 12px)',
              borderRadius: isExpanded ? '0px' : '12px',
              transition: [
                'inset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                'clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                'border-radius 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              ].join(', '),
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div
              className="w-full h-full relative overflow-hidden"
              style={{
                aspectRatio: isExpanded ? 'unset' : '3/4',
                background: `radial-gradient(circle at 60% 30%, ${p.accent}35 0%, ${p.accent}06 55%, #050608 100%)`,
                transition: 'aspect-ratio 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Glow */}
              <div
                className={`absolute rounded-full blur-3xl opacity-30 transition-all duration-700 ${isExpanded ? 'w-96 h-96 top-1/4 left-1/4' : 'w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  }`}
                style={{ background: p.accent }}
              />

              {/* Número */}
              <span
                className="absolute top-6 left-6 font-mono text-[11px] tracking-widest uppercase opacity-50"
                style={{ color: p.accent }}
              >
                {p.num}
              </span>

              {/* Clique no card — só quando não expandido */}
              {!isExpanded && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedProject(p.slug)
                    setFixedProject(p.slug)
                  }}
                  className="absolute inset-0 w-full h-full group"
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />
                  <span
                    className="absolute bottom-4 right-4 text-[18px] opacity-0 group-hover:opacity-100
                               transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                    style={{ color: p.accent }}
                  >
                    ↗
                  </span>
                </button>
              )}

              {/* Conteúdo expandido — aparece com delay */}
              <div
                className={`
                  absolute transition-all duration-500
                  ${isExpanded ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-6 delay-0'}
                `}
                style={{ top: '10%', left: '6%' }}
              >
                <span
                  className="font-mono text-[11px] tracking-widest uppercase block mb-4 opacity-60"
                  style={{ color: p.accent }}
                >
                  {p.num} — {p.deliverables}
                </span>
                <h2
                  className="font-serif leading-none mb-6"
                  style={{
                    fontSize: 'clamp(56px, 8vw, 120px)',
                    letterSpacing: '-0.03em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {p.name}
                </h2>

                {/* Meta — tipo, stage, deliverables — como na ref */}
                <div className="flex gap-16 mb-8 border-t border-white/10 pt-6">
                  {p.meta.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
                        {m.label}
                      </span>
                      <span className="text-[13px] text-text-secondary">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão fechar */}
              {isExpanded && (
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 font-mono text-[11px] tracking-widest uppercase
                             text-text-secondary hover:text-text-primary transition-colors duration-200
                             flex items-center gap-2 z-10"
                >
                  <span>✕</span>
                  <span>Fechar</span>
                </button>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}