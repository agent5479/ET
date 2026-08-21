import { Link } from 'react-router-dom';
import AesVersatilityInfographic from '../components/AesVersatilityInfographic.jsx';
import { PRODUCTS, SITE, mirrorAsset } from '../config/site.js';
import { BLOG_POSTS } from '../content/blogPosts.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './HomePage.css';

const heroImg = mirrorAsset('wp-content/uploads/environment_technology_slider1.jpg');

export default function HomePage() {
  usePageMeta({
    title: `${SITE.productLine} wastewater systems`,
    description: SITE.tagline,
  });

  return (
    <main>
      <section className="et-hero" aria-label="Environment Technology">
        <div className="et-hero-media" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="et-hero-shade" />
        <div className="et-hero-copy">
          <p className="et-hero-brand">Environment Technology</p>
          <h1>AES wastewater systems built for New Zealand sites.</h1>
          <p className="et-hero-support">
            Passive, reliable onsite treatment — quieter homes, flexible design, proven performance for residential
            through large-scale projects.
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

      <section className="et-band et-reveal">
        <div className="et-wrap">
          <p className="et-kicker">The problem</p>
          <h2>Tired of pumps, alarms and wasted land?</h2>
          <ul className="et-problem-list">
            <li>Secondary plants that need filters cleaned and alarms answered</li>
            <li>Noise and power draw from field pumps that should not be part of “set and forget”</li>
            <li>Tight sections where a flat, isolated disposal field simply will not fit</li>
            <li>Retrofits that swap one mechanical headache for another</li>
            <li>Commercial peaks that exposed undersized “house-sized” thinking</li>
          </ul>
        </div>
      </section>

      <section className="et-band et-band-alt et-reveal">
        <div className="et-wrap et-split">
          <div>
            <p className="et-kicker">The solution</p>
            <h2>AES — passive secondary treatment that scales with the site</h2>
            <p>
              Advanced Enviro-Septic treats wastewater in specialised pipe within a system-sand bed. No pumps in the
              bed. No aerator soundtrack. Designers shape beds for mounds, curves and constrained footprints;
              installers build from ET manuals; homeowners get a quieter maintenance story.
            </p>
            <p>
              Third-party OSET-NTP testing at Rotorua frames AES performance at about one tenth of the NZ secondary
              treatment standard for key contaminants — a concrete talking point for consents, not a slogan.
            </p>
            <Link className="et-text-link" to="/aes">
              See the AES system →
            </Link>
          </div>
          <figure className="et-photo">
            <img
              src={mirrorAsset('wp-content/uploads/aes_pipe_insand.jpg')}
              alt="AES pipe in system sand"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="et-band et-reveal" id="products">
        <div className="et-wrap">
          <p className="et-kicker">Product range</p>
          <h2>Everything Environment Technology supplies</h2>
          <p className="et-lede">
            Dedicated product pages — AES at the centre, with components, sand, Tuf-Tite, UV and greywater for complete
            site solutions.
          </p>
          <div className="et-product-grid">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="et-product-card">
                <img src={mirrorAsset(p.image)} alt="" loading="lazy" />
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span>View details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="et-band et-band-alt et-reveal">
        <div className="et-wrap">
          <p className="et-kicker">Versatility</p>
          <h2>One AES language across site types</h2>
          <p className="et-lede">
            Residential, commercial, community and large-scale — plus constrained layouts — without inventing a new
            mechanical plant for every consent.
          </p>
          <AesVersatilityInfographic />
          <p className="et-infographic-link">
            <Link className="et-text-link" to="/aes">
              Open full AES overview →
            </Link>
          </p>
        </div>
      </section>

      <section className="et-band et-reveal">
        <div className="et-wrap">
          <p className="et-kicker">Who it’s for</p>
          <h2>Paths for every audience</h2>
          <div className="et-audience-row">
            <Link to="/products/aes-system" className="et-audience">
              <strong>Homeowners</strong>
              <span>Quiet, low-fuss treatment for new builds and retrofits</span>
            </Link>
            <Link to="/aes" className="et-audience">
              <strong>Designers &amp; installers</strong>
              <span>Design aids, sand specs, training pathway</span>
            </Link>
            <Link to="/products" className="et-audience">
              <strong>Commercial &amp; community</strong>
              <span>Scale AES for peaks, not averages</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="et-band et-band-alt et-reveal">
        <div className="et-wrap">
          <p className="et-kicker">Field notes</p>
          <h2>From the ET desk</h2>
          <div className="et-blog-teasers">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="et-blog-teaser">
                <time dateTime={post.date}>{post.date}</time>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <Link className="et-text-link" to="/blog">
            All field notes →
          </Link>
        </div>
      </section>

      <section className="et-cta-strip et-reveal">
        <div className="et-wrap et-cta-inner">
          <div>
            <h2>Ready to specify AES?</h2>
            <p>
              Talk to Environment Technology in Nelson — freephone advice, price pathways, and designer referrals
              nationwide.
            </p>
          </div>
          <div className="et-cta-actions">
            <a className="et-btn et-btn-primary" href={`tel:${SITE.freephoneTel}`}>
              Call {SITE.freephone}
            </a>
            <Link className="et-btn et-btn-ghost-dark" to="/contact">
              Contact form
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
