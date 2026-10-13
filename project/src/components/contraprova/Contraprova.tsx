'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import Logo from '../Logo';
import ImageSlot from '../bolsonaro-hipotetico/ImageSlot';
import Fonte from '../Fonte';
import WordSphere from './WordSphere';
import s from './styles.module.css';
import {
  Y, B, G, GOVS, AREAS, BANDS, BAND_BG, IND, MEAS, TONE, STANCE, LOGOS, PHOTOS, CRISES, PANDEMIC_TL, COVID_WORLD,
  PLN, MODS, THEME_SHORT, nf, fmtI, ranksOf, rankBg,
  type Gov, type Ex, type Plans, type PlanKey, type Mod,
} from './data';

const INK = '#10213F', MUTED = '#5A6478', BODY = '#3C4760', CREAM = '#FBF8EF', NAVY = '#071C4D';
const SERIF = 'Georgia, serif';
const HIPO = '/bolsonaro-hipotetico';

const kicker = (color = G): CSSProperties => ({ fontSize: 14, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color });
const pill = (bg: string, fg: string): CSSProperties => ({ display: 'inline-flex', background: bg, color: fg, padding: '8px 14px', borderRadius: 99, fontSize: 14, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' });
const h2 = (size: string, maxWidth?: number): CSSProperties => ({ fontSize: size, lineHeight: 0.95, margin: '12px 0 0', fontWeight: 900, fontStretch: '115%', letterSpacing: '-0.02em', maxWidth });
const h3: CSSProperties = { fontSize: 'clamp(24px,2.8vw,34px)', lineHeight: 1.05, margin: 0, fontWeight: 900 };
const intro: CSSProperties = { fontSize: 15, lineHeight: 1.5, margin: '8px 0 0', color: BODY, maxWidth: 820, textWrap: 'pretty' };
const tinyCaps: CSSProperties = { fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', color: MUTED };
const grid = (min: number, gap = 16, mt = 18): CSSProperties => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${min}px),1fr))`, gap, marginTop: mt });
const tab = (on: boolean, extra?: CSSProperties): CSSProperties => ({ border: 'none', cursor: 'pointer', padding: '9px 14px', fontSize: 14, fontWeight: 800, borderRadius: 99, background: on ? B : '#F3EFE3', color: on ? '#fff' : B, ...extra });
const outlineTab = (on: boolean, extra?: CSSProperties): CSSProperties => ({ border: `2px solid ${B}`, cursor: 'pointer', padding: '10px 18px', fontSize: 16, fontWeight: 800, borderRadius: 99, background: on ? B : '#fff', color: on ? '#fff' : B, ...extra });
const segBtn = (on: boolean): CSSProperties => ({ border: 'none', cursor: 'pointer', padding: '9px 16px', fontSize: 14, fontWeight: 800, borderRadius: 99, background: on ? '#fff' : 'transparent', color: B });
const pct = (v: number) => v.toFixed(2) + '%';
const countLabel = (counts: [number, string, string][]) => counts.filter(x => x[0]).map(x => x[0] + ' ' + (x[0] === 1 ? x[1] : x[2])).join(' · ');

const Dot = ({ color, size = 14 }: { color: string; size?: number }) => <span style={{ flex: 'none', width: size, height: size, borderRadius: '50%', background: color }} />;

// Trecho citado de um plano, com link para a página do PDF.
function Quote({ e, pdf, size = 15, mt = 10 }: { e: Ex; pdf: string; size?: number; mt?: number }) {
  return (
    <p style={{ fontFamily: SERIF, fontSize: size, lineHeight: 1.5, margin: `${mt}px 0 0`, color: INK, textWrap: 'pretty' }}>
      “{e.s}” <a href={`${pdf}#page=${e.p}`} target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}>p. {e.p} ↗</a>
    </p>
  );
}

// Coluna de um candidato nos módulos de propostas.
function PlanCol({ who, color, children }: { who: string; color: string; children: ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 22, padding: 'clamp(16px,2.5vw,24px)', borderTop: `6px solid ${color}`, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Dot color={color} /><span style={{ fontSize: 18, fontWeight: 900 }}>{who}</span></div>
      {children}
    </div>
  );
}

function GovHeader({ g, count, per }: { g: Gov; count: string; per?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: g.color, color: '#fff', borderRadius: 16, padding: '14px 18px' }}>
      <span style={{ fontSize: 22, fontWeight: 900 }}>{g.gov}</span>
      {per ? <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>{g.per}</span> : null}
      <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 800, opacity: 0.9, textAlign: 'right' }}>{count}</span>
    </div>
  );
}

function ToneBadge({ tone }: { tone: keyof typeof TONE }) {
  const T = TONE[tone];
  return <span style={{ marginLeft: 'auto', flex: 'none', background: T[1], color: T[2], fontSize: 12, fontWeight: 900, padding: '4px 10px', borderRadius: 99 }}>{T[0]}</span>;
}

