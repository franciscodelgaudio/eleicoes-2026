import type { CSSProperties } from 'react';
import { refOf } from '@/lib/fontes';

type Props = { src?: string; label?: string; size?: number; color?: string; style?: CSSProperties };

// Linha de fonte. Cada trecho separado por "; " vira link para o documento original.
// Trechos sem órgão público por trás recebem a marca "não oficial".
export default function Fonte({ src, label = 'Fonte', size = 12, color, style }: Props) {
  if (!src) return null;
  const segs = src.split('; ');
  return (
    <div style={{ fontSize: size, lineHeight: 1.5, color, ...style }}>
      {label ? <span>{label}{segs.length > 1 && label === 'Fonte' ? 's' : ''}: </span> : null}
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
    </div>
  );
}
