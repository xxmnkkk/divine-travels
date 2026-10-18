export default function Waves({ foreground = false }: { foreground?: boolean }) {
  if (foreground) {
    return (
      <g className="scene-water-front">
        <g className="scene-wave" fill="none" stroke="#FFFDF8" strokeLinecap="round">
          <path d="M-130 783c80-9 140-10 214-3s134 10 196 4 106-12 174-8 137 12 197 4 119-9 180-1 122 7 187-2 121-10 178-2 127 7 230-4" strokeOpacity=".43" strokeWidth="2" />
          <path d="M-170 831c55-4 127-6 176 0s118 7 168 0 126-9 181-3 113 8 169 2 112-7 177-3 132 8 186 2" strokeOpacity=".34" strokeWidth="1.4" />
        </g>
        <g className="scene-wave" fill="none" stroke="#4F8497" strokeOpacity=".15" strokeLinecap="round">
          <path d="M-90 741c101-9 169 10 263 2s159-7 231-1 153 4 237-3 145-2 213 2 162 2 239-5 183-2 250-1" />
          <path d="M61 807q47-4 91 0m181 8q42-5 88-2m149-15q57-6 102-1" />
          <path d="M-74 866q108-8 197-3m102 19q60-5 111-3" />
        </g>
      </g>
    );
  }

  return (
    <g className="scene-sea-rise">
      <defs>
        <linearGradient id="divine-ocean" x1="0" x2=".15" y1="0" y2="1">
          <stop offset="0%" stopColor="#BFCFC7" />
          <stop offset="25%" stopColor="#AFC9C5" />
          <stop offset="70%" stopColor="#91B7BA" />
          <stop offset="100%" stopColor="#89AFB2" />
        </linearGradient>
        <linearGradient id="divine-shallow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F9F5E8" stopOpacity="0" />
          <stop offset="100%" stopColor="#F9F5E8" stopOpacity=".33" />
        </linearGradient>
      </defs>
      <path d="M0 578c374-3 889-3 1440 0v382H0Z" fill="url(#divine-ocean)" />
      <path d="M0 576h1440" fill="none" stroke="#A2B6AC" strokeWidth="1" strokeOpacity=".65" />
      <path d="M0 579h1440" fill="none" stroke="#FFFDF8" strokeWidth="2" strokeOpacity=".43" />
      <path d="M0 687c341-26 677 13 1440-20v293H0Z" fill="url(#divine-shallow)" />
      <g className="scene-wave scene-wave-distant" fill="none" stroke="#FFFDF8" strokeLinecap="round">
        <path d="M-180 599c111-4 216 4 326 0s195-3 305 0 220 3 323 0 203-3 310 0 218 4 354-1" strokeOpacity=".32" />
        <path d="M-90 616c93-5 168 5 253 1s170-5 257 0 175 2 264-1 161-3 245 0 186 3 283-1 168-2 240 0" strokeOpacity=".3" />
        <path d="M-140 650c91-7 174 6 257 1s174-8 263-2 175 7 267 0 171-4 258 1 178 5 268-1 175-2 257 1" strokeOpacity=".4" strokeWidth="1.5" />
      </g>
      <g className="scene-wave" fill="none" stroke="#FFFDF8" strokeLinecap="round">
        <path d="M-130 695c99-10 166 7 255 0s166-8 248-1 169 4 253-2 162-1 244 3 164-1 251-5 171 2 244-2" strokeOpacity=".36" strokeWidth="1.5" />
        <path d="M-150 720c99-7 165 6 251 0s171-7 255-2 171 6 258-2 164-5 248 1 169 3 253-3 163-4 244 0" strokeOpacity=".24" />
      </g>
      <g fill="none" stroke="#5E959D" strokeOpacity=".18" strokeLinecap="round">
        <path d="M560 633h42m115-11h26m294 11h56M54 640h67m642 31h62m-630 4h38m93-12h56m743 10h78M37 702h39m750 7h29" />
      </g>
    </g>
  );
}
