import { useEffect, useState } from 'react'
import prompt from '../../assets/case-studies-imgs/VamboraAi/prompt.png'
import guide from '../../assets/case-studies-imgs/VamboraAi/guide.png'

type FadeProps = {
  show: boolean
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  children: React.ReactNode
  className?: string
}

const Fade = ({ show, delay = 0, direction = 'up', children, className = '' }: FadeProps) => {
  const offStyles = {
    up: 'opacity-0 translate-y-10',
    down: 'opacity-0 -translate-y-10',
    left: 'opacity-0 -translate-x-10',
    right: 'opacity-0 translate-x-10',
  }

  return (
    <div
      className={`transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${show ? 'opacity-100 translate-x-0 translate-y-0' : offStyles[direction]
        } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export const VamboraAI = ({ isActive }: { isActive: boolean }) => {
  const [show, setShow] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setShow(true), 700)
      return () => clearTimeout(t)
    } else {
      setShow(false)
      setTimeout(() => {
        const parent = document.querySelector('[data-case-scroll]') as HTMLElement
        if (parent) parent.scrollTop = 0
      }, 100)
    }
  }, [isActive])

  useEffect(() => {
    const parent = document.querySelector('[data-case-scroll]') as HTMLElement
    if (!parent) return
    const handler = () => setScrollY(parent.scrollTop)
    parent.addEventListener('scroll', handler, { passive: true })
    return () => parent.removeEventListener('scroll', handler)
  }, [isActive])

  const isHeaderFixed = scrollY > 200

  return (
    <div className="z-20 min-h-screen bg-[#080808] selection:bg-[#f5c842]/30">

      {/* ─── STICKY HEADER ─── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-16 py-5 bg-[#080808]/80 backdrop-blur-md border-b border-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHeaderFixed ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl tracking-tighter text-white">
            vambora<span className="text-[#f5c842] italic">.ai</span>
          </span>
        </div>
        <div className="flex items-center gap-8">
          <span className="hidden md:block font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">
            03 — Engineering · AI Integration
          </span>
          <a
            href="https://github.com/pedrorfdev/vambora.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-widest uppercase text-[#f5c842] hover:opacity-60 transition-opacity"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <div className="relative grid h-[60vh] grid-rows-[auto_1fr_auto] overflow-hidden bg-[#080808]">
        {/* Topo — badge */}
        <Fade show={show} delay={0.05}>
          <div className="pt-10 px-16">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#f5c842]/70">
              03 — Engineering · AI Integration · Product
            </p>
          </div>
        </Fade>

        {/* Centro — título dominante */}
        <div className="flex flex-col justify-end px-16 pb-8">
          <Fade show={show} delay={0.1}>
            <h1 className="font-serif text-[clamp(96px,14vw,200px)] leading-[0.85] tracking-[-0.04em] text-white">
              vambora
              <em className="block text-[#f5c842] italic not-italic">
                .ai
              </em>
            </h1>
          </Fade>
        </div>

        {/* Rodapé — meta info em linha + tagline */}
        <Fade show={show} delay={0.2}>
          <div className="grid grid-cols-5 gap-6 items-end px-16 pt-6 pb-12 border-t border-white/7">
            {[
              { label: 'Tipo', value: 'Produto consumer' },
              { label: 'Stack', value: 'React + Gemini' },
              { label: 'Status', value: 'Em construção' },
              { label: 'GitHub', value: 'pedrorfdev/vambora.ai ↗', link: 'https://github.com/pedrorfdev/vambora.ai' },
            ].map((m) => (
              <div key={m.label}>
                <p className="font-mono text-[9px] tracking-[0.14em] uppercase mb-1.5 text-white/40">
                  {m.label}
                </p>
                {m.link ? (
                  <a
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#f5c842] transition-opacity duration-200 hover:opacity-60"
                  >
                    {m.value}
                  </a>
                ) : (
                  <p className="text-[13px] text-white/70">
                    {m.value}
                  </p>
                )}
              </div>
            ))}

            {/* Tagline na última coluna */}
            <p className="text-[13px] leading-snug text-right text-white/40">
              Fala o destino, a data<br />e o orçamento — a gente<br />monta o roteiro.
            </p>
          </div>
        </Fade>
      </div>

      {/* ─── SCREENSHOTS ─── */}
      <div className="px-20 py-[120px]">
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16 text-[#f5c842]/80">
            // O produto
          </p>
        </Fade>

        {/* Grid de prints */}
        <div className="grid grid-cols-2 gap-4">
          <Fade show={show} delay={0.15}>
            <div className="aspect-4/3 rounded-2xl flex items-center justify-center bg-linear-to-br from-[#f5c842]/12 to-[#f5c842]/4 border border-[#f5c842]/20">
              <img src={prompt} alt='vambora-1' className='w-full h-full object-cover rounded-xl' />
            </div>
          </Fade>

          <Fade show={show} delay={0.2}>
            <div className="aspect-4/3 rounded-2xl flex items-center justify-center bg-linear-to-br from-[#f5c842]/8 to-[#f5c842]/2 border border-[#f5c842]/15">
              <img src={guide} alt='vambora-1' className='w-full h-full object-cover rounded-xl' />
            </div>
          </Fade>

          <Fade show={show} delay={0.25} className="col-span-2">
            <div className="aspect-21/7 rounded-2xl flex items-center justify-center bg-linear-to-br from-[#f5c842]/6 to-transparent border border-[#f5c842]/12">
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-widest uppercase mb-2 text-[#f5c842]/60">Roteiro dia a dia</p>
                <p className="text-[12px] text-white/20">
                  screenshot em breve
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* ─── O PROBLEMA ─── */}
      <div className="px-20 py-[120px] border-t border-white/6 overflow-hidden">
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-20 text-[#f5c842]/80">
            // O problema
          </p>
        </Fade>

        <Fade show={show} delay={0.15} direction="up">
          <p className="font-serif text-[clamp(40px,5.5vw,72px)] leading-tight mb-24 tracking-tight text-white max-w-[900px]">
            Planejar viagem é trabalhoso demais pra maioria das pessoas.
          </p>
        </Fade>

        <div className="grid grid-cols-2 gap-x-24 gap-y-16">
          {[
            {
              num: '01',
              text: 'Pesquisar destino, clima, atrações, restaurantes — são horas de aba aberta sem resultado organizado.',
            },
            {
              num: '02',
              text: 'Guias genéricos não consideram suas datas, perfil ou orçamento real. São escritos pra todos e servem pra ninguém.',
            },
            {
              num: '03',
              text: 'Agências cobram caro por algo que deveria ser simples. Um roteiro organizado não pode custar R$500.',
            },
            {
              num: '04',
              text: 'O resultado? A maioria viaja sem roteiro ou não viaja. A fricção do planejamento mata o desejo.',
            },
          ].map((item, i) => (
            <Fade key={item.num} show={show} delay={0.2 + i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="pt-6 border-t border-white/8">
                <p className="font-mono text-[11px] mb-4 text-[#f5c842]/70">
                  {item.num}
                </p>
                <p className="text-[16px] leading-relaxed text-white/70">
                  {item.text}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* ─── DEMO / VÍDEO ─── */}
      <div className="px-20 py-[120px] border-t border-white/6">
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16 text-[#f5c842]/80">
            // Demo
          </p>
        </Fade>
        <Fade show={show} delay={0.18}>
          <div className="relative aspect-video w-full rounded-2xl flex items-center justify-center overflow-hidden border border-[#f5c842]/15 bg-[radial-gradient(ellipse_at_50%_50%,#f5c84210_0%,#f5c84202_60%,transparent_100%)]">
            <div className="relative z-10 text-center">
              <button className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-300 hover:scale-105 bg-[#f5c842] shadow-[0_0_60px_#f5c84240]">
                <span className="text-[#14120a] text-2xl ml-1">▶</span>
              </button>
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#f5c842]/60">
                demo em breve
              </p>
            </div>
          </div>
        </Fade>
      </div>

      {/* ─── DECISÕES TÉCNICAS ─── */}
      <div className="px-20 py-[120px] border-t border-white/6 overflow-hidden">
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-20 text-[#f5c842]/80">
            // Decisões técnicas
          </p>
        </Fade>

        {[
          {
            title: 'Gemini ao invés de GPT-4',
            body: 'O Gemini tem performance superior em português brasileiro e custo menor por token. Para um produto consumer com roteiros longos, isso é decisivo — cada geração envolve 2–4k tokens de output.',
          },
          {
            title: 'Prompt engineering estruturado',
            body: 'O prompt não é uma instrução genérica. É um template com variáveis tipadas — destino, datas, perfil, orçamento — que garante output consistente e parseável independente do input do usuário.',
          },
          {
            title: 'Streaming de resposta',
            body: 'Em vez de esperar o modelo terminar (3–8 segundos), a resposta aparece token por token. Reduz a percepção de latência drasticamente — o usuário começa a ler enquanto o modelo ainda gera.',
          },
          {
            title: 'Input em linguagem natural',
            body: 'Sem formulário com 10 campos. O usuário escreve como falaria pra um amigo — "Floripa semana que vem, 4 dias, casal, R$1.500". O modelo interpreta o contexto e preenche o que falta.',
          },
        ].map((d, i) => (
          <div key={d.title} className="grid grid-cols-[1fr_2fr] gap-16 py-12 border-t border-white/6">
            <Fade show={show} delay={0.15 + i * 0.1} direction="left">
              <h3 className="font-serif text-[clamp(28px,3vw,40px)] leading-tight tracking-[-0.02em] text-white">
                {d.title}
              </h3>
            </Fade>
            <Fade show={show} delay={0.2 + i * 0.1} direction="right">
              <p className="text-[16px] leading-relaxed self-center text-white/70">
                {d.body}
              </p>
            </Fade>
          </div>
        ))}
      </div>


      {/* ─── STACK ─── */}
      <div className="px-20 py-[120px] border-t border-white/6">
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16 text-[#f5c842]/80">
            // Stack
          </p>
        </Fade>
        <div className="grid grid-cols-4 gap-px bg-white/6">
          {[
            { label: 'React + Vite', desc: 'Base do produto — build rápido, DX limpo' },
            { label: 'Tailwind v4', desc: 'Estilização utilitária, zero CSS manual' },
            { label: 'Gemini API', desc: 'LLM da Google — melhor custo-benefício pra PT-BR' },
            { label: 'Streaming', desc: 'Resposta em tempo real, sem esperar o LLM terminar' },
          ].map((s, i) => (
            <Fade key={s.label} show={show} delay={0.12 + i * 0.06}>
              <div className="flex flex-col gap-3 p-8 bg-[#080808]">
                <span className="font-serif text-[clamp(20px,2.5vw,28px)] tracking-[-0.01em] text-white">
                  {s.label}
                </span>
                <span className="text-[13px] leading-relaxed text-white/40">
                  {s.desc}
                </span>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* ─── PRÓXIMOS PASSOS ─── */}
      <div className="px-20 py-[120px] border-t border-white/6">
        <div className="grid grid-cols-2 gap-24">
          <Fade show={show} delay={0.1}>
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-10 text-[#f5c842]/80">
              // Próximos passos
            </p>
            <h2 className="font-serif text-[clamp(36px,4.5vw,56px)] leading-tight tracking-tight text-white">
              O produto ainda está crescendo.
            </h2>
          </Fade>

          <Fade show={show} delay={0.18}>
            <div className="flex flex-col pt-16">
              {[
                'URL própria e deploy em produção',
                'Salvamento de roteiros com autenticação',
                'Modo de adaptação do roteiro por chat',
                'Integração com Booking e Airbnb via links inteligentes',
                'Versão mobile-first',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 py-5 border-b border-white/6"
                >
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#f5c842]" />
                  <span className="text-[15px] text-white/70">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div className="flex items-center justify-between px-20 py-12 border-t border-white/6">
        <Fade show={show} delay={0.1}>
          <span className="font-mono text-[11px] tracking-widest uppercase text-[#f5c842]/60">
            vambora.ai — 2025
          </span>
        </Fade>
        <Fade show={show} delay={0.18}>
          <a
            href="https://github.com/pedrorfdev/vambora.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded font-mono text-[11px] tracking-widest uppercase transition-opacity duration-200 hover:opacity-70 border border-[#f5c842]/40 text-[#f5c842] bg-[#f5c842]/10"
          >
            Ver no GitHub ↗
          </a>
        </Fade>
      </div>
    </div>
  )
}