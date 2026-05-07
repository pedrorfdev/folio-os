import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const HomeView = () => {
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject)
  const setFixedProject = usePortfolioStore((s) => s.setFixedProject)
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug)
  const fixedSlug = usePortfolioStore((s) => s.fixedProjectSlug)

  // o slug "visível" é o fixado ou o em hover
  const visibleSlug = fixedSlug ?? activeSlug

  const handlePillClick = (slug: string) => {
    // se já está fixado nesse projeto, desfixar
    if (fixedSlug === slug) {
      setFixedProject(null)
    } else {
      setFixedProject(slug)
    }
  }

  return (
    <section className="fixed inset-0 z-10 pointer-events-none">

      {/* Fundo clicável — só quando tem projeto fixado */}
      {fixedSlug && (
        <div
          className="absolute inset-0 pointer-events-auto"
          onClick={() => setFixedProject(null)}
        />
      )}

      {/* Nome grande no centro */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {projects.map((p) => (
          <h2
            key={p.slug}
            className={`
              absolute font-serif leading-none tracking-tight select-none
              transition-all duration-700
              ${visibleSlug === p.slug ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
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

      {/* Deliverables abaixo do nome */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {projects.map((p) => (
          <div
            key={p.slug}
            className={`
              absolute mt-48 text-center transition-all duration-700 delay-100
              ${visibleSlug === p.slug ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}
          >
            <span className="font-mono text-[11px] tracking-widest uppercase text-text-muted">
              {p.deliverables}
            </span>
          </div>
        ))}
      </div>

      {/* Lista de projetos */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto">
        {projects.map((p) => (
          <button
            key={p.slug}
            onMouseEnter={() => { if (!fixedSlug) setActiveProject(p.slug) }}
            onMouseLeave={() => { if (!fixedSlug) setActiveProject(null) }}
            onClick={(e) => {
              e.stopPropagation()
              handlePillClick(p.slug)
            }}
            className={`
              text-left px-5 py-2.5 rounded-full
              border text-[13px] font-medium tracking-wide whitespace-nowrap
              backdrop-blur-sm transition-all duration-500
              ${visibleSlug === p.slug
                ? 'text-text-primary bg-white/10 border-white/20'
                : 'text-text-secondary bg-white/4 border-white/8'
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