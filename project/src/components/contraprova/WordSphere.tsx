'use client';

import { Component, createRef, type MouseEvent } from 'react';

export type SphereWord = { w: string; f: number; color: string; sel: boolean; title: string; onClick: () => void };
type Props = { words: SphereWord[] };
type Lay = { x: number; y: number; fs: number; vert: boolean; show: boolean; bw: number; bh: number };
type Dyn = { ox: number; oy: number; vx: number; vy: number; s: number; vs: number };

// Nuvem de palavras em círculo: as maiores no centro, em espiral; as palavras fogem do cursor com mola.
export default class WordSphere extends Component<Props, { w: number }> {
  state = { w: 0 };
  box = createRef<HTMLDivElement>();
  els: (HTMLButtonElement | null)[] = [];
  m: { x: number; y: number } | null = null;
  dyn: Dyn[] = [];
  lay: Lay[] = [];
  key = '';
  cv?: HTMLCanvasElement;
  reduce = false;
  raf = 0;
  ro?: ResizeObserver;

  componentDidMount() {
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.ro = new ResizeObserver(e => this.setState({ w: Math.round(e[0].contentRect.width) }));
    this.ro.observe(this.box.current!);
    const tick = () => { this.step(); this.raf = requestAnimationFrame(tick); };
    this.raf = requestAnimationFrame(tick);
  }

  componentWillUnmount() { cancelAnimationFrame(this.raf); this.ro?.disconnect(); }

  layout(R: number) {
    const k = R + '|' + this.props.words.map(t => t.w).join(',');
    if (k === this.key) return this.lay;
    this.key = k;
    const ctx = (this.cv = this.cv || document.createElement('canvas')).getContext('2d')!;
    const fam = (this.box.current && getComputedStyle(this.box.current).fontFamily) || 'sans-serif';
    const ws = this.props.words.map((t, i) => ({ ...t, i })).sort((x, y) => y.f - x.f);
    const placed: { x: number; y: number; w: number; h: number }[] = [], out: Lay[] = [];
    const inside = (x: number, y: number, w: number, hh: number) => [[x - w / 2, y - hh / 2], [x + w / 2, y - hh / 2], [x - w / 2, y + hh / 2], [x + w / 2, y + hh / 2]].every(([px, py]) => px * px + py * py <= R * R);
    const hit = (x: number, y: number, w: number, hh: number) => placed.some(q => Math.abs(x - q.x) * 2 < w + q.w && Math.abs(y - q.y) * 2 < hh + q.h);
    ws.forEach((t, rank) => {
      let fs = Math.min((12 + t.f * 44) * (R / 200), (R * 1.7) / (t.w.length * 0.72));
      const vert = rank >= 6 && rank % 5 === 1;
      for (let tries = 0; tries < 6; tries++) {
        ctx.font = '900 ' + fs + 'px ' + fam;
        const tw = ctx.measureText(t.w.toUpperCase()).width + fs * 0.3, th = fs * 0.92;
        const w = vert ? th : tw, hh = vert ? tw : th;
        let ok: { x: number; y: number } | null = null;
        for (let s = 0; s < 1400 && !ok; s++) {
          const ang = s * 0.21, rr = s * 0.32 * (R / 200);
          const x = rr * Math.cos(ang), y = rr * Math.sin(ang) * 0.8;
          if (rr > R) break;
          if (inside(x, y, w, hh) && !hit(x, y, w, hh)) ok = { x, y };
        }
        if (ok) { placed.push({ x: ok.x, y: ok.y, w, h: hh }); out[t.i] = { x: ok.x, y: ok.y, fs, vert, show: true, bw: w, bh: hh }; return; }
        fs *= 0.84;
      }
      out[t.i] = { x: 0, y: 0, fs, vert, show: false, bw: 0, bh: 0 };
    });
    this.lay = out;
    this.dyn = out.map(o => ({ ox: -o.x * 0.9, oy: -o.y * 0.9, vx: 0, vy: 0, s: 0.2, vs: 0 }));
    return out;
  }

  step() {
    const L = this.lay;
    if (!L.length) return;
    L.forEach((o, i) => {
      const d = this.dyn[i], el = this.els[i];
      if (!d || !el) return;
      let tx = 0, ty = 0, ts = 1;
      if (this.m && !this.reduce) {
        const dx = o.x - this.m.x, dy = o.y - this.m.y, dist = Math.hypot(dx, dy) || 1, rad = 120;
        const inW = Math.abs(dx) * 2 < o.bw && Math.abs(dy) * 2 < o.bh;
        if (inW) ts = 1.08;
        else if (dist < rad) { const f = 1 - dist / rad; tx = dx / dist * f * 7; ty = dy / dist * f * 7; }
      }
      if (this.reduce) { d.ox = tx; d.oy = ty; d.s = 1; }
      d.vx = (d.vx + (tx - d.ox) * 0.09) * 0.78; d.vy = (d.vy + (ty - d.oy) * 0.09) * 0.78; d.vs = (d.vs + (ts - d.s) * 0.1) * 0.75;
      d.ox += d.vx; d.oy += d.vy; d.s += d.vs;
      el.style.transform = 'translate(-50%,-50%) translate(' + (o.x + d.ox).toFixed(1) + 'px,' + (o.y + d.oy).toFixed(1) + 'px) scale(' + d.s.toFixed(3) + ')' + (o.vert ? ' rotate(-90deg)' : '');
    });
  }

  move(e: MouseEvent) {
    const b = this.box.current!.getBoundingClientRect();
    this.m = { x: e.clientX - b.left - b.width / 2, y: e.clientY - b.top - b.height / 2 };
  }

  render() {
    const w = this.state.w || 0, H = Math.max(300, Math.min(w, 440)), R = Math.min(w, H) / 2 - 10;
    const L = w ? this.layout(R) : [];
    return (
      <div ref={this.box} onMouseMove={e => this.move(e)} onMouseLeave={() => { this.m = null; }} style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden' }}>
        {w ? <div style={{ position: 'absolute', left: '50%', top: '50%', width: R * 2 + 12, height: R * 2 + 12, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: '#fff', pointerEvents: 'none' }} /> : null}
        {this.props.words.map((t, i) => {
          const o = L[i];
          if (!o || !o.show) return null;
          return (
            <button
              key={t.w}
              ref={el => { this.els[i] = el; }}
              title={t.title}
              onClick={t.onClick}
              style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%) translate(' + o.x.toFixed(1) + 'px,' + o.y.toFixed(1) + 'px)' + (o.vert ? ' rotate(-90deg)' : ''), border: 'none', background: t.sel ? '#FFD21F' : 'transparent', borderRadius: 4, padding: '0 ' + (o.fs * 0.15).toFixed(1) + 'px', cursor: 'pointer', fontFamily: 'inherit', fontSize: o.fs.toFixed(1) + 'px', fontWeight: 900, textTransform: 'uppercase', whiteSpace: 'nowrap', color: t.sel ? '#0B2A6F' : t.color, lineHeight: 0.92, willChange: 'transform' }}
            >
              {t.w}
            </button>
          );
        })}
      </div>
    );
  }
}
