type ButtonProps = {
  label: string
  href?: string
  variant?: 'primary' | 'ghost'
  onClick?: () => void
}

export const Button = ({ label, href, variant = 'ghost', onClick }: ButtonProps) => {
  const styles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    border: '1px solid',
    transition: 'opacity 0.2s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    ...(variant === 'primary'
      ? {
          background: 'var(--text-primary)',
          borderColor: 'var(--text-primary)',
          color: 'var(--black)',
        }
      : {
          background: 'transparent',
          borderColor: 'var(--border-hover)',
          color: 'var(--text-secondary)',
        }),
  }

  if (href) {
    return (
      <a href={href} style={styles} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    )
  }

  return (
    <button style={styles} onClick={onClick}>
      {label}
    </button>
  )
}