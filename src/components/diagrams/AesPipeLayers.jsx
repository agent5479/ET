import { useState } from 'react';
import './diagrams.css';

const LAYERS = [
  {
    id: 'core',
    label: 'Corrugated pipe',
    detail: 'Perforated ridged core carries effluent and skims solids at each opening.',
    r: 28,
    fill: '#2a2f33',
  },
  {
    id: 'bio',
    label: 'Bio-accelerator',
    detail: 'Inner fabric kick-starts biomat and spreads flow along the pipe length.',
    r: 40,
    fill: '#e8eef2',
  },
  {
    id: 'fiber',
    label: 'Fiber mat',
    detail: 'Green plastic fiber filters solids and creates a large bacterial treatment surface.',
    r: 54,
    fill: 'var(--et-forest)',
  },
  {
    id: 'geo',
    label: 'Geotextile',
    detail: 'Outer wrap protects the bacterial surface as effluent leaves the pipe.',
    r: 66,
    fill: '#3d4450',
  },
  {
    id: 'sand',
    label: 'System sand',
    detail: 'Correctly graded sand around the pipe finishes secondary treatment — no bed pumps.',
    r: 88,
    fill: null,
    className: 'et-pipe-layers__sand',
  },
];

/** Draw outer rings first so inner layers sit on top for clicking. */
const DRAW_ORDER = [...LAYERS].reverse();

export default function AesPipeLayers() {
  const [active, setActive] = useState('fiber');
  const current = LAYERS.find((l) => l.id === active) || LAYERS[2];

  return (
    <div className="et-diagram et-pipe-layers">
      <svg
        className="et-diagram__canvas"
        viewBox="0 0 280 220"
        role="img"
        aria-label="AES pipe cross-section showing treatment layers in system sand"
      >
        <rect x="0" y="0" width="280" height="220" fill="var(--et-mist)" rx="8" />

        {DRAW_ORDER.map((layer) => (
          <circle
            key={layer.id}
            className={`et-pipe-layers__ring${layer.className ? ` ${layer.className}` : ''}${
              active === layer.id ? ' is-active' : ''
            }`}
            cx="140"
            cy="110"
            r={layer.r}
            fill={layer.fill || undefined}
            stroke={active === layer.id ? 'var(--et-accent)' : 'transparent'}
            strokeWidth={active === layer.id ? 3 : 0}
            tabIndex={0}
            role="button"
            aria-pressed={active === layer.id}
            aria-label={layer.label}
            onClick={() => setActive(layer.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActive(layer.id);
              }
            }}
          />
        ))}

        {/* Hollow core hint */}
        <circle cx="140" cy="110" r="14" fill="color-mix(in srgb, var(--et-sea) 35%, var(--et-white))" />

        <text className="et-diagram__label" x="140" y="208" style={{ fontSize: 10, opacity: 0.75 }}>
          Tap a layer
        </text>
      </svg>

      <ul className="et-pipe-layers__chips" role="list">
        {LAYERS.map((layer) => (
          <li key={layer.id}>
            <button
              type="button"
              className={active === layer.id ? 'is-active' : undefined}
              onClick={() => setActive(layer.id)}
              aria-pressed={active === layer.id}
            >
              {layer.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="et-diagram__detail" role="status">
        <h3>{current.label}</h3>
        <p>{current.detail}</p>
      </div>

      <p className="et-diagram__note">
        Treatment happens in the pipe walls and surrounding sand — not via a mechanical plant in the field.
      </p>
    </div>
  );
}
