'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import ImageSlot from './ImageSlot';
import Fonte from '../Fonte';
import Logo from '../Logo';
import s from './styles.module.css';
import {
  Y, G, RED, MUTED, WHO, GRAD, SIGNALS, ENEMY, ENEMY_X, MIN, MIN_G, MIN_DIAG, TACTICS, TAC_BOLSO, TAC_IMG,
  FLAVIO, F_IMG, SIG_MEDIA, SIG_VIDEO, SIG_RANK, SIG_SHOW, YANO, whoKey, yr,
} from './data';

const NAVY = '#071C4D';
const SERIF = 'var(--font-serif), serif';
const MONO = 'var(--font-mono), monospace';
const ARCHIVO = 'var(--font-archivo), system-ui, sans-serif';

const label = (color?: string, spacing = '.1em'): CSSProperties => ({ fontSize: 13, fontWeight: 800, letterSpacing: spacing, textTransform: 'uppercase', color });
const reveal = (dist = 24, dur = 0.8, delay = 0, axis: 'X' | 'Y' = 'Y'): CSSProperties => ({
  opacity: 0,
  transform: `translate${axis}(${dist}px)`,
  transition: delay ? `opacity ${dur}s ease ${delay}s,transform ${dur}s ease ${delay}s` : `opacity ${dur}s ease,transform ${dur}s ease`,
});
const bigNumber = (stroke: string): CSSProperties => ({ fontSize: 'clamp(90px,14vw,220px)', fontWeight: 900, fontStretch: '125%', lineHeight: 0.75, color: 'transparent', WebkitTextStroke: `2px ${stroke}` });
const h2Style = (maxWidth?: number): CSSProperties => ({ fontSize: 'clamp(34px,6vw,88px)', lineHeight: 0.92, margin: '14px 0 0', fontWeight: 900, fontStretch: '120%', letterSpacing: '-0.03em', maxWidth });
const tag = (w: string) => { const c = WHO[whoKey(w)]; return { tagBg: c[0], tagFg: c[1] }; };
const scrollItem = (i: number, cur: number): CSSProperties => ({ opacity: i === cur ? 1 : 0.28, transform: i === cur ? 'none' : 'translateY(12px)' });

// Linha de fonte: cada trecho vira link para o documento original (registro em src/lib/fontes.ts).
function Src({ src, size = 12, mt, muted = MUTED, style }: { src?: string; size?: number; mt?: number | string; muted?: string; style?: CSSProperties }) {
  return <Fonte src={src} label="" size={size} color={muted} style={{ marginTop: mt, ...style }} />;
}

function ChapterCover({ n, title, maxWidth, img }: { n: string; title: string; maxWidth: number; img: { src: string; credit: string; href: string; ph: string } }) {
  return (
    <div data-parallax="0.18" style={{ position: 'relative', height: '78vh', minHeight: 520, overflow: 'hidden' }}>
      <div data-par-inner="1" style={{ position: 'absolute', left: 0, right: 0, top: '-12%', bottom: '-12%' }}>
        <ImageSlot src={img.src} credit={img.credit} creditHref={img.href} placeholder={img.ph} />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(7,28,77,.9) 0%,rgba(7,28,77,.2) 40%,rgba(7,28,77,.95) 100%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px 56px' }}>
          <div style={bigNumber(Y)}>{n}</div>
          <h2 style={h2Style(maxWidth)}>{title}</h2>
        </div>
      </div>
    </div>
  );
}

function Target({ name, role, method, img, credit, creditHref }: { name: string; role: string; method: string; img: string; credit: string; creditHref: string }) {
  const line: CSSProperties = { position: 'absolute', background: RED, pointerEvents: 'none' };
  return (
    <div data-reveal="1" style={{ ...reveal(), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 'clamp(180px,26vw,220px)', aspectRatio: '1' }}>
        <ImageSlot shape="circle" src={img} style={{ filter: 'grayscale(1)' }} />
        <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `3px solid ${RED}`, pointerEvents: 'none' }} />
        <div style={{ ...line, left: '50%', top: -22, bottom: -22, width: 2, marginLeft: -1 }} />
        <div style={{ ...line, top: '50%', left: -22, right: -22, height: 2, marginTop: -1 }} />
        <div style={{ position: 'absolute', inset: '32%', borderRadius: '50%', border: '2px solid rgba(255,90,90,.8)', pointerEvents: 'none' }} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, marginTop: 10 }}>{name}</div>
      <div style={{ fontSize: 13, color: '#F1DADA' }}>{role}</div>
      <div style={{ background: RED, color: '#2A0A0F', fontSize: 13, fontWeight: 900, padding: '6px 12px', borderRadius: 99, letterSpacing: '.04em', textTransform: 'uppercase' }}>{method}</div>
      <a href={creditHref} target="_blank" rel="noopener" style={{ fontSize: 11, color: '#C99A9A' }}>{credit} ↗</a>
    </div>
  );
}

function Tabs<T extends { key: string; label: string; n?: string }>({ items, active, onSelect, gap = 8, mt = 24 }: { items: T[]; active: string; onSelect: (k: string) => void; gap?: number; mt?: number }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap, marginTop: mt }}>
      {items.map(t => (
        <button key={t.key} onClick={() => onSelect(t.key)} className={s.tab} style={{ border: 'none', cursor: 'pointer', padding: '11px 16px', fontSize: 15, fontWeight: 800, borderRadius: 99, background: t.key === active ? Y : 'rgba(255,255,255,.1)', color: t.key === active ? NAVY : '#fff', display: 'flex', gap: 8, alignItems: 'center' }}>
          {t.label}{t.n ? <span style={{ fontSize: 12, opacity: 0.7 }}>{t.n}</span> : null}
        </button>
      ))}
    </div>
  );
}

const Dot = ({ color, children, radius = '50%' }: { color: string; children: ReactNode; radius?: string }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: radius, background: color }} />{children}</span>
);

// ---- dados derivados que não dependem de estado ----

const pos = (y: number) => ((y - 1998 + 0.5) / 29 * 100).toFixed(2) + '%';
const introDots = (() => {
  const byY: Record<number, number> = {};
  return [...SIGNALS.flatMap(x => x.ev), ...MIN].flatMap(r => {
    const y = yr(r.date); if (!y) return [];
    const k = byY[y] = (byY[y] || 0) + 1; const c = whoKey(r.who);
    return [{ l: pos(y), b: (6 + (k - 1) * 12) + 'px', bg: (c === 'Aliado' || c === 'Apoiadores') ? 'rgba(255,255,255,.4)' : WHO[c][0] }];
  });
})();
const introYears = [1999, 2010, 2018, 2022, 2026];