function TwoBoxes({ a, aText, bText, tone, min }: { a: string; aText: string; bText: string; tone: keyof typeof TONE; min: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${min}px),1fr))`, gap: 8 }}>
      <div style={{ background: CREAM, borderRadius: 12, padding: '10px 12px' }}><div style={tinyCaps}>{a}</div><p style={{ fontSize: 14, lineHeight: 1.45, margin: '4px 0 0', color: INK, textWrap: 'pretty' }}>{aText}</p></div>
      <div style={{ background: TONE[tone][1], borderRadius: 12, padding: '10px 12px' }}><div style={tinyCaps}>Resultado</div><p style={{ fontSize: 14, lineHeight: 1.45, margin: '4px 0 0', color: INK, fontWeight: 700, textWrap: 'pretty' }}>{bText}</p></div>
    </div>
  );
}

const YearChip = ({ y }: { y: string }) => <span style={{ flex: 'none', background: B, color: '#fff', fontSize: 12, fontWeight: 800, padding: '3px 8px', borderRadius: 99 }}>{y}</span>;

// ---------------------------------------------------------------- cabeçalho e abertura

const NAV: [string, string, boolean?][] = [['#comparacao', 'Comparação'], [HIPO, 'Bolsonaro Hipotético', true], ['#propostas', 'Propostas'], ['#crises', 'Crises'], ['#votar', 'Votar dia 25'], ['#metodo', 'Método']];

function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 10, background: B, color: '#fff' }}>
      <div className={s.topbar} style={{ maxWidth: 1240, margin: '0 auto', padding: '14px 28px', display: 'flex', flexWrap: 'wrap', gap: '12px 28px', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#topo" aria-label="Contraprova" style={{ display: 'flex', alignItems: 'center', flex: 'none', color: '#fff', textDecoration: 'none' }}>
          <Logo size={24} />
        </a>
        <nav className={s.nav} style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {NAV.map(([href, label, hi]) => {
            const style: CSSProperties = { color: hi ? Y : '#fff', textDecoration: 'none', padding: '8px 14px', borderRadius: 99, fontSize: 15, fontWeight: hi ? 700 : 600 };
            return hi
              ? <Link key={href} href={href} className={s.navLinkHi} style={style}>{label}</Link>
              : <a key={href} href={href} className={s.navLink} style={style}>{label}</a>;
          })}
        </nav>
      </div>
    </header>
  );
}

const ctaYellow = (shadow: string): CSSProperties => ({ background: Y, color: B, textDecoration: 'none', padding: '18px 28px', borderRadius: 99, fontSize: 19, fontWeight: 800, boxShadow: `0 6px 0 ${shadow}` });
const ctaWhite: CSSProperties = { background: '#fff', color: B, textDecoration: 'none', padding: '18px 28px', borderRadius: 99, fontSize: 19, fontWeight: 800 };

function Hero() {
  return (
    <section id="topo" style={{ background: G, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 28px 88px', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 56, alignItems: 'center' }}>
        <div style={{ order: 1, minWidth: 0 }}>
          <div style={pill(B, Y)}>A democracia se decide em quem aparece</div>
          <h1 style={{ fontSize: 'clamp(52px,7.5vw,112px)', lineHeight: 0.88, margin: '24px 0 0', fontWeight: 900, fontStretch: '120%', letterSpacing: '-0.035em', color: Y, textWrap: 'balance' }}>Quem não vota também escolhe.</h1>
          <p style={{ fontSize: 'clamp(20px,2.2vw,26px)', lineHeight: 1.4, maxWidth: 600, margin: '28px 0 0', textWrap: 'pretty', fontWeight: 500 }}>Democracia não se defende sozinha. Ela depende de quem sai de casa no dia da eleição. Faltou no 1º turno? Ainda dá tempo.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
            <a href="#votar" className={`${s.lift} ${s.press}`} style={ctaYellow(B)}>Onde eu voto? →</a>
            <a href="#comparacao" className={s.btnLight} style={ctaWhite}>Por que este 2º turno importa</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const RULES: [string, string, string, string, string][] = [
  ['1', G, Y, 'Fonte oficial, com link', 'IBGE, Banco Central, Ipea, ministérios, Congresso, STF, TSE e organismos internacionais como FMI, Banco Mundial, OMS e FAO. O que não vem de órgão público é marcado como não oficial.'],
  ['2', Y, B, 'Os dois lados do placar', 'Quando o indicador favorece o governo Bolsonaro, ele aparece com o mesmo destaque.'],
  ['3', B, '#fff', 'Contexto junto do dado', 'Pandemia, guerra, juros globais e Banco Central autônomo explicam parte dos números.'],
];

function Rules() {
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 28px 40px' }}>
      <div style={kicker()}>Regras do jogo</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 20 }}>
        {RULES.map(([n, bg, fg, title, text]) => (
          <div key={n} style={{ background: '#fff', borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, color: fg, display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 900 }}>{n}</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{title}</div>
            <div style={{ fontSize: 17, lineHeight: 1.5, color: BODY, textWrap: 'pretty' }}>{text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- comparação

const X = (y: number) => (y - 2002.5) / 22 * 100;
const slug = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');

function Comparacao() {
  const [indId, setInd] = useState('pib');
  const [mode, setMode] = useState<'bars' | 'line'>('bars');
  const [wHover, setWHover] = useState<string | null>(null);
  const [marea, setMarea] = useState('eco');
  const detailRef = useRef<HTMLDivElement>(null);

  const ind = IND.find(x => x.id === indId)!;
  const openInd = (id: string) => {
    setInd(id);
    setTimeout(() => {
      const el = detailRef.current;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
    }, 30);
  };

  // Placar
  const board = IND.map(x => {
    const { rk, n } = ranksOf(x);
    const warn = x.warnIdx || [];
    return {
      x, cells: x.v.map((v, i) => {
        const na = v == null, w = warn.includes(i);
        return { txt: na ? '—' : fmtI(x, v), icon: !na && rk[i] === 0 ? '▲ ' : '', warn: w ? ' ⚠' : '', bg: na ? 'repeating-linear-gradient(135deg,#F4F1E8 0 6px,#ECE8DC 6px 12px)' : rankBg(rk[i], n), fg: na ? '#9AA3B5' : INK, border: w ? '2px dashed #C9A400' : '2px solid transparent' };
      }),
    };
  });

  // Barras por mandato
  const { rk } = ranksOf(ind);
  const vals = ind.v.filter((v): v is number => v != null), bMin = ind.bMin ?? 0, bMax = Math.max(...vals);
  const warn = ind.warnIdx || [];
  const bars = GOVS.map((g, i) => {
    const v = ind.v[i], na = v == null, w = warn.includes(i);
    const f = na ? 0 : Math.max(0.03, (v - bMin) / (bMax - bMin));
    return { gov: g.gov, txt: na ? (ind.nullText || 'sem dado') : fmtI(ind, v), fg: na ? '#9AA3B5' : INK, best: !na && rk[i] === 0, h: 'calc((100% - 100px) * ' + f.toFixed(3) + ')', bg: w ? 'repeating-linear-gradient(135deg,' + g.color + ' 0 10px,' + g.color + '88 10px 20px)' : g.color, border: w ? '3px dashed #C9A400' : 'none', warnIcon: w ? ' ⚠' : '' };
  });

  // Linha ano a ano
  const all = ind.series.flatMap(x => x.vals), mn = Math.min(...all), mx = Math.max(...all), span = mx - mn || 1;
  const lo = ind.zero ? Math.min(0, mn) - span * 0.12 : mn - span * 0.18, hi = mx + span * 0.22;
  const Yp = (v: number) => (1 - (v - lo) / (hi - lo)) * 100;
  const dots = ind.series.flatMap(x => x.vals.map((v, k) => ({ l: pct(X(x.from + k)), t: pct(Yp(v)), tip: (x.from + k) + ': ' + fmtI(ind, v) })));
  const valAt = (y: number) => { let out: number | null = null; ind.series.forEach(x => { const k = y - x.from; if (k >= 0 && k < x.vals.length) out = x.vals[k]; }); return out as number | null; };
  const notes = (ind.notes || []).map(([y, text]) => {
    const v = valAt(y), t = v == null ? 10 : Yp(v), l = X(y);
    return { text, l: pct(l), t: pct(t), tx: l < 10 ? '-8px' : l > 88 ? 'calc(-100% + 8px)' : '-50%', ty: t < 22 ? '14px' : 'calc(-100% - 12px)' };
  });
  const gridLines = [mx, mn].map(v => ({ t: pct(Yp(v)), label: fmtI(ind, v), line: '1px dashed rgba(16,33,63,.18)' }));
  if (ind.zero && lo < 0) gridLines.push({ t: pct(Yp(0)), label: '0', line: '2px solid rgba(16,33,63,.45)' });
  const bands = BANDS.map(([a, b, gi]) => ({ l: pct(X(a)), w: pct(X(b) - X(a)), bg: gi < 0 ? 'transparent' : BAND_BG[gi], label: gi < 0 ? 'Dilma e Temer (fora da comparação)' : GOVS[gi].gov, fg: gi < 0 ? '#9AA3B5' : INK }));

  // O Brasil no mundo
  const wrow = ind.world ? AREAS.flatMap(a => a.rows).find(r => r.title === ind.world && r.world) : undefined;
  const world = (() => {
    if (!wrow?.world) return null;
    const unit = wrow.wUnit ?? '%', fw = (v: number) => String(v).replace('.', ',') + unit;
    const wa = wrow.world.flatMap(([, o]) => Object.values(o)), wmn = Math.min(...wa), wmx = Math.max(...wa);
    const pos = (v: number) => (v - wmn) / (wmx - wmn) * 100;
    const src = [[wrow.world[3], 0], [wrow.world[2], 1]] as const;
    const rks = src.map(([[, o]]) => {
      const l = Object.entries(o).sort((x, y) => (ind.better === 'high' ? y[1] - x[1] : x[1] - y[1]));
      return { pos: l.findIndex(([n]) => n === 'Brasil') + 1, n: l.length };
    });
    const best = rks[0].pos === rks[1].pos ? -1 : rks[0].pos < rks[1].pos ? 0 : 1;
    return {
      lo: fw(wmn), hi: fw(wmx), note: wrow.wNote || '', wSrc: wrow.wSrc || '',
      dirLabel: ind.better === 'high' ? 'melhor →' : '← melhor', dirJustify: ind.better === 'high' ? 'flex-end' : 'flex-start',
      verdict: best < 0 ? 'Mesma posição nos dois governos' : 'Brasil mais bem colocado com ' + GOVS[best].gov,
      vColor: best < 0 ? '#9AA3B5' : GOVS[best].color,
      vDetail: GOVS.map((g, i) => g.gov + ': ' + rks[i].pos + 'º de ' + rks[i].n).join(' · ') + ', do melhor para o pior',
      rows: src.map(([[per, o], gi]) => {
        const g = GOVS[gi], br = o['Brasil'], bl = pos(br);
        return {
          gov: g.gov + ' · ' + String(per).replace(/^jan–dez /, '').replace(/^jan (\d{4})–dez (\d{4})$/, '$1–$2'),
          rank: rks[gi].pos + 'º de ' + rks[gi].n, brV: fw(br), brL: pct(bl), brTx: bl < 12 ? '-6px' : bl > 88 ? 'calc(-100% + 6px)' : '-50%',
          dots: Object.entries(o).map(([name, v]) => {
            const isB = name === 'Brasil', on = name === wHover, l = pos(v);
            return { name, tip: name + ' · ' + fw(v), on, l: pct(l), tx: l < 12 ? '-12%' : l > 88 ? '-88%' : '-50%', s: isB ? 20 : 16, m: isB ? -10 : -8, t: isB ? 21 : 23, bg: on ? INK : isB ? g.color : '#B9C0CE', sc: on ? 1.45 : 1, z: on ? 4 : isB ? 2 : 1 };
          }),
        };
      }),
    };
  })();

  // Medidas efetivas
  const ma = MEAS[marea] || MEAS.eco;
  const mTimeline = GOVS.map(g => {
    const its = (ma[g.k] || []).slice().sort((a, b) => +a[0] - +b[0]).map(([y, name, text, res, src]) => {
      const [tone, stance] = STANCE[name] || ['pos', 'Iniciativa do governo.'];
      return { id: slug(name), y, name, text, res, src, stance, tone };
    });
    const c = (k: string) => its.filter(i => i.tone === k).length;
    return { g, count: countLabel([[c('pos'), 'positivo', 'positivos'], [c('mix'), 'misto', 'mistos'], [c('neg'), 'negativo', 'negativos']]), items: its };
  });

  const sub = mode === 'line' ? 'Ano a ano, 2003–2024. As faixas marcam cada mandato.' : ind.sub;

  return (
    <section id="comparacao" style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 28px 100px' }}>
      <div style={kicker()}>Comparação · dois governos</div>
      <h2 style={h2('clamp(36px,5vw,60px)', 900)}>Lula e Bolsonaro, lado a lado</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 10, marginTop: 24 }}>
        {GOVS.map(g => (
          <div key={g.k} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 16, padding: '12px 14px' }}>
            <Dot color={g.color} size={16} />
            <span style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 16, fontWeight: 900 }}>{g.gov}</span><span style={{ fontSize: 13, color: MUTED }}>{g.per}</span></span>
          </div>
        ))}
      </div>

      {/* Placar */}
      <div style={{ background: '#fff', borderRadius: 28, padding: 'clamp(16px,3vw,32px)', marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px 20px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 'clamp(24px,2.8vw,32px)', fontWeight: 900 }}>Placar</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', fontSize: 13, fontWeight: 700, color: BODY }}>
            {[['#FFD21F', '▲ Melhor'], ['#FFE57A', ''], ['#FFF2C2', ''], ['#ECE8DC', 'Pior']].map(([bg, l]) => (
              <span key={bg} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: 4, background: bg }} />{l}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(96px,1.3fr) repeat(2,minmax(0,1fr))', gap: 6, padding: '0 6px' }}>
            <div />
            {GOVS.map(g => <div key={g.k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 900, padding: '4px 2px', textAlign: 'center' }}><Dot color={g.color} size={10} />{g.gov}</div>)}
          </div>
          {board.map(({ x, cells }) => (
            <button key={x.id} onClick={() => openInd(x.id)} className={s.rowHover} style={{ border: 'none', cursor: 'pointer', background: x.id === ind.id ? CREAM : 'transparent', borderRadius: 14, padding: 6, display: 'grid', gridTemplateColumns: 'minmax(96px,1.3fr) repeat(2,minmax(0,1fr))', gap: 6, alignItems: 'stretch', textAlign: 'left', color: INK }}>
              <div style={{ padding: '6px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}><span style={{ fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 900, lineHeight: 1.15 }}>{x.label}</span><span style={{ fontSize: 12, color: MUTED }}>{x.area}</span></div>
              {cells.map((c, i) => (
                <div key={i} style={{ background: c.bg, border: c.border, boxSizing: 'border-box', borderRadius: 10, padding: '10px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, fontSize: 'clamp(13px,1.6vw,19px)', fontWeight: 900, color: c.fg, whiteSpace: 'nowrap', minWidth: 0 }}>{c.icon}{c.txt}{c.warn}</div>
              ))}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 14 }}>▲ marca o melhor resultado de cada linha, seja o número maior ou menor. Clique numa linha para ver o gráfico.</div>
      </div>

      {/* Detalhe do indicador */}
      <div ref={detailRef} style={{ background: '#fff', borderRadius: 28, padding: 'clamp(16px,3vw,36px)', marginTop: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {IND.map(x => <button key={x.id} onClick={() => setInd(x.id)} style={tab(x.id === ind.id)}>{x.label}</button>)}
        </div>
        <div key={ind.id + mode} className={s.pop} style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 14, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1, margin: 0, fontWeight: 900, fontStretch: '110%' }}>{ind.title}</h3>
              <div style={{ fontSize: 15, color: MUTED, marginTop: 8 }}>{sub}</div>
            </div>
            <div style={{ display: 'flex', background: '#F3EFE3', borderRadius: 99, padding: 4 }}>
              {([['bars', 'Por mandato'], ['line', 'Ano a ano']] as const).map(([k, l]) => <button key={k} onClick={() => setMode(k)} style={segBtn(k === mode)}>{l}</button>)}
            </div>
          </div>

          {mode === 'bars' ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'clamp(16px,5vw,64px)', alignItems: 'end', height: 340, marginTop: 28 }}>
                {bars.map(b => (
                  <div key={b.gov} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 8, height: '100%', minWidth: 0 }}>
                    {b.best ? <span style={{ background: Y, color: B, fontSize: 12, fontWeight: 900, padding: '4px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>▲ melhor</span> : null}
                    <div style={{ fontSize: 'clamp(18px,3.6vw,44px)', fontWeight: 900, fontStretch: '110%', lineHeight: 1, color: b.fg, textAlign: 'center', whiteSpace: 'nowrap' }}>{b.txt}</div>
                    <div className={s.growY} style={{ width: '100%', maxWidth: 220, height: b.h, borderRadius: '12px 12px 4px 4px', background: b.bg, border: b.border, boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'clamp(16px,5vw,64px)', borderTop: `2px solid ${INK}`, paddingTop: 10 }}>
                {bars.map(b => <div key={b.gov} style={{ textAlign: 'center', fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 900 }}>{b.gov}{b.warnIcon}</div>)}
              </div>
            </>
          ) : (
            <>
              <div style={{ position: 'relative', height: 340, margin: '32px 0 0 48px' }}>
                {bands.map(x => (
                  <div key={x.l} style={{ position: 'absolute', top: 0, bottom: 0, left: x.l, width: x.w, background: x.bg }}>
                    <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 12, fontWeight: 800, color: x.fg, whiteSpace: 'nowrap' }}>{x.label}</span>
                  </div>
                ))}
                {gridLines.map(g => (
                  <div key={g.t + g.label} style={{ position: 'absolute', left: 0, right: 0, top: g.t, borderTop: g.line }}>
                    <span style={{ position: 'absolute', right: '100%', marginRight: 8, transform: 'translateY(-50%)', fontSize: 12, fontWeight: 700, color: MUTED, whiteSpace: 'nowrap' }}>{g.label}</span>
                  </div>
                ))}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                  {ind.series.map((x, si) => (
                    <polyline key={si} points={x.vals.map((v, k) => X(x.from + k).toFixed(2) + ',' + Yp(v).toFixed(2)).join(' ')} fill="none" stroke={INK} strokeWidth={3} strokeDasharray={x.dashed ? '7 6' : undefined} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                  ))}
                </svg>
                {dots.map(p => <div key={p.tip} title={p.tip} style={{ position: 'absolute', left: p.l, top: p.t, width: 10, height: 10, margin: '-5px 0 0 -5px', borderRadius: '50%', background: INK, border: '2px solid #fff', boxSizing: 'border-box' }} />)}
                {notes.map(n => <div key={n.text} style={{ position: 'absolute', left: n.l, top: n.t, transform: `translate(${n.tx},${n.ty})`, background: B, color: '#fff', fontSize: 12, fontWeight: 800, padding: '4px 9px', borderRadius: 99, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{n.text}</div>)}
              </div>
              <div style={{ position: 'relative', height: 20, margin: '8px 0 0 48px' }}>
                {[2003, 2007, 2011, 2015, 2019, 2023].map(y => <span key={y} style={{ position: 'absolute', left: pct(X(y)), transform: 'translateX(-50%)', fontSize: 12, fontWeight: 700, color: MUTED }}>{y}</span>)}
              </div>
              {ind.series.length > 1 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginTop: 14, fontSize: 13, fontWeight: 700, color: BODY }}>
                  {ind.series.map(x => <span key={x.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 30, borderTop: `3px ${x.dashed ? 'dashed' : 'solid'} ${INK}` }} />{x.label}</span>)}
                </div>
              ) : null}
            </>
          )}

          {ind.warn ? (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 20, background: '#FFF6CC', border: '2px dashed #C9A400', borderRadius: 12, padding: '10px 14px', fontSize: 14, fontWeight: 600, lineHeight: 1.45 }}><span>⚠</span><span>{ind.warn}</span></div>
          ) : null}
          <Fonte src={ind.src} size={13} color={MUTED} style={{ marginTop: 18 }} />

          {world ? (
            <div style={{ marginTop: 20, background: CREAM, borderRadius: 20, padding: 'clamp(14px,2.5vw,24px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px 16px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                <div style={{ fontSize: 17, fontWeight: 900 }}>O Brasil entre as 10 maiores economias</div>
                <div style={{ fontSize: 13, color: MUTED }}>Passe o mouse nos pontos para ver cada país nos dois governos.</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', alignItems: 'baseline', marginTop: 14, background: '#fff', borderRadius: 14, padding: '12px 16px', borderLeft: `6px solid ${world.vColor}` }}>
                <span style={{ ...tinyCaps, fontSize: 12 }}>No mundo</span>
                <span style={{ fontSize: 18, fontWeight: 900 }}>{world.verdict}</span>
                <span style={{ fontSize: 14, color: BODY }}>{world.vDetail}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(110px,auto) minmax(0,1fr)', gap: '4px 14px', marginTop: 14 }}>
                <div />
                <div style={{ display: 'flex', justifyContent: world.dirJustify, fontSize: 12, fontWeight: 900, color: G }}>{world.dirLabel}</div>
                {world.rows.map(wr => [
                  <div key={wr.gov + 'l'} style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ fontSize: 14, fontWeight: 900 }}>{wr.gov}</span><span style={{ fontSize: 12, fontWeight: 800, color: MUTED }}>{wr.rank}</span></div>,
                  <div key={wr.gov + 'r'} style={{ position: 'relative', height: 72, margin: '0 10px' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 30, height: 2, background: '#D9D4C7' }} />
                    <div style={{ position: 'absolute', left: wr.brL, top: 0, transform: `translateX(${wr.brTx})`, fontSize: 12, fontWeight: 900, whiteSpace: 'nowrap', color: B }}>Brasil {wr.brV}</div>
                    {wr.dots.map(p => (
                      <div key={p.name} onMouseEnter={() => setWHover(p.name)} onMouseLeave={() => setWHover(null)} style={{ position: 'absolute', left: p.l, top: p.t, width: p.s, height: p.s, marginLeft: p.m, zIndex: p.z, cursor: 'pointer' }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: p.bg, border: `2px solid ${CREAM}`, boxSizing: 'border-box', transform: `scale(${p.sc})`, transition: 'transform .15s ease,background .15s ease' }} />
                        {p.on ? <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: '50%', transform: `translateX(${p.tx})`, background: INK, color: '#fff', fontSize: 12, fontWeight: 800, padding: '4px 9px', borderRadius: 8, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{p.tip}</div> : null}
                      </div>
                    ))}
                  </div>,
                ])}
                <div />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: MUTED, margin: '0 10px' }}><span>{world.lo}</span><span>{world.hi}</span></div>
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: MUTED, marginTop: 12, textWrap: 'pretty' }}>{world.note}</div>
              <Fonte src={world.wSrc} color={MUTED} style={{ marginTop: 6 }} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Medidas efetivas */}
      <div style={{ marginTop: 64 }}>
        <div style={kicker()}>Medidas efetivas</div>
        <div style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, lineHeight: 1.05, marginTop: 8 }}>O que cada governo fez e o que aconteceu depois</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
          {Object.entries(MEAS).map(([id, x]) => <button key={id} onClick={() => setMarea(id)} style={outlineTab(id === marea)}>{x.label}</button>)}
        </div>
        <div key={marea} className={s.pop} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 20, marginTop: 24, alignItems: 'start' }}>
          {mTimeline.map(({ g, count, items }) => (
            <div key={g.k} style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
              <GovHeader g={g} count={count} per />
              {items.map(i => (
                <article key={i.id} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', display: 'grid', gridTemplateColumns: '96px minmax(0,1fr)' }}>
                  <div style={{ position: 'relative', background: '#F3EFE3', minHeight: 96 }}>
                    <ImageSlot src={(LOGOS[i.name] || PHOTOS[i.name])?.[0]} credit={(LOGOS[i.name] || PHOTOS[i.name])?.[1]} creditHref={(LOGOS[i.name] || PHOTOS[i.name])?.[2]} fit={LOGOS[i.name] ? 'contain' : 'cover'} compact placeholder={i.name} style={{ position: 'absolute', inset: LOGOS[i.name] || !PHOTOS[i.name] ? 8 : 0, width: 'auto', height: 'auto' }} />
                  </div>
                  <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}><YearChip y={i.y} /><span style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.2 }}>{i.name}</span><ToneBadge tone={i.tone} /></div>
                    <TwoBoxes a="O que fez" aText={i.text} bText={i.res} tone={i.tone} min={170} />
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderLeft: `4px solid ${TONE[i.tone][2]}`, padding: '2px 0 2px 10px' }}><p style={{ fontSize: 14, lineHeight: 1.45, margin: 0, color: INK, textWrap: 'pretty' }}><strong style={{ fontWeight: 900 }}>Posição do governo:</strong> {i.stance}</p></div>
                    <Fonte src={i.src} color={MUTED} />
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 14 }}>Logotipos e fotos de acervos oficiais. Passe o mouse sobre a imagem para ver o crédito.</div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- crises

const PANDEMIC_STATS: [string, string, string, string][] = [
  ['694 mil', Y, 'mortes por covid até dezembro de 2022', 'Ministério da Saúde, Boletim Epidemiológico 146 (SE 52/2022)'],
  ['~400 mil', '#FF8A8A', 'mortes que poderiam ter sido evitadas, segundo estimativa apresentada à CPI', 'Senado, Relatório final da CPI da Pandemia (2021); Agência Senado, 24/06/2021'],
  ['2,6% → 10%', '#fff', 'da população mundial e das mortes por covid registradas no mundo até 2022', 'OMS, painel da covid-19; Banco Mundial, população 2022'],
  ['4', '#fff', 'ministros da Saúde: Mandetta, Teich, Pazuello e Queiroga', 'DOU, Decretos de 16/abr/2020; Agência Brasil, 15/05/2020; Agência Brasil, 16/09/2020; Agência Brasil, 23/03/2021'],
];
const cMax = Math.max(...COVID_WORLD.map(x => x[1]));

function Crises() {
  return (
    <section id="crises" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px 100px' }}>
      <div style={kicker()}>Diante da crise</div>
      <h2 style={h2('clamp(36px,5vw,60px)', 900)}>Como cada presidente reagiu</h2>
      <div style={{ ...grid(460, 20, 28), alignItems: 'start' }}>
        {GOVS.map(g => {
          const its = CRISES[g.k];
          const c = (k: string) => its.filter(i => i.tone === k).length;
          return (
            <div key={g.k} style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
              <GovHeader g={g} count={countLabel([[c('pos'), 'positiva', 'positivas'], [c('mix'), 'mista', 'mistas'], [c('neg'), 'negativa', 'negativas']])} />
              {its.map(i => (
                <article key={i.title} style={{ background: '#fff', borderRadius: 18, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}><YearChip y={i.y} /><span style={{ fontSize: 19, fontWeight: 900, lineHeight: 1.2 }}>{i.title}</span><ToneBadge tone={i.tone} /></div>
                  <TwoBoxes a="Como reagiu" aText={i.how} bText={i.res} tone={i.tone} min={180} />
                  <Fonte src={i.src} color={MUTED} />
                </article>
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ background: NAVY, color: '#fff', borderRadius: 28, padding: 'clamp(20px,3.5vw,44px)', marginTop: 32 }}>
        <div style={{ ...kicker(Y), fontSize: 13 }}>A pandemia, 2020–2022</div>
        <div style={{ fontSize: 'clamp(28px,3.6vw,46px)', fontWeight: 900, lineHeight: 1, marginTop: 10, fontStretch: '110%', maxWidth: 900 }}>Governo Bolsonaro contra a ciência</div>
        <div style={{ ...grid(200, 12, 28) }}>
          {PANDEMIC_STATS.map(([n, color, text, src]) => (
            <div key={n} style={{ background: 'rgba(255,255,255,.08)', borderRadius: 18, padding: 18 }}>
              <div style={{ fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 900, fontStretch: '115%', lineHeight: 0.9, color }}>{n}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8, color: '#E6EBF6' }}>{text}</div>
              <Fonte src={src} size={11} color='#C9D2E8' style={{ marginTop: 8 }} />
            </div>
          ))}
        </div>
        <div style={{ ...grid(420, 28, 36), alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>O que o presidente disse e fez</div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 14, borderLeft: '3px solid rgba(255,255,255,.2)', paddingLeft: 18, gap: 16 }}>
              {PANDEMIC_TL.map(([d, tag, title, text, src]) => {
                const c = tag === 'Fala' ? '#FF8A8A' : Y;
                return (
                  <div key={d} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -26, top: 4, width: 13, height: 13, borderRadius: '50%', background: c }} />
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}><span style={{ fontSize: 13, fontWeight: 900, color: Y }}>{d}</span><span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', background: c, color: NAVY, padding: '2px 7px', borderRadius: 99 }}>{tag}</span></div>
                    <div style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.25, marginTop: 4 }}>{title}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.45, color: '#C9D2E8', marginTop: 2, textWrap: 'pretty' }}>{text}</div>
                    <Fonte src={src} size={11} color='#8E9BBE' style={{ marginTop: 4 }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>Mortes por covid por milhão de habitantes, até dezembro de 2022</div>
            <div style={{ fontSize: 13, color: '#C9D2E8', marginTop: 4 }}>O Brasil entre as 10 maiores economias</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
              {COVID_WORLD.map(([name, v]) => {
                const br = name === 'Brasil', fg = br ? Y : '#E6EBF6';
                return (
                  <div key={name} style={{ display: 'grid', gridTemplateColumns: '96px minmax(0,1fr) 56px', gap: 10, alignItems: 'center', fontSize: 14, fontWeight: br ? 900 : 700 }}>
                    <span style={{ color: fg }}>{name}</span>
                    <div style={{ height: 18, borderRadius: 5, background: 'rgba(255,255,255,.08)' }}><div className={s.growX} style={{ height: '100%', width: Math.max(0.6, v / cMax * 100).toFixed(1) + '%', background: br ? Y : 'rgba(255,255,255,.45)', borderRadius: 5 }} /></div>
                    <span style={{ textAlign: 'right', color: fg }}>{v.toLocaleString('pt-BR')}</span>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: '#C9D2E8', margin: '16px 0 0', textWrap: 'pretty' }}>O Brasil teve a maior taxa do grupo, praticamente empatado com os EUA e perto de Reino Unido e Itália. Rússia e Índia notificaram bem menos mortes do que o excesso de mortalidade estimado pela OMS. Mortes até 31/12/2022, divididas pela população de 2022.</p>
            <Fonte src='OMS, painel da covid-19; Banco Mundial, população 2022; OMS, estimativas de excesso de mortalidade (2020-2021)' color='#C9D2E8' style={{ marginTop: 8 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- especial Bolsonaro Hipotético

const CHAPTERS: [string, string][] = [['sinais', 'Como as democracias morrem'], ['plano', 'O plano para matar o presidente eleito'], ['inimigo', 'O inimigo de sempre'], ['minorias', 'Minorias'], ['mundo', 'O padrão na América Latina e no mundo'], ['flavio', 'Flávio, 2018–2026']];

function Hipotetico() {
  return (
    <section id="hipotetico" style={{ background: NAVY, color: '#fff' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '110px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 56, alignItems: 'center' }}>
        <div style={{ minWidth: 0 }}>
          <div style={pill(Y, B)}>Especial Contraprova</div>
          <h2 style={{ fontSize: 'clamp(44px,6vw,92px)', lineHeight: 0.9, margin: '22px 0 0', fontWeight: 900, fontStretch: '115%', letterSpacing: '-0.035em', overflowWrap: 'anywhere' }}>Bolsonaro<br /><span style={{ color: Y }}>Hipotético</span></h2>
          <p style={{ fontSize: 'clamp(19px,2vw,24px)', lineHeight: 1.45, maxWidth: 600, margin: '28px 0 0', color: '#C9D2E8', textWrap: 'pretty' }}>E se Flávio Bolsonaro for eleito no dia 25? O especial compara o que ele, o pai, os irmãos e o PL disseram e fizeram com padrões de democracias que deixaram de existir.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginTop: 36 }}>
            <Link href={HIPO} className={s.lift} style={{ ...ctaYellow('#000'), padding: '20px 30px', fontSize: 20 }}>Abrir o especial →</Link>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#8E9BBE' }}>Cada item com data e fonte. Comparar não é igualar.</span>
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(255,255,255,.16)' }}>
          <div style={{ ...kicker(Y), fontSize: 13, paddingBottom: 12 }}>Seis capítulos</div>
          {CHAPTERS.map(([id, title], i) => (
            <Link key={id} href={`${HIPO}#${id}`} className={s.chapterLink} style={{ display: 'grid', gridTemplateColumns: '64px minmax(0,1fr) auto', gap: 16, alignItems: 'center', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.16)', color: '#fff', textDecoration: 'none' }}>
              <span style={{ fontSize: 28, fontWeight: 900, fontStretch: '125%', color: 'transparent', WebkitTextStroke: `1.5px ${Y}` }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 'clamp(17px,1.8vw,21px)', fontWeight: 800, lineHeight: 1.2 }}>{title}</span>
              <span style={{ fontSize: 18, color: Y }}>→</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- propostas (planos de governo)

