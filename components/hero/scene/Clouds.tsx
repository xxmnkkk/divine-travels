function Cloud({ x, y, scale = 1, opacity = 1, extra = false }: { x: number; y: number; scale?: number; opacity?: number; extra?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} className={extra ? "scene-cloud-extra" : undefined}>
      <g className="scene-cloud">
        <path d="M-126 21c12-13 30-17 48-14 3-19 19-31 37-29 10-21 43-27 63-10 17-9 40-2 45 16 24-2 41 13 44 28 15-3 33 2 42 10-77 8-194 8-279-1Z" fill="#FFFDF8" fillOpacity=".77" />
        <path d="M-113 25c66-7 158-7 254-2-82 7-165 8-254 2Z" fill="#D9D3C6" fillOpacity=".12" />
      </g>
    </g>
  );
}

export default function Clouds() {
  return (
    <g className="scene-cloud-parallax">
      <Cloud x={208} y={215} scale={1.14} opacity={0.74} />
      <Cloud x={1260} y={156} scale={0.86} opacity={0.58} />
      <Cloud x={83} y={448} scale={0.67} opacity={0.55} />
      <Cloud x={1262} y={433} scale={1.15} opacity={0.48} />
      <Cloud x={669} y={134} scale={0.45} opacity={0.36} extra />
      <Cloud x={748} y={531} scale={0.55} opacity={0.35} extra />
    </g>
  );
}
