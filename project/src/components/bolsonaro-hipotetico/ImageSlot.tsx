import type { CSSProperties } from 'react';
import s from './styles.module.css';

type Props = {
  src?: string;
  credit?: string;
  creditHref?: string;
  placeholder?: string;
  shape?: 'rect' | 'circle';
  style?: CSSProperties;
};

// Versão somente leitura do <image-slot> do Claude Design: imagem em "cover",
// crédito no canto inferior esquerdo e legenda quando não há foto.
export default function ImageSlot({ src, credit, creditHref, placeholder, shape = 'rect', style }: Props) {
  const radius = shape === 'circle' ? '50%' : undefined;
  const href = creditHref && /^https?:\/\//.test(creditHref) ? creditHref : undefined;
  return (
    <div className={s.slot} style={style}>
      <div className={s.slotFrame} style={{ borderRadius: radius }}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagens externas do Wikimedia Commons
          <img src={src} alt="" loading="lazy" className={s.slotImg} />
        ) : (
          <div className={s.slotEmpty}>{placeholder}</div>
        )}
      </div>
      {src && credit ? (
        <span className={s.credit}>
          {href ? <a href={href} target="_blank" rel="noopener">{credit}</a> : credit}
        </span>
      ) : null}
    </div>
  );
}
