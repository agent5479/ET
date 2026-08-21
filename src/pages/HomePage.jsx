import { Link } from 'react-router-dom';
import './HomePage.css';

/**
 * Brand-first homepage composition:
 * ET mark + one headline + one support line + CTA group + full-bleed visual plane.
 */
export default function HomePage() {
  return (
    <main>
      <section className="et-hero" aria-label="Environment Technology">
        <div className="et-hero-copy">
          <p className="et-hero-brand">Environment Technology</p>
          <h1>AES wastewater systems built for New Zealand sites.</h1>
          <p className="et-hero-support">
            Passive treatment, design flexibility, and proven performance for homes, commercial sites, and large-scale
            projects.
          </p>
          <div className="et-hero-ctas">
            <Link className="et-btn et-btn-primary" to="/products">
              Explore products
            </Link>
            <Link className="et-btn et-btn-ghost" to="/aes">
              How AES works
            </Link>
          </div>
        </div>
      </section>

      <section className="et-section" aria-labelledby="versatility-heading">
        <h2 id="versatility-heading">Versatility of AES</h2>
        <p className="et-lede">
          One system language across residential beds, commercial loads, community schemes, and constrained sites —
          unique first-party story for the rebuild (infographic to expand).
        </p>
        <ul className="et-pillars">
          <li>
            <strong>Passive</strong>
            <span>Low energy, quiet operation</span>
          </li>
          <li>
            <strong>Flexible</strong>
            <span>Raised, curved, under driveway</span>
          </li>
          <li>
            <strong>Proven</strong>
            <span>OSET / field results narrative</span>
          </li>
          <li>
            <strong>Trade-ready</strong>
            <span>Design aids + training pathway</span>
          </li>
        </ul>
      </section>

      <section className="et-section et-section-split">
        <div>
          <h2>Audiences</h2>
          <p className="et-lede">Dedicated paths — not a single catch-all page.</p>
        </div>
        <div className="et-card-row">
          <Link to="/applications/homeowners" className="et-text-link">
            Homeowners
          </Link>
          <Link to="/trade" className="et-text-link">
            Designers &amp; installers
          </Link>
          <Link to="/applications/commercial" className="et-text-link">
            Commercial &amp; community
          </Link>
          <Link to="/blog" className="et-text-link">
            Field notes (blog)
          </Link>
        </div>
      </section>
    </main>
  );
}
