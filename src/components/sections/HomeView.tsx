export const HomeView = () => {
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
      <div style={{ pointerEvents: 'auto' }}>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '12px',
          }}
        >
          // Product Engineer
        </p>
        <h1
          style={{
            fontSize: 'clamp(56px, 7vw, 96px)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            fontWeight: 500,
          }}
        >
          Pedro
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            Ferreira.
          </em>
        </h1>
      </div>
    </section>
  )
}