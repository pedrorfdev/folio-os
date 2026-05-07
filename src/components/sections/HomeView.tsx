import { useNavigate } from '@tanstack/react-router'
import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const HomeView = () => {
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject)
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug)
  const navigate = useNavigate()

  return (
    <section className="fixed inset-0 z-10 pointer-events-none">

      {/* Nome grande no centro — serif, como na ref */}
      <div className="absolute inset-0 flex items-center justify-center">
        {projects.map((p) => (
          <h2
            key={p.slug}
            className={`
              absolute font-serif leading-none tracking-tight select-none
              transition-all duration-700
              ${activeSlug === p.slug
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
              }
            `}
            style={{
              fontSize: 'clamp(72px, 11vw, 148px)',
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
            }}
          >
            {p.name}
          </h2>
        ))}
      </div>

      {/* Deliverables — abaixo do centro, aparece com o nome */}
      <div className="absolute inset-0 flex items-center justify-center">
        {projects.map((p) => (
          <div
            key={p.slug}
            className={`
              absolute mt-48 text-center
              transition-all duration-700 delay-100
              ${activeSlug === p.slug
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
              }
            `}
          >
            <span className="font-mono text-[11px] tracking-widest uppercase text-text-muted">
              {p.deliverables}
            </span>
          </div>
        ))}
      </div>

      {/* Lista de projetos — coluna esquerda, centro vertical */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto">
        {projects.map((p) => (
          <button
            key={p.slug}
            onMouseEnter={() => setActiveProject(p.slug)}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => navigate({ to: '/projetos/$slug', params: { slug: p.slug } })}
            className={`
              text-left px-5 py-2.5 rounded-full
              border text-[13px] font-medium tracking-wide whitespace-nowrap
              backdrop-blur-sm transition-all duration-500
              ${activeSlug === p.slug
                ? 'text-text-primary bg-white/10 border-white/20'
                : 'text-text-secondary bg-white/[0.04] border-white/[0.08]'
              }
            `}
          >
            {p.name}
          </button>
        ))}
      </div>

    </section>
  )
}