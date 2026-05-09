import { useEffect, useRef, useState } from 'react'

const ACCENT = '#f5c842'
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const BG = '#14120a'

type FadeProps = {
  show: boolean
  delay?: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Fade = ({ show, delay = 0, children, className = '', style }: FadeProps) => (
  <div
    className={className}
    style={{
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ${EASE} ${delay}s`,
      ...style,
    }}
  >
    {children}
  </div>
)

export const VamboraAI = ({ isActive }: { isActive: boolean }) => {
  const [show, setShow] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setShow(true), 700)
      return () => clearTimeout(t)
    } else {
      setShow(false)
      setTimeout(() => {
        // reset scroll quando fecha
        const parent = document.querySelector('[data-case-scroll]') as HTMLElement
        if (parent) parent.scrollTop = 0
      }, 100)
    }
  }, [isActive])

  // parallax — lê o scroll do pai (a seção expandida)
  useEffect(() => {
    const parent = document.querySelector('[data-case-scroll]') as HTMLElement
    if (!parent) return
    const handler = () => setScrollY(parent.scrollTop)
    parent.addEventListener('scroll', handler, { passive: true })
    return () => parent.removeEventListener('scroll', handler)
  }, [isActive])

  return (
    <div ref={scrollRef} style={{ backgroundColor: BG, minHeight: '100vh' }}>

      {/* ─── HERO ─── */}
      <div
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ height: '100vh', padding: '0 80px 72px' }}
      >
        {/* Parallax bg glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 65% 35%, ${ACCENT}18 0%, transparent 60%)`,
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
        />

        <Fade show={show} delay={0.05}>
          <p
            className="font-mono tracking-widest uppercase mb-8"
            style={{ fontSize: '11px', color: `${ACCENT}99`, letterSpacing: '0.14em' }}
          >
            03 — Engineering · AI Integration · Product
          </p>
        </Fade>

        <Fade show={show} delay={0.12}>
          <h1
            className="font-serif leading-[0.88] mb-8"
            style={{
              fontSize: 'clamp(88px, 13vw, 180px)',
              letterSpacing: '-0.04em',
              color: 'var(--color-text-primary)',
              transform: `translateY(${-scrollY * 0.12}px)`,
            }}
          >
            vambora
            <br />
            <em style={{ color: ACCENT }}>.ai</em>
          </h1>
        </Fade>

        <Fade show={show} delay={0.2}>
          <p
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.5,
              color: 'var(--color-text-secondary)',
              maxWidth: '520px',
              marginBottom: '56px',
            }}
          >
            Fala o destino, a data e o orçamento —
            a gente monta o roteiro.
          </p>
        </Fade>

        <Fade show={show} delay={0.28}>
          <div
            className="flex gap-16"
            style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: '32px' }}
          >
            {[
              { label: 'Tipo', value: 'Produto consumer' },
              { label: 'Stack', value: 'React + Gemini' },
              { label: 'Status', value: 'Em construção' },
            ].map((m) => (
              <div key={m.label}>
                <p className="font-mono text-[10px] tracking-widest uppercase mb-1"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {m.label}
                </p>
                <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
                  {m.value}
                </p>
              </div>
            ))}
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase mb-1"
                style={{ color: 'var(--color-text-muted)' }}>
                GitHub
              </p>
              <a
                href="https://github.com/pedrorfdev/vambora.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] hover:opacity-70 transition-opacity duration-200"
                style={{ color: ACCENT }}
              >
                pedrorfdev/vambora.ai ↗
              </a>
            </div>
          </div>
        </Fade>

        {/* scroll hint */}
        <Fade show={show} delay={0.6} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ color: 'rgba(255,255,255,0.2)' }}>
            scroll
          </span>
          <div style={{
            width: '1px', height: '48px',
            background: `linear-gradient(to bottom, ${ACCENT}80, transparent)`,
            animation: 'pulse 2s ease-in-out infinite',
          }} />
        </Fade>
      </div >

      {/* ─── SCREENSHOTS ─── */}
      < div style={{ padding: '120px 80px' }}>
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16"
            style={{ color: `${ACCENT}80` }}>
            // O produto
          </p>
        </Fade>

        {/* Grid de prints */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}>
          <Fade show={show} delay={0.15}>
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                aspectRatio: '4/3',
                background: `linear-gradient(135deg, ${ACCENT}12, ${ACCENT}04)`,
                border: `1px solid ${ACCENT}20`,
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">✈</div>
                <p className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: `${ACCENT}80` }}>Tela inicial</p>
              </div>
            </div>
          </Fade>

          <Fade show={show} delay={0.2}>
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                aspectRatio: '4/3',
                background: `linear-gradient(135deg, ${ACCENT}08, ${ACCENT}02)`,
                border: `1px solid ${ACCENT}15`,
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: `${ACCENT}80` }}>Guia gerado</p>
              </div>
            </div>
          </Fade>

          <Fade show={show} delay={0.25} className="col-span-2">
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                aspectRatio: '21/7',
                background: `linear-gradient(135deg, ${ACCENT}06, transparent)`,
                border: `1px solid ${ACCENT}12`,
              }}
            >
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-widest uppercase mb-2"
                  style={{ color: `${ACCENT}60` }}>Roteiro dia a dia</p>
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  screenshot em breve
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div >

      {/* ─── O PROBLEMA — texto grande como na ref ─── */}
      < div
        style={{
          padding: '120px 80px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-20"
            style={{ color: `${ACCENT}80` }}>
            // O problema
          </p>
        </Fade>

        <Fade show={show} delay={0.15}>
          <p
            className="font-serif leading-tight mb-24"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              letterSpacing: '-0.025em',
              color: 'var(--color-text-primary)',
              maxWidth: '900px',
            }}
          >
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
            <Fade key={item.num} show={show} delay={0.2 + i * 0.07}>
              <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: '24px' }}>
                <p className="font-mono text-[11px] mb-4" style={{ color: `${ACCENT}70` }}>
                  {item.num}
                </p>
                <p className="text-[16px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.text}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div >

      {/* ─── DEMO / VÍDEO ─── */}
      < div style={{ padding: '120px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16"
            style={{ color: `${ACCENT}80` }}>
            // Demo
          </p>
        </Fade>
        <Fade show={show} delay={0.18}>
          <div
            className="w-full rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{
              aspectRatio: '16/9',
              background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}10 0%, ${ACCENT}02 60%, transparent 100%)`,
              border: `1px solid ${ACCENT}15`,
            }}
          >
            <div className="text-center relative z-10">
              <button
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-300 hover:scale-105"
                style={{ background: ACCENT, boxShadow: `0 0 60px ${ACCENT}40` }}
              >
                <span style={{ color: '#14120a', fontSize: '24px', marginLeft: '4px' }}>▶</span>
              </button>
              <p className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: `${ACCENT}60` }}>
                demo em breve
              </p>
            </div>
          </div>
        </Fade>
      </div >

      {/* ─── DECISÕES TÉCNICAS — texto grande, editorial ─── */}
      < div style={{ padding: '120px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-20"
            style={{ color: `${ACCENT}80` }}>
            // Decisões técnicas
          </p>
        </Fade>

        {
          [
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
            <Fade key={d.title} show={show} delay={0.15 + i * 0.08}>
              <div
                className="grid gap-16 py-12"
                style={{
                  gridTemplateColumns: '1fr 2fr',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <h3
                  className="font-serif leading-tight"
                  style={{
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {d.title}
                </h3>
                <p
                  className="text-[16px] leading-relaxed self-center"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {d.body}
                </p>
              </div>
            </Fade>
          ))
        }
      </div >

      {/* ─── STACK ─── */}
      < div style={{ padding: '120px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Fade show={show} delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-16"
            style={{ color: `${ACCENT}80` }}>
            // Stack
          </p>
        </Fade>
        <div className="grid grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {[
            { label: 'React + Vite', desc: 'Base do produto — build rápido, DX limpo' },
            { label: 'Tailwind v4', desc: 'Estilização utilitária, zero CSS manual' },
            { label: 'Gemini API', desc: 'LLM da Google — melhor custo-benefício pra PT-BR' },
            { label: 'Streaming', desc: 'Resposta em tempo real, sem esperar o LLM terminar' },
          ].map((s, i) => (
            <Fade key={s.label} show={show} delay={0.12 + i * 0.06}>
              <div className="flex flex-col gap-3 p-8" style={{ background: BG }}>
                <span
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {s.label}
                </span>
                <span className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {s.desc}
                </span>
              </div>
            </Fade>
          ))}
        </div>
      </div >

      {/* ─── PRÓXIMOS PASSOS ─── */}
      < div style={{ padding: '120px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="grid gap-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Fade show={show} delay={0.1}>
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-10"
              style={{ color: `${ACCENT}80` }}>
              // Próximos passos
            </p>
            <h2
              className="font-serif leading-tight"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                letterSpacing: '-0.025em',
                color: 'var(--color-text-primary)',
              }}
            >
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
                  className="flex items-center gap-5 py-5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: ACCENT }}
                  />
                  <span className="text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div >

      {/* ─── FOOTER ─── */}
      < div
        className="flex items-center justify-between"
        style={{
          padding: '48px 80px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Fade show={show} delay={0.1}>
          <span className="font-mono text-[11px] tracking-widest uppercase"
            style={{ color: `${ACCENT}60` }}>
            vambora.ai — 2025
          </span>
        </Fade>
        <Fade show={show} delay={0.18}>
          <a
            href="https://github.com/pedrorfdev/vambora.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded font-mono text-[11px] tracking-widest uppercase transition-opacity duration-200 hover:opacity-70"
            style={{
              border: `1px solid ${ACCENT}40`,
              color: ACCENT,
              background: `${ACCENT}10`,
            }}
          >
            Ver no GitHub ↗
          </a>
        </Fade >
      </div >

    </div >
  )
}