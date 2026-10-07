import React from 'react';

interface BrandEmblemProps {
  className?: string;
  size?: number;
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({
  className = '',
  size = 200,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={`select-none drop-shadow-md ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mehari W&E Sevilla Skyline & Classic Car Emblem"
    >
      <defs>
        <radialGradient id="skyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="60%" stopColor="#F5E8CF" />
          <stop offset="100%" stopColor="#ECD7B5" />
        </radialGradient>

        <linearGradient id="giraldaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D9B27C" />
          <stop offset="100%" stopColor="#BF9258" />
        </linearGradient>

        <linearGradient id="mehariOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FA8238" />
          <stop offset="100%" stopColor="#D85C16" />
        </linearGradient>
      </defs>

      {/* Outer decorative ring */}
      <circle cx="120" cy="120" r="114" fill="#FAF6EE" stroke="#1E6F6B" strokeWidth="6" />

      {/* Inner circular canvas with warm cream sky */}
      <circle cx="120" cy="120" r="106" fill="url(#skyGrad)" />

      {/* Circular border inner hairline */}
      <circle cx="120" cy="120" r="106" stroke="#D9B27C" strokeWidth="2" strokeDasharray="4 2" />

      {/* --- SEVILLE SKYLINE (La Giralda, Catedral & Palms) --- */}
      {/* Palm trees on the left */}
      <g opacity="0.85">
        <path d="M 52 145 Q 56 120 62 105" stroke="#9A7742" strokeWidth="2.5" fill="none" />
        {/* Palm fronds */}
        <path d="M 62 105 Q 46 96 38 108" stroke="#7A5E33" strokeWidth="2" fill="none" />
        <path d="M 62 105 Q 54 90 46 88" stroke="#7A5E33" strokeWidth="2" fill="none" />
        <path d="M 62 105 Q 66 86 68 85" stroke="#7A5E33" strokeWidth="2" fill="none" />
        <path d="M 62 105 Q 74 92 80 96" stroke="#7A5E33" strokeWidth="2" fill="none" />
        <path d="M 62 105 Q 78 104 84 112" stroke="#7A5E33" strokeWidth="2" fill="none" />
      </g>

      {/* Palm trees on the right */}
      <g opacity="0.85">
        <path d="M 188 145 Q 185 125 180 110" stroke="#9A7742" strokeWidth="2.5" fill="none" />
        <path d="M 180 110 Q 194 100 202 110" stroke="#7A5E33" strokeWidth="2" fill="none" />
        <path d="M 180 110 Q 188 94 195 92" stroke="#7A5E33" strokeWidth="2" fill="none" />
        <path d="M 180 110 Q 176 90 174 88" stroke="#7A5E33" strokeWidth="2" fill="none" />
        <path d="M 180 110 Q 168 96 162 100" stroke="#7A5E33" strokeWidth="2" fill="none" />
      </g>

      {/* LA GIRALDA (Iconic Seville Minaret/Bell Tower) */}
      <g id="giralda" transform="translate(100, 28)">
        {/* Weathervane / Giraldillo on top */}
        <line x1="12" y1="2" x2="12" y2="10" stroke="#8A6735" strokeWidth="1.5" />
        <polygon points="12,2 16,5 12,6" fill="#8A6735" />
        {/* Dome and lantern */}
        <path d="M 9 10 Q 12 6 15 10 Z" fill="#BF9258" />
        <rect x="8" y="10" width="8" height="6" fill="#D9B27C" />
        {/* Belfry level with arches */}
        <rect x="6" y="16" width="12" height="18" fill="url(#giraldaGrad)" />
        <rect x="8" y="20" width="2.5" height="7" rx="1.2" fill="#FAF6EE" />
        <rect x="13.5" y="20" width="2.5" height="7" rx="1.2" fill="#FAF6EE" />
        {/* Balcony ledge */}
        <rect x="4" y="34" width="16" height="3" fill="#A87E47" />
        {/* Upper shaft */}
        <rect x="5" y="37" width="14" height="24" fill="url(#giraldaGrad)" />
        {/* Mudéjar sebka decorative brick pattern lines */}
        <line x1="8" y1="41" x2="8" y2="57" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="12" y1="41" x2="12" y2="57" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="16" y1="41" x2="16" y2="57" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="2 2" />
        {/* Lower base shaft */}
        <rect x="3" y="61" width="18" height="40" fill="url(#giraldaGrad)" />
        {/* Arch windows */}
        <rect x="9.5" y="66" width="5" height="12" rx="2.5" fill="#FAF6EE" />
      </g>

      {/* Cathedral Dome / San Salvador Tower on right */}
      <g id="cathedral-side" transform="translate(142, 54)">
        <polygon points="10,0 8,8 12,8" fill="#A87E47" />
        <rect x="6" y="8" width="8" height="10" fill="#D9B27C" />
        <rect x="8.5" y="11" width="3" height="5" rx="1.5" fill="#FAF6EE" />
        <rect x="3" y="18" width="14" height="20" fill="url(#giraldaGrad)" />
        <rect x="5.5" y="22" width="3" height="8" rx="1.5" fill="#FAF6EE" />
        <rect x="11.5" y="22" width="3" height="8" rx="1.5" fill="#FAF6EE" />
        <rect x="0" y="38" width="20" height="40" fill="url(#giraldaGrad)" />
      </g>

      {/* Horizon Ground / Cobblestone Line */}
      <path d="M 14 158 Q 120 162 226 158" stroke="#1E6F6B" strokeWidth="3" />

      {/* --- THE VINTAGE ORANGE CITROËN MÉHARI --- */}
      <g id="mehari-car" transform="translate(24, 78)">
        {/* Black canvas roof canopy matching real car */}
        <path
          d="M 52 38 L 138 38 L 140 44 L 52 43 Z"
          fill="#2C2825"
          stroke="#191614"
          strokeWidth="1.5"
        />
        {/* Windshield frame & black tubular pillars */}
        <line x1="138" y1="38" x2="148" y2="68" stroke="#2C2825" strokeWidth="3" strokeLinecap="round" />
        <line x1="102" y1="38" x2="100" y2="68" stroke="#2C2825" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="56" y1="38" x2="54" y2="68" stroke="#2C2825" strokeWidth="2.5" strokeLinecap="round" />

        {/* Clear windshield glass */}
        <polygon points="137,42 147,68 102,68 103,42" fill="rgba(240,248,255,0.6)" stroke="#B0C4DE" strokeWidth="0.8" />

        {/* Driver silhouette with glasses & white shirt */}
        <circle cx="118" cy="54" r="5" fill="#C89D78" />
        <rect x="119" y="52" width="4" height="2" fill="#FFF" />
        <path d="M 112 60 Q 118 58 124 60 L 126 68 L 110 68 Z" fill="#FFFFFF" />

        {/* Orange Méhari Body with authentic ribs */}
        <path
          d="M 38 90 
             L 50 92 
             A 18 18 0 0 1 82 92 
             L 128 92 
             A 18 18 0 0 1 160 92 
             L 172 90 
             L 174 74 
             L 152 70 
             L 142 66 
             L 94 66 
             L 42 66 
             L 36 74 
             Z"
          fill="url(#mehariOrangeGrad)"
          stroke="#B5460A"
          strokeWidth="2"
        />

        {/* Horizontal ribs */}
        <line x1="84" y1="72" x2="126" y2="72" stroke="#B5460A" strokeWidth="1.5" />
        <line x1="84" y1="76" x2="126" y2="76" stroke="#B5460A" strokeWidth="1.5" />
        <line x1="84" y1="80" x2="126" y2="80" stroke="#B5460A" strokeWidth="1.5" />
        <line x1="84" y1="84" x2="126" y2="84" stroke="#B5460A" strokeWidth="1.5" />

        <line x1="42" y1="72" x2="62" y2="72" stroke="#B5460A" strokeWidth="1.5" />
        <line x1="42" y1="76" x2="62" y2="76" stroke="#B5460A" strokeWidth="1.5" />
        <line x1="42" y1="80" x2="62" y2="80" stroke="#B5460A" strokeWidth="1.5" />

        <line x1="148" y1="72" x2="168" y2="72" stroke="#B5460A" strokeWidth="1.5" />
        <line x1="148" y1="76" x2="168" y2="76" stroke="#B5460A" strokeWidth="1.5" />
        <line x1="148" y1="80" x2="168" y2="80" stroke="#B5460A" strokeWidth="1.5" />

        {/* Front round headlamp */}
        <circle cx="170" cy="74" r="4.5" fill="#FFFBE6" stroke="#A6A29F" strokeWidth="1" />
        {/* Rear wicker basket hint */}
        <rect x="34" y="68" width="7" height="9" rx="1.5" fill="#B27A37" stroke="#7A4E1B" strokeWidth="1" />

        {/* Rear Wheel */}
        <circle cx="66" cy="94" r="14" fill="#1C1815" />
        <circle cx="66" cy="94" r="9" fill="#EAEAEA" stroke="#999" strokeWidth="1" />
        <circle cx="66" cy="94" r="3.5" fill="#333" />

        {/* Front Wheel */}
        <circle cx="144" cy="94" r="14" fill="#1C1815" />
        <circle cx="144" cy="94" r="9" fill="#EAEAEA" stroke="#999" strokeWidth="1" />
        <circle cx="144" cy="94" r="3.5" fill="#333" />
      </g>

      {/* --- CIRCULAR TEXT BANNER (MEHARI W&E · SEVILLA) --- */}
      <path
        id="textCircleTop"
        d="M 32 120 A 88 88 0 0 1 208 120"
        fill="none"
      />
      <path
        id="textCircleBottom"
        d="M 208 120 A 88 88 0 0 1 32 120"
        fill="none"
      />

      {/* Top Banner Text */}
      <text fill="#1E6F6B" fontSize="11" fontWeight="700" letterSpacing="3" fontFamily="DM Sans, sans-serif">
        <textPath href="#textCircleTop" startOffset="50%" textAnchor="middle">
          MEHARI W&amp;E &middot; SEVILLA
        </textPath>
      </text>

      {/* Bottom Subtitle Text */}
      <text fill="#E8702A" fontSize="9" fontWeight="600" letterSpacing="2.5" fontFamily="DM Sans, sans-serif">
        <textPath href="#textCircleBottom" startOffset="50%" textAnchor="middle">
          WEDDINGS &amp; EXPERIENCES
        </textPath>
      </text>
    </svg>
  );
};
