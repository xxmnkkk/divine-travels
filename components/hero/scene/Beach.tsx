export default function Beach() {
  return (
    <g className="scene-beach-parallax">
      <defs>
        <linearGradient id="divine-beach" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F2E5CF" />
          <stop offset="100%" stopColor="#E5D3B4" />
        </linearGradient>
        <linearGradient id="divine-beach-soft" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F9F1DF" />
          <stop offset="100%" stopColor="#F0E4CF" />
        </linearGradient>
      </defs>
      <path d="M-100 947c225 25 334-67 527-79 278-17 520-23 742-144 113-61 211-85 371-28v339H-100Z" fill="#DCE1CD" fillOpacity=".68" />
      <path className="scene-shore-foam" d="M-100 960c227 25 333-67 532-78 285-16 519-21 743-146 112-62 212-84 365-28" fill="none" stroke="#FFFDF8" strokeWidth="13" strokeOpacity=".67" />
      <path d="M-100 976c228 25 333-67 538-78 286-15 520-21 742-146 114-64 211-82 360-27v310H-100Z" fill="url(#divine-beach)" />
      <path d="M-100 976c228 25 333-67 538-78 286-15 520-21 742-146 114-64 211-82 360-27v28c-146-55-239-38-351 20-216 113-463 129-746 141-207 10-312 101-543 76Z" fill="url(#divine-beach-soft)" />
      <path d="M490 928c212-10 398-24 556-82m138-63c101-55 174-60 267-37" fill="none" stroke="#C6AE87" strokeOpacity=".23" />
      <path d="m750 947 4 5 7 1-5 4v7l-6-4-7 3 2-7-4-5h7Z" fill="#CCAF87" opacity=".55" />
      <path d="m924 915 5 2m10-6 3 1m-13 12 3 1m164-56 5 2m10-6 3 1m-13 12 3 1" stroke="#C5B38F" strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
      <g opacity=".42" fill="none" stroke="#A19171" strokeWidth="1.3" strokeLinecap="round">
        <path d="m997 886 4-3 4 3m-4-3v6m21-9 3-2 3 2m-3-2v4" />
      </g>
    </g>
  );
}
