import { usePortfolioStore } from '../../store/portfolio.store'

export const Nav = () => {
  const menuOpen = usePortfolioStore((s) => s.menuOpen)
  const setMenuOpen = usePortfolioStore((s) => s.setMenuOpen)

  return (
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      style={{
        position: 'fixed',
        top: '32px',
        left: '40px',
        zIndex: 300,
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
      <span>{menuOpen ? '✕' : '☰'}</span>
      <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
    </button>
  )
}