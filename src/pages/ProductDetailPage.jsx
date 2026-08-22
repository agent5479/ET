import { Link, useParams } from 'react-router-dom';
import AesPipeLayers from '../components/diagrams/AesPipeLayers.jsx';
import AesProcessFlow from '../components/diagrams/AesProcessFlow.jsx';
import { Card } from '../components/ui/Card.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
import { getProduct, mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './ProductsPage.css';

function ProductDiagram({ type }) {
  if (type === 'process-flow') return <AesProcessFlow compact />;
  if (type === 'pipe-layers') return <AesPipeLayers />;
  return null;
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProduct(slug);

  usePageMeta({
    title: product?.title || 'Product',
    description: product?.summary,
    image: product?.image,
  });

  if (!product) {
    return (
      <main className="et-page">
        <PageHero title="Product not found" lede="That product page is not in the rebuild catalogue." />
        <Section reveal={false}>
          <p style={{ textAlign: 'center' }}>
            <Link className="et-text-link" to="/products">
              Back to products
            </Link>
          </p>
        </Section>
      </main>
    );
  }

  return (
    <main className="et-page">
      <PageHero kicker="Products" title={product.title} lede={product.summary} />
      <Section reveal={false}>
        <Card padLg className="et-detail-card">
          <img className="et-card__media et-detail-media" src={mirrorAsset(product.image)} alt="" />
          <ul className="et-check-list">
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          {product.diagram ? (
            <div className="et-detail-diagram">
              <ProductDiagram type={product.diagram} />
            </div>
          ) : null}
          {product.body.split('\n\n').map((para) => (
            <p key={para.slice(0, 24)} className="et-card__body et-detail-copy">
              {para}
            </p>
          ))}
          <p className="et-detail-actions">
            <Link className="et-btn et-btn-primary" to={product.cta.to}>
              {product.cta.label}
            </Link>
          </p>
        </Card>
      </Section>
    </main>
  );
}