const ARSENAL = ['Veneno', 'Explosivo', 'Pistolas', 'Fuzis', 'Metralhadora', 'Lança-granadas', 'Lançador de foguetes antitanque'];
const PLAN_TL: [string, string, string, number, string][] = [
  ['30 out 2022', 'Lula vence o segundo turno.', '#fff', 14, 'TSE, Resultados 2022 (Presidente, 2º turno)'],
  ['12 nov 2022', 'Na casa do general Braga Netto, “kids pretos” discutem a operação “Copa 2022” para “neutralizar” Moraes.', '#FF8A8A', 18, 'PGR, denúncia na Pet 12.100 (18/fev/2025)'],
  ['12 dez 2022', 'O TSE diploma Lula e Alckmin.', '#fff', 14, 'STF, voto do relator na AP 2668 (9/set/2025)'],
  ['15 dez 2022', 'Militares se posicionam perto da casa de Moraes. A ação é abortada quando o STF adia uma votação e encerra a sessão.', RED, 24, 'PGR, denúncia na Pet 12.100 (18/fev/2025)'],
  ['8 jan 2023', 'Invasão das sedes dos Três Poderes.', '#FF8A8A', 18, 'STF, AP 2668 (condenação, 11/set/2025)'],
  ['19 nov 2024', 'Operação Contragolpe: a PF prende um general, três militares e um policial federal.', '#fff', 14, ''],
  ['16 dez 2025', 'O STF condena Mário Fernandes, autor do plano, a 26 anos e 6 meses.', Y, 18, 'STF, AP 2693 (núcleo 2, 16/dez/2025)'],
  ['abr 2026', 'Fim dos recursos: os condenados do núcleo 2 passam a presos definitivos.', Y, 14, ''],
];
const PENAS: [string, string, number, string, string][] = [
  ['Jair Bolsonaro', 'Ex-presidente', 27.25, '27 anos e 3 meses', Y],
  ['Mário Fernandes', 'General, autor do Punhal Verde e Amarelo', 26.5, '26 anos e 6 meses', RED],
  ['Walter Braga Netto', 'General, ex-ministro e candidato a vice', 26, '26 anos', '#FF8A8A'],
  ['Silvinei Vasques', 'Ex-diretor da PRF', 24.5, '24 anos e 6 meses', '#FF8A8A'],
  ['Almir Garnier', 'Ex-comandante da Marinha', 24, '24 anos', '#FF8A8A'],
  ['Marcelo Câmara', 'Coronel, ex-assessor de Bolsonaro', 21, '21 anos', '#FF8A8A'],
  ['Filipe Martins', 'Ex-assessor internacional', 21, '21 anos', '#FF8A8A'],
  ['Marília de Alencar', 'Ex-diretora de Inteligência do MJ', 8.5, '8 anos e 6 meses', '#C99A9A'],
  ['Mauro Cid', 'Ex-ajudante de ordens, delator', 2, '2 anos (regime aberto)', '#C99A9A'],
];
const TALLY = [
  { a: '4', b: '4', label: 'sinais de alerta documentados na família Bolsonaro e no governo' },
  { a: '3', b: '4', label: 'sinais em falas do próprio Flávio' },
  { a: String(TACTICS.filter(t => (TAC_BOLSO[t.id] || []).length).length), b: String(TACTICS.length), label: 'táticas do padrão histórico com registro no Brasil desde 2018' },
];
const ENEMY_STEPS = ENEMY.map((e, i) => {
  const x = ENEMY_X[i];
  const bol = e.where.startsWith('Brasil · ') && +e.y >= 2018;
  return { ...e, i: String(i), tagColor: bol ? Y : '#FF8A8A', chipBg: bol ? '#4A3A12' : '#3A1218', accuser: x?.accuser || '', after: x?.after || '', img: x?.img?.[0] || '', credit: x?.img?.[1] || '', href: x?.img?.[2] || '', ph: x?.ph || '', pos: x?.pos };
});

type Steps = { grad: number; flavio: number };

