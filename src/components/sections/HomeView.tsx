import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const HomeView = () => {
  const { activeSlug, projectState, hoverProject, fixProject, clearProject } = usePortfolioStore()

  const visibleSlug = activeSlug
  const isExpanded = projectState === 'expanded'

  return (
    <section className="fixed inset-0 z-10 pointer-events-none">

      {/* Fundo clicável — reseta quando fixed */}
      {projectState === 'fixed' && (
        <div
          className="absolute inset-0 pointer-events-auto"
          onClick={clearProject}
        />
      )}

      {/* Nome grande no centro — some quando expandido */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {projects.map((p) => (
          <h2
            key={p.slug}
            className="absolute font-serif leading-none tracking-tight select-none transition-all duration-700"
            style={{
              fontSize: 'clamp(72px, 11vw, 148px)',
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              opacity: visibleSlug === p.slug && !isExpanded ? 1 : 0,
              transform: visibleSlug === p.slug && !isExpanded ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            {p.name}
          </h2>
        ))}
      </div>

      {/* Deliverables */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="absolute mt-48 text-center transition-all duration-700"
            style={{
              opacity: visibleSlug === p.slug && !isExpanded ? 1 : 0,
              transform: visibleSlug === p.slug && !isExpanded ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: '100ms',
            }}
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
            onMouseEnter={() => hoverProject(p.slug)}
            onMouseLeave={() => {
              if (projectState === 'hover') clearProject()
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (projectState === 'fixed' && activeSlug === p.slug) {
                clearProject()
              } else {
                fixProject(p.slug)
              }
            }}
            className={`
              text-left px-5 py-2.5 rounded-full border text-[13px]
              font-medium tracking-wide whitespace-nowrap backdrop-blur-sm
              transition-all duration-500
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