type PalmTreeProps = { variant: "near" | "far" };

export default function PalmTree({ variant }: PalmTreeProps) {
  const far = variant === "far";
  return (
    <g className={`scene-palm-position scene-palm-${variant}`} transform={far ? "translate(1437 926) rotate(8) scale(.75)" : "translate(1300 1000) rotate(-8)"} opacity={far ? 0.72 : 0.92}>
      <g className="scene-palm-sway">
        <path d="M-12 4C-9-80-27-196-70-323l16-6C-11-204 11-85 11 4Z" fill={far ? "#A59F7E" : "#9E9676"} />
        <path d="M-9-10C-9-94-27-208-63-313" fill="none" stroke="#D6C4A0" strokeWidth="4" strokeOpacity=".4" />
        <path d="m-8-39 17-3m-19-21 17-4m-20-21 16-4m-20-21 16-4m-22-21 16-5m-23-21 15-6m-23-21 14-6m-25-20 14-6m-23-20 12-6m-24-20 12-6m-24-20 11-6" fill="none" stroke="#766F59" strokeWidth="1" strokeOpacity=".35" />
        <g fill={far ? "#A4A586" : "#8E967B"}>
          <path d="M-60-319c-84-66-165-44-203 0 45-19 91-22 140-5l-30-15 36 10-15-12 31 17-4-10 24 12Z" />
          <path d="M-60-319c-89-32-162 8-183 66 32-31 68-50 122-58l-30-2 35-2-13-6 31 5-7-8 27 7Z" />
          <path d="M-60-319c-61 1-111 53-104 119 12-45 40-77 78-98l-15 4 19-13-4 8 22-17Z" />
          <path d="M-60-319c-45-73-111-85-166-64 46 0 88 16 117 40l-13-17 24 23-1-12 18 20-1-12Z" />
          <path d="M-60-319c-25-76-8-127 32-159-23 39-27 80-19 121l-10-21 5 34-8-12Z" />
          <path d="M-60-319c14-80 68-121 132-120-46 17-76 42-100 86l2-21-12 32 2-21-13 34Z" />
          <path d="M-60-319c57-67 141-65 199-23-50-15-98-9-140 8l22-17-34 21 5-11-26 19 2-10Z" />
          <path d="M-60-319c92-32 163 8 185 66-41-33-78-49-126-54l20-5-34 1 9-7-30 3 7-7Z" />
          <path d="M-60-319c80-1 133 60 123 123-16-46-45-78-85-100l17 1-27-13 10-1-28-9Z" />
          <path d="M-60-319c49 24 65 88 38 132 1-42-13-75-39-110l15 10-13-22Z" />
        </g>
        <g fill="none" stroke="#707B65" strokeWidth="1" strokeOpacity=".36" strokeLinecap="round">
          <path d="M-62-320c-74-43-141-30-185-4m185 4c-70-10-127 19-165 55m165-55c-46 29-78 69-94 106m94-106c-2-59 11-108 30-143m-30 143c40-57 79-92 119-107m-119 107c80-35 133-30 184-15m-184 15c79-5 132 22 171 56m-171-56c59 23 97 63 115 105" />
        </g>
        <g fill="#A49A73">
          <ellipse cx="-62" cy="-311" rx="8" ry="10" transform="rotate(-25 -62 -311)" />
          <ellipse cx="-49" cy="-309" rx="7" ry="9" transform="rotate(19 -49 -309)" />
          <ellipse cx="-58" cy="-298" rx="6" ry="8" />
        </g>
      </g>
    </g>
  );
}
