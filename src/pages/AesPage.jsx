import { Link } from 'react-router-dom';
import AesVersatilityInfographic from '../components/AesVersatilityInfographic.jsx';
import { mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './AesPage.css';

export default function AesPage() {
  usePageMeta({
    title: 'The AES System',
    description:
      'How Advanced Enviro-Septic works — passive treatment, OSET-proven performance, and site versatility across New Zealand.',
  });

  return (
    <main className="et-page">
      <div className="et-wrap et-aes">
        <p className="et-kicker">AES System</p>
        <h1>Advanced Enviro-Septic</h1>
        <p className="et-lede">
          Passive secondary treatment in pipe and system sand — designed for NZ homes, commercial sites and large-scale
          projects without a noisy field plant.
        </p>
        <img
          className="et-aes-hero"
          src={mirrorAsset('wp-content/uploads/environment_technology_aes_model_vented.png')}
          alt="AES system model diagram"
        />

        <h2>How it works</h2>
        <ol className="et-steps">
          <li>
            <strong>Collect</strong> — Wastewater leaves the septic tank into AES pipe.
          </li>
          <li>
            <strong>Treat</strong> — Biofilm and sand do the secondary work inside the bed.
          </li>
          <li>
            <strong>Disperse</strong> — Cleaned effluent infiltrates — with optional UV where consents demand it.
          </li>
        </ol>

        <h2>Versatility of AES</h2>
        <p>
          One treatment language across residential, commercial, community and large-scale work — and layouts that
          respect tight contours.
        </p>
        <AesVersatilityInfographic expanded />

        <p className="et-aes-ctas">
          <Link className="et-btn et-btn-primary" to="/products/aes-system">
            AES product page
          </Link>
          <Link className="et-btn et-btn-ghost-dark" to="/contact">
            Talk to ET
          </Link>
        </p>
      </div>
    </main>
  );
}
