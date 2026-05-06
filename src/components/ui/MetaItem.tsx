type MetaItemProps = {
  label: string
  value: string
}

export const MetaItem = ({ label, value }: MetaItemProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        {value}
      </span>
    </div>
  )
}