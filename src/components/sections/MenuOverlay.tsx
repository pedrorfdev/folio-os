import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const MenuOverlay = () => {
  const menuOpen = usePortfolioStore((s) => s.menuOpen)
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug)
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject)
  const setMenuOpen = usePortfolioStore((s) => s.setMenuOpen)

  const activeProject = projects.find((p) => p.slug === activeSlug)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        pointerEvents: menuOpen ? 'auto' : 'none',
      }}
    >
      {/* Coluna esquerda — entra da esquerda */}
      <div
        style={{
          background: '#f0ede8',
          padding: '120px 40px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(5,6,8,0.4)',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            // Projetos
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {projects.map((p) => (
              <button
                key={p.slug}
                onMouseEnter={(e) => {
                  setActiveProject(p.slug)
                  e.currentTarget.style.transform = 'translateX(8px)'
                  e.currentTarget.style.color = '#050608'
                }}
                onMouseLeave={(e) => {
                  setActiveProject(null)
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.color = 'rgba(5,6,8,0.5)'
                }}
                onClick={() => setMenuOpen(false)}
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
                  transition: 'color 0.2s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(5,6,8,0.4)',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            // Links
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                style={{
                  fontSize: '14px',
                  color: 'rgba(5,6,8,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  padding: '4px 0',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#050608')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(5,6,8,0.5)')}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'rgba(5,6,8,0.4)',
              marginTop: '24px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#16a34a',
                boxShadow: '0 0 8px #16a34a',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            Disponível para projetos
          </div>
        </div>
      </div>

      {/* Coluna central — fundo preto transparente, sempre visível */}
      <div
        style={{
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px',
          position: 'relative',
        }}
      >
        {/* Botão fechar — centro topo */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '4px',
            padding: '10px 24px',
            color: 'var(--text-primary)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'none',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s 0.4s, background 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          <span>✕</span>
          <span>Fechar</span>
        </button>

        {/* Preview do projeto */}
        <div
          style={{
            textAlign: 'center',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s 0.3s',
          }}
        >
          {activeProject ? (
            <>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: activeProject.accent,
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {activeProject.num}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(40px, 5vw, 72px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  marginBottom: '24px',
                }}
              >
                {activeProject.name}
              </h2>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  maxWidth: '400px',
                }}
              >
                {activeProject.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginTop: '32px',
                }}
              >
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      padding: '4px 10px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '100px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              // hover em um projeto
            </p>
          )}
        </div>
      </div>

      {/* Coluna direita — entra da direita */}
      <div
        style={{
          background: '#f0ede8',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div >
  )
}