export default function BolsonaroHipotetico() {
  const [grad, setGrad] = useState('br');
  const [steps, setSteps] = useState<Steps>({ grad: 0, flavio: 0 });
  const [minG, setMinG] = useState('mulheres');
  const [minK, setMinK] = useState<'f' | 'a'>('f');
  const [tac, setTac] = useState('ele');
  const [shared, setShared] = useState(false);
  const [exp, setExp] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState<Record<string, boolean>>({});

  const rootRef = useRef<HTMLDivElement>(null);
  const onScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.matchMedia('(max-width: 760px)');
    let raf: number | null = null;
    const update = () => {
      raf = null;
      const vh = window.innerHeight, sy = window.scrollY;
      const clamp = (v: number) => Math.max(0, Math.min(1, v));
      const $ = <E extends HTMLElement>(sel: string) => root.querySelector<E>(sel);
      const $$ = (sel: string) => root.querySelectorAll<HTMLElement>(sel);
      const prog = $('[data-progress]');
      if (prog) prog.style.width = (clamp(sy / (document.documentElement.scrollHeight - vh)) * 100) + '%';
      const hp = clamp(sy / vh);
      const ht = $('[data-hero-title]'), hi = $('[data-hero-img]');
      if (!reduce) {
        if (ht) { ht.style.transform = 'translateY(' + (-hp * 120) + 'px)'; ht.style.opacity = String(1 - hp * 1.1); }
        if (hi) hi.style.transform = 'scale(' + (1 + hp * 0.12) + ')';
        $$('[data-parallax]').forEach(el => {
          const r = el.getBoundingClientRect(); const inner = el.querySelector<HTMLElement>('[data-par-inner]');
          if (inner && r.bottom > 0 && r.top < vh) inner.style.transform = 'translateY(' + ((r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.parallax!)) + 'px)';
        });
      }
      $$('[data-reveal]').forEach(el => {
        if (reduce || el.getBoundingClientRect().top < vh * 0.9) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      $$('[data-grow]').forEach(el => {
        if (reduce || el.getBoundingClientRect().top < vh * 0.92) el.style.width = el.dataset.grow!;
      });
      // No celular o painel fixo cobre a metade de cima; o passo ativo é o que está mais abaixo.
      const focus = narrow.matches ? vh * 0.7 : vh / 2;
      const best = (g: string) => {
        let b = 0, bd = Infinity;
        $$('[data-sg="' + g + '"]').forEach((el, i) => { const r = el.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - focus); if (d < bd) { bd = d; b = i; } });
        return b;
      };
      const next = { grad: best('grad'), flavio: best('flavio') };
      setSteps(cur => (cur.grad === next.grad && cur.flavio === next.flavio ? cur : next));
    };
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(update); };
    onScrollRef.current = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    const t = setTimeout(onScroll, 400);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t);
      if (raf !== null) cancelAnimationFrame(raf);
      onScrollRef.current = null;
    };
  }, []);

  // Como o componentDidUpdate do design: revela o que acabou de entrar na tela após trocar abas.
  useEffect(() => { onScrollRef.current?.(); });

  // ---- valores derivados do estado ----
  const gd = GRAD[grad], gi = Math.min(steps.grad, gd.steps.length - 1);
  const fi = steps.flavio;
  const fNow = FLAVIO[Math.min(fi, FLAVIO.length - 1)];

  const minAll = MIN.filter(m => m.g === minG);
  const minItems = minAll.filter(m => m.k === minK);
  const showMin = minItems.length ? minItems : minAll;
  const md = MIN_DIAG[minG];

  const tacObj = TACTICS.find(t => t.id === tac)!;
  const tacBolso = TAC_BOLSO[tac] || [];
  const ti = TAC_IMG[tac] || {};
  const tacImg = ti.img ? { src: ti.img[0], credit: ti.img[1], href: ti.img[2], ph: '' } : { src: '', credit: '', href: '', ph: ti.ph || '' };

  const selectMinGroup = (id: string) => {
    setMinG(id);
    setMinK(MIN.some(m => m.g === id && m.k === minK) ? minK : MIN.find(m => m.g === id)!.k);
  };

  const share = () => {
    navigator.clipboard?.writeText(location.href).catch(() => {});
    setShared(true);
  };

  return (
    <div ref={rootRef} className={s.root} style={{ fontFamily: ARCHIVO }}>
      {/* Barra fixa: progresso + navegação */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30, pointerEvents: 'none' }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,.08)' }}><div data-progress="1" style={{ height: '100%', width: 0, background: Y }} /></div>
        <div className={s.topbar} style={{ maxWidth: 1320, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <Link href="/" aria-label="Contraprova" style={{ pointerEvents: 'auto', flex: 'none', display: 'flex', alignItems: 'center', gap: 10, color: '#fff', textDecoration: 'none', background: 'rgba(7,28,77,.78)', backdropFilter: 'blur(8px)', padding: '8px 14px 8px 10px', borderRadius: 99 }}>
            <Logo size={22} wordmarkClassName={s.brandText} />
          </Link>
          <nav className={s.nav} style={{ pointerEvents: 'auto', display: 'flex', gap: 2, background: 'rgba(7,28,77,.78)', backdropFilter: 'blur(8px)', padding: 5, borderRadius: 99, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <a href="#sinais" className={s.navLink}>4 sinais</a>
            <a href="#plano" className={`${s.navLink} ${s.navLinkRed}`}>O plano</a>
            <a href="#inimigo" className={s.navLink}>O inimigo</a>
            <a href="#minorias" className={s.navLink}>Minorias</a>
            <a href="#mundo" className={s.navLink}>No mundo</a>
            <a href="#flavio" className={`${s.navLink} ${s.navLinkCta}`}>Flávio</a>
          </nav>
        </div>
      </div>

      {/* Abertura */}
      <section style={{ position: 'relative', height: '100svh', minHeight: 560, overflow: 'hidden', background: '#04122F' }}>
        <div data-hero-img="1" style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}>
          <ImageSlot src="https://imagens.ebc.com.br/lXEDhQ5mhlsEuLSFqvdf1dX92S4=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/manifestacao_mcamgo_abr_080120231818-11.jpg?itok=ZbPOzKMu" credit="Marcelo Camargo/Agência Brasil · CC BY 3.0 BR · 8/jan/2023" creditHref="https://agenciabrasil.ebc.com.br/foto/2023-01/manifestantes-invadem-congresso-stf-e-palacio-do-planalto-1673209159" placeholder="Foto de abertura: Praça dos Três Poderes, 8 de janeiro de 2023" />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(4,18,47,.25) 0%,rgba(4,18,47,.35) 45%,rgba(7,28,77,.96) 100%)' }} />
        <div data-hero-title="1" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px 80px' }}>
            <div style={{ display: 'inline-flex', background: Y, color: NAVY, padding: '7px 13px', borderRadius: 99, ...label(), }}>Especial Contraprova</div>
            <h1 style={{ fontSize: 'clamp(36px,12vw,200px)', lineHeight: 0.82, margin: '20px 0 0', fontWeight: 900, fontStretch: '125%', letterSpacing: '-0.045em' }}>Bolsonaro<br /><span style={{ color: Y }}>Hipotético</span></h1>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.2vw,28px)', lineHeight: 1.4, maxWidth: 660, margin: '28px 0 0', color: '#E6EBF6', textWrap: 'pretty' }}>O que a história das ditaduras e a ciência política dizem sobre as falas, os atos e as promessas da família Bolsonaro.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40, fontSize: 14, fontWeight: 700, color: '#C9D2E8' }}>
              <span style={{ display: 'inline-block', animation: 'bob 1.6s ease-in-out infinite', fontSize: 20 }}>↓</span> Role para começar
            </div>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 40px' }}>
        <p data-reveal="1" style={{ ...reveal(), fontFamily: SERIF, fontSize: 'clamp(24px,2.6vw,32px)', lineHeight: 1.45, margin: 0, textWrap: 'pretty' }}><span style={{ float: 'left', fontFamily: ARCHIVO, fontWeight: 900, fontStretch: '125%', fontSize: 96, lineHeight: 0.8, margin: '6px 12px 0 0', color: Y }}>E</span> se Flávio Bolsonaro for eleito no dia 25 de outubro? Ninguém sabe o que faria no poder. Mas dá para comparar o que ele, o pai, os irmãos e o partido já disseram e fizeram com padrões que historiadores e cientistas políticos identificaram em democracias que deixaram de existir.</p>
        <div data-reveal="1" style={{ ...reveal(24, 0.8, 0.1), marginTop: 48, border: `2px solid ${Y}`, borderRadius: 20, padding: '24px 26px' }}>
          <div style={label(Y)}>Comparar não é igualar</div>
          <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, margin: '10px 0 0', color: '#E6EBF6', textWrap: 'pretty' }}>O Brasil de 2026 não é a Itália de 1922 nem a Alemanha de 1933. As comparações servem para reconhecer padrões. Cada item tem data e fonte, e indicamos quem disse ou fez: Jair, Flávio, Eduardo, o governo ou o PL.</p>
        </div>
      </section>

      {/* 01 · Como as democracias morrem */}
      <section id="sinais" style={{ paddingTop: 80 }}>
        <ChapterCover n="01" title="Como as democracias morrem" maxWidth={900} img={{ src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Imagens_de_Bras%C3%ADlia_-_Fachada_do_Pal%C3%A1cio_do_Congresso_Nacional_%2853457492293%29.jpg?width=1600', credit: 'Congresso Nacional · Agência Senado · CC BY 2.0', href: 'https://www.flickr.com/photos/agenciasenado/53457492293/', ph: 'Foto: capa de Como as democracias morrem, ou retrato dos autores' }} />

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px 24px' }}>
          <p data-reveal="1" style={{ ...reveal(), fontFamily: SERIF, fontSize: 21, lineHeight: 1.6, margin: 0, color: '#E6EBF6', textWrap: 'pretty' }}>Em 2018, os professores de Harvard Steven Levitsky e Daniel Ziblatt publicaram um estudo sobre democracias que ruíram nos séculos 20 e 21. Desde o fim da Guerra Fria, mostram eles, a maioria das rupturas não veio de tanques, mas de líderes eleitos que esvaziaram as instituições por dentro, quase sempre com medidas legais, aprovadas pelo Parlamento ou aceitas pelos tribunais.</p>
          <div data-reveal="1" style={{ ...reveal(), marginTop: 56, background: '#0B2A6F', borderRadius: 24, padding: 'clamp(18px,3vw,28px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <div style={label(Y)}>O que reunimos, ano a ano</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#C9D2E8' }}>{introDots.length} falas e atos com data e fonte</div>
            </div>
            <div style={{ position: 'relative', height: 150, marginTop: 22, borderBottom: '2px solid rgba(255,255,255,.3)' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '72.41%', width: '13.79%', background: 'rgba(95,208,143,.14)', borderRadius: '8px 8px 0 0' }} />
              <div style={{ position: 'absolute', top: 6, left: '72.41%', width: '13.79%', textAlign: 'center', fontSize: 11, fontWeight: 800, color: G }}>Governo</div>
              {introDots.map((d, i) => <div key={i} style={{ position: 'absolute', left: d.l, bottom: d.b, width: 10, height: 10, marginLeft: -5, borderRadius: '50%', background: d.bg }} />)}
            </div>
            <div style={{ position: 'relative', height: 20, marginTop: 6 }}>
              {introYears.map(y => <span key={y} style={{ position: 'absolute', left: pos(y), transform: 'translateX(-50%)', fontSize: 12, fontWeight: 700, color: MUTED }}>{y}</span>)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 16, fontSize: 13, fontWeight: 700, color: '#E6EBF6' }}>
              <Dot color={Y}>Jair</Dot><Dot color="#fff">Flávio</Dot><Dot color="#C9D2E8">Eduardo</Dot><Dot color={G}>Governo</Dot><Dot color="#FF8A8A">PL</Dot><Dot color="rgba(255,255,255,.4)">Aliados</Dot>
            </div>
          </div>
          <blockquote data-reveal="1" style={{ ...reveal(), margin: '56px 0 0', padding: 0, fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.15, fontWeight: 800, fontStretch: '105%', color: Y, textWrap: 'balance' }}>A erosão acontece aos poucos, em passos que, um a um, parecem pequenos demais para causar alarme.</blockquote>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 12 }}>Paráfrase de Levitsky e Ziblatt, Como as democracias morrem, introdução e cap. 4</div>
        </div>

        {/* Checklist 1 · os quatro sinais */}
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 40px' }}>
          <div style={label(Y)}>Checklist 1 · Os quatro sinais de alerta</div>
          <div style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 900, lineHeight: 1.05, marginTop: 8, maxWidth: 760 }}>O que está documentado em cada um</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 40 }}>
            {SIGNALS.map(sig => {
              const open = !!exp[sig.n];
              const ord = (SIG_RANK[sig.n] || sig.ev.map((_, i) => i)).map(i => sig.ev[i]);
              const more = sig.ev.length > SIG_SHOW;
              const ev = open || !more ? ord : ord.slice(0, SIG_SHOW);
              const mediaUrl = SIG_MEDIA[sig.n];
              const video = SIG_VIDEO[sig.n];
              return (
                <article key={sig.n} style={{ background: '#0B2A6F', borderRadius: 28, padding: 'clamp(22px,3.5vw,44px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 36 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, background: Y, color: NAVY, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 900 }}>{sig.n}</div>
                      <div style={label(MUTED)}>{sig.ev.length} registros</div>
                    </div>
                    <h3 style={{ fontSize: 'clamp(26px,2.8vw,36px)', lineHeight: 1.08, margin: 0, fontWeight: 900, textWrap: 'balance' }}>{sig.title}</h3>
                    <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, margin: 0, color: '#C9D2E8', textWrap: 'pretty' }}>{sig.def}</p>
                    {video && playing[sig.n] ? (
                      <video src={`${video.src}#t=${video.start}`} controls autoPlay playsInline preload="metadata" style={{ width: '100%', aspectRatio: '16/9', borderRadius: 18, background: '#000', display: 'block' }} />
                    ) : (
                      <div onClick={video ? () => setPlaying(x => ({ ...x, [sig.n]: true })) : undefined} onKeyDown={video ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlaying(x => ({ ...x, [sig.n]: true })); } } : undefined} role={video ? 'button' : undefined} tabIndex={video ? 0 : undefined} aria-label={video ? `Assistir: ${sig.media}` : undefined} style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 18, overflow: 'hidden', background: 'repeating-linear-gradient(135deg,#0F3380 0 12px,#0D2E74 12px 24px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 16, cursor: video ? 'pointer' : undefined }}>
                        <div style={{ fontFamily: MONO, fontSize: 12, color: '#C9D2E8' }}>{video ? `${sig.mediaKind} · a partir de ${Math.floor(video.start / 60)}:${String(video.start % 60).padStart(2, '0')}` : sig.mediaKind}</div>
                        <div style={{ alignSelf: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,210,31,.95)', display: 'grid', placeItems: 'center' }}><div style={{ width: 0, height: 0, borderLeft: `20px solid ${NAVY}`, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', marginLeft: 6 }} /></div>
                        <div style={{ fontFamily: MONO, fontSize: 12, color: '#C9D2E8', textWrap: 'pretty' }}>{sig.media}</div>
                      </div>
                    )}
                    {video ? <a href={video.page} target="_blank" rel="noopener" style={{ fontFamily: MONO, fontSize: 12, color: MUTED, marginTop: -6 }}>{video.credit} ↗</a> : null}
                    {mediaUrl ? <a href={mediaUrl} target="_blank" rel="noopener" className={s.yellowBtn} style={{ alignSelf: 'flex-start', fontSize: 14, padding: '10px 16px' }}>Assistir na fonte ↗</a> : null}
                    <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 16, padding: '14px 16px' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: Y }}>Em falas do próprio Flávio</div>
                      <p style={{ fontSize: 15, lineHeight: 1.5, margin: '6px 0 0', color: '#E6EBF6', textWrap: 'pretty' }}>{sig.flavio}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,.14)' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED }}>Os mais graves primeiro · {ev.length} de {sig.ev.length}</div>
                      {more ? <button onClick={() => setExp(x => ({ ...x, [sig.n]: !open }))} className={s.moreBtn}>{open ? 'Mostrar menos' : `Mostrar mais ${sig.ev.length - SIG_SHOW} →`}</button> : null}
                    </div>
                    {ev.map(e => {
                      const t = tag(e.who);
                      return (
                        <div key={e.date + e.text} data-reveal="1" style={{ ...reveal(16, 0.6), display: 'grid', gridTemplateColumns: '30px minmax(0,1fr)', gap: 12 }}>
                          <div style={{ width: 26, height: 26, borderRadius: 8, background: e.who === 'Flávio' ? '#fff' : Y, color: NAVY, display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 900, marginTop: 2 }}>✓</div>
                          <div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                              <span style={{ fontSize: 12, fontWeight: 800, padding: '3px 9px', borderRadius: 99, background: t.tagBg, color: t.tagFg }}>{e.who}</span>
                              <span style={{ fontSize: 13, fontWeight: 700, color: '#C9D2E8' }}>{e.date}</span>
                            </div>
                            <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.5, margin: '6px 0 0', textWrap: 'pretty' }}>{e.text}</p>
                            <Src src={e.src} mt={4} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* A escada: degrau por degrau */}
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 24px 0' }}>
          <div style={label(Y)}>Não acontece da noite para o dia</div>
          <div style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 900, lineHeight: 1.05, marginTop: 8, maxWidth: 760 }}>Escolha um país e desça a escada, degrau por degrau</div>
          <Tabs items={Object.entries(GRAD).map(([k, v]) => ({ key: k, label: v.label }))} active={grad} onSelect={setGrad} />
          <div className={s.mobileOnly} style={{ fontSize: 15, lineHeight: 1.5, color: '#C9D2E8', marginTop: 20, textWrap: 'pretty' }}>{gd.intro}</div>
        </div>
        <div className={s.scrolly} style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px 40px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(20px,4vw,56px)' }}>
          <div className={s.stickyCell}>
            <div className={s.gradPanel} style={{ position: 'sticky', top: 90, height: 'calc(100vh - 120px)', minHeight: 460, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
              <div key={grad + gi} className={s.gradDate} style={{ fontSize: 'clamp(56px,7vw,104px)', fontWeight: 900, fontStretch: '125%', lineHeight: 0.85, color: Y, letterSpacing: '-0.03em', animation: 'swap .5s ease both' }}>{gd.steps[gi].date}</div>
              <div className={s.ladder} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {gd.steps.map((st, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: (i * 7) + '%', transition: 'margin .5s ease' }}>
                    <div className={s.ladderBar} style={{ height: 34, width: (100 - i * 16) + 'px', borderRadius: 6, background: i < gi ? RED : i === gi ? Y : 'rgba(255,255,255,.12)', transition: 'background .4s,width .6s ease' }} />
                    <span className={s.ladderLabel} style={{ fontSize: 13, fontWeight: 700, color: i <= gi ? '#fff' : MUTED, whiteSpace: 'nowrap', transition: 'color .4s' }}>{st.date}</span>
                  </div>
                ))}
              </div>
              <div className={s.desktopOnly} style={{ fontSize: 14, color: '#C9D2E8', maxWidth: 440, textWrap: 'pretty' }}>{gd.intro}</div>
            </div>
          </div>
          <div>
            {gd.steps.map((st, i) => (
              <div key={grad + i} data-sg="grad" className={s.scrollStep} style={{ minHeight: '72vh', display: 'flex', alignItems: 'center' }}>
                <div style={{ ...scrollItem(i, gi), transition: 'opacity .5s ease,transform .5s ease', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
                  <div style={label(Y)}>Degrau {i + 1} · {st.date}</div>
                  <h3 style={{ fontSize: 'clamp(26px,2.8vw,38px)', lineHeight: 1.08, margin: 0, fontWeight: 900, textWrap: 'balance' }}>{st.title}</h3>
                  <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, margin: 0, color: '#DDE3F1', textWrap: 'pretty' }}>{st.text}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}><span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FF8A8A' }}>Perdeu-se</span><span style={{ fontSize: 15, fontWeight: 700 }}>{st.lost}</span></div>
                  <Src src={st.src} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 · O plano */}
      <section id="plano" style={{ background: '#160407', color: '#fff', paddingTop: 120 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
          <div style={bigNumber(RED)}>02</div>
          <h2 style={h2Style(1000)}>O plano para matar o presidente eleito</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 24 }}>
            <span style={{ fontFamily: MONO, fontSize: 15, color: '#C99A9A', textDecoration: 'line-through', textDecorationColor: RED, textDecorationThickness: 3 }}>Fox_2017.docx</span>
            <span style={{ fontSize: 20, color: RED }}>→</span>
            <span style={{ fontFamily: MONO, fontSize: 'clamp(15px,2.4vw,28px)', overflowWrap: 'anywhere', color: '#fff', background: '#FF5A5A1F', border: `2px solid ${RED}`, padding: '8px 14px', borderRadius: 10 }}>Plj.docx</span>
          </div>
          <div style={{ fontSize: 14, color: '#C99A9A', marginTop: 10 }}>O arquivo foi renomeado e impresso no Palácio do Planalto. O título interno era “Planejamento Punhal Verde Amarelo”.</div>
          <Src src={'PGR, denúncia na Pet 12.100 (18/fev/2025); STF, voto do relator na AP 2668 (9/set/2025)'} muted='#C99A9A' mt={6} />
        </div>

        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 24px 24px' }}>
          <div style={{ ...label('#FF8A8A', '.12em'), textAlign: 'center' }}>Os alvos · ação contra Moraes marcada para 15 de dezembro de 2022</div>
          <div className={s.targets} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(16px,4vw,56px)', marginTop: 48 }}>
            <Target name="Lula" role="Presidente eleito" method="Envenenamento" img="https://commons.wikimedia.org/wiki/Special:FilePath/Foto%20oficial%20de%20Luiz%20In%C3%A1cio%20Lula%20da%20Silva%20(3x4%20cropped).jpg?width=600" credit="Foto: Ricardo Stuckert/PR · CC BY 2.0" creditHref="https://commons.wikimedia.org/wiki/File:Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_(3x4_cropped).jpg" />
            <Target name="Geraldo Alckmin" role="Vice eleito" method="Método não detalhado" img="https://commons.wikimedia.org/wiki/Special:FilePath/Vice%20Presidente%20da%20Rep%C3%BAblica%20do%20Brasil%2C%20Geraldo%20Alckmin%20em%202023.jpg?width=600" credit="Foto: Cadu Gomes/VPR · CC BY 2.0" creditHref="https://commons.wikimedia.org/wiki/File:Vice_Presidente_da_Rep%C3%BAblica_do_Brasil%2C_Geraldo_Alckmin_em_2023.jpg" />
            <Target name="Alexandre de Moraes" role="Presidente do TSE" method="Tiro, explosivo ou veneno" img="https://commons.wikimedia.org/wiki/Special:FilePath/Ministro%20Alexandre%20de%20Moraes%20como%20presidente%20do%20TSE.jpg?width=600" credit="Foto: Isac Nóbrega/PR · CC BY 2.0" creditHref="https://commons.wikimedia.org/wiki/File:Ministro_Alexandre_de_Moraes_como_presidente_do_TSE.jpg" />
          </div>
        </div>

        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 24px' }}>
          <div style={label('#FF8A8A', '.12em')}>O arsenal previsto no documento</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
            {ARSENAL.map((a, i) => (
              <div key={a} data-reveal="1" style={{ ...reveal(16, 0.5), display: 'flex', alignItems: 'center', gap: 10, background: '#2A0A0F', border: '1px solid #5A1A22', borderRadius: 99, padding: '10px 18px 10px 10px' }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: RED, color: '#2A0A0F', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 900 }}>{i + 1}</span>
                <span style={{ fontSize: 17, fontWeight: 800 }}>{a}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16, marginTop: 40 }}>
            <div data-reveal="1" style={{ ...reveal(16, 0.6), background: '#2A0A0F', borderRadius: 22, padding: 24 }}>
              <div style={label('#FF8A8A')}>Grupo no Signal</div>
              <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>“Copa 2022”</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: '#5A1A22', display: 'grid', placeItems: 'center', fontFamily: MONO, fontSize: 11, color: '#F1DADA' }}>?</div>)}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: '#F1DADA', marginTop: 14, textWrap: 'pretty' }}>Militares das Forças Especiais, os “kids pretos”, usavam codinomes de países (Alemanha, Argentina, Áustria, Brasil, Gana e Japão) para monitorar Moraes.</div>
              <Src src={'PGR, denúncia na Pet 12.100 (18/fev/2025)'} muted='#C99A9A' mt={10} />
            </div>
            <div data-reveal="1" style={{ ...reveal(16, 0.6, 0.1), background: RED, color: '#2A0A0F', borderRadius: 22, padding: 24 }}>
              <div style={label()}>Acusação da PGR</div>
              <div style={{ fontSize: 'clamp(24px,2.6vw,32px)', fontWeight: 900, lineHeight: 1.15, marginTop: 8, textWrap: 'balance' }}>O plano foi “levado ao conhecimento do Presidente da República, que a ele anuiu”.</div>
              <Src src={'PGR, denúncia na Pet 12.100 (18/fev/2025)'} muted='#2A0A0F' mt={12} style={{ color: '#2A0A0F' }} />
            </div>
            <div data-reveal="1" style={{ ...reveal(16, 0.6, 0.2), background: '#2A0A0F', borderRadius: 22, padding: 24 }}>
              <div style={label('#FF8A8A')}>O autor admitiu</div>
              <div style={{ fontSize: 'clamp(24px,2.6vw,32px)', fontWeight: 900, lineHeight: 1.15, marginTop: 8 }}>“Pensamento digitalizado”</div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: '#F1DADA', marginTop: 10, textWrap: 'pretty' }}>Assim o general Mário Fernandes descreveu o plano ao STF, em julho de 2025, ao reconhecer a autoria.</div>
              <Src src='Metrópoles, jul/2025 (interrogatório de Mário Fernandes)' muted='#C99A9A' mt={12} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 24px' }}>
          <div style={label('#FF8A8A', '.12em')}>A contagem regressiva</div>
          <div style={{ position: 'relative', marginTop: 28, paddingLeft: 40 }}>
            <div style={{ position: 'absolute', left: 11, top: 6, bottom: 6, width: 3, background: '#5A1A22', borderRadius: 2 }} />
            {PLAN_TL.map(([date, text, color, size, src]) => (
              <div key={date} data-reveal="1" style={{ ...reveal(-16, 0.6, 0, 'X'), position: 'relative', padding: '0 0 30px' }}>
                <div style={{ position: 'absolute', left: -38, top: 2, width: size, height: size, borderRadius: '50%', background: color, boxShadow: '0 0 0 5px #160407' }} />
                <div style={{ fontFamily: MONO, fontSize: 13, color }}>{date}</div>
                <div style={{ fontSize: 'clamp(19px,2vw,24px)', fontWeight: 800, lineHeight: 1.25, marginTop: 4, textWrap: 'pretty' }}>{text}</div>
                <Src src={src} muted='#C99A9A' mt={6} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 24px 40px' }}>
          <div style={label('#FF8A8A', '.12em')}>As penas no STF, em anos de prisão</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            {PENAS.map(([name, role, years, txt, color]) => (
              <div key={name} className={s.penaRow} style={{ display: 'grid', gridTemplateColumns: 'minmax(120px,240px) minmax(0,1fr)', gap: 16, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.2 }}>{name}</div>
                  <div style={{ fontSize: 12, color: '#C99A9A' }}>{role}</div>
                </div>
                <div className={s.penaBar} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div data-grow={(years / 27.25 * 82).toFixed(1) + '%'} style={{ height: 26, width: 0, background: color, borderRadius: 6, transition: 'width 1.2s cubic-bezier(.2,.8,.2,1)' }} />
                  <span style={{ fontSize: 15, fontWeight: 900, whiteSpace: 'nowrap' }}>{txt}</span>
                </div>
              </div>
            ))}
          </div>
          <Src src='STF, AP 2668; STF, AP 2693 (núcleo 2, 16/dez/2025); Agência Brasil, 16/dez/2025' muted='#C99A9A' mt={16} />
        </div>

        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 24px 120px' }}>
          <div data-reveal="1" style={{ ...reveal(), background: Y, color: NAVY, borderRadius: 28, padding: 'clamp(24px,4vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 24, alignItems: 'center' }}>
            <div style={{ fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900, fontStretch: '115%', lineHeight: 0.95, letterSpacing: '-0.02em' }}>“Vou dar indulto para todo mundo.”</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.45, textWrap: 'pretty' }}>Flávio Bolsonaro, sobre os condenados pelo 8 de janeiro e pela trama golpista, se a anistia não passar no Congresso.</div>
              <Src src='SBT News, 29/set/2026' size={13} muted={NAVY} mt={12} style={{ color: NAVY, fontWeight: 800 }} />
            </div>
          </div>
        </div>
      </section>

      {/* 03 · O inimigo de sempre */}
      <section id="inimigo" style={{ background: '#2A0A0F' }}>
        <div data-parallax="0.18" style={{ position: 'relative', height: '62vh', minHeight: 420, overflow: 'hidden', marginBottom: 64 }}>
          <div data-par-inner="1" style={{ position: 'absolute', left: 0, right: 0, top: '-12%', bottom: '-12%', filter: 'grayscale(1) contrast(1.1)' }}>
            <ImageSlot src="https://commons.wikimedia.org/wiki/Special:FilePath/Deposi%C3%A7%C3%A3o%20do%20Governo%20Jo%C3%A3o%20Goulart%20%E2%80%93%20Golpe%20de%201964%2015.tif?width=1920" credit="Correio da Manhã/Arquivo Nacional · domínio público · tanques no Rio, 2/abr/1964" creditHref="https://commons.wikimedia.org/wiki/File:Deposi%C3%A7%C3%A3o_do_Governo_Jo%C3%A3o_Goulart_%E2%80%93_Golpe_de_1964_15.tif" placeholder="Foto: tanques no Rio, abril de 1964" />
          </div>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(42,10,15,.2) 0%,rgba(42,10,15,.95) 100%)' }} />
        </div>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px 40px' }}>
          <div style={bigNumber(RED)}>03</div>
          <h2 style={h2Style(1000)}>O inimigo de sempre</h2>
          <p style={{ fontFamily: SERIF, fontSize: 21, lineHeight: 1.6, maxWidth: 680, margin: '28px 0 0', color: '#F1DADA', textWrap: 'pretty' }}>O Estado Novo de Vargas e o golpe de 1964 se justificaram com o mesmo argumento: era preciso salvar o país de uma ameaça comunista. Governos autoritários de vários continentes repetiram a fórmula. Role para ver quem foi apontado como inimigo, e por quem.</p>
        </div>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '16px 24px 24px' }}>
          <div style={label('#FF8A8A', '.12em')}>A mesma fórmula, 1933–2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,140px),1fr))', gap: 10, marginTop: 16 }}>
            {ENEMY_STEPS.map(e => (
              <a key={e.i} href={'#inimigo-' + e.i} className={s.enemyChip} style={{ '--chip-bg': e.chipBg } as CSSProperties}>
                <span style={{ fontSize: 24, fontWeight: 900, fontStretch: '120%', lineHeight: 1, color: e.tagColor }}>{e.y}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#F1DADA' }}>{e.where}</span>
                <span style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.15, color: RED, overflowWrap: 'anywhere' }}>{e.enemy}</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '40px 24px 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {ENEMY_STEPS.map(e => {
            const box: CSSProperties = { background: 'rgba(255,255,255,.07)', borderRadius: 14, padding: 12, display: 'flex', flexDirection: 'column', gap: 4 };
            const boxLabel: CSSProperties = { fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: '#C99A9A' };
            return (
              <article key={e.i} id={'inimigo-' + e.i} data-reveal="1" style={{ ...reveal(), scrollMarginTop: 90, background: '#3A1218', borderRadius: 28, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))' }}>
                <div style={{ position: 'relative', minHeight: 280, background: '#2A0A0F', filter: 'grayscale(1) contrast(1.05)' }}>
                  <ImageSlot src={e.img} credit={e.credit} creditHref={e.href} placeholder={e.ph} position={e.pos} style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div style={{ padding: 'clamp(20px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
                  <div style={label(e.tagColor)}>{e.y} · {e.where}</div>
                  <h3 style={{ fontSize: 'clamp(22px,2.6vw,34px)', lineHeight: 1.1, margin: 0, fontWeight: 900, textWrap: 'balance' }}>{e.title}</h3>
                  <p style={{ fontFamily: SERIF, fontSize: 'clamp(16px,1.5vw,18px)', lineHeight: 1.55, margin: 0, color: '#F1DADA', textWrap: 'pretty' }}>{e.text}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,140px),1fr))', gap: 8, marginTop: 6 }}>
                    <div style={box}><span style={boxLabel}>Quem acusou</span><span style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>{e.accuser}</span></div>
                    <div style={{ ...box, background: RED, color: '#2A0A0F' }}><span style={{ ...boxLabel, color: undefined }}>→ O inimigo</span><span style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.25 }}>{e.enemy}</span></div>
                    <div style={box}><span style={boxLabel}>→ O que veio depois</span><span style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>{e.after}</span></div>
                  </div>
                  <Src src={e.src} muted="#C99A9A" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 04 · Minorias */}
      <section id="minorias" style={{ paddingTop: 120 }}>
        <ChapterCover n="04" title="Minorias" maxWidth={1000} img={{ src: YANO[0], credit: YANO[1], href: YANO[2], ph: 'Foto: Terra Indígena Yanomami, janeiro de 2023' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px 24px' }}>
          <p data-reveal="1" style={{ ...reveal(), fontFamily: SERIF, fontSize: 21, lineHeight: 1.6, margin: 0, color: '#E6EBF6', textWrap: 'pretty' }}>Regimes autoritários costumam começar retirando direitos de quem tem menos voz. Abaixo, o que foi dito e o que foi feito entre 2019 e 2022, e o que figuras do PL disseram em 2026. Escolha um grupo e alterne entre falas e ações.</p>
        </div>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px 40px' }}>
          <Tabs items={MIN_G.map(g => ({ key: g.id, label: g.label, n: String(MIN.filter(m => m.g === g.id).length) }))} active={minG} onSelect={selectMinGroup} mt={0} />
          <div key={minG} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 20, animation: 'rise .45s ease both' }}>
            <div style={{ flex: '2 1 520px', minWidth: 0, background: '#0B2A6F', borderRadius: 24, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px 20px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 'clamp(48px,7vw,96px)', fontWeight: 900, fontStretch: '120%', lineHeight: 0.85, color: Y }}>{md.big}</div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45, maxWidth: 440, textWrap: 'pretty' }}>{md.caption}</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: md.gap, marginTop: 20 }}>
                {Array.from({ length: md.n }, (_, i) => (
                  <div key={i} style={{ width: md.s, height: md.s, borderRadius: md.r, background: md.colors ? md.colors[i] : md.hi && i < md.hi ? RED : md.color, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 900, color: NAVY }}>{md.names ? md.names[i] : ''}</div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 14, fontSize: 13, fontWeight: 700, color: '#E6EBF6' }}>
                {md.legend.map(([c, t]) => <Dot key={t} color={c} radius="3px">{t}</Dot>)}
              </div>
              <Src src={md.src} mt={12} />
            </div>
            <div style={{ flex: '1 1 240px', background: Y, color: NAVY, borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: 'clamp(44px,5.5vw,80px)', fontWeight: 900, fontStretch: '120%', lineHeight: 0.85, overflowWrap: 'anywhere' }}>{md.side[0]}</div>
              <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.35, textWrap: 'pretty' }}>{md.side[1]}</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>{md.side[2]}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
            <span style={label(MUTED)}>Registros</span>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,.08)', borderRadius: 99, padding: 4 }}>
              {([['f', 'Falas'], ['a', 'Ações do governo']] as const).map(([k, l]) => {
                const has = minAll.some(m => m.k === k);
                return <button key={k} onClick={() => has && setMinK(k)} style={{ border: 'none', cursor: 'pointer', padding: '9px 16px', fontSize: 14, fontWeight: 800, borderRadius: 99, background: k === minK ? '#fff' : 'transparent', color: k === minK ? NAVY : (has ? '#fff' : MUTED), transition: 'all .2s' }}>{l}</button>;
              })}
            </div>
          </div>
          <div key={minG + minK} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,330px),1fr))', gap: 16, marginTop: 28 }}>
            {showMin.map((m, i) => {
              const t = tag(m.who);
              return (
                <div key={m.date + m.text} style={{ background: '#0B2A6F', borderRadius: 22, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, animation: 'rise .45s ease both', animationDelay: (i * 0.05) + 's' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 99, background: t.tagBg, color: t.tagFg }}>{m.who}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#C9D2E8' }}>{m.date}</span>
                  </div>
                  <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.5, margin: 0, textWrap: 'pretty' }}>{m.text}</p>
                  {m.status ? <div style={{ fontSize: 14, fontWeight: 700, color: Y, textWrap: 'pretty' }}>{m.status}</div> : null}
                  <Src src={m.src} mt="auto" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 · No mundo */}
      <section id="mundo" style={{ paddingTop: 120 }}>
        <ChapterCover n="05" title="O padrão na América Latina e no mundo" maxWidth={1000} img={{ src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Golpe%20de%20Estado%201973.jpg?width=1920', credit: 'Biblioteca del Congreso Nacional de Chile · CC BY 3.0 CL', href: 'https://commons.wikimedia.org/wiki/File:Golpe_de_Estado_1973.jpg', ph: 'Foto de arquivo: Palacio de La Moneda, Santiago, 11 de setembro de 1973' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 24px 40px' }}>
          <div style={label(Y)}>Checklist 3 · Histórico</div>
          <div style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 900, lineHeight: 1.05, marginTop: 8, maxWidth: 820 }}>Sete táticas, de Vargas a Bukele. Escolha uma.</div>
          <Tabs items={TACTICS.map(t => ({ key: t.id, label: t.label, n: String(t.cases.length + 1) }))} active={tac} onSelect={setTac} />
          <div key={'img-' + tac} style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 28, animation: 'rise .45s ease both' }}>
            <div style={{ flex: '1 1 100%', height: 'clamp(220px,32vw,380px)', position: 'relative', borderRadius: 26, overflow: 'hidden', background: '#0B2A6F' }}>
              <ImageSlot src={tacImg.src} credit={tacImg.credit} creditHref={tacImg.href} placeholder={tacImg.ph} style={{ position: 'absolute', inset: 0 }} />
            </div>
          </div>
          <div key={'cards-' + tac} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 20, marginTop: 20 }}>
            <div style={{ background: Y, color: NAVY, borderRadius: 26, padding: 26, display: 'flex', flexDirection: 'column', gap: 16, animation: 'rise .45s ease both' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 900 }}>Família Bolsonaro e governo</div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>2018–2026</div>
              </div>
              {tacBolso.map(([who, date, text, src]) => (
                <div key={date + text} style={{ display: 'grid', gridTemplateColumns: '28px minmax(0,1fr)', gap: 12 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: NAVY, color: Y, display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 900 }}>✓</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{who} · {date}</div>
                    <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.5, margin: '4px 0 0', textWrap: 'pretty' }}>{text}</p>
                    <Src src={src} mt={4} muted="inherit" style={{ opacity: 0.7 }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,240px),1fr))', gap: 12, alignContent: 'start' }}>
              {tacObj.cases.map(([name, when, text, src], i) => (
                <div key={name + when} style={{ background: '#0B2A6F', borderRadius: 20, padding: 18, display: 'flex', flexDirection: 'column', gap: 8, animation: 'rise .45s ease both', animationDelay: (i * 0.05) + 's' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 17, fontWeight: 900 }}>{name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#C9D2E8' }}>{when}</span>
                  </div>
                  <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.5, margin: 0, color: '#E6EBF6', textWrap: 'pretty' }}>{text}</p>
                  <Src src={src} size={11} mt="auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 · Flávio, 2018–2026 */}
      <section id="flavio" style={{ paddingTop: 120 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px 40px' }}>
          <div style={bigNumber(Y)}>06</div>
          <h2 style={h2Style()}>Flávio, 2018–2026</h2>
        </div>
        <div className={s.scrolly} style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,1fr)', gap: 'clamp(20px,4vw,56px)' }}>
          <div className={s.stickyCell}>
            <div className={s.flavioPanel} style={{ position: 'sticky', top: 80, height: 'calc(100vh - 110px)', minHeight: 480, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ position: 'relative', flex: 1, borderRadius: 24, overflow: 'hidden', background: '#04122F' }}>
                {FLAVIO.map((f, i) => (
                  <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === fi ? 1 : 0, transform: i === fi ? 'scale(1.04)' : 'scale(1)', transition: 'opacity .7s ease,transform 1.2s ease', pointerEvents: i === fi ? 'auto' : 'none' }}>
                    <ImageSlot src={F_IMG[i]?.[0]} credit={F_IMG[i]?.[1]} creditHref={F_IMG[i]?.[2]} placeholder={f.ph} />
                  </div>
                ))}
                <div style={{ position: 'absolute', left: 16, top: 16, pointerEvents: 'none', background: Y, color: NAVY, padding: '8px 14px', borderRadius: 99, fontSize: 15, fontWeight: 900 }}>{fNow.date}</div>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {FLAVIO.map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i <= fi ? Y : 'rgba(255,255,255,.18)', transition: 'background .3s' }} />)}
              </div>
            </div>
          </div>
          <div>
            {FLAVIO.map((f, i) => (
              <div key={i} data-sg="flavio" className={s.scrollStep} style={{ minHeight: '86vh', display: 'flex', alignItems: 'center' }}>
                <div style={{ ...scrollItem(i, fi), transition: 'opacity .5s ease,transform .5s ease', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 520 }}>
                  <div style={label(f.link ? Y : MUTED)}>{f.date} · {f.tag}</div>
                  <h3 style={{ fontSize: 'clamp(28px,3vw,42px)', lineHeight: 1.05, margin: 0, fontWeight: 900, letterSpacing: '-0.015em', textWrap: 'balance' }}>{f.title}</h3>
                  <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, margin: 0, color: '#DDE3F1', textWrap: 'pretty' }}>{f.text}</p>
                  {f.audio ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.08)', borderRadius: 99, padding: '8px 18px 8px 8px' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: Y, display: 'grid', placeItems: 'center', flex: 'none' }}><div style={{ width: 0, height: 0, borderLeft: `13px solid ${NAVY}`, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', marginLeft: 4 }} /></div>
                      <div style={{ fontFamily: MONO, fontSize: 12, color: '#C9D2E8' }}>ÁUDIO A INSERIR · {f.audio}</div>
                    </div>
                  ) : null}
                  {f.link ? <div style={{ fontSize: 14, fontWeight: 700, color: Y }}>{f.link}</div> : null}
                  <Src src={f.src} size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Balanço */}
      <section id="balanco" style={{ background: '#04122F' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '120px 24px' }}>
          <div style={label(Y)}>Balanço</div>
          <p style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.5, maxWidth: 700, margin: '24px 0 0', color: '#E6EBF6', textWrap: 'pretty' }}>Para Levitsky e Ziblatt, um único sinal de alerta já é motivo de preocupação. Este é o placar do que está documentado nas páginas acima.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 16, marginTop: 48 }}>
            {TALLY.map(t => (
              <div key={t.label} data-reveal="1" style={{ ...reveal(24, 0.7), background: '#0B2A6F', borderRadius: 20, padding: 22 }}>
                <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, color: Y }}>{t.a}<span style={{ fontSize: 24, color: MUTED }}>/{t.b}</span></div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, textWrap: 'pretty' }}>{t.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 56 }}>
            <a href="https://www.tse.jus.br" className={s.yellowBtn} style={{ padding: '18px 26px', fontSize: 18 }}>Onde eu voto?</a>
            <Link href="/" className={s.ghostBtn} style={{ padding: '16px 24px', border: '3px solid #fff' }}>Voltar ao comparador</Link>
            <button onClick={share} className={s.ghostBtn} style={{ border: '3px solid rgba(255,255,255,.4)', padding: '15px 24px' }}>{shared ? 'Link copiado!' : 'Compartilhar'}</button>
          </div>
          <div style={{ marginTop: 72, fontSize: 13, lineHeight: 1.6, color: MUTED, maxWidth: 760 }}>Cada fonte leva ao documento original. Damos preferência a registros oficiais: leis, decisões judiciais, relatórios do Congresso, dados do TSE e de órgãos públicos. Falas que só foram registradas pela imprensa ou em redes sociais aparecem marcadas como não oficiais. As fotos são de acervos públicos, com autor e licença no crédito.</div>
        </div>
      </section>
    </div>
  );
}
