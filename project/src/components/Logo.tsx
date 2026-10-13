import { Poppins } from 'next/font/google';

// Wordmark geométrico (a de um andar, t de topo reto), próximo do logotipo original.
const poppins = Poppins({ subsets: ['latin'], weight: '700' });

const CHECK = '#D9452F';

// Logotipo Contraprova: dois documentos com o check vermelho + "contraprova".
// Os traços usam currentColor, então a cor vem do `color` do elemento pai.
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size * 260 / 250} height={size} viewBox="0 0 260 250" fill="none" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <g stroke="currentColor" strokeWidth={28} strokeLinejoin="round">
        <path d="M46 181H32Q18 181 18 167V31Q18 17 32 17H145L172 44" />
        <path d="M94 68H205L240 103V216Q240 230 226 230H94Q80 230 80 216V82Q80 68 94 68Z" />
      </g>
      <path d="M115 160L145 192L205 122" stroke={CHECK} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ size = 24, wordmarkClassName }: { size?: number; wordmarkClassName?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32 }}>
      <LogoMark size={size} />
      <span className={`${poppins.className} ${wordmarkClassName ?? ''}`} style={{ fontSize: size * 0.95, lineHeight: 1, letterSpacing: '-0.01em', marginTop: -size * 0.08 }}>contraprova</span>
    </span>
  );
}
