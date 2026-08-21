import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../config/site.js';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main className="et-section">
        <h1>Product not found</h1>
        <Link to="/products">Back to products</Link>
      </main>
    );
  }

  return (
    <main className="et-section">
      <p className="et-brand-line" style={{ fontFamily: 'var(--font-ui)', color: 'var(--et-sea)' }}>
        Products
      </p>
      <h1>{product.title}</h1>
      <p className="et-lede">{product.summary}</p>
      <p>
        Full copy and assets will be ported from the scrape mirror. Related mirror paths live under{' '}
        <code>/mirror/</code>.
      </p>
      <p>
        <Link to="/products">All products</Link>
      </p>
    </main>
  );
}
