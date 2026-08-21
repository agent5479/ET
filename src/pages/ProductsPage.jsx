import { Card, CardGrid } from '../components/ui/Card.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
import { PRODUCTS, mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function ProductsPage() {
  usePageMeta({
    title: 'Products',
    description:
      'AES wastewater systems, components, Tuf-Tite, Salcor UV, greywater and system sand from Environment Technology.',
  });

  return (
    <main className="et-page">
      <PageHero
        kicker="Products"
        title="Browse the catalogue"
        lede="AES wastewater treatment first; components, sand, Tuf-Tite, UV and greywater as needed."
      />
      <Section reveal={false}>
        <CardGrid cols={3}>
          {PRODUCTS.map((p) => (
            <Card key={p.slug} to={`/products/${p.slug}`}>
              <img className="et-card__media" src={mirrorAsset(p.image)} alt="" loading="lazy" />
              <h2 className="et-card__title">{p.title}</h2>
              <p className="et-card__body">{p.summary}</p>
              <span className="et-card__cta">View details →</span>
            </Card>
          ))}
        </CardGrid>
      </Section>
    </main>
  );
}
