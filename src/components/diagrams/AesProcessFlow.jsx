import { useState } from 'react';
import './diagrams.css';

const STAGES = [
  {
    id: 'collect',
    label: 'Collect',
    detail: 'Wastewater leaves the house into the septic tank for primary settling.',
  },
  {
    id: 'tank',
    label: 'Septic tank',
    detail: 'Solids settle. Clarified effluent flows on to the AES bed — on a normal multi-year pump-out cycle.',
  },
  {
    id: 'treat',
    label: 'AES bed',
    detail: 'Specialised pipe in system sand treats effluent in place. No pumps or aerators in the bed.',
  },
  {
    id: 'disperse',
    label: 'Disperse',
    detail: 'Treated water infiltrates the soil. Add UV only when the consent requires it.',
  },
];

export default function AesProcessFlow({ compact = false }) {
  const [active, setActive] = useState(STAGES[0].id);
  const current = STAGES.find((s) => s.id === active) || STAGES[0];

  const vb = compact ? '0 0 640 168' : '0 0 640 200';

  return (
    <div className={`et-diagram et-process-flow${compact ? ' et-diagram--compact' : ''}`}>
      <svg
        className="et-diagram__canvas"
        viewBox={vb}
        role="img"
        aria-label="AES process flow from house through septic tank and treatment bed to soil"
      >
        {/* Ground band */}
        <rect className="et-diagram__ground" x="0" y={compact ? 118 : 140} width="640" height={compact ? 50 : 60} rx="4" />

        {/* Flow path */}
        <path
          className={`et-diagram__flow${compact ? '' : ' et-diagram__flow-anim'}`}
          d="M78 108 H170 M230 108 H320 M380 108 H470 M530 108 H560"
        />

        {/* Stage 1 — House / collect */}
        <g
          className={`et-diagram__stage${active === 'collect' ? ' is-active' : ''}`}
          tabIndex={0}
          role="button"
          aria-pressed={active === 'collect'}
          aria-label="Collect"
          onClick={() => setActive('collect')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActive('collect');
            }
          }}
        >
          <rect className="et-diagram__hit" x="24" y="48" width="100" height="88" rx="10" />
          <path
            className="et-diagram__icon"
            d="M44 98 V78 L74 54 L104 78 V98 H88 V84 H60 V98 Z"
          />
          <text className="et-diagram__label" x="74" y="126">
            Collect
          </text>
        </g>

        {/* Stage 2 — Tank */}
        <g
          className={`et-diagram__stage${active === 'tank' ? ' is-active' : ''}`}
          tabIndex={0}
          role="button"
          aria-pressed={active === 'tank'}
          aria-label="Septic tank"
          onClick={() => setActive('tank')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActive('tank');
            }
          }}
        >
          <rect className="et-diagram__hit" x="174" y="48" width="100" height="88" rx="10" />
          <rect className="et-diagram__icon" x="196" y="72" width="56" height="36" rx="4" opacity="0.9" />
          <rect className="et-diagram__water" x="200" y="88" width="48" height="16" rx="2" />
          <rect fill="var(--et-ink)" x="218" y="64" width="12" height="10" rx="1" opacity="0.45" />
          <text className="et-diagram__label" x="224" y="126">
            Septic tank
          </text>
        </g>

        {/* Stage 3 — AES bed */}
        <g
          className={`et-diagram__stage${active === 'treat' ? ' is-active' : ''}`}
          tabIndex={0}
          role="button"
          aria-pressed={active === 'treat'}
          aria-label="AES bed"
          onClick={() => setActive('treat')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActive('treat');
            }
          }}
        >
          <rect className="et-diagram__hit" x="324" y="48" width="100" height="88" rx="10" />
          <rect className="et-diagram__soil" x="342" y="78" width="64" height="28" rx="3" opacity="0.85" />
          <circle cx="354" cy="92" r="6" fill="var(--et-ink)" opacity="0.55" />
          <circle cx="374" cy="92" r="6" fill="var(--et-ink)" opacity="0.55" />
          <circle cx="394" cy="92" r="6" fill="var(--et-ink)" opacity="0.55" />
          <line x1="370" y1="62" x2="370" y2="78" stroke="var(--et-sea)" strokeWidth="2" />
          <text className="et-diagram__label" x="374" y="126">
            AES bed
          </text>
        </g>

        {/* Stage 4 — Disperse */}
        <g
          className={`et-diagram__stage${active === 'disperse' ? ' is-active' : ''}`}
          tabIndex={0}
          role="button"
          aria-pressed={active === 'disperse'}
          aria-label="Disperse"
          onClick={() => setActive('disperse')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActive('disperse');
            }
          }}
        >
          <rect className="et-diagram__hit" x="474" y="48" width="100" height="88" rx="10" />
          <g className="et-diagram__icon" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M510 70 V96 M524 74 V100 M538 70 V96" />
            <path d="M504 100 L510 110 L516 100 M518 104 L524 114 L530 104 M532 100 L538 110 L544 100" strokeWidth="2" />
          </g>
          <text className="et-diagram__label" x="524" y="126">
            Disperse
          </text>
        </g>

        {!compact ? (
          <text
            className="et-diagram__label"
            x="320"
            y="188"
            style={{ fontWeight: 400, fontSize: 10, opacity: 0.7 }}
          >
            Optional UV after the bed when consent requires disinfection
          </text>
        ) : null}
      </svg>

      <div className="et-diagram__detail" role="status">
        <h3>{current.label}</h3>
        <p>{current.detail}</p>
      </div>
    </div>
  );
}
