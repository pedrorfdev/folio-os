import { useState } from 'react'
import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const Nav = () => {
  const [open, setOpen] = useState(false)
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject)

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed',
          top: '32px',
          left: '40px',
          zIndex: 200,
          background: 'transparent',
          border: '1px solid var(--border-hover)',
          borderRadius: '4px',
          padding: '10px 16px',
          color: 'var(--text-secondary)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'none',
          transition: 'color 0.2s, border-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--text-primary)'
          e.currentTarget.style.borderColor = 'var(--text-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.borderColor = 'var(--border-hover)'
        }}
      >
        <span>{open ? '✕' : '☰'}</span>
        <span>{open ? 'Fechar' : 'Menu'}</span>
      </button>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '320px',
          zIndex: 150,
          background: 'rgba(5, 6, 8, 0.95)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid var(--border)',
          padding: '120px 40px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
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
                style={{
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  padding: '8px 0',
                  fontSize: '24px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-secondary)',
                  cursor: 'none',
                  transition: 'color 0.2s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  setActiveProject(p.slug)
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.transform = 'translateX(8px)'
                }}
                onMouseLeave={(e) => {
                  setActiveProject(null)
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
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
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  padding: '4px 0',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            Disponível para projetos
          </div>
        </div>
      </div>
    </>
  )
}