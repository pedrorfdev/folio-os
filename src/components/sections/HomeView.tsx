import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const HomeView = () => {
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject)

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '48px',
      }}
    >
      {/* Lista de projetos — lado esquerdo, centro vertical */}
      <div
        style={{
          position: 'absolute',
          left: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          pointerEvents: 'auto',
        }}
      >
        {projects.map((p) => (
          <button
            key={p.slug}
            onMouseEnter={(e) => {
              setActiveProject(p.slug)
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              setActiveProject(null)
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px',
              padding: '8px 16px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              cursor: 'none',
              textAlign: 'left',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>
    </section>
  )
}