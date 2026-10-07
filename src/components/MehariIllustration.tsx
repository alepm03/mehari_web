import React from 'react';
import { CarColor, RoofConfig } from '../types';

interface MehariIllustrationProps {
  color: CarColor;
  roofConfig?: RoofConfig;
  showFlowers?: boolean;
  view?: 'side' | 'isometric' | 'rear';
  className?: string;
}

export const MehariIllustration: React.FC<MehariIllustrationProps> = ({
  color,
  roofConfig = 'abierto',
  showFlowers = true,
  className = '',
}) => {
  const isOrange = color === 'naranja';

  // Body colors
  const primaryBody = isOrange ? '#E8702A' : '#C7A97B';
  const highlightBody = isOrange ? '#FA8B4B' : '#DFCAA3';
  const shadowBody = isOrange ? '#C65615' : '#9E8155';
  const accentRib = isOrange ? '#D05A17' : '#B89765';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 420"
        className="w-full h-auto drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Citroën Méhari ${isOrange ? 'Naranja' : 'Beige'} clásico`}
      >
        <defs>
          <linearGradient id={`bodyGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={highlightBody} />
            <stop offset="50%" stopColor={primaryBody} />
            <stop offset="100%" stopColor={shadowBody} />
          </linearGradient>

          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#D5D9DC" />
            <stop offset="100%" stopColor="#9AA0A6" />
          </linearGradient>

          <linearGradient id="wickerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D29A53" />
            <stop offset="50%" stopColor="#A86E2A" />
            <stop offset="100%" stopColor="#7E4E16" />
          </linearGradient>

          <pattern id={`ribsPattern-${color}`} width="20" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="2" x2="20" y2="2" stroke={accentRib} strokeWidth="2.5" />
            <line x1="0" y1="5" x2="20" y2="5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Soft ground shadow with warm albero tint */}
        <ellipse cx="400" cy="385" rx="350" ry="22" fill="#2A211B" fillOpacity="0.22" />
        <ellipse cx="400" cy="385" rx="270" ry="12" fill="#2A211B" fillOpacity="0.3" />

        {/* --- WHEELS (Classic steel rims with center chrome cap) --- */}
        {/* Rear Wheel (Left) */}
        <g>
          <circle cx="215" cy="340" r="48" fill="#1C1815" />
          <circle cx="215" cy="340" r="43" fill="#2B2621" />
          <circle cx="215" cy="340" r="32" fill="#D9DFE2" stroke="#B0B8BD" strokeWidth="2" />
          {/* Rim ventilation holes */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={`rr-${deg}`}
              cx={215 + 20 * Math.cos((deg * Math.PI) / 180)}
              cy={340 + 20 * Math.sin((deg * Math.PI) / 180)}
              r="3.5"
              fill="#1C1815"
            />
          ))}
          <circle cx="215" cy="340" r="14" fill="url(#chromeGrad)" stroke="#80868B" strokeWidth="1.5" />
        </g>

        {/* Front Wheel (Right) */}
        <g>
          <circle cx="615" cy="340" r="48" fill="#1C1815" />
          <circle cx="615" cy="340" r="43" fill="#2B2621" />
          <circle cx="615" cy="340" r="32" fill="#D9DFE2" stroke="#B0B8BD" strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={`fr-${deg}`}
              cx={615 + 20 * Math.cos((deg * Math.PI) / 180)}
              cy={340 + 20 * Math.sin((deg * Math.PI) / 180)}
              r="3.5"
              fill="#1C1815"
            />
          ))}
          <circle cx="615" cy="340" r="14" fill="url(#chromeGrad)" stroke="#80868B" strokeWidth="1.5" />
        </g>

        {/* --- MAIN CHASSIS / BODYWORK --- */}
        {/* Lower ABS corrugated hull */}
        <path
          d="M 125 320 
             L 155 330 
             A 65 65 0 0 1 275 330 
             L 555 330 
             A 65 65 0 0 1 675 330 
             L 715 320 
             L 720 270 
             L 660 260 
             L 600 240 
             L 420 240 
             L 140 240 
             L 120 275 
             Z"
          fill={`url(#bodyGrad-${color})`}
          stroke={shadowBody}
          strokeWidth="3"
        />

        {/* The horizontal ribbed texture of the Méhari side panel */}
        <path
          d="M 285 248 L 545 248 L 545 325 L 285 325 Z"
          fill={`url(#ribsPattern-${color})`}
          opacity="0.9"
        />

        {/* Rear corrugated tailgate section */}
        <path
          d="M 125 248 L 200 248 L 200 318 L 135 315 Z"
          fill={`url(#ribsPattern-${color})`}
          opacity="0.85"
        />

        {/* Front fender ribbing */}
        <path
          d="M 625 250 L 710 262 L 705 310 L 675 320 Z"
          fill={`url(#ribsPattern-${color})`}
          opacity="0.8"
        />

        {/* Door line / cut-out indentation (Iconic Méhari chain or cutaway door) */}
        <path
          d="M 330 240 L 330 315 L 480 315 L 480 240"
          stroke={shadowBody}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="345" cy="275" r="4.5" fill="#333" />
        <line x1="345" y1="275" x2="360" y2="275" stroke="#444" strokeWidth="2.5" strokeLinecap="round" />

        {/* Front Hood / Cowl */}
        <path
          d="M 590 240 L 720 255 L 730 280 L 715 285 L 590 250 Z"
          fill={highlightBody}
          stroke={shadowBody}
          strokeWidth="2"
        />

        {/* Front Grill & Citroën Chevrons */}
        <path d="M 718 265 L 728 267 L 726 295 L 716 293 Z" fill="#222" />
        <path d="M 721 273 L 725 277 L 721 281" stroke="#ECEFF1" strokeWidth="2" strokeLinecap="round" />
        <path d="M 724 273 L 728 277 L 724 281" stroke="#ECEFF1" strokeWidth="2" strokeLinecap="round" />

        {/* Headlight (Classic round with chrome ring) */}
        <g>
          <ellipse cx="712" cy="265" rx="14" ry="16" fill="url(#chromeGrad)" stroke="#78909C" strokeWidth="1.5" />
          <ellipse cx="711" cy="265" rx="10" ry="12" fill="#FFFBE6" stroke="#D7CCC8" strokeWidth="1" />
          {/* Headlamp reflector glow */}
          <ellipse cx="710" cy="263" rx="5" ry="6" fill="#FFF" opacity="0.8" />
          {/* Amber turn signal below */}
          <circle cx="718" cy="287" r="5" fill="#FFA000" stroke="#E65100" strokeWidth="1" />
        </g>

        {/* Bumpers & Tow eye (vintage black tubular steel) */}
        <rect x="712" y="305" width="22" height="12" rx="4" fill="#2A211B" stroke="#16120F" strokeWidth="2" />
        <rect x="106" y="300" width="22" height="12" rx="4" fill="#2A211B" stroke="#16120F" strokeWidth="2" />

        {/* --- CABIN INTERIOR & SEATS --- */}
        {/* Retro high-back black or tan vintage seats */}
        <path
          d="M 370 240 L 375 195 C 375 185 395 185 398 195 L 405 240 Z"
          fill="#3E342B"
          stroke="#2A211B"
          strokeWidth="2"
        />
        {/* Driver steering wheel & dashboard */}
        <line x1="440" y1="235" x2="465" y2="195" stroke="#1F1B18" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="468" cy="192" rx="14" ry="7" fill="none" stroke="#2A211B" strokeWidth="4" transform="rotate(-30 468 192)" />
        {/* Rear passenger seat back */}
        <path
          d="M 260 240 L 265 205 C 265 198 285 198 288 205 L 295 240 Z"
          fill="#4A3F35"
          stroke="#2A211B"
          strokeWidth="2"
        />

        {/* --- WINDSHIELD & SAFETY ROLL BAR FRAME --- */}
        {/* Fold-down Windshield Frame (Iconic straight upright glass) */}
        <path
          d="M 525 240 L 515 150 L 575 150 L 590 240 Z"
          fill="rgba(200, 230, 245, 0.35)"
          stroke="#8A9297"
          strokeWidth="4"
        />
        {/* Windshield wiper */}
        <line x1="535" y1="210" x2="550" y2="185" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        {/* Windshield glare highlight */}
        <line x1="530" y1="175" x2="565" y2="175" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.75" />

        {/* Main Central Roll Bar (Tubular frame) */}
        <path
          d="M 355 240 L 350 145 L 360 145 L 365 240"
          stroke="#5C666C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Rear Frame Support */}
        <path
          d="M 185 240 L 195 145 L 205 145 L 215 240"
          stroke="#5C666C"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <line x1="195" y1="145" x2="350" y2="145" stroke="#5C666C" strokeWidth="4.5" />
        <line x1="350" y1="145" x2="515" y2="150" stroke="#5C666C" strokeWidth="4.5" />

        {/* --- 3 ROOF CONFIGURATIONS --- */}
        {/* Dynamic canvas color matching reference photos: black canvas for orange Méhari, tan canvas for beige Méhari */}
        {(() => {
          const canvasColor = isOrange ? '#24201D' : '#D9C7AC';
          const canvasBorder = isOrange ? '#120F0D' : '#B8A487';
          const canvasHighlight = isOrange ? '#36312D' : '#E8DCBF';

          return (
            <>
              {/* State 1: Completely Open (Canvas rolled up behind rear bar) */}
              {roofConfig === 'abierto' && (
                <g>
                  {/* Rolled up canvas bundle with leather securing straps */}
                  <rect x="175" y="140" width="35" height="18" rx="6" fill={canvasColor} stroke={canvasBorder} strokeWidth="2" />
                  <line x1="183" y1="140" x2="183" y2="158" stroke="#D9B27C" strokeWidth="2" />
                  <line x1="198" y1="140" x2="198" y2="158" stroke="#D9B27C" strokeWidth="2" />
                </g>
              )}

              {/* State 2: Semi-Open (Canvas covering front, open rear) */}
              {roofConfig === 'semiabierto' && (
                <g>
                  {/* Front canvas canopy over front seats to windshield */}
                  <path
                    d="M 345 142 L 520 147 L 515 158 L 345 155 Z"
                    fill={canvasColor}
                    stroke={canvasBorder}
                    strokeWidth="2.5"
                  />
                  {/* Straps and fold at midpoint */}
                  <circle cx="348" cy="148" r="4" fill="#D9B27C" />
                  <line x1="348" y1="148" x2="358" y2="160" stroke="#D9B27C" strokeWidth="2" />
                  <line x1="430" y1="144" x2="430" y2="156" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                </g>
              )}

              {/* State 3: Completely Closed (Full vintage canvas top with side mica window) */}
              {roofConfig === 'cerrado' && (
                <g>
                  {/* Main canvas top */}
                  <path
                    d="M 175 142 L 520 147 L 515 156 L 175 154 Z"
                    fill={canvasColor}
                    stroke={canvasBorder}
                    strokeWidth="2.5"
                  />
                  {/* Canvas side curtain & rear window */}
                  <path
                    d="M 180 152 L 345 152 L 345 235 L 180 235 Z"
                    fill={canvasColor}
                    stroke={canvasBorder}
                    strokeWidth="1.5"
                  />
                  {/* Flexible clear plastic mica window */}
                  <rect
                    x="200"
                    y="165"
                    width="115"
                    height="55"
                    rx="8"
                    fill="rgba(210, 235, 245, 0.45)"
                    stroke="#9BA4A8"
                    strokeWidth="2"
                  />
                  {/* Window highlight */}
                  <line x1="210" y1="172" x2="295" y2="212" stroke="#FFF" strokeWidth="2" opacity="0.6" />
                </g>
              )}
            </>
          );
        })()}

        {/* --- REAR WICKER BASKETS WITH WEDDING FLORALS (Signature Detail) --- */}
        {showFlowers && (
          <g>
            {/* Left wicker basket mounted on rear tailgate */}
            <g transform="translate(130, 230)">
              {/* Wicker basket weave pattern */}
              <rect x="0" y="8" width="34" height="42" rx="4" fill="url(#wickerGrad)" stroke="#5B380F" strokeWidth="1.5" />
              <line x1="0" y1="18" x2="34" y2="18" stroke="#E6BF83" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="0" y1="28" x2="34" y2="28" stroke="#E6BF83" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="0" y1="38" x2="34" y2="38" stroke="#E6BF83" strokeWidth="1" strokeDasharray="3 2" />

              {/* Overflowing flowers, eucalyptus and olive branches */}
              {/* Olive greens */}
              <path d="M -5 12 Q 10 -10 25 8" stroke="#4A6B43" strokeWidth="3" fill="none" />
              <ellipse cx="6" cy="2" rx="6" ry="3" fill="#608358" transform="rotate(-30 6 2)" />
              <ellipse cx="20" cy="0" rx="6" ry="3" fill="#4E7046" transform="rotate(25 20 0)" />
              <ellipse cx="28" cy="8" rx="5" ry="2.5" fill="#6A8F61" transform="rotate(-15 28 8)" />

              {/* White wedding roses & peonies */}
              <circle cx="12" cy="5" r="7" fill="#FAF5E8" stroke="#E8DBC3" strokeWidth="1" />
              <circle cx="12" cy="5" r="4" fill="#F4E8D0" />
              <circle cx="23" cy="11" r="6" fill="#FFFFFF" stroke="#E8DBC3" strokeWidth="1" />
              <circle cx="2" cy="14" r="5" fill="#FDF7EA" stroke="#E8DBC3" strokeWidth="1" />

              {/* Delicate ribbon hanging down */}
              <path d="M 17 38 C 19 50 14 55 18 64" stroke="#F8F3EA" strokeWidth="2.5" fill="none" />
            </g>

            {/* Right wicker basket mounted beside */}
            <g transform="translate(95, 235)">
              <rect x="0" y="8" width="30" height="38" rx="4" fill="url(#wickerGrad)" stroke="#5B380F" strokeWidth="1.5" />
              <line x1="0" y1="18" x2="30" y2="18" stroke="#E6BF83" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="0" y1="28" x2="30" y2="28" stroke="#E6BF83" strokeWidth="1" strokeDasharray="3 2" />

              {/* Floral spray */}
              <path d="M 0 10 Q 15 -8 28 8" stroke="#4A6B43" strokeWidth="2.5" fill="none" />
              <ellipse cx="8" cy="2" rx="5" ry="2.5" fill="#608358" transform="rotate(-20 8 2)" />
              <ellipse cx="22" cy="2" rx="5" ry="2.5" fill="#4E7046" transform="rotate(30 22 2)" />
              <circle cx="14" cy="6" r="6" fill="#FFFFFF" stroke="#E8DBC3" strokeWidth="1" />
              <circle cx="14" cy="6" r="3.5" fill="#F7EEDB" />
              <circle cx="5" cy="12" r="4.5" fill="#FAF5E8" stroke="#E8DBC3" strokeWidth="1" />
            </g>
          </g>
        )}

        {/* Vintage side rearview mirror */}
        <circle cx="535" cy="225" r="6.5" fill="url(#chromeGrad)" stroke="#444" strokeWidth="1.5" />
        <line x1="535" y1="225" x2="528" y2="240" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};
