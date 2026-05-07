import { useNavigate } from '@tanstack/react-router'
import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const ProjectPreview = () => {
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug)
  const navigate = useNavigate()

  return (
    <>
      {projects.map((p) => {
        const isActive = activeSlug === p.slug

        return (
          <div
            key={p.slug}
            className="fixed z-10 w-80"
            style={{
              ...p.cardPosition,
              clipPath: isActive ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
              transition: 'clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <button
              onClick={() => navigate({ to: '/projetos/$slug', params: { slug: p.slug } })}
              className="w-full text-left group block"
            >
              {/* Card imagem — placeholder com glow e gradiente */}
              <div
                className="w-full relative overflow-hidden rounded-xl border border-white/10"
                style={{
                  aspectRatio: '3/4',
                  background: `radial-gradient(circle at 70% 30%, ${p.accent}40 0%, ${p.accent}08 60%, #0b0e14 100%)`,
                }}
              >
                {/* Glow central */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="w-32 h-32 rounded-full blur-3xl opacity-60"
                    style={{ background: p.accent }}
                  />
                </div>

                {/* Número canto superior esquerdo */}
                <span
                  className="absolute top-4 left-4 font-mono text-[11px] tracking-widest uppercase opacity-60"
                  style={{ color: p.accent }}
                >
                  {p.num}
                </span>

                {/* Hover overlay — escurece levemente indicando clicável */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl" />

                {/* Seta canto inferior direito no hover */}
                <span
                  className="absolute bottom-4 right-4 text-[18px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                  style={{ color: p.accent }}
                >
                  ↗
                </span>
              </div>
            </button>
          </div>
        )
      })}
    </>
  )
}