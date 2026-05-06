type TagProps = {
  label: string
  variant?: 'default' | 'accent'
}

export const Tag = ({ label, variant = 'default' }: TagProps) => {
  const styles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 10px',
    borderRadius: '100px',
    fontSize: '10px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: '1px solid',
    borderColor: variant === 'accent' ? 'var(--accent)' : 'var(--border-hover)',
    color: variant === 'accent' ? 'var(--accent)' : 'var(--text-muted)',
    background: variant === 'accent' ? 'var(--accent-glow)' : 'transparent',
    whiteSpace: 'nowrap',
  }

  return <span style={styles}>{label}</span>
}