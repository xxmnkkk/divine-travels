export default function Sky() {
  return (
    <g>
      <defs>
        <linearGradient id="divine-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="53%" stopColor="#F9F3E9" />
          <stop offset="79%" stopColor="#F0E7D8" />
          <stop offset="100%" stopColor="#EFDDD0" />
        </linearGradient>
        <linearGradient id="divine-horizon-haze" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0" />
          <stop offset="55%" stopColor="#FFFDF8" stopOpacity=".62" />
          <stop offset="100%" stopColor="#FFFDF8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="divine-warm-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E9B8A0" stopOpacity="0" />
          <stop offset="100%" stopColor="#E9B8A0" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <path fill="url(#divine-sky)" d="M0 0h1440v625H0z" />
      <path className="scene-sky-warm" fill="url(#divine-warm-sky)" opacity="0" d="M0 0h1440v625H0z" />
      <path fill="url(#divine-horizon-haze)" d="M0 526h1440v100H0z" />
    </g>
  );
}
