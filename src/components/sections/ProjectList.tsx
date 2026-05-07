import { projects } from '../../data/projects'
import { ProjectItem } from './ProjectItem'

export const ProjectList = () => {
  return (
    <section id="projetos" className="w-full px-12 py-32 bg-black">
      <div className="flex justify-between items-end mb-20">
        <h2
          className="font-medium tracking-tight text-text-primary leading-none"
          style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.02em' }}
        >
          Projetos
        </h2>
        <span className="font-mono text-[12px] text-text-muted">
          {String(projects.length).padStart(2, '0')} total
        </span>
      </div>

      <ul className="border-b border-border">
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  )
}