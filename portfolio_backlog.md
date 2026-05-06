
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-sans); }

.board { padding: 1rem 0; }

.legend { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 1.5rem; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--color-text-secondary); }
.dot { width: 8px; height: 8px; border-radius: 50%; }

.phase { margin-bottom: 2rem; }
.phase-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 0.5px solid var(--color-border-tertiary); }
.phase-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-secondary); }
.phase-title { font-size: 15px; font-weight: 500; color: var(--color-text-primary); }
.phase-badge { font-size: 11px; padding: 2px 8px; border-radius: 100px; background: var(--color-background-secondary); color: var(--color-text-secondary); border: 0.5px solid var(--color-border-tertiary); margin-left: auto; }

.tasks { display: flex; flex-direction: column; gap: 6px; }

.task { 
  display: grid; 
  grid-template-columns: 16px 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 10px 14px; 
  background: var(--color-background-primary); 
  border: 0.5px solid var(--color-border-tertiary); 
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: border-color 0.15s;
}
.task:hover { border-color: var(--color-border-secondary); }

.task-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.task-name { font-size: 13px; color: var(--color-text-primary); }
.task-sub { font-size: 11px; color: var(--color-text-secondary); margin-top: 2px; }

.tag { font-size: 10px; padding: 2px 8px; border-radius: 100px; white-space: nowrap; }
.tag-fe { background: #EEEDFE; color: #3C3489; }
.tag-be { background: #E1F5EE; color: #085041; }
.tag-3d { background: #FAECE7; color: #712B13; }
.tag-content { background: #FAEEDA; color: #633806; }
.tag-dx { background: #E6F1FB; color: #0C447C; }

.est { font-size: 11px; color: var(--color-text-secondary); white-space: nowrap; }

.p-high { background: #E24B4A; }
.p-mid  { background: #EF9F27; }
.p-low  { background: #639922; }
</style>

<div class="board">
  <div class="legend">
    <div class="legend-item"><div class="dot p-high"></div> Alta prioridade</div>
    <div class="legend-item"><div class="dot p-mid"></div> Média prioridade</div>
    <div class="legend-item"><div class="dot p-low"></div> Baixa prioridade</div>
  </div>

  <div class="phase">
    <div class="phase-header">
      <span class="phase-label">Fase 1</span>
      <span class="phase-title">Scaffold & Fundação</span>
      <span class="phase-badge">~1 dia</span>
    </div>
    <div class="tasks">
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Setup do projeto</div><div class="task-sub">Vite + React + TypeScript + Tailwind v4</div></div><span class="tag tag-dx">DevX</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Instalar e configurar libs</div><div class="task-sub">R3F, Drei, Framer Motion, Zustand, TanStack Router</div></div><span class="tag tag-dx">DevX</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Estrutura de pastas</div><div class="task-sub">components/, store/, data/, hooks/, sections/</div></div><span class="tag tag-dx">DevX</span><span class="est">30m</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">TanStack Router — rotas base</div><div class="task-sub">/ home · /projetos/:slug · layout wrapper</div></div><span class="tag tag-fe">FE</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Zustand store</div><div class="task-sub">activeProject, cursorX/Y, isExpanded</div></div><span class="tag tag-fe">FE</span><span class="est">30m</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">data/projects.ts</div><div class="task-sub">Array tipado com todos os projetos e metadados</div></div><span class="tag tag-content">Conteúdo</span><span class="est">1h</span></div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-header">
      <span class="phase-label">Fase 2</span>
      <span class="phase-title">Canvas 3D — Objeto Central</span>
      <span class="phase-badge">~2 dias</span>
    </div>
    <div class="tasks">
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Scene.jsx — canvas base</div><div class="task-sub">Canvas R3F, câmera perspectiva, ambient + point lights</div></div><span class="tag tag-3d">3D</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">CrystalObject.jsx</div><div class="task-sub">Geometria com MeshTransmissionMaterial (vidro/cristal)</div></div><span class="tag tag-3d">3D</span><span class="est">3h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">useMousePosition hook</div><div class="task-sub">Normaliza cursor -1 a 1, lerp suave no useFrame</div></div><span class="tag tag-3d">3D</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Cursor tracking no objeto</div><div class="task-sub">Objeto "olha" pro cursor com rotation lerp</div></div><span class="tag tag-3d">3D</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Morphing entre geometrias</div><div class="task-sub">Cada projeto → geometria diferente, transição suave</div></div><span class="tag tag-3d">3D</span><span class="est">4h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Loop de rotação idle</div><div class="task-sub">Rotação constante quando sem hover ativo</div></div><span class="tag tag-3d">3D</span><span class="est">30m</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Environment HDR</div><div class="task-sub">Iluminação ambiente via Drei Environment preset</div></div><span class="tag tag-3d">3D</span><span class="est">30m</span></div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-header">
      <span class="phase-label">Fase 3</span>
      <span class="phase-title">Layout & Seções DOM</span>
      <span class="phase-badge">~2 dias</span>
    </div>
    <div class="tasks">
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Nav.jsx</div><div class="task-sub">Logo, links, status "disponível", scroll blur effect</div></div><span class="tag tag-fe">FE</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Hero.jsx</div><div class="task-sub">Título, subtítulo, CTAs + canvas 3D lado a lado</div></div><span class="tag tag-fe">FE</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Projects.jsx — lista imersiva</div><div class="task-sub">Lista com hover global, bg-overlay por projeto</div></div><span class="tag tag-fe">FE</span><span class="est">3h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">ProjectItem.jsx — accordion</div><div class="task-sub">Expand/collapse com Framer Motion, número, tags, arrow</div></div><span class="tag tag-fe">FE</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">TechStack.jsx</div><div class="task-sub">Grid 3 colunas: Interface / Sistemas / Ferramentas</div></div><span class="tag tag-fe">FE</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Footer</div><div class="task-sub">Ano, nome, links GitHub / LinkedIn / CV</div></div><span class="tag tag-fe">FE</span><span class="est">30m</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Cursor customizado</div><div class="task-sub">Dot + ring, blend mode difference, hover state</div></div><span class="tag tag-fe">FE</span><span class="est">1h</span></div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-header">
      <span class="phase-label">Fase 4</span>
      <span class="phase-title">Conexão Store ↔ 3D</span>
      <span class="phase-badge">~1 dia</span>
    </div>
    <div class="tasks">
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Hover na lista → dispara store</div><div class="task-sub">onMouseEnter/Leave atualiza activeProject no Zustand</div></div><span class="tag tag-fe">FE</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Store → morfologia 3D</div><div class="task-sub">CrystalObject lê activeProject e troca geometria</div></div><span class="tag tag-3d">3D</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Store → bg-overlay</div><div class="task-sub">Imagem do projeto aparece no fundo com opacity 0.07</div></div><span class="tag tag-fe">FE</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Sincronizar color tint do material</div><div class="task-sub">Cada projeto tem uma cor accent para o cristal</div></div><span class="tag tag-3d">3D</span><span class="est">1h</span></div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-header">
      <span class="phase-label">Fase 5</span>
      <span class="phase-title">Case Studies — Páginas dos Projetos</span>
      <span class="phase-badge">~3 dias</span>
    </div>
    <div class="tasks">
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">CaseStudy.jsx — template base</div><div class="task-sub">Layout hero, problema, solução, stack, links</div></div><span class="tag tag-fe">FE</span><span class="est">3h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Conteúdo — Praxis</div><div class="task-sub">Narrativa, decisões técnicas, screenshots</div></div><span class="tag tag-content">Conteúdo</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-high"></div><div><div class="task-name">Conteúdo — Evento RSVP</div><div class="task-sub">Narrativa produto B2B+B2C, modelo de negócio</div></div><span class="tag tag-content">Conteúdo</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Conteúdo — Guia de Turismo AI</div><div class="task-sub">Demo GIF/vídeo, decisões de UX com AI</div></div><span class="tag tag-content">Conteúdo</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Conteúdo — Agro Gestão</div><div class="task-sub">Problema real do amigo, multi-tenant, upload</div></div><span class="tag tag-content">Conteúdo</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-low"></div><div><div class="task-name">Transição de página — home → case study</div><div class="task-sub">Framer Motion page transition com shared layout</div></div><span class="tag tag-fe">FE</span><span class="est">2h</span></div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-header">
      <span class="phase-label">Fase 6</span>
      <span class="phase-title">Polish & Deploy</span>
      <span class="phase-badge">~1 dia</span>
    </div>
    <div class="tasks">
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Animações de entrada (stagger)</div><div class="task-sub">Framer Motion: hero title, lista de projetos</div></div><span class="tag tag-fe">FE</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Responsividade mobile</div><div class="task-sub">3D vira decoration, layout empilha, fontes ajustam</div></div><span class="tag tag-fe">FE</span><span class="est">2h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">SEO & meta tags</div><div class="task-sub">OG image, title, description por rota</div></div><span class="tag tag-dx">DevX</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-mid"></div><div><div class="task-name">Performance 3D</div><div class="task-sub">dpr limit, suspense fallback, lazy canvas</div></div><span class="tag tag-3d">3D</span><span class="est">1h</span></div>
      <div class="task"><div class="task-dot p-low"></div><div><div class="task-name">Domínio customizado</div><div class="task-sub">Comprar .dev e apontar no Vercel</div></div><span class="tag tag-dx">DevX</span><span class="est">30m</span></div>
      <div class="task"><div class="task-dot p-low"></div><div><div class="task-name">Analytics</div><div class="task-sub">Vercel Analytics ou Plausible — sem cookie banner</div></div><span class="tag tag-dx">DevX</span><span class="est">30m</span></div>
    </div>
  </div>

</div>
