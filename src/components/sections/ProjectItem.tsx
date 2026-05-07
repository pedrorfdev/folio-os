import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { usePortfolioStore } from '../../store/portfolio.store'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'
import { MetaItem } from '../ui/MetaItem'
import type { Project } from '../../data/projects'

type Props = { project: Project }

export const ProjectItem = ({ project }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject)
  const navigate = useNavigate()

  const handleMouseEnter = () => setActiveProject(project.slug)
  const handleMouseLeave = () => { if (!expanded) setActiveProject(null) }
  const handleClick = () => setExpanded((v) => !v)
  const handleNavigate = () => navigate({ to: '/projetos/$slug', params: { slug: project.slug } })

  return (
    <li
      className={`border-t border-border transition-colors duration-300 ${expanded ? 'border-border-hover' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header clicável */}
      <button
        onClick={handleClick}
        className="w-full grid gap-8 py-7 text-left transition-all duration-300"
        style={{ gridTemplateColumns: '56px 1fr auto auto' }}
      >
        <span className="font-mono text-[11px] text-text-muted tracking-wide self-center">
          {project.num}
        </span>

        <span
          className={`font-medium tracking-tight text-text-primary self-center
            text-[clamp(24px,3vw,40px)] transition-transform duration-400
            ${expanded ? 'translate-x-2' : ''}
          `}
        >
          {project.name}
        </span>

        <div className="flex gap-2 items-center self-center">
          {project.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <span
          className={`text-xl text-text-muted self-center transition-all duration-400
            ${expanded ? 'rotate-45 text-accent' : ''}
          `}
        >
          +
        </span>
      </button>

      {/* Painel expandido */}
      <div
        className={`grid transition-all duration-500 ease-out-custom
          ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className="overflow-hidden">
          <div
            className="grid gap-16 pb-12"
            style={{ gridTemplateColumns: '1fr 320px', paddingLeft: '88px', paddingRight: '24px' }}
          >
            <div>
              <p className="text-[16px] leading-relaxed text-text-secondary mb-8">
                {project.description}
              </p>
              <div className="flex gap-3 flex-wrap">
                {project.links.map((link) => (
                  <Button
                    key={link.label}
                    label={link.label}
                    href={link.url}
                    variant={link.primary ? 'primary' : 'ghost'}
                  />
                ))}
                <Button
                  label="Ver case study →"
                  variant="ghost"
                  onClick={handleNavigate}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-1">
              {project.meta.map((m) => (
                <MetaItem key={m.label} label={m.label} value={m.value} />
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}