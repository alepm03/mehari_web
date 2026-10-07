import React from 'react';

interface BrandMonogramProps {
  className?: string;
  size?: number;
}

export const BrandMonogram: React.FC<BrandMonogramProps> = ({
  className = '',
  size = 64,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mehari W&E Monogram"
    >
      {/* Left stem of M (Teal) */}
      <path
        d="M 22 24 
           C 28 24 30 28 32 36 
           L 32 72 
           C 30 76 26 78 20 78 
           L 20 80 
           L 38 80 
           L 38 78 
           C 32 78 30 76 30 70 
           L 30 38 
           C 30 32 26 28 20 28 
           Z"
        fill="#1E6F6B"
      />

      {/* Diagonal down-stroke (Orange) */}
      <path
        d="M 33 34 
           L 50 68 
           L 56 68 
           L 41 34 
           Z"
        fill="#E8702A"
      />

      {/* Diagonal up-stroke (Albero/Gold) */}
      <path
        d="M 50 68 
           L 66 34 
           L 72 34 
           L 55 68 
           Z"
        fill="#D9B27C"
      />

      {/* Right stem of M (Orange) */}
      <path
        d="M 78 24 
           C 72 24 70 28 68 36 
           L 68 70 
           C 68 76 70 78 78 78 
           L 78 80 
           L 60 80 
           L 60 78 
           C 66 78 68 76 68 70 
           L 68 38 
           C 68 32 72 28 80 28 
           Z"
        fill="#E8702A"
      />

      {/* Elegant cursive script across center: "W&E" */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontSize="14"
        fontWeight="600"
        fill="#2A211B"
      >
        W&amp;E
      </text>

      {/* Subtle baseline text */}
      <text
        x="50"
        y="94"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="2.5"
        fill="#2A211B"
      >
        MÉHARI
      </text>
    </svg>
  );
};
