import { SectionLabel } from '../ui/SectionLabel'

const stack = [
  {
    label: 'Interface',
    items: ['React & Next.js', 'TypeScript', 'Tailwind v4', 'Framer Motion'],
  },
  {
    label: 'Sistemas',
    items: ['Node.js & NestJS', 'PostgreSQL / NoSQL', 'REST & APIs', 'Arquitetura modular'],
  },
  {
    label: 'Ferramentas',
    items: ['Git & GitHub', 'Docker', 'Vercel / Railway', 'IA-Driven Dev'],
  },
]

export const TechStack = () => {
  return (
    <section className="w-full px-12 py-32 bg-black">
      <SectionLabel label="Ecossistema Técnico" />

      <div className="grid grid-cols-3 border border-border rounded-xl overflow-hidden">
        {stack.map((col, i) => (
          <div
            key={col.label}
            className={`
              flex flex-col gap-4 p-10 bg-surface
              hover:bg-surface-2 transition-colors duration-300
              ${i < stack.length - 1 ? 'border-r border-border' : ''}
            `}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent flex items-center gap-2">
              <span>//</span>
              {col.label}
            </span>

            <div className="flex flex-col">
              {col.items.map((item) => (
                <span
                  key={item}
                  className="text-[15px] text-text-secondary py-2 border-b border-border last:border-none
                             group-hover:text-text-primary transition-colors duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}