import type { DeckId } from "../seat-map";

type BoatDeckArtworkProps = {
  deck: DeckId;
};

const hullPath =
  "M200 13 C139 28 86 70 66 130 C43 200 35 315 39 441 C42 526 82 570 200 587 C318 570 358 526 361 441 C365 315 357 200 334 130 C314 70 261 28 200 13Z";

function BoatShell({ children, deck }: { children: React.ReactNode; deck: DeckId }) {
  const prefix = `boat-${deck}`;

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${prefix}-hull`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f7f0e4" />
          <stop offset=".46" stopColor="#c9a887" />
          <stop offset="1" stopColor="#5f2b20" />
        </linearGradient>
        <linearGradient id={`${prefix}-deck`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={deck === "upper" ? "#f3dfc3" : "#62382b"} />
          <stop offset="1" stopColor={deck === "upper" ? "#b97754" : "#211411"} />
        </linearGradient>
        <pattern id={`${prefix}-planks`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 0H24M0 12H24" stroke={deck === "upper" ? "#704531" : "#d9a46c"} strokeOpacity=".18" />
          <path d="M6 0V12M18 12V24" stroke={deck === "upper" ? "#704531" : "#d9a46c"} strokeOpacity=".14" />
        </pattern>
        <filter id={`${prefix}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#110d0b" floodOpacity=".48" />
        </filter>
        <clipPath id={`${prefix}-clip`}>
          <path d={hullPath} />
        </clipPath>
      </defs>

      <ellipse cx="200" cy="566" rx="148" ry="22" fill="#110d0b" opacity=".35" />
      <path d={hullPath} fill={`url(#${prefix}-hull)`} filter={`url(#${prefix}-shadow)`} />
      <path
        d="M200 31 C149 43 106 80 88 137 C68 202 61 317 65 434 C68 500 99 535 200 553 C301 535 332 500 335 434 C339 317 332 202 312 137 C294 80 251 43 200 31Z"
        fill={`url(#${prefix}-deck)`}
        stroke="#f7f0e4"
        strokeOpacity=".55"
        strokeWidth="3"
      />
      <path
        d="M200 31 C149 43 106 80 88 137 C68 202 61 317 65 434 C68 500 99 535 200 553 C301 535 332 500 335 434 C339 317 332 202 312 137 C294 80 251 43 200 31Z"
        fill={`url(#${prefix}-planks)`}
        clipPath={`url(#${prefix}-clip)`}
      />
      <path d="M200 17V44" stroke="#f7f0e4" strokeOpacity=".75" strokeWidth="2" />
      <path d="M90 466C130 493 270 493 310 466" fill="none" stroke="#f7f0e4" strokeOpacity=".35" strokeWidth="2" />
      {children}
    </svg>
  );
}

function UpperDeckArtwork() {
  return (
    <BoatShell deck="upper">
      <path d="M119 141 Q200 95 281 141 L266 178 Q200 148 134 178Z" fill="#8fc2c5" fillOpacity=".48" stroke="#f7f0e4" strokeOpacity=".75" strokeWidth="4" />
      <path d="M130 138 Q200 110 270 138" fill="none" stroke="#dff6f4" strokeOpacity=".8" strokeWidth="3" />
      <rect x="160" y="78" width="80" height="48" rx="18" fill="#211411" stroke="#d9c5ac" strokeWidth="3" />
      <circle cx="200" cy="101" r="15" fill="none" stroke="#d9c5ac" strokeWidth="4" />
      <path d="M186 101H214M200 87V115" stroke="#d9c5ac" strokeWidth="3" />
      <text x="200" y="69" textAnchor="middle" fill="#5f2b20" fontSize="10" fontWeight="700" letterSpacing="2">HELM · BOW</text>

      <rect x="176" y="180" width="48" height="286" rx="24" fill="#f7f0e4" fillOpacity=".18" stroke="#fff8eb" strokeOpacity=".48" strokeDasharray="7 9" />
      <path d="M200 194V449" stroke="#5f2b20" strokeOpacity=".35" strokeWidth="2" strokeDasharray="2 12" />
      <text x="200" y="332" textAnchor="middle" fill="#5f2b20" fillOpacity=".66" fontSize="10" fontWeight="800" letterSpacing="3" transform="rotate(90 200 332)">CENTRAL AISLE</text>

      <path d="M106 205V450M294 205V450" stroke="#f7f0e4" strokeOpacity=".25" strokeWidth="5" strokeLinecap="round" />
      <g opacity=".65">
        <circle cx="91" cy="192" r="4" fill="#f7f0e4" />
        <circle cx="309" cy="192" r="4" fill="#f7f0e4" />
        <circle cx="84" cy="454" r="4" fill="#f7f0e4" />
        <circle cx="316" cy="454" r="4" fill="#f7f0e4" />
      </g>
      <path d="M116 484 Q200 516 284 484 L271 526 Q200 544 129 526Z" fill="#211411" fillOpacity=".84" stroke="#d9c5ac" strokeOpacity=".55" strokeWidth="2" />
      <text x="200" y="510" textAnchor="middle" fill="#f7f0e4" fontSize="10" fontWeight="800" letterSpacing="2">CREW · STERN</text>
    </BoatShell>
  );
}

