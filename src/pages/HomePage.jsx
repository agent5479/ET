import { Link } from 'react-router-dom';
import AesVersatilityInfographic from '../components/AesVersatilityInfographic.jsx';
import { Card, CardGrid } from '../components/ui/Card.jsx';
import Section from '../components/ui/Section.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { PRODUCTS, SITE, mirrorAsset } from '../config/site.js';
import { BLOG_POSTS } from '../content/blogPosts.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './HomePage.css';

const PROBLEMS = [
  'Secondary plants that need filters cleaned and alarms answered',
  'Noise and power draw from field pumps that should not be part of “set and forget”',
  'Tight sections where a flat, isolated disposal field simply will not fit',
  'Retrofits that swap one mechanical headache for another',
  'Commercial peaks that exposed undersized “house-sized” thinking',
];

export default function HomePage() {
  usePageMeta({
    title: `${SITE.productLine} wastewater systems`,
    description: SITE.tagline,
  });

  const heroImg = mirrorAsset(SITE.heroImage);

  return (
    <main>
      <section className="et-hero" aria-label="Environment Technology">
        <div
          className="et-hero-media"
          role="img"
          aria-label={SITE.heroImageAlt}
          style={{ backgroundImage: `url(${heroImg})` }}
        />
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

      <Section>
        <SectionHeader kicker="The problem" title="Tired of pumps, alarms and wasted land?" />
        <CardGrid cols={2}>
          {PROBLEMS.map((text) => (
            <Card key={text} className="et-problem-card">
              <p className="et-card__body">{text}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section alt>
        <SectionHeader
          kicker="The solution"
          title="AES — passive secondary treatment that scales with the site"
        />
        <div className="et-split">
          <Card padLg>
            <p className="et-card__body">
              Advanced Enviro-Septic treats wastewater in specialised pipe within a system-sand bed. No pumps in the
              bed. No aerator soundtrack. Designers shape beds for mounds, curves and constrained footprints;
              installers build from ET manuals; homeowners get a quieter maintenance story.
            </p>
            <p className="et-card__body">
              Third-party OSET-NTP testing at Rotorua frames AES performance at about one tenth of the NZ secondary
              treatment standard for key contaminants — a concrete talking point for consents, not a slogan.
            </p>
            <Link className="et-text-link" to="/aes">
              See the AES system →
            </Link>
          </Card>
          <Card className="et-photo-card">
            <img
              className="et-card__media et-photo-card__img"
              src={mirrorAsset('wp-content/uploads/aes_residential.jpg')}
              alt="Residential AES onsite wastewater installation"
              loading="lazy"
            />
          </Card>
        </div>
      </Section>

      <Section id="products">
        <SectionHeader
          kicker="Product range"
          title="Everything Environment Technology supplies"
          lede="Dedicated product pages — AES at the centre, with components, sand, Tuf-Tite, UV and greywater for complete site solutions."
        />
        <CardGrid cols={3}>
          {PRODUCTS.map((p) => (
            <Card key={p.slug} to={`/products/${p.slug}`}>
              <img className="et-card__media" src={mirrorAsset(p.image)} alt="" loading="lazy" />
              <h3 className="et-card__title">{p.title}</h3>
              <p className="et-card__body">{p.summary}</p>
              <span className="et-card__cta">View details →</span>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section alt>
        <SectionHeader
          kicker="Versatility"
          title="One AES language across site types"
          lede="Residential, commercial, community and large-scale — plus constrained layouts — without inventing a new mechanical plant for every consent."
        />
        <Card padLg center className="et-infographic-card">
          <AesVersatilityInfographic />
          <Link className="et-text-link" to="/aes">
            Open full AES overview →
          </Link>
        </Card>
      </Section>

      <Section>
        <SectionHeader kicker="Who it’s for" title="Paths for every audience" />
        <CardGrid cols={3}>
          <Card to="/products/aes-system">
            <h3 className="et-card__title">Homeowners</h3>
            <p className="et-card__body">Quiet, low-fuss treatment for new builds and retrofits</p>
            <span className="et-card__cta">Explore AES →</span>
          </Card>
          <Card to="/aes">
            <h3 className="et-card__title">Designers &amp; installers</h3>
            <p className="et-card__body">Design aids, sand specs, training pathway</p>
            <span className="et-card__cta">AES system →</span>
          </Card>
          <Card to="/products">
            <h3 className="et-card__title">Commercial &amp; community</h3>
            <p className="et-card__body">Scale AES for peaks, not averages</p>
            <span className="et-card__cta">All products →</span>
          </Card>
        </CardGrid>
      </Section>

      <Section alt>
        <SectionHeader kicker="Field notes" title="From the ET desk" />
        <CardGrid cols={3}>
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Card key={post.slug} to={`/blog/${post.slug}`}>
              <span className="et-card__meta">
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <h3 className="et-card__title">{post.title}</h3>
              <p className="et-card__body">{post.excerpt}</p>
              <span className="et-card__cta">Read →</span>
            </Card>
          ))}
        </CardGrid>
        <p className="et-section-footer-link">
          <Link className="et-text-link" to="/blog">
            All field notes →
          </Link>
        </p>
      </Section>

      <section className="et-cta-strip et-reveal">
        <div className="et-wrap">
          <h2>Ready to specify AES?</h2>
          <p>
            Talk to Environment Technology in Nelson — freephone advice, price pathways, and designer referrals
            nationwide.
          </p>
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
