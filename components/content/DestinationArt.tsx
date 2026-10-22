import { useId } from 'react';
import type { DestinationMotif } from '@/content/destinations';

interface DestinationArtProps {
  motif: DestinationMotif;
  className?: string;
}

const palettes: Record<DestinationMotif, [string, string, string]> = {
  italy: ['#F4EBDD', '#D7D7B9', '#6F806D'],
  japan: ['#F6EAE3', '#E5C5BC', '#86675E'],
  maldives: ['#E8F0EB', '#A9CDD0', '#4F8497'],
  greece: ['#F3EEE4', '#B7D4DA', '#5E8A9B'],
  morocco: ['#F3E5D5', '#DEBDA2', '#A37E64'],
  kenya: ['#F0E7CE', '#D6BA84', '#817D59'],
  bali: ['#EDF0DB', '#B7C4A2', '#6D8770'],
  iceland: ['#E8EEEE', '#B3CDD0', '#6C9099'],
  india: ['#F5ECDD', '#DFC7A8', '#93785A'],
};

function Motif({ motif }: { motif: DestinationMotif }) {
  switch (motif) {
    case 'italy': return <>
      <path d="M68 182h157M79 182v-63l17-9 17 9v63m-27-42h20m-20 15h20m-20 15h20M124 182v-94h70v94m-70-94 35-18 35 18M132 96h54m-47 8v78m13-78v78m14-78v78m13-78v78M120 186h79" />
      <path d="M217 182v-64m-13 16 13-29 13 29m-24 13 11-26 11 26m-19 10 8-20 8 20M59 195q75-17 182 0M62 205q86-11 172 1" opacity=".6" />
    </>;
    case 'japan': return <>
      <path d="M60 151h177M78 145l71-29 72 29H78Zm16-30 55-25 56 25H94Zm12-29 43-22 43 22h-86Zm10 65v44m66-44v44m-36-44v44m-58 0h115M121 117v17m55-17v17m-43-42v13m31-13v13" />
      <path d="M49 198q89-11 190 0M44 188q20-26 9-66m0 19q-22-2-26-19m27 26q25-5 34-23M237 179q-5-29 14-49m-11 22q-15-7-18-17" opacity=".7" />
      <circle cx="51" cy="118" r="5" /><circle cx="27" cy="119" r="4" /><circle cx="85" cy="123" r="4" /><circle cx="251" cy="129" r="4" />
    </>;
    case 'maldives': return <>
      <path d="M31 174q35-7 67 0t65 0 65 0 52 0M51 186q32-6 67 0t65 0 65 0M129 155h80v-39h-80v39Zm-10-39 50-32 50 32H119Zm23 39v16m54-16v16m-38-47h22v31m-61 14 31-14m-31 14v8m-14-2h14" />
      <path d="M82 169q4-48-17-77m0 0q-26-5-33 12 23-5 33-12Zm0 0q-8-26-28-22 15 13 28 22Zm0 0q15-26 33-17-20 6-33 17Zm0 0q29-7 39 11-24-10-39-11Z" />
      <path d="M161 202h44m-61 8h24m53-15h25" opacity=".6" />
    </>;
    case 'greece': return <>
      <path d="M59 181h183M73 181v-60h52v60m0 0v-75h65v75m0 0v-45h41v45M73 121q26-43 52 0m20-15V95q12-22 24 0v11M94 181v-30q7-13 14 0v30m43 0v-31q8-13 16 0v31m39-27h10v12h-10M79 138h10v13H79m94-15h9v11h-9" />
      <path d="M41 195q26-8 53 0t53 0 53 0 53 0M67 207q37-7 74 0t74 0M157 76V64m-6 6h12" />
    </>;
    case 'morocco': return <>
      <path d="M77 183v-66q0-16 12-22l61-33 61 33q12 6 12 22v66H77Zm18 0v-66q0-6 5-10l50-28 50 28q5 4 5 10v66M125 183v-37q0-24 25-38 25 14 25 38v37M62 190h176M85 106h11m108 0h11M83 127h10m115 0h9M83 148h10m115 0h9M83 169h10m115 0h9" />
      <path d="m111 198 39-10 39 10-39 12-39-12Zm16 1 23-6 23 6-23 6-23-6ZM44 182v-18m0 5q-14-8-14-17m14 9q13-9 13-19m198 40v-19m0 7q-13-6-13-15m13 8q12-8 12-17" opacity=".7" />
    </>;
    case 'kenya': return <>
      <path d="M34 181q95-13 232 0M172 179l-6-61m0 0q-38 8-66-10 7-18 35-19 8-20 33-18 14-13 30 4 30-4 41 16 23 5 23 19-41 14-96 8Zm0 0 27-20m-27 13-23-17" />
      <path d="M64 183v-33l-6-10 2-18 5-9 7 4 4 18 8 5 10 2 3 14-5 4-1 23m-11 0v-26H65m25-14-10-4m-19-20-4-5m10 1 1-7M43 196q92-10 216 0M118 175l-4-9m8 9 3-8m110 10 2-10" />
    </>;
    case 'bali': return <>
      <path d="M65 184h169M93 183v-29h114v29m-128-29 71-20 71 20H79Zm14-24 57-17 57 17H93Zm11-21 46-17 46 17h-92Zm12-20 34-16 34 16h-68Zm23-22 11-18 11 18M104 157v26m23-26v26m23-26v26m23-26v26m23-26v26" />
      <path d="M36 207q45-19 85-12t85-10 66 2M35 220q41-18 84-11t86-11 62 2M53 183q0-30-17-46m0 0q-18-5-22 9m22-9q-7-17-20-17m20 17q11-17 24-10m-24 10q20-2 27 10" opacity=".65" />
    </>;
    case 'iceland': return <>
      <path d="m28 169 66-80 39 42 36-66 101 104H28Zm42-50 24-30 21 22-18-3-9 14-18-3Zm75-11 24-43 35 37-21-5-12 12-9-9-17 8ZM35 184q51-10 101 0t103 0M53 198q43-7 86 0t86 0M133 133v32m9-33v41m9-32v27m-17 4q8 8 18 1" />
      <path d="M67 66q32-22 57-4t51-6 58-3M53 53q33-21 66-3t60-8" opacity=".5" />
    </>;
    case 'india': return <>
      <path d="M52 189h196M68 189V98h164v91M60 98h180M75 89h150M105 189v-42q0-25 45-48 45 23 45 48v42M120 189v-40q0-14 30-31 30 17 30 31v40M94 98V77h112v21M88 77q62-47 124 0H88Zm62-47v12m-6-6h12M80 114h14v20H80m126-20h14v20h-14M80 145h14v20H80m126-20h14v20h-14M60 197h180" />
      <path d="M39 211q52-11 107-4t115-3M82 222q62-7 125-1M105 84h4m13 0h4m13 0h4m13 0h4m13 0h4m13 0h4M70 179h21m118 0h21" opacity=".6" />
    </>;
  }
}

export function DestinationArt({ motif, className = '' }: DestinationArtProps) {
  const id = useId().replace(/:/g, '');
  const palette = palettes[motif];
  return (
    <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`tile-${id}`} x1="150" y1="0" x2="150" y2="260" gradientUnits="userSpaceOnUse"><stop stopColor={palette[0]} /><stop offset="1" stopColor={palette[1]} /></linearGradient>
        <radialGradient id={`sun-${id}`}><stop stopColor="#FFFDF8" stopOpacity=".7" /><stop offset="1" stopColor="#FFFDF8" stopOpacity="0" /></radialGradient>
      </defs>
      <path fill={`url(#tile-${id})`} d="M0 0h300v260H0z" />
      <circle cx="224" cy="67" r="58" fill={`url(#sun-${id})`} />
      <circle cx="224" cy="67" r="23" fill="#FFFDF8" fillOpacity=".4" />
      <path d="M0 232q88-20 164-4t136-1v33H0Z" fill="#FFFDF8" fillOpacity=".18" />
      <g stroke={palette[2]} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><Motif motif={motif} /></g>
    </svg>
  );
}
