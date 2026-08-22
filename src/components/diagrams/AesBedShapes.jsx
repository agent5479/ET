import { useState } from 'react';
import './diagrams.css';

const SHAPES = [
  {
    id: 'standard',
    label: 'Standard bed',
    detail: 'Level pipe rows in system sand — the baseline layout when the section allows a simple rectangle.',
  },
  {
    id: 'mound',
    label: 'Raised mound',
    detail: 'Bed lifted above grade when soil or water table needs separation — still the same AES language.',
  },
  {
    id: 'curved',
    label: 'Curved bed',
    detail: 'Pipe follows the contour so the treatment area fits a steep or irregular section.',
  },
  {
    id: 'driveway',
    label: 'Under-driveway',
    detail: 'Traffic-rated detailing so the bed can share space with hard surfaces when designed for it.',
  },
];

function ShapeSketch({ id }) {
  const sand = 'color-mix(in srgb, var(--et-sand) 50%, #c4a574)';
  const pipe = 'var(--et-ink)';
  const ground = 'color-mix(in srgb, var(--et-forest) 28%, var(--et-mist))';
  const sea = 'var(--et-sea)';

  if (id === 'standard') {
    return (
      <svg viewBox="0 0 140 90" aria-hidden="true">
        <rect x="8" y="58" width="124" height="22" rx="3" fill={ground} />
        <rect x="20" y="42" width="100" height="28" rx="4" fill={sand} />
        <circle cx="40" cy="56" r="5" fill={pipe} opacity="0.7" />
        <circle cx="70" cy="56" r="5" fill={pipe} opacity="0.7" />
        <circle cx="100" cy="56" r="5" fill={pipe} opacity="0.7" />
        <line x1="28" y1="32" x2="28" y2="48" stroke={sea} strokeWidth="2" />
      </svg>
    );
  }

  if (id === 'mound') {
    return (
      <svg viewBox="0 0 140 90" aria-hidden="true">
        <path d="M8 78 H132 L110 48 H30 Z" fill={ground} />
        <path d="M34 52 H106 L96 36 H44 Z" fill={sand} />
        <circle cx="55" cy="44" r="4.5" fill={pipe} opacity="0.7" />
        <circle cx="70" cy="42" r="4.5" fill={pipe} opacity="0.7" />
        <circle cx="85" cy="44" r="4.5" fill={pipe} opacity="0.7" />
        <line x1="48" y1="24" x2="48" y2="40" stroke={sea} strokeWidth="2" />
      </svg>
    );
  }

  if (id === 'curved') {
    return (
      <svg viewBox="0 0 140 90" aria-hidden="true">
        <path d="M6 70 Q40 40 70 55 T134 48 L134 82 H6 Z" fill={ground} />
        <path
          d="M22 62 Q50 38 78 52 T118 46"
          fill="none"
          stroke={sand}
          strokeWidth="16"
          strokeLinecap="round"
        />
        <circle cx="38" cy="54" r="4" fill={pipe} opacity="0.75" />
        <circle cx="68" cy="50" r="4" fill={pipe} opacity="0.75" />
        <circle cx="98" cy="48" r="4" fill={pipe} opacity="0.75" />
      </svg>
    );
  }

  // driveway
  return (
    <svg viewBox="0 0 140 90" aria-hidden="true">
      <rect x="8" y="28" width="124" height="14" rx="2" fill="color-mix(in srgb, var(--et-ink) 35%, var(--et-mist))" />
      <rect x="14" y="28" width="8" height="14" fill="var(--et-white)" opacity="0.35" />
      <rect x="38" y="28" width="8" height="14" fill="var(--et-white)" opacity="0.35" />
      <rect x="62" y="28" width="8" height="14" fill="var(--et-white)" opacity="0.35" />
      <rect x="86" y="28" width="8" height="14" fill="var(--et-white)" opacity="0.35" />
      <rect x="110" y="28" width="8" height="14" fill="var(--et-white)" opacity="0.35" />
      <rect x="8" y="52" width="124" height="28" rx="3" fill={ground} />
      <rect x="24" y="48" width="92" height="24" rx="3" fill={sand} />
      <circle cx="42" cy="60" r="4.5" fill={pipe} opacity="0.7" />
      <circle cx="70" cy="60" r="4.5" fill={pipe} opacity="0.7" />
      <circle cx="98" cy="60" r="4.5" fill={pipe} opacity="0.7" />
    </svg>
  );
}

export default function AesBedShapes() {
  const [active, setActive] = useState(SHAPES[0].id);
  const current = SHAPES.find((s) => s.id === active) || SHAPES[0];

  return (
    <div className="et-diagram et-bed-shapes-wrap">
      <div className="et-bed-shapes" role="list">
        {SHAPES.map((shape) => (
          <button
            key={shape.id}
            type="button"
            className={`et-bed-shape${active === shape.id ? ' is-active' : ''}`}
            onClick={() => setActive(shape.id)}
            aria-pressed={active === shape.id}
            role="listitem"
          >
            <ShapeSketch id={shape.id} />
            <p className="et-bed-shape__label">{shape.label}</p>
          </button>
        ))}
      </div>

      <div className="et-diagram__detail" role="status">
        <h3>{current.label}</h3>
        <p>{current.detail}</p>
      </div>
    </div>
  );
}
