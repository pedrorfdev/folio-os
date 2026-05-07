import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const ProjectPreview = () => {
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug)
  const fixedSlug = usePortfolioStore((s) => s.fixedProjectSlug)
  const setFixedProject = usePortfolioStore((s) => s.setFixedProject)

  const visibleSlug = fixedSlug ?? activeSlug

  return (
    <>
      {projects.map((p) => {
        const isVisible = visibleSlug === p.slug
        const isFixed = fixedSlug === p.slug

        return (
          <div
            key={p.slug}
            className="fixed z-20 transition-all duration-700"
            style={{
              // quando fixado, expande pra tela cheia
              // quando hover, fica na posição do card
              ...(isFixed
                ? { inset: 0, width: '100%', height: '100%', borderRadius: 0 }
                : { ...p.cardPosition, width: '320px' }
              ),
              clipPath: isVisible ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
              transition: 'clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1), inset 0.7s cubic-bezier(0.16, 1, 0.3, 1), width 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div
              className="w-full h-full relative overflow-hidden"
              style={{
                borderRadius: isFixed ? 0 : '12px',
                aspectRatio: isFixed ? 'unset' : '3/4',
                background: `radial-gradient(circle at 70% 30%, ${p.accent}40 0%, ${p.accent}08 60%, #0b0e14 100%)`,
                transition: 'border-radius 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-64 h-64 rounded-full blur-3xl opacity-40"
                  style={{ background: p.accent }}
                />
              </div>

              {/* Número */}
              <span
                className="absolute top-6 left-6 font-mono text-[11px] tracking-widest uppercase opacity-60"
                style={{ color: p.accent }}
              >
                {p.num}
              </span>

              {/* Botão fechar — só quando fixado */}
              {isFixed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setFixedProject(null)
                  }}
                  className="absolute top-6 right-6 font-mono text-[11px] tracking-widest uppercase
                             text-text-secondary hover:text-text-primary transition-colors duration-200
                             flex items-center gap-2 pointer-events-auto"
                >
                  <span>✕</span>
                  <span>Fechar</span>
                </button>
              )}

              {/* Conteúdo do case study — aparece quando fixado */}
              <div
                className={`
                  absolute bottom-12 left-12
                  transition-all duration-500 delay-300
                  ${isFixed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
              >
                <h2
                  className="font-serif leading-none mb-4"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 88px)',
                    letterSpacing: '-0.03em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {p.name}
                </h2>
                <p className="text-text-secondary text-[15px] leading-relaxed max-w-lg mb-6">
                  {p.description}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5
                                 border border-white/10 rounded-full text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}