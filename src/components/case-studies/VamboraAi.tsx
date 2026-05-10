import { useEffect, useRef, useState } from 'react'
import prompt from '../../assets/case-studies-imgs/VamboraAi/prompt.png'
import guide from '../../assets/case-studies-imgs/VamboraAi/guide.png'
import { useInView } from '../../hooks/useInView'
import { useTypewriter } from '../../hooks/useTypewriter'

const A = '#f5c842'
const EASE = 'cubic-bezier(0.16,1,0.3,1)'
const PROBLEMA_TEXT = 'Planejar viagem é trabalhoso demais pra maioria das pessoas.'

// Hook para efeito 3D no hover das fotos
const use3DHover = () => {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`
  }

  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
    }
  }

  return { ref, onMove, onLeave }
}

const TypewriterText = ({ text, active, className = '' }: {
  text: string; active: boolean; className?: string
}) => {
  const { displayed, done } = useTypewriter(text, active, 22)
  return (
    <span className={className}>
      {displayed}
      <span className={`inline-block w-[3px] h-[0.85em] bg-[${A}] ml-1 align-middle ${done ? 'animate-pulse' : ''}`} />
    </span>
  )
}

export const VamboraAI = ({ isActive }: { isActive: boolean }) => {
  const [show, setShow] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const produtoRef = useInView(0.05)
  const problemaRef = useInView(0.25)
  const demoRef = useInView(0.2)
  const decisoesRef = useInView(0.1)
  const stackRef = useInView(0.2)
  const proximosRef = useInView(0.2)

  const foto1 = use3DHover()
  const foto2 = use3DHover()

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setShow(true), 700)
      return () => clearTimeout(t)
    } else {
      setShow(false)
      setTimeout(() => {
        const p = document.querySelector('[data-case-scroll]') as HTMLElement
        if (p) p.scrollTop = 0
      }, 100)
    }
  }, [isActive])

  useEffect(() => {
    const p = document.querySelector('[data-case-scroll]') as HTMLElement
    if (!p) return
    const h = () => setScrollY(p.scrollTop)
    p.addEventListener('scroll', h, { passive: true })
    return () => p.removeEventListener('scroll', h)
  }, [isActive])

  const isHeaderFixed = scrollY > 200

  // helper de transição inline
  const t = (delay = 0) => ({ transition: `all 0.7s ${EASE} ${delay}s` })

  return (
    <div className="min-h-screen bg-[#080808] selection:bg-[#f5c842]/30">

      {/* STICKY NAV */}
      <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-16 py-5
        bg-[#080808]/85 backdrop-blur-md border-b border-white/5
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isHeaderFixed ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <span className="font-serif text-2xl tracking-tighter text-white">
          vambora<em className="text-[#f5c842] not-italic">.ai</em>
        </span>
        <div className="flex items-center gap-8">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/30">
            03 — Engineering · AI Integration
          </span>
          <a href="https://github.com/pedrorfdev/vambora.ai" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-widest uppercase text-[#f5c842] hover:opacity-60 transition-opacity">
            GitHub ↗
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative grid h-[60vh] grid-rows-[auto_1fr_auto] bg-[#080808] pt-20">
        <div
          className="pt-10 px-16 transition-[opacity,transform] duration-700"
          style={{ opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(-12px)', transitionDelay: '0.05s' }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#f5c842]/70">
            03 — Engineering · AI Integration · Product
          </p>
        </div>

        <div className="flex flex-col justify-end px-16 pb-8">
          {/* título entra com clip-path vertical */}
          <div style={{ overflow: 'hidden' }}>
            <h1
              className="font-serif text-[clamp(96px,14vw,200px)] leading-[0.85] tracking-[-0.04em] text-white"
              style={{
                transition: `transform 0.9s ${EASE} 0.1s, opacity 0.9s ease 0.1s`,
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(60px)',
              }}
            >
              vambora
              <em
                className="block not-italic text-[#f5c842]"
                style={{
                  transition: `transform 0.9s ${EASE} 0.2s, opacity 0.9s ease 0.2s`,
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateX(0)' : 'translateX(-40px)',
                }}
              >
                .ai
              </em>
            </h1>
          </div>
        </div>

        <div
          className="grid grid-cols-5 gap-6 items-end px-16 pt-6 pb-12 border-t border-white/7"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'none' : 'translateY(16px)',
            transition: `all 0.7s ${EASE} 0.25s`,
          }}
        >
          {[
            { label: 'Tipo', value: 'Produto consumer' },
            { label: 'Stack', value: 'React + Gemini' },
            { label: 'Status', value: 'Em construção' },
            { label: 'GitHub', value: 'pedrorfdev/vambora.ai ↗', link: 'https://github.com/pedrorfdev/vambora.ai' },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-mono text-[9px] tracking-[0.14em] uppercase mb-1.5 text-white/40">{m.label}</p>
              {m.link
                ? <a href={m.link} target="_blank" rel="noopener noreferrer"
                  className="text-[13px] text-[#f5c842] hover:opacity-60 transition-opacity">{m.value}</a>
                : <p className="text-[13px] text-white/70">{m.value}</p>
              }
            </div>
          ))}
          <p className="text-[13px] leading-snug text-right text-white/40">
            Fala o destino, a data<br />e o orçamento — a gente<br />monta o roteiro.
          </p>
        </div>
      </div>

      {/* ── SCREENSHOTS — 3D hover ── */}
      <div ref={produtoRef.ref} className="px-20 py-32 border-t border-white/6">
        <p className={`
            font-mono text-[10px] tracking-[0.16em] uppercase mb-16 text-[#f5c842]/80
            transition-[opacity,transform] duration-500
            ${produtoRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}
        `}>
          // O produto
        </p>

        <div className="grid grid-cols-2 gap-4">

          {/* Foto 1 */}
          <div className={`
            transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${produtoRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
          `} style={{ transitionDelay: '0.1s' }}>
            <div
              ref={foto1.ref}
              onMouseMove={foto1.onMove}
              onMouseLeave={foto1.onLeave}
              className="w-full rounded-2xl overflow-hidden border border-[#f5c842]/20 cursor-none"
              style={{
                aspectRatio: '4/3',
                transition: `transform 0.4s ${EASE}`,
                willChange: 'transform',
              }}
            >
              <img src={prompt} alt="vambora tela inicial" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Foto 2 */}
          <div className={`
            transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${produtoRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
          `} style={{ transitionDelay: '0.2s' }}>
            <div
              ref={foto2.ref}
              onMouseMove={foto2.onMove}
              onMouseLeave={foto2.onLeave}
              className="w-full rounded-2xl overflow-hidden border border-[#f5c842]/15 cursor-none"
              style={{
                aspectRatio: '4/3',
                transition: `transform 0.4s ${EASE}`,
                willChange: 'transform',
              }}
            >
              <img src={guide} alt="vambora guia gerado" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Banner wide */}
          <div
            className={`
              col-span-2
              transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${produtoRef.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'}
            `}
            style={{ transitionDelay: '0.3s' }}
          >
            <div
              className="w-full rounded-2xl flex items-center justify-center border border-[#f5c842]/12"
              style={{
                aspectRatio: '21/7',
                background: 'rgba(245,200,66,0.04)',
              }}
            >
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-widest uppercase mb-2 text-[#f5c842]/60">
                  Roteiro dia a dia
                </p>
                <p className="text-[12px] text-white/20">screenshot em breve</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── O PROBLEMA — typewriter + cards com clip reveal ── */}
      <div ref={problemaRef.ref} className="px-20 py-[120px] border-t border-white/6">
        <p
          className="font-mono text-[10px] tracking-[0.16em] uppercase mb-20 text-[#f5c842]/80"
          style={{
            opacity: problemaRef.inView ? 1 : 0,
            transform: problemaRef.inView ? 'none' : 'translateY(-8px)',
            transition: `all 0.5s ${EASE}`,
          }}
        >
          // O problema
        </p>

        <div className="mb-24">
          <TypewriterText
            text={PROBLEMA_TEXT}
            active={problemaRef.inView && show}
            className="font-serif text-[clamp(40px,5.5vw,72px)] leading-tight tracking-tight text-white block max-w-[900px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-24 gap-y-16">
          {[
            { num: '01', text: 'Pesquisar destino, clima, atrações, restaurantes — são horas de aba aberta sem resultado organizado.' },
            { num: '02', text: 'Guias genéricos não consideram suas datas, perfil ou orçamento real. São escritos pra todos e servem pra ninguém.' },
            { num: '03', text: 'Agências cobram caro por algo que deveria ser simples. Um roteiro organizado não pode custar R$500.' },
            { num: '04', text: 'O resultado? A maioria viaja sem roteiro ou não viaja. A fricção do planejamento mata o desejo.' },
          ].map((item, i) => (
            <div
              key={item.num}
              className="pt-6 border-t border-white/8"
              style={{
                opacity: problemaRef.inView ? 1 : 0,
                // alterna: par vem da esquerda, ímpar da direita
                transform: problemaRef.inView
                  ? 'none'
                  : i % 2 === 0 ? 'translateX(-32px)' : 'translateX(32px)',
                transition: `all 0.7s ${EASE} ${1.4 + i * 0.12}s`,
              }}
            >
              <p className="font-mono text-[11px] mb-4 text-[#f5c842]/70">{item.num}</p>
              <p className="text-[16px] leading-relaxed text-white/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DEMO — zoom in ── */}
      <div ref={demoRef.ref} className="px-20 py-[120px] border-t border-white/6">
        <p
          className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16 text-[#f5c842]/80"
          style={{
            opacity: demoRef.inView ? 1 : 0,
            transform: demoRef.inView ? 'none' : 'translateX(-20px)',
            transition: `all 0.5s ${EASE}`,
          }}
        >
          // Demo
        </p>
        <div
          style={{
            opacity: demoRef.inView ? 1 : 0,
            transform: demoRef.inView ? 'scale(1)' : 'scale(0.94)',
            transition: `all 0.9s ${EASE} 0.1s`,
          }}
        >
          <div className="relative aspect-video w-full rounded-2xl flex items-center justify-center overflow-hidden border border-[#f5c842]/15 bg-[radial-gradient(ellipse_at_50%_50%,#f5c84210_0%,transparent_70%)]">
            <div className="text-center">
              <button className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-300 hover:scale-110 bg-[#f5c842] shadow-[0_0_60px_#f5c84250]">
                <span className="text-[#080808] text-2xl ml-1">▶</span>
              </button>
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#f5c842]/60">demo em breve</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── DECISÕES — linha cresce + slide alternado ── */}
      <div ref={decisoesRef.ref} className="px-20 py-[120px] border-t border-white/6">
        <p
          className="font-mono text-[10px] tracking-[0.16em] uppercase mb-20 text-[#f5c842]/80"
          style={{
            opacity: decisoesRef.inView ? 1 : 0,
            transition: `all 0.5s ${EASE}`,
          }}
        >
          // Decisões técnicas
        </p>

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
          <div
            key={d.title}
            className="grid grid-cols-[1fr_2fr] gap-16 py-12 border-t border-white/6 relative overflow-hidden"
            style={{
              opacity: decisoesRef.inView ? 1 : 0,
              transform: decisoesRef.inView ? 'none' : 'translateY(24px)',
              transition: `all 0.7s ${EASE} ${i * 0.13}s`,
            }}
          >
            {/* linha dourada cresce */}
            <div
              className="absolute top-0 left-0 h-px bg-[#f5c842]"
              style={{
                width: decisoesRef.inView ? '100%' : '0%',
                transition: `width 0.8s ${EASE} ${i * 0.13}s`,
              }}
            />
            <h3
              className="font-serif text-[clamp(28px,3vw,40px)] leading-tight tracking-[-0.02em] text-white"
              style={{
                opacity: decisoesRef.inView ? 1 : 0,
                transform: decisoesRef.inView ? 'none' : 'translateX(-24px)',
                transition: `all 0.7s ${EASE} ${i * 0.13 + 0.1}s`,
              }}
            >
              {d.title}
            </h3>
            <p
              className="text-[16px] leading-relaxed self-center text-white/70"
              style={{
                opacity: decisoesRef.inView ? 1 : 0,
                transform: decisoesRef.inView ? 'none' : 'translateX(24px)',
                transition: `all 0.7s ${EASE} ${i * 0.13 + 0.18}s`,
              }}
            >
              {d.body}
            </p>
          </div>
        ))}
      </div>

      {/* ── STACK — cada célula cai de cima ── */}
      <div ref={stackRef.ref} className="px-20 py-[120px] border-t border-white/6">
        <p
          className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16 text-[#f5c842]/80"
          style={{
            opacity: stackRef.inView ? 1 : 0,
            transform: stackRef.inView ? 'none' : 'translateX(-20px)',
            transition: `all 0.5s ${EASE}`,
          }}
        >
          // Stack
        </p>
        <div className="grid grid-cols-4 gap-px bg-white/6">
          {[
            { label: 'React + Vite', desc: 'Base do produto — build rápido, DX limpo' },
            { label: 'Tailwind v4', desc: 'Estilização utilitária, zero CSS manual' },
            { label: 'Gemini API', desc: 'LLM da Google — melhor custo-benefício pra PT-BR' },
            { label: 'Streaming', desc: 'Resposta em tempo real, sem esperar o LLM terminar' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-3 p-8 bg-[#080808] group hover:bg-[#111] transition-colors duration-300"
              style={{
                opacity: stackRef.inView ? 1 : 0,
                transform: stackRef.inView ? 'none' : 'translateY(-28px)',
                transition: `all 0.6s ${EASE} ${i * 0.1}s`,
              }}
            >
              <span className="font-serif text-[clamp(20px,2.5vw,28px)] tracking-[-0.01em] text-white group-hover:text-[#f5c842] transition-colors duration-300">
                {s.label}
              </span>
              <span className="text-[13px] leading-relaxed text-white/40">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRÓXIMOS PASSOS — items entram com stagger ── */}
      <div ref={proximosRef.ref} className="px-20 py-[120px] border-t border-white/6">
        <div className="grid grid-cols-2 gap-24">
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.16em] uppercase mb-10 text-[#f5c842]/80"
              style={{
                opacity: proximosRef.inView ? 1 : 0,
                transform: proximosRef.inView ? 'none' : 'translateY(-12px)',
                transition: `all 0.5s ${EASE}`,
              }}
            >
              // Próximos passos
            </p>
            <h2
              className="font-serif text-[clamp(36px,4.5vw,56px)] leading-tight tracking-tight text-white"
              style={{
                opacity: proximosRef.inView ? 1 : 0,
                transform: proximosRef.inView ? 'none' : 'translateY(24px)',
                transition: `all 0.7s ${EASE} 0.1s`,
              }}
            >
              O produto ainda está crescendo.
            </h2>
          </div>

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
                style={{
                  opacity: proximosRef.inView ? 1 : 0,
                  transform: proximosRef.inView ? 'none' : 'translateX(32px)',
                  transition: `all 0.6s ${EASE} ${i * 0.08}s`,
                }}
              >
                <span
                  className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#f5c842]"
                  style={{
                    transform: proximosRef.inView ? 'scale(1)' : 'scale(0)',
                    transition: `transform 0.4s ${EASE} ${i * 0.08 + 0.1}s`,
                  }}
                />
                <span className="text-[15px] text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        className="flex items-center justify-between px-20 py-12 border-t border-white/6"
        style={{
          opacity: proximosRef.inView ? 1 : 0,
          transition: `all 0.5s ${EASE} 0.4s`,
        }}
      >
        <span className="font-mono text-[11px] tracking-widest uppercase text-[#f5c842]/60">
          vambora.ai — 2025
        </span>
        <a
          href="https://github.com/pedrorfdev/vambora.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded font-mono text-[11px] tracking-widest uppercase transition-opacity duration-200 hover:opacity-70 border border-[#f5c842]/40 text-[#f5c842] bg-[#f5c842]/10"
        >
          Ver no GitHub ↗
        </a>
      </div>

    </div >
  )
}