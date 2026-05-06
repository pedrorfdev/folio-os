type SectionLabelProps = {
  label: string
}

export const SectionLabel = ({ label }: SectionLabelProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'monospace',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '24px',
      }}
    >
      <span>//</span>
      <span>{label}</span>
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to right, var(--border-hover), transparent)',
        }}
      />
    </div>
  )
}