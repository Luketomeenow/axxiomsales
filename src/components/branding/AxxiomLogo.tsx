import { useId } from "react";
import { cn } from "@/lib/utils";

interface AxxiomLogoProps {
  className?: string;
  /** Unique prefix for SVG gradient IDs when multiple logos render on one page */
  idPrefix?: string;
}

/** Axxiom Sales Hub mark — ascending “A” hub icon */
export function AxxiomLogo({ className, idPrefix }: AxxiomLogoProps) {
  const reactId = useId().replace(/:/g, "");
  const prefix = idPrefix ?? reactId;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Axxiom Sales Hub"
    >
      <defs>
        <linearGradient id={`${prefix}-brand`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="45%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#D4AF5C" />
        </linearGradient>
        <linearGradient id={`${prefix}-bg`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#141414" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <filter id={`${prefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2563EB" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="22"
        fill={`url(#${prefix}-bg)`}
        stroke={`url(#${prefix}-brand)`}
        strokeWidth="2"
      />

      <g
        filter={`url(#${prefix}-glow)`}
        stroke={`url(#${prefix}-brand)`}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M32 72 L50 30 L68 72" strokeWidth="5" />
        <path d="M40 54 H60" strokeWidth="4" />
        <path d="M62 68 L62 48 L74 38" strokeWidth="3.5" opacity="0.85" />
        <circle cx="74" cy="36" r="3" fill={`url(#${prefix}-brand)`} stroke="none" />
      </g>
    </svg>
  );
}

interface AxxiomBrandNameProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showTagline?: boolean;
}

export function AxxiomBrandName({ size = "md", className, showTagline = true }: AxxiomBrandNameProps) {
  const titleSize =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-lg";
  const tagSize = size === "lg" ? "text-sm" : "text-[10px]";

  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn("font-semibold tracking-wide leading-tight", titleSize)}
        style={{
          fontFamily: "Cinzel, serif",
          background: "linear-gradient(135deg, #38BDF8, #2563EB 50%, #D4AF5C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        AXXIOM
      </span>
      {showTagline && (
        <span
          className={cn(
            "tracking-[0.28em] uppercase text-[hsl(40,50%,55%)] font-medium",
            tagSize
          )}
        >
          Sales Hub
        </span>
      )}
    </div>
  );
}
