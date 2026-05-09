import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const MenuOverlay = () => {
  const menuOpen = usePortfolioStore((s) => s.menuOpen)
  const menuHoverSlug = usePortfolioStore((s) => s.menuHoverSlug)
  const setMenuOpen = usePortfolioStore((s) => s.setMenuOpen)
  const setMenuHover = usePortfolioStore((s) => s.setMenuHover)
  const fixProject = usePortfolioStore((s) => s.fixProject)

  const activeProject = projects.find((p) => p.slug === menuHoverSlug)
  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <div
      className="fixed inset-0 z-[200] grid"
      style={{
        gridTemplateColumns: '1fr 2fr 1fr',
        pointerEvents: 'none', // container nunca intercepta
      }}
    >
      {/* Coluna esquerda — só recebe eventos quando aberta */}
      <div
        style={{
          background: '#f0ede8',
          padding: '120px 40px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: `transform 0.8s ${EASE}`,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-4"
            style={{ color: 'rgba(5,6,8,0.4)' }}>
            // Projetos
          </span>
          <div className="flex flex-col gap-1">
            {projects.map((p) => (
              <button
                key={p.slug}
                onMouseEnter={(e) => {
                  setMenuHover(p.slug)
                  e.currentTarget.style.transform = 'translateX(8px)'
                  e.currentTarget.style.color = '#050608'
                }}
                onMouseLeave={(e) => {
                  setMenuHover(null)
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.color = 'rgba(5,6,8,0.5)'
                }}
                onClick={() => {
                  fixProject(p.slug)
                  setMenuOpen(false)
                  setMenuHover(null)
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  padding: '8px 0',
                  fontSize: '28px',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: 'rgba(5,6,8,0.5)',
                  cursor: 'none',
                  transition: `color 0.2s, transform 0.3s ${EASE}`,
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-4"
            style={{ color: 'rgba(5,6,8,0.4)' }}>
            // Links
          </span>
          <div className="flex flex-col gap-2">
            {[
              { label: 'GitHub', url: 'https://github.com/pedrorfdev' },
              { label: 'LinkedIn', url: 'https://linkedin.com' },
              { label: 'Currículo ↗', url: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] no-underline py-1 transition-colors duration-200"
                style={{ color: 'rgba(5,6,8,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#050608')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(5,6,8,0.5)')}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-6 text-[12px]" style={{ color: 'rgba(5,6,8,0.4)' }}>
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-600"
              style={{ boxShadow: '0 0 8px #16a34a', animation: 'pulse 2s ease-in-out infinite' }}
            />
            Disponível para projetos
          </div>
        </div>
      </div>

      {/* Coluna central — só recebe eventos quando aberta */}
      <div
        style={{
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px',
          position: 'relative',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-8 left-1/2 -translate-x-1/2
                     flex items-center gap-2 px-6 py-2.5 rounded
                     font-mono text-[11px] tracking-widest uppercase border
                     transition-colors duration-200"
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.15)',
            color: 'var(--color-text-primary)',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s 0.4s',
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}
        >
          <span>✕</span>
          <span>Fechar</span>
        </button>

        <div style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s 0.3s', textAlign: 'center' }}>
          {activeProject ? (
            <>
              <span
                className="font-mono text-[11px] tracking-[0.12em] uppercase block mb-4"
                style={{ color: activeProject.accent }}
              >
                {activeProject.num}
              </span>
              <h2
                className="font-serif leading-none mb-6"
                style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}
              >
                {activeProject.name}
              </h2>
              <p
                className="text-[15px] leading-relaxed max-w-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {activeProject.description}
              </p>
              <div className="flex gap-2 justify-center flex-wrap mt-8">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-text-muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p
              className="font-mono text-[11px] tracking-[0.1em] uppercase"
              style={{ color: 'var(--color-text-muted)' }}
            >
              // hover em um projeto
            </p>
          )}
        </div>
      </div>

      {/* Coluna direita — só recebe eventos quando aberta */}
      <div
        style={{
          background: '#f0ede8',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform 0.8s ${EASE}`,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      />
    </div >
  )
}