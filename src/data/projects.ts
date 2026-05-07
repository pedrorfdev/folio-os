export type CardPosition = {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export type Project = {
  slug: string
  num: string
  name: string
  description: string
  tags: string[]
  accent: string
  geometry: 'icosahedron' | 'octahedron' | 'torusknot' | 'dodecahedron'
  links: { label: string; url: string; primary?: boolean }[]
  meta: { label: string; value: string }[]
  deliverables: string
  cardPosition: CardPosition
}

export const projects: Project[] = [
  {
    slug: 'praxis',
    num: '01',
    name: 'Praxis',
    description: 'Sistema clínico para terapia ocupacional com gestão de pacientes, responsáveis, consultas e evoluções com anamnese estruturada.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    accent: '#6b5fff',
    geometry: 'icosahedron',
    deliverables: 'Product Design, Engineering',
    cardPosition: { bottom: '48px', right: '48px' },
    links: [{ label: 'Ver projeto', url: '#', primary: true }],
    meta: [
      { label: 'Tipo', value: 'Sistema clínico' },
      { label: 'Status', value: 'Em produção' },
    ],
  },
  {
    slug: 'evento-rsvp',
    num: '02',
    name: 'Evento RSVP',
    description: 'Plataforma de gestão de eventos sociais privados com site personalizado por evento e painel de controle de confirmações.',
    tags: ['React', 'Node.js', 'Multi-tenant'],
    accent: '#ff5f9e',
    geometry: 'dodecahedron',
    deliverables: 'Product Design, Engineering, Strategy',
    cardPosition: { bottom: '48px', left: '48px' },
    links: [{ label: 'Ver projeto', url: '#', primary: true }],
    meta: [
      { label: 'Tipo', value: 'Produto B2B + B2C' },
      { label: 'Status', value: 'Em validação' },
    ],
  },
  {
    slug: 'guia-ia',
    num: '03',
    name: 'Guia de Turismo IA',
    description: 'Gerador de roteiros personalizados com IA — destino, datas e orçamento como input, guia completo com locais e links como output.',
    tags: ['React', 'OpenAI', 'Node.js'],
    accent: '#5fffa0',
    geometry: 'torusknot',
    deliverables: 'Engineering, AI Integration',
    cardPosition: { top: '48px', right: '48px' },
    links: [{ label: 'Ver projeto', url: '#', primary: true }],
    meta: [
      { label: 'Tipo', value: 'Produto consumer' },
      { label: 'Status', value: 'Em construção' },
    ],
  },
  {
    slug: 'agro',
    num: '04',
    name: 'Agro Gestão',
    description: 'Sistema de controle de cargas e financeiro para o agronegócio, com upload de documentos e acesso multi-usuário.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    accent: '#ffb45f',
    geometry: 'octahedron',
    deliverables: 'Engineering, Product Design',
    cardPosition: { top: '55%', right: '15%' },
    links: [{ label: 'Ver projeto', url: '#', primary: true }],
    meta: [
      { label: 'Tipo', value: 'Sistema interno' },
      { label: 'Status', value: 'Em construção' },
    ],
  },
]