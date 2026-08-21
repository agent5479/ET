import { Link } from 'react-router-dom';
import AesVersatilityInfographic from '../components/AesVersatilityInfographic.jsx';
import { Card, CardGrid } from '../components/ui/Card.jsx';
import Section from '../components/ui/Section.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { PRODUCTS, SITE, mirrorAsset } from '../config/site.js';
import { BLOG_POSTS } from '../content/blogPosts.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './HomePage.css';

const FACTS = [
  'Onsite wastewater treatment — septic tank in, treated effluent out',
  'Set-and-forget field: no bed pumps, no aerator noise, no filter alarms',
  'Tank pump-out on a normal multi-year cycle, like most septic systems',
  'Fits tight and contoured sites — mounds, curves, constrained footprints',
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
          <img
            className="et-hero-aes-mark"
            src={mirrorAsset(SITE.aesLogo)}
            alt="AES — Advanced Enviro-Septic"
            width={120}
            height={40}
            decoding="async"
          />
          <h1>Set-and-forget onsite wastewater for New Zealand.</h1>
          <p className="et-hero-support">
            AES is a passive wastewater system. Browse the products below — treatment, parts, sand, and related gear —
            then open a page when you need detail.
          </p>
          <div className="et-hero-ctas">
            <a className="et-btn et-btn-primary" href="#products">
              Browse products
            </a>
            <Link className="et-btn et-btn-ghost" to="/aes">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <Section id="products">
        <SectionHeader
          kicker="Products"
          title="What you can buy and specify"
          lede="Six items. Start with AES if you need wastewater treatment; use the others to complete the install."
        />
        <CardGrid cols={3}>
          {PRODUCTS.map((p) => (
            <Card key={p.slug} to={`/products/${p.slug}`}>
              <img className="et-card__media" src={mirrorAsset(p.image)} alt="" loading="lazy" />
              <h3 className="et-card__title">{p.title}</h3>
              <p className="et-card__body">{p.summary}</p>
              <span className="et-card__cta">Open →</span>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section alt>
        <SectionHeader
          kicker="In short"
          title="Wastewater treatment you do not babysit"
          lede="AES does secondary treatment in pipe and system sand. No pumps in the bed."
        />
        <CardGrid cols={2}>
          {FACTS.map((text) => (
            <Card key={text} className="et-problem-card">
              <p className="et-card__body">{text}</p>
            </Card>
          ))}
        </CardGrid>
        <div className="et-split et-why-problems">
          <Card padLg>
            <p className="et-card__body">
              OSET-NTP testing at Rotorua put AES at about one tenth of the NZ secondary standard for key contaminants.
              Useful for consents; not a substitute for site design.
            </p>
            <Link className="et-text-link" to="/aes">
              AES system overview →
            </Link>
          </Card>
          <Card className="et-photo-card">
            <img
              className="et-card__media et-photo-card__img"
              src={mirrorAsset('wp-content/uploads/aes_residential.jpg')}
              alt="Residential AES wastewater installation"
              loading="lazy"
            />
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader kicker="Who uses it" title="Pick your path" />
        <CardGrid cols={3}>
          <Card to="/products/aes-system">
            <h3 className="et-card__title">Homeowners</h3>
            <p className="et-card__body">New build or retrofit — quiet bed, normal tank pump-outs.</p>
            <span className="et-card__cta">AES product →</span>
          </Card>
          <Card to="/aes">
            <h3 className="et-card__title">Designers &amp; installers</h3>
            <p className="et-card__body">Manuals, sand spec, bed layouts, training pathway.</p>
            <span className="et-card__cta">System page →</span>
          </Card>
          <Card to="/products">
            <h3 className="et-card__title">Commercial &amp; community</h3>
            <p className="et-card__body">Same AES approach, sized for peaks and shared schemes.</p>
            <span className="et-card__cta">Full list →</span>
          </Card>
        </CardGrid>
      </Section>

      <Section alt>
        <SectionHeader
          kicker="Sites"
          title="Same system, many layouts"
          lede="Homes, commercial, community, large-scale, and tight contours."
        />
        <Card padLg center className="et-infographic-card">
          <AesVersatilityInfographic />
          <Link className="et-text-link" to="/aes">
            More on AES →
          </Link>
        </Card>
      </Section>

      <Section>
        <SectionHeader kicker="Notes" title="Short field notes" lede="Optional reading — not required to choose a product." />
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
            All notes →
          </Link>
        </p>
      </Section>

      <section className="et-cta-strip et-reveal">
        <div className="et-wrap">
          <h2>Need a price or a designer?</h2>
          <p>Call ET in Nelson, or send a short enquiry.</p>
          <div className="et-cta-actions">
            <a className="et-btn et-btn-primary" href={`tel:${SITE.freephoneTel}`}>
              {SITE.freephone}
            </a>
            <Link className="et-btn et-btn-ghost-dark" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