function LowerDeckArtwork() {
  return (
    <BoatShell deck="lower">
      <path d="M111 130 Q200 83 289 130 L302 450 Q291 505 200 526 Q109 505 98 450Z" fill="#160f0d" fillOpacity=".42" stroke="#f7f0e4" strokeOpacity=".62" strokeWidth="4" />
      <path d="M122 153 Q200 119 278 153" fill="none" stroke="#8fc2c5" strokeOpacity=".74" strokeWidth="12" strokeDasharray="38 8" />
      <path d="M100 219V429M300 219V429" stroke="#8fc2c5" strokeOpacity=".64" strokeWidth="10" strokeDasharray="30 12" />

      <path d="M101 179 Q200 143 299 179" fill="none" stroke="#d9c5ac" strokeOpacity=".45" strokeWidth="2" />
      <path d="M111 254 Q200 215 289 254" fill="none" stroke="#d9c5ac" strokeOpacity=".35" strokeWidth="2" />
      <rect x="92" y="166" width="216" height="121" rx="46" fill="#a65b42" fillOpacity=".2" stroke="#d9c5ac" strokeOpacity=".32" strokeWidth="2" />
      <path d="M111 201V263M289 201V263M137 174H263" fill="none" stroke="#d9c5ac" strokeOpacity=".5" strokeWidth="14" strokeLinecap="round" />

      <rect x="92" y="350" width="216" height="131" rx="46" fill="#a65b42" fillOpacity=".2" stroke="#d9c5ac" strokeOpacity=".32" strokeWidth="2" />
      <path d="M111 372V451M289 372V451M137 470H263" fill="none" stroke="#d9c5ac" strokeOpacity=".5" strokeWidth="14" strokeLinecap="round" />

      <g>
        <ellipse cx="200" cy="211" rx="40" ry="25" fill="#d4ae76" stroke="#f7f0e4" strokeOpacity=".56" strokeWidth="3" />
        <ellipse cx="200" cy="211" rx="31" ry="17" fill="#754b32" />
        <text x="200" y="215" textAnchor="middle" fill="#f7f0e4" fontSize="9" fontWeight="800" letterSpacing="2">TABLE 01</text>
        <ellipse cx="200" cy="400" rx="40" ry="25" fill="#d4ae76" stroke="#f7f0e4" strokeOpacity=".56" strokeWidth="3" />
        <ellipse cx="200" cy="400" rx="31" ry="17" fill="#754b32" />
        <text x="200" y="404" textAnchor="middle" fill="#f7f0e4" fontSize="9" fontWeight="800" letterSpacing="2">TABLE 02</text>
      </g>

      <path d="M160 303H183V290H217V303H240V333H217V346H183V333H160Z" fill="#f7f0e4" fillOpacity=".12" stroke="#f7f0e4" strokeOpacity=".5" strokeWidth="2" />
      <text x="200" y="323" textAnchor="middle" fill="#f7f0e4" fillOpacity=".74" fontSize="9" fontWeight="800" letterSpacing="1.5">PASSAGE</text>
      <text x="200" y="108" textAnchor="middle" fill="#f7f0e4" fillOpacity=".74" fontSize="10" fontWeight="800" letterSpacing="2">CABIN · BOW</text>
      <text x="200" y="515" textAnchor="middle" fill="#f7f0e4" fillOpacity=".6" fontSize="9" fontWeight="800" letterSpacing="2">ENTRY · STERN</text>
    </BoatShell>
  );
}

export function BoatDeckArtwork({ deck }: BoatDeckArtworkProps) {
  return deck === "upper" ? <UpperDeckArtwork /> : <LowerDeckArtwork />;
}