const FIELDS = [['Ação', 'acao'], ['Objeto', 'obj'], ['Prazo', 'prazo'], ['Meta numérica', 'meta'], ['Orçamento', 'orc'], ['Órgão responsável', 'org'], ['Público', 'pub']] as const;
const COV = [['Prazo', 'prazo'], ['Meta numérica', 'num'], ['Orçamento', 'orc'], ['Órgão responsável', 'org'], ['Público citado', 'pub']] as const;
const bar = (width: string, color: string, h = 12): ReactNode => (
  <span style={{ display: 'block', height: h, borderRadius: 4, background: '#EFEBDF' }}><span style={{ display: 'block', height: '100%', width, background: color, borderRadius: 4 }} /></span>
);

function Propostas() {
  const [D, setPlans] = useState<Plans | null>(null);
  const [mod, setMod] = useState<Mod>('words');
  const [wmode, setWmode] = useState<'words' | 'conc'>('words');
  const [wsel, setWsel] = useState<Partial<Record<PlanKey, string>>>({});
  const [theme, setTheme] = useState('eco');
  const [card, setCard] = useState<Record<PlanKey, number>>({ pl: 0, pt: 0 });
  const [grp, setGrp] = useState('Mulheres');

  useEffect(() => {
    fetch('/dados/planos.json').then(r => r.json()).then(setPlans).catch(() => {});
  }, []);

  const stat = (k: PlanKey) => (D ? D[k].pages + ' páginas · ' + nf(D[k].words, 0) + ' palavras' : '');

  return (
    <section id="propostas" style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 28px' }}>
      <div style={kicker()}>Propostas</div>
      <h2 style={h2('clamp(38px,5.5vw,68px)')}>O que dizem os planos de governo</h2>
      <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: 760, margin: '18px 0 0', color: BODY, textWrap: 'pretty' }}>Leitura automática dos planos registrados no TSE pelas duas candidaturas. A frequência de uma palavra não mede sua importância: cada número leva ao trecho e à página original.</p>
      <div style={grid(300, 12, 24)}>
        {PLN.map(p => (
          <div key={p.k} style={{ background: '#fff', borderRadius: 18, padding: '16px 18px', borderLeft: `8px solid ${p.color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div><div style={{ fontSize: 18, fontWeight: 900 }}>{p.who}</div><div style={{ fontSize: 14, color: MUTED }}>{stat(p.k)}</div></div>
            <a href={p.pdf} target="_blank" rel="noopener" style={{ fontSize: 14, fontWeight: 800 }}>Abrir o plano ↗</a>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
        {MODS.map(([k, l], i) => <button key={k} onClick={() => setMod(k)} style={outlineTab(mod === k, { padding: '10px 16px', fontSize: 15, display: 'flex', gap: 8, alignItems: 'center' })}><span style={{ opacity: 0.6 }}>{i + 1}</span>{l}</button>)}
      </div>
      {!D ? <div style={{ marginTop: 24, background: '#fff', borderRadius: 22, padding: 40, textAlign: 'center', fontWeight: 700, color: MUTED }}>Carregando os planos…</div> : (
        <div key={mod} className={s.popFast} style={{ marginTop: 28 }}>
          {mod === 'words' && <Words D={D} wmode={wmode} setWmode={setWmode} wsel={wsel} setWsel={setWsel} />}
          {mod === 'themes' && <Themes D={D} theme={theme} setTheme={setTheme} />}
          {mod === 'detail' && <Detail D={D} card={card} setCard={setCard} />}
          {mod === 'nums' && <Nums D={D} />}
          {mod === 'groups' && <Groups D={D} grp={grp} setGrp={setGrp} />}
          {mod === 'inst' && <Inst D={D} />}
        </div>
      )}
    </section>
  );
}

function Words({ D, wmode, setWmode, wsel, setWsel }: { D: Plans; wmode: 'words' | 'conc'; setWmode: (m: 'words' | 'conc') => void; wsel: Partial<Record<PlanKey, string>>; setWsel: (f: (s: Partial<Record<PlanKey, string>>) => Partial<Record<PlanKey, string>>) => void }) {
  const concMax = Math.max(...PLN.flatMap(p => D[p.k].conc.map(c => c.total)));
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
        <div><h3 style={h3}>As palavras mais usadas</h3><p style={intro}>Sem palavras funcionais, com singular e plural somados. O tamanho de cada palavra segue a frequência por 10 mil palavras, porque os planos têm tamanhos diferentes. Clique numa palavra para ver onde ela aparece.</p></div>
        <div style={{ display: 'flex', background: '#EFEBDF', borderRadius: 99, padding: 4 }}>
          {([['words', 'Palavras'], ['conc', 'Conceitos']] as const).map(([k, l]) => <button key={k} onClick={() => setWmode(k)} style={segBtn(wmode === k)}>{l}</button>)}
        </div>
      </div>
      <div style={grid(420)}>
        {PLN.map(p => {
          const top = D[p.k].top.slice(0, 15);
          const so = top.find(t => t.w === (wsel[p.k] || top[0].w)) || top[0];
          const PAL = p.k === 'pl' ? ['#0B2A6F', '#3B5BA9', '#10213F', '#9A7B00'] : ['#00873E', '#1F6B45', '#10213F', '#9A7B00'];
          const rMin = Math.min(...top.map(t => t.rel)), rMax = Math.max(...top.map(t => t.rel));
          return (
            <PlanCol key={p.k} who={p.who} color={p.color}>
              {wmode === 'words' ? (
                <>
                  <div style={{ marginTop: 14, background: CREAM, borderRadius: 18, overflow: 'hidden', position: 'relative' }}>
                    <WordSphere words={top.map((t, rank) => ({ w: t.w, f: Math.sqrt((t.rel - rMin) / ((rMax - rMin) || 1)), color: PAL[rank % PAL.length], sel: t.w === so.w, title: t.n + ' ocorrências · ' + nf(t.rel, 1) + ' por 10 mil palavras', onClick: () => setWsel(x => ({ ...x, [p.k]: t.w })) }))} />
                    <div style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 12, fontWeight: 700, color: MUTED, pointerEvents: 'none' }}>Passe o mouse sobre as palavras · clique numa delas</div>
                  </div>
                  <div style={{ background: CREAM, borderRadius: 14, padding: '14px 16px', marginTop: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 900 }}>“{so.w}” · {so.n} ocorrências</div>
                    {so.ex.map(e => <Quote key={e.s} e={e} pdf={p.pdf} />)}
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                  {D[p.k].conc.slice().sort((a, b) => b.total - a.total).map(c => (
                    <div key={c.label} style={{ padding: '10px 0', borderBottom: '1px solid #EFEBDF' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span style={{ fontSize: 15, fontWeight: 900 }}>{c.label}</span><span style={{ fontSize: 13, fontWeight: 800 }}>{c.total}</span></div>
                      <div style={{ marginTop: 6 }}>{bar((c.total / concMax * 100).toFixed(1) + '%', p.color, 10)}</div>
                      <div style={{ fontSize: 12, color: MUTED, marginTop: 5 }}>{c.terms.filter(t => t[1]).map(t => t[0] + ' ' + t[1]).join(' · ') || 'sem ocorrências'}</div>
                    </div>
                  ))}
                </div>
              )}
            </PlanCol>
          );
        })}
      </div>
    </>
  );
}

function Themes({ D, theme, setTheme }: { D: Plans; theme: string; setTheme: (t: string) => void }) {
  const share = (k: PlanKey, n: number) => n / D[k].sentences * 100;
  const shMax = Math.max(...PLN.flatMap(p => D[p.k].themes.map(t => share(p.k, t.n))));
  const ti = D.pt.themes.findIndex(t => t.id === theme);
  return (
    <>
      <h3 style={h3}>Mapa de assuntos</h3><p style={intro}>Parcela das frases de cada plano que trata de cada área, por palavras-chave e sinônimos. Uma frase pode entrar em mais de uma área. Escolha uma área para ver trechos e páginas.</p>
      <div style={grid(250, 12)}>
        {D.pt.themes.map((t0, i) => (
          <button key={t0.id} onClick={() => setTheme(t0.id)} className={s.cardHover} style={{ border: theme === t0.id ? `3px solid ${B}` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer', background: '#fff', borderRadius: 18, padding: 16, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8, color: INK }}>
            <span style={{ fontSize: 17, fontWeight: 900 }}>{t0.label}</span>
            <span style={{ fontSize: 13, color: MUTED }}>{t0.desc}</span>
            {PLN.map(p => {
              const sv = share(p.k, D[p.k].themes[i].n);
              return <span key={p.k} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 38px', gap: 8, alignItems: 'center', fontSize: 12, fontWeight: 800 }}><span>{p.short}</span>{bar((sv / shMax * 100).toFixed(1) + '%', p.color)}<span style={{ textAlign: 'right' }}>{nf(sv, 0)}%</span></span>;
            })}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 18, fontWeight: 900, marginTop: 28 }}>{D.pt.themes[ti].label}</div>
      <div style={grid(420, 16, 12)}>
        {PLN.map(p => {
          const t = D[p.k].themes[ti];
          return (
            <PlanCol key={p.k} who={p.who} color={p.color}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUTED, marginTop: 8 }}>{t.n} frases · páginas</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {t.pages.map(pg => <a key={pg} href={`${p.pdf}#page=${pg}`} target="_blank" rel="noopener" className={s.pageChip} style={{ fontSize: 12, fontWeight: 800, textDecoration: 'none', background: '#F3EFE3', color: B, padding: '4px 9px', borderRadius: 99 }}>{pg}</a>)}
              </div>
              {t.ex.map(e => <Quote key={e.s} e={e} pdf={p.pdf} />)}
            </PlanCol>
          );
        })}
      </div>
    </>
  );
}

