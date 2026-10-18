const glints = Array.from({ length: 25 }, (_, index) => {
  const row = Math.floor(index / 4);
  return {
    x: 1060 + Math.sin(index * 2.4) * (17 + row * 13),
    y: 590 + row * 22 + (index % 3) * 5,
    width: 2 + (index % 4) * 1.9 + row * 0.75,
    opacity: 0.21 + (index % 3) * 0.14,
  };
});

export default function Glitter() {
  return (
    <g className="scene-glitter" fill="none" stroke="#FFFDF8" strokeLinecap="round">
      {glints.map((glint, index) => (
        <path key={index} className="scene-glint" d={`M${glint.x} ${glint.y}h${glint.width}`} opacity={glint.opacity} strokeWidth={index % 5 === 0 ? 2.2 : 1.1} />
      ))}
    </g>
  );
}
