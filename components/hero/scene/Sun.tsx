export default function Sun() {
  return (
    <g className="scene-sun-parallax">
      <defs>
        <radialGradient id="divine-sun-halo">
          <stop offset="0%" stopColor="#E9B8A0" stopOpacity=".31" />
          <stop offset="60%" stopColor="#E9B8A0" stopOpacity=".12" />
          <stop offset="100%" stopColor="#E9B8A0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="divine-sun-disc" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F7E8CC" stopOpacity=".75" />
          <stop offset="100%" stopColor="#E5BD9F" stopOpacity=".43" />
        </linearGradient>
      </defs>
      <circle className="scene-sun-halo" cx="1078" cy="433" r="224" fill="url(#divine-sun-halo)" />
      <circle cx="1078" cy="433" r="106" fill="url(#divine-sun-disc)" />
      <path d="M1044 334a106 106 0 0 1 133 87" fill="none" stroke="#FFFDF8" strokeOpacity=".45" />
    </g>
  );
}