function Detail({ D, card, setCard }: { D: Plans; card: Record<PlanKey, number>; setCard: (f: (c: Record<PlanKey, number>) => Record<PlanKey, number>) => void }) {
  const arrow: CSSProperties = { border: `2px solid ${B}`, background: '#fff', color: B, cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', fontSize: 15, fontWeight: 900 };
  return (
    <>
      <h3 style={h3}>Grau de detalhamento</h3><p style={intro}>Frases com verbo de ação no futuro foram tratadas como propostas. Contamos quantas indicam prazo, meta numérica, orçamento, órgão responsável ou público. Isso descreve o texto: não garante execução, e a falta de um número não significa falta de planejamento.</p>
      <div style={grid(420)}>
        {PLN.map(p => {
          const a = D[p.k].anat, len = a.cards.length;
          const ci = (card[p.k] || 0) % len, c = a.cards[ci];
          const mv = (d: number) => setCard(x => ({ ...x, [p.k]: ((x[p.k] || 0) + d + len) % len }));
          return (
            <PlanCol key={p.k} who={p.who} color={p.color}>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginTop: 14 }}>
                <div><div style={{ fontSize: 40, fontWeight: 900, fontStretch: '115%', lineHeight: 1 }}>{a.n}</div><div style={{ fontSize: 13, fontWeight: 700, color: MUTED }}>propostas</div></div>
                <div><div style={{ fontSize: 40, fontWeight: 900, fontStretch: '115%', lineHeight: 1, color: '#9AA3B5' }}>{a.past}</div><div style={{ fontSize: 13, fontWeight: 700, color: MUTED }}>frases de balanço do que já foi feito</div></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
                {COV.map(([k, f]) => {
                  const v = a[f] / a.n * 100;
                  return <div key={k} style={{ display: 'grid', gridTemplateColumns: '130px minmax(0,1fr) 44px', gap: 8, alignItems: 'center', fontSize: 13, fontWeight: 800 }}><span>{k}</span>{bar(Math.max(1, v).toFixed(1) + '%', p.color)}<span style={{ textAlign: 'right' }}>{nf(v, v < 10 ? 1 : 0)}%</span></div>;
                })}
              </div>
              <div style={{ background: CREAM, borderRadius: 16, padding: 16, marginTop: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ ...tinyCaps, fontSize: 12 }}>Anatomia de uma proposta · {ci + 1} de {len}</span>
                  <span style={{ display: 'flex', gap: 6 }}><button onClick={() => mv(-1)} style={arrow}>←</button><button onClick={() => mv(1)} style={arrow}>→</button></span>
                </div>
                <Quote e={c} pdf={p.pdf} size={16} mt={12} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '10px 16px', marginTop: 14 }}>
                  {FIELDS.map(([k, f]) => <div key={k}><div style={{ ...tinyCaps, letterSpacing: '.06em' }}>{k}</div><div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3, color: c[f] ? INK : '#9AA3B5' }}>{c[f] || 'Não informado'}</div></div>)}
                </div>
              </div>
            </PlanCol>
          );
        })}
      </div>
    </>
  );
}

