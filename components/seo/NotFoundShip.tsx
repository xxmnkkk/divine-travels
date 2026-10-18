import styles from "./NotFoundShip.module.css";

export function NotFoundShip() {
  return <svg viewBox="0 0 320 180" fill="none" className="mx-auto h-auto w-full max-w-[320px]" aria-hidden="true" focusable="false">
    <circle cx="230" cy="52" r="30" fill="#E9B8A0" opacity=".35" />
    <path d="M32 137c45-17 77 14 125-2s78 16 131 0" stroke="#8FB8C4" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    <g className={styles.ship}>
      <path d="M73 112h181l-24 25H96Z" fill="#FFFDF8" stroke="#B89F7D" strokeWidth="1.5" />
      <path d="M102 112V85h108l22 27" fill="#FFFDF8" stroke="#B89F7D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M114 85V69h70l17 16M145 69V56h21v13" fill="#F4EBDD" stroke="#B89F7D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M145 60h21" stroke="#C9A66B" strokeWidth="3" />
      <path d="M110 97h89M98 121h139" stroke="#C9A66B" strokeWidth="1.5" strokeLinecap="round" />
      {[116, 131, 146, 161, 176, 191].map((x) => <rect key={x} x={x} y="101" width="5" height="4" rx="1" fill="#4F8497" opacity=".6" />)}
      <path d="M124 76h8m8 0h8m8 0h8m8 0h8" stroke="#4F8497" strokeWidth="3" opacity=".5" />
    </g>
    <g className={styles.wave} stroke="#8FB8C4" strokeWidth="1.5" strokeLinecap="round"><path d="M24 142c36-12 71 13 108 0s66 13 102 0 48 5 62 0" /><path d="M65 155c23-7 43 7 66 0s44 7 66 0 32 3 45 0" opacity=".6" /></g>
  </svg>;
}
