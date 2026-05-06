import { usePortfolioStore } from '../../store/portfolio.store'
import { projects } from '../../data/projects'

export const BgOverlay = () => {
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug)
  const activeProject = projects.find((p) => p.slug === activeSlug)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: activeProject?.accent ?? 'transparent',
        opacity: activeSlug ? 0.05 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  )
}