function Nums({ D }: { D: Plans }) {
  return (
    <>
      <h3 style={h3}>Números e metas</h3><p style={intro}>Nem todo número num plano é uma meta. Separamos as frases em que o número aparece numa proposta das frases em que ele é diagnóstico ou balanço. A separação é automática e deve ser conferida no original.</p>
      <div style={grid(420)}>
        {PLN.map(p => {
          const n = D[p.k].nums;
          return (
            <PlanCol key={p.k} who={p.who} color={p.color}>
              <div style={{ display: 'flex', height: 30, borderRadius: 8, overflow: 'hidden', marginTop: 14, fontSize: 12, fontWeight: 900 }}>
                <div style={{ flex: n.metaN, background: p.color, color: '#fff', display: 'flex', alignItems: 'center', padding: '0 10px', whiteSpace: 'nowrap' }}>{n.metaN} em metas</div>
                <div style={{ flex: n.citN, background: '#EFEBDF', color: BODY, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 10px', whiteSpace: 'nowrap' }}>{n.citN} citados</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                {n.metas.slice(0, 10).map(m => (
                  <div key={m.s} style={{ padding: '12px 0', borderTop: '1px solid #EFEBDF' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{(m.t.length ? m.t : ['Número']).map(tg => <span key={tg} style={{ fontSize: 11, fontWeight: 900, background: Y, color: B, padding: '3px 8px', borderRadius: 99 }}>{tg}</span>)}</div>
                    <Quote e={m} pdf={p.pdf} mt={6} />
                  </div>
                ))}
              </div>
            </PlanCol>
          );
        })}
      </div>
    </>
  );
}

function Groups({ D, grp, setGrp }: { D: Plans; grp: string; setGrp: (g: string) => void }) {
  const rows = D.pt.grp.map((g, i) => ({ g: g.g, pt: g.n, pl: D.pl.grp[i].n })).sort((a, b) => (b.pt + b.pl) - (a.pt + a.pl));
  const gMax = Math.max(...rows.flatMap(g => [g.pt, g.pl]), 1);
  const gi = D.pt.grp.findIndex(g => g.g === grp);
  const cols = 'minmax(0,1fr) minmax(110px,190px) minmax(0,1fr)';
  return (
    <>
      <h3 style={h3}>Quem é citado como beneficiário</h3><p style={intro}>Número de frases que mencionam cada grupo. Ser mencionado não é o mesmo que ser beneficiado por uma política. Clique num grupo para ver as frases.</p>
      <div style={{ background: '#fff', borderRadius: 22, padding: 'clamp(14px,2.5vw,24px)', marginTop: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, fontSize: 13, fontWeight: 900, padding: '0 4px 8px' }}>
          <span style={{ textAlign: 'right', color: B }}>Flávio (PL)</span><span /><span style={{ color: G }}>Lula (PT)</span>
        </div>
        {rows.map(g => {
          const isS = g.g === grp;
          return (
            <button key={g.g} onClick={() => setGrp(g.g)} className={s.rowHover} style={{ border: 'none', cursor: 'pointer', background: isS ? CREAM : 'transparent', display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'center', padding: '5px 4px', borderRadius: 8, width: '100%', color: INK }}>
              <span style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 800 }}>{g.pl}</span><span style={{ flex: 'none', height: 14, width: (g.pl / gMax * 85).toFixed(1) + '%', background: B, borderRadius: '4px 0 0 4px' }} /></span>
              <span style={{ textAlign: 'center', fontSize: 13, fontWeight: isS ? 900 : 700, lineHeight: 1.2 }}>{g.g}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 'none', height: 14, width: (g.pt / gMax * 85).toFixed(1) + '%', background: G, borderRadius: '0 4px 4px 0' }} /><span style={{ fontSize: 13, fontWeight: 800 }}>{g.pt}</span></span>
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 18, fontWeight: 900, marginTop: 24 }}>{grp}</div>
      <div style={grid(420, 16, 12)}>
        {PLN.map(p => {
          const g = D[p.k].grp[gi];
          return (
            <PlanCol key={p.k} who={p.who} color={p.color}>
              {!g.ex.length ? <div style={{ fontSize: 15, color: MUTED, marginTop: 10 }}>Nenhuma menção encontrada.</div> : null}
              {g.ex.map(e => <Quote key={e.s} e={e} pdf={p.pdf} />)}
            </PlanCol>
          );
        })}
      </div>
    </>
  );
}

