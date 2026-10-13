import type { CSSProperties } from 'react';
import { refOf } from '@/lib/fontes';
import s from './Fonte.module.css';

type Props = { src?: string; label?: string; size?: number; color?: string; style?: CSSProperties; collapsed?: boolean };

// Linha de fonte. Cada trecho separado por "; " vira link para o documento original.
// Trechos sem órgão público por trás recebem a marca "não oficial".
// Com `collapsed`, mostra só "Fontes ▾" e abre a lista ao clicar.
export default function Fonte({ src, label = 'Fonte', size = 12, color, style, collapsed }: Props) {
  if (!src) return null;
  const segs = src.split('; ');
  const name = label + (segs.length > 1 && label === 'Fonte' ? 's' : '');
  if (collapsed) {
    return (
      <details className={s.toggle} style={{ fontSize: size, lineHeight: 1.5, color, ...style }}>
        <summary>{name} ({segs.length}) <span className={s.chev} aria-hidden>▾</span></summary>
        <div style={{ marginTop: 4 }}><Links segs={segs} /></div>
      </details>
    );
  }
  return (
    <div style={{ fontSize: size, lineHeight: 1.5, color, ...style }}>
      {label ? <span>{name}: </span> : null}
      <Links segs={segs} />
    </div>
  );
}

function Links({ segs }: { segs: string[] }) {
  return (
    <>
      {segs.map((t, i) => {
        const r = refOf(t);
        return (
          <span key={t}>
            {i > 0 ? ' · ' : null}
            {r ? (
              <a href={r.url} target="_blank" rel="noopener" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>{t} ↗</a>
            ) : t}
            {r && !r.oficial ? <span style={{ opacity: 0.75 }}> (não oficial)</span> : null}
          </span>
        );
      })}
    </>
  );
}
