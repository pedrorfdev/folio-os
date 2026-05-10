import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const MenuOverlay = () => {
  const menuOpen = usePortfolioStore((s) => s.menuOpen)
  const menuHoverSlug = usePortfolioStore((s) => s.menuHoverSlug)
  const activeSlug = usePortfolioStore((s) => s.activeSlug)
  const setMenuOpen = usePortfolioStore((s) => s.setMenuOpen)
  const setMenuHover = usePortfolioStore((s) => s.setMenuHover)
  const fixProject = usePortfolioStore((s) => s.fixProject)

  // projeto expandido ativo (vem do portfolio state)
  const expandedProject = projects.find((p) => p.slug === activeSlug)
  // projeto em hover no menu
  const hoveredProject = projects.find((p) => p.slug === menuHoverSlug)

  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

  // centro mostra: projeto expandido se existir, senão hover, senão vazio
  const centerProject = expandedProject ?? hoveredProject ?? null
  const showCoverCard = !!expandedProject?.coverImage

  return (
    <div
      className="fixed inset-0 z-[200] grid"
      style={{ gridTemplateColumns: '1fr 2fr 1fr', pointerEvents: 'none' }}
    >
      {/* Coluna esquerda */}
      <div
        className="flex flex-col gap-12"
        style={{
          background: '#f0ede8',
          padding: '120px 40px 48px',
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
                  // só seta hover se não tem projeto expandido
                  if (!expandedProject) setMenuHover(p.slug)
                  e.currentTarget.style.transform = 'translateX(8px)'
                  e.currentTarget.style.color = '#050608'
                }}
                onMouseLeave={(e) => {
                  if (!expandedProject) setMenuHover(null)
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.color = activeSlug === p.slug
                    ? '#050608'
                    : 'rgba(5,6,8,0.5)'
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
                  // projeto ativo fica mais escuro
                  color: activeSlug === p.slug ? '#050608' : 'rgba(5,6,8,0.5)',
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
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-[14px] no-underline py-1 transition-colors duration-200"
                style={{ color: 'rgba(5,6,8,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#050608')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(5,6,8,0.5)')}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-6 text-[12px]"
            style={{ color: 'rgba(5,6,8,0.4)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"
              style={{ boxShadow: '0 0 8px #16a34a', animation: 'pulse 2s ease-in-out infinite' }} />
            Disponível para projetos
          </div>
        </div>
      </div>

      {/* Coluna central */}
      <div
        className="flex flex-col justify-center items-center p-12 relative"
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {/* Botão fechar */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2
                     px-6 py-2.5 rounded font-mono text-[11px] tracking-widest uppercase border
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

        {/* Centro — card com imagem se projeto tem coverImage, senão texto */}
        <div
          style={{
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s 0.3s',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {showCoverCard && expandedProject ? (
            // Card com imagem — mesmo estilo do ProjectPreview pequeno
            <div className="w-72 flex flex-col gap-3">
              <div
                className="w-full rounded-xl overflow-hidden border"
                style={{
                  aspectRatio: '3/4',
                  borderColor: `${expandedProject.accent}30`,
                  background: `${expandedProject.accent}10`,
                }}
              >
                <img
                  src={expandedProject.coverImage}
                  alt={expandedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center px-1">
                <div>
                  <p className="text-[13px] font-medium text-white/90 mb-0.5">
                    {expandedProject.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                    {expandedProject.deliverables}
                  </p>
                </div>
                <span
                  className="font-mono text-[13px]"
                  style={{ color: expandedProject.accent }}
                >
                  ↗
                </span>
              </div>
            </div>
          ) : centerProject ? (
            // Sem imagem — só nome e info básica no hover
            <div className="text-center">
              <span
                className="font-mono text-[11px] tracking-[0.12em] uppercase block mb-4"
                style={{ color: centerProject.accent }}
              >
                {centerProject.num}
              </span>
              <h2
                className="font-serif leading-none mb-4"
                style={{
                  fontSize: 'clamp(40px, 5vw, 72px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                }}
              >
                {centerProject.name}
              </h2>
              <p
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {centerProject.deliverables}
              </p>
            </div>
          ) : (
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase"
              style={{ color: 'var(--color-text-muted)' }}>
              // hover em um projeto
            </p>
          )}
        </div>
      </div>

      {/* Coluna direita */}
      <div
        style={{
          background: '#f0ede8',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform 0.8s ${EASE}`,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      />
    </div>
  )
}