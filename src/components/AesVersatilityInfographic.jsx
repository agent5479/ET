import { useState } from 'react';
import './AesVersatilityInfographic.css';

const NODES = [
  {
    id: 'residential',
    label: 'Residential',
    detail: 'Homes, lifestyle blocks, retrofits — quiet beds shaped to the section.',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    detail: 'Cafés, motels and workplaces sized for peak occupancy, not averages.',
  },
  {
    id: 'community',
    label: 'Community',
    detail: 'Shared schemes and clustered housing on a common AES language.',
  },
  {
    id: 'large',
    label: 'Large-scale',
    detail: 'Campgrounds and worker accommodation with multi-bed layouts.',
  },
  {
    id: 'constrained',
    label: 'Constrained sites',
    detail: 'Raised mounds, curved beds, under-driveway — design tools for tight land.',
  },
];

export default function AesVersatilityInfographic({ expanded = false }) {
  const [active, setActive] = useState(NODES[0].id);
  const current = NODES.find((n) => n.id === active) || NODES[0];

  return (
    <div className={`et-infographic${expanded ? ' is-expanded' : ''}`}>
      <div className="et-infographic-hub" aria-hidden="true">
        <span>AES</span>
        <small>one treatment language</small>
      </div>

      <ul className="et-infographic-nodes" role="list">
        {NODES.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              className={active === node.id ? 'is-active' : undefined}
              onClick={() => setActive(node.id)}
              aria-pressed={active === node.id}
            >
              {node.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="et-infographic-detail" role="status">
        <h3>{current.label}</h3>
        <p>{current.detail}</p>
      </div>

      {expanded ? (
        <p className="et-infographic-note">
          Specifiers still design for soil category, loading and setbacks — versatility is layout vocabulary, not a
          shortcut past consent engineering.
        </p>
      ) : null}
    </div>
  );
}
