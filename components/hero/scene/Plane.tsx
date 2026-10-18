type PlaneProps = { depth: "far" | "mid" | "near" };

export default function Plane({ depth }: PlaneProps) {
  const settings = {
    far: { transform: "translate(386 166) rotate(-12)", scale: 0.29, opacity: 0.34 },
    mid: { transform: "translate(1134 235) rotate(-15)", scale: 0.59, opacity: 0.81 },
    near: { transform: "translate(113 336) rotate(-8)", scale: 0.4, opacity: 0.52 },
  }[depth];

  return (
    <g className={`scene-plane-flight-${depth}${depth === "near" ? " scene-plane-extra" : ""}`} transform={settings.transform} opacity={settings.opacity}>
      <g transform={`scale(${settings.scale})`}>
        <path className="scene-contrail" d="M-232 9q74 2 229-7L-4 5q-129 15-228 4Z" fill="#FFFDF8" fillOpacity=".56" />
        <path d="m10 2 23-3-24-31-11 1 8 31-26 4-13-12-9 1 6 16 39-3 12-1 35-7C59-6 48-6 10 2Z" fill="#B6B5A6" />
        <path d="m10 2 23-3-24-31-11 1L7-1l-27 4-13-12-9 1 7 11 42 1 12-1 35-7C54-8 41-5 10 2Z" fill="#F9F8EF" />
        <path d="m12 4-28 25 13 1L34 2" fill="#E7DFCE" />
        <path d="m37-3 10-1" stroke="#7E9D9D" strokeWidth="2" strokeLinecap="round" />
        <path d="m-23 2 7-1M-10 0l7-1M3-2l7-1" stroke="#8CA6A7" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </g>
  );
}