function Inst({ D }: { D: Plans }) {
  const iMax = Math.max(...PLN.flatMap(p => D[p.k].inst.flatMap(r => r.by)), 1);
  return (
    <>
      <h3 style={h3}>Como pretendem implementar</h3><p style={intro}>Frases que citam cada instrumento de ação pública, cruzadas com as áreas do mapa de assuntos. Quanto mais escura a célula, mais frases. Passe o mouse para ver o número exato.</p>
      <div style={grid(420)}>
        {PLN.map(p => (
          <PlanCol key={p.k} who={p.who} color={p.color}>
            <div style={{ overflowX: 'auto', marginTop: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(118px,1.7fr) repeat(7,minmax(30px,1fr)) 40px', gap: 3, minWidth: 440, fontSize: 11, fontWeight: 800 }}>
                <span />
                {THEME_SHORT.map(hd => <span key={hd} style={{ textAlign: 'center', color: MUTED, paddingBottom: 4 }}>{hd}</span>)}
                <span style={{ textAlign: 'right', color: MUTED }}>Total</span>
                {D[p.k].inst.map(r => [
                  <span key={r.g} style={{ fontSize: 12, lineHeight: 1.2, alignSelf: 'center' }}>{r.g}</span>,
                  ...r.by.map((n, j) => {
                    const a = n / iMax;
                    return <span key={r.g + j} title={r.g + ' × ' + D.pt.themes[j].label + ': ' + n + ' frases'} style={{ background: 'rgba(' + p.rgb + ',' + (0.06 + a * 0.94).toFixed(2) + ')', color: a > 0.45 ? '#fff' : INK, borderRadius: 4, textAlign: 'center', padding: '7px 0' }}>{n ? n : ''}</span>;
                  }),
                  <span key={r.g + 'n'} style={{ textAlign: 'right', alignSelf: 'center', fontSize: 13, fontWeight: 900 }}>{r.n}</span>,
                ])}
              </div>
            </div>
          </PlanCol>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- votar, método e rodapé

const OPTIONS: [string, string][] = [
  ['Votei em outro candidato', 'Seu candidato saiu da disputa. Compare os dois que ficaram antes de decidir.'],
  ['Votei em branco ou nulo', 'Branco e nulo não vão para nenhum candidato e não entram na conta do resultado.'],
  ['Não fui votar', 'Faltar no primeiro turno não impede de votar no segundo. Cada turno é uma eleição separada.'],
];
const STEPS: [string, string][] = [
  ['Confira onde você vota', 'O local pode ter mudado. Consulte no app e-Título ou no site do TSE.'],
  ['Leve um documento com foto', 'RG, CNH, carteira de trabalho ou passaporte. O e-Título com foto também vale. O título de papel não é obrigatório.'],
  ['Vote das 8h às 17h', 'Horário de Brasília, em todo o país. Quem estiver na fila às 17h ainda vota.'],
  ['Está fora da sua cidade?', 'Justifique a ausência pelo e-Título no dia da eleição ou em até 60 dias.'],
];
const dashedBox = (flex: number): CSSProperties => ({ flex, borderRadius: 10, border: '2px dashed rgba(255,255,255,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#C9D2E8', textAlign: 'center', lineHeight: 1.1, padding: '0 4px' });
const noSubscribe = () => () => {};
const daysLeft = () => Math.max(0, Math.ceil((new Date('2026-10-25T08:00:00-03:00').getTime() - Date.now()) / 86400000));
const shareBtn: CSSProperties = { border: '3px solid #fff', cursor: 'pointer', padding: '15px 24px', fontSize: 18, fontWeight: 800, borderRadius: 99, background: 'transparent', color: '#fff' };

function Votar({ shareLabel, share }: { shareLabel: string; share: () => void }) {
  // Calculado só no cliente (no servidor fica null) para não divergir na hidratação.
  const days = useSyncExternalStore(noSubscribe, daysLeft, () => null);
  const row = (label: string, bar: ReactNode) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px,190px) minmax(0,1fr)', gap: 14, alignItems: 'center' }}><span style={{ fontSize: 15, fontWeight: 800 }}>{label}</span>{bar}</div>
  );
  return (
    <section id="votar" style={{ background: G, color: '#fff' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '100px 28px' }}>
        <div style={pill(Y, B)}>Domingo, 25 de outubro{days == null ? '' : ' · ' + days + ' ' + (days === 1 ? 'dia para o 2º turno' : 'dias para o 2º turno')}</div>
        <h2 style={{ fontSize: 'clamp(40px,6.5vw,88px)', lineHeight: 0.92, margin: '20px 0 0', fontWeight: 900, fontStretch: '120%', letterSpacing: '-0.03em', maxWidth: 1000, textWrap: 'balance' }}>Não votou em nenhum dos dois no primeiro turno?</h2>
        <p style={{ fontSize: 'clamp(19px,2vw,24px)', lineHeight: 1.45, maxWidth: 760, margin: '24px 0 0', textWrap: 'pretty' }}>No segundo turno, só dois nomes estão na urna. Quem decide é quem escolhe um deles.</p>
        <div style={grid(260, 12, 40)}>
          {OPTIONS.map(([t, d]) => (
            <div key={t} style={{ background: 'rgba(255,255,255,.1)', borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}><div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.15 }}>{t}</div><p style={{ fontSize: 16, lineHeight: 1.5, margin: 0, color: '#E9F4EC', textWrap: 'pretty' }}>{d}</p></div>
          ))}
        </div>

        <div style={{ background: NAVY, borderRadius: 28, padding: 'clamp(20px,3.5vw,40px)', marginTop: 20 }}>
          <div style={{ ...kicker(Y), fontSize: 13 }}>Como o resultado é calculado</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            {row('Todos os eleitores', <div style={{ height: 44, borderRadius: 10, background: 'rgba(255,255,255,.18)' }} />)}
            {row('Foram votar', <div style={{ display: 'flex', height: 44, gap: 4 }}><div style={{ flex: 8, borderRadius: 10, background: 'rgba(255,255,255,.32)' }} /><div style={dashedBox(2)}>Faltaram</div></div>)}
            {row('Votos válidos', (
              <div style={{ display: 'flex', height: 56, gap: 4 }}>
                <div style={{ flex: 7, borderRadius: 10, display: 'flex', overflow: 'hidden', gap: 3 }}>
                  <div style={{ flex: 1, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900 }}>Lula</div>
                  <div style={{ flex: 1, background: Y, color: B, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900 }}>Flávio</div>
                </div>
                <div style={dashedBox(1)}>Branco e nulo</div>
                <div style={{ flex: 2 }} />
              </div>
            ))}
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.5, margin: '20px 0 0', color: '#C9D2E8', maxWidth: 760, textWrap: 'pretty' }}>Vence quem tiver mais da metade dos votos válidos. Faltas, brancos e nulos ficam de fora da conta e deixam a escolha com quem votou num dos dois. Diagrama ilustrativo, sem proporções reais.</p>
        </div>

        <div style={grid(240, 12, 20)}>
          {STEPS.map(([t, d], i) => (
            <div key={t} style={{ background: '#fff', color: INK, borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 40, fontWeight: 900, fontStretch: '120%', lineHeight: 0.9, color: G }}>{i + 1}</div>
              <div style={{ fontSize: 19, fontWeight: 900, lineHeight: 1.2 }}>{t}</div>
              <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: BODY, textWrap: 'pretty' }}>{d}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 36 }}>
          <a href="#comparacao" className={s.lift} style={{ ...ctaYellow(B), padding: '18px 26px', fontSize: 18 }}>Comparar os dois governos</a>
          <a href="#propostas" className={s.btnLight} style={{ ...ctaWhite, padding: '18px 26px', fontSize: 18 }}>Ler as propostas</a>
          <a href="https://www.tse.jus.br" target="_blank" rel="noopener" className={s.tseLink} style={{ color: '#fff', fontSize: 17, fontWeight: 800, padding: '12px 8px' }}>Site do TSE ↗</a>
          <button onClick={share} className={s.shareGreen} style={shareBtn}>{shareLabel}</button>
        </div>
      </div>
    </section>
  );
}

const METHOD = [
  'Mesma métrica e mesma fonte para os dois governos. Mudança de metodologia é sinalizada.',
  'Médias do mandato ou último ano completo, conforme o indicador.',
  'Falas citadas literalmente, com data, veículo e link para o original.',
  'Acusações só com decisão judicial, denúncia formal ou relatório oficial. Processos anulados aparecem como anulados.',
  'Encontrou um erro? Corrigimos em até 24 horas e registramos a correção.',
];

function Metodo() {
  return (
    <section id="metodo" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px 96px' }}>
      <div style={{ background: '#fff', borderRadius: 28, padding: 'clamp(22px,4vw,44px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 28 }}>
        <div>
          <div style={kicker()}>Método</div>
          <h2 style={{ fontSize: 36, lineHeight: 1, margin: '10px 0 0', fontWeight: 900 }}>Como checamos</h2>
        </div>
        <ol style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 17, lineHeight: 1.5, color: BODY, listStyle: 'decimal' }}>
          {METHOD.map(m => <li key={m}>{m}</li>)}
        </ol>
      </div>
    </section>
  );
}

function Footer({ shareLabel, share }: { shareLabel: string; share: () => void }) {
  return (
    <footer style={{ background: B, color: '#fff' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 28px', display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, fontStretch: '120%', lineHeight: 0.95, letterSpacing: '-0.02em', maxWidth: 640 }}>Quem não vota também escolhe. <span style={{ color: Y }}>Vote dia 25.</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a href="https://www.tse.jus.br" className={s.footerCta} style={{ background: Y, color: B, textDecoration: 'none', padding: '18px 26px', borderRadius: 99, fontSize: 18, fontWeight: 800 }}>Onde eu voto?</a>
          <button onClick={share} className={s.shareFooter} style={shareBtn}>{shareLabel}</button>
        </div>
      </div>
    </footer>
  );
}

export default function Contraprova() {
  const [shared, setShared] = useState(false);
  const share = () => {
    navigator.clipboard?.writeText(location.href).catch(() => {});
    setShared(true);
  };
  const shareLabel = shared ? 'Link copiado!' : 'Compartilhar';
  return (
    <div className={s.root} style={{ fontFamily: 'var(--font-archivo), system-ui, sans-serif' }}>
      <Header />
      <Hero />
      <Rules />
      <Comparacao />
      <Crises />
      <Hipotetico />
      <Propostas />
      <Votar shareLabel={shareLabel} share={share} />
      <Metodo />
      <Footer shareLabel={shareLabel} share={share} />
    </div>
  );
}
