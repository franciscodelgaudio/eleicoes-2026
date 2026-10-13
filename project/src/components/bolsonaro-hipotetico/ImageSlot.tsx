import type { CSSProperties } from 'react';
import s from './styles.module.css';

type Props = {
  src?: string;
  credit?: string;
  creditHref?: string;
  placeholder?: string;
  shape?: 'rect' | 'circle';
  fit?: 'cover' | 'contain';
  compact?: boolean;
  style?: CSSProperties;
};

// Versão somente leitura do <image-slot> do Claude Design: imagem em "cover",
// crédito no canto inferior esquerdo e legenda quando não há foto.
// Em quadros pequenos (compact), o crédito fica só no title da imagem.
export default function ImageSlot({ src, credit, creditHref, placeholder, shape = 'rect', fit = 'cover', compact = false, style }: Props) {
  const radius = shape === 'circle' ? '50%' : undefined;
  const href = creditHref && /^https?:\/\//.test(creditHref) ? creditHref : undefined;
  return (
    <div className={s.slot} style={style}>
      <div className={s.slotFrame} style={{ borderRadius: radius }}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagens externas do Wikimedia Commons
          <img src={src} alt="" title={credit} loading="lazy" className={s.slotImg} style={fit === 'contain' ? { objectFit: 'contain' } : undefined} />
        ) : (
          <div className={s.slotEmpty}>{placeholder}</div>
        )}
      </div>
      {src && credit && !compact ? (
        <span className={s.credit}>
          {href ? <a href={href} target="_blank" rel="noopener">{credit}</a> : credit}
        </span>
      ) : null}
    </div>
  );
}
