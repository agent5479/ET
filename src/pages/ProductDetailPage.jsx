import { Link, useParams } from 'react-router-dom';
import { getProduct, mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './ProductsPage.css';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProduct(slug);

  usePageMeta({
    title: product?.title || 'Product',
    description: product?.summary,
  });

  if (!product) {
    return (
      <main className="et-page">
        <div className="et-wrap">
          <h1>Product not found</h1>
          <Link to="/products">Back to products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="et-page">
      <div className="et-wrap et-product-detail">
        <p className="et-kicker">
          <Link to="/products">Products</Link>
        </p>
        <h1>{product.title}</h1>
        <p className="et-lede">{product.summary}</p>
        <img className="et-product-hero" src={mirrorAsset(product.image)} alt="" />
        <ul className="et-check-list">
          {product.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        {product.body.split('\n\n').map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
        <p>
          <Link className="et-btn et-btn-primary" to={product.cta.to}>
            {product.cta.label}
          </Link>
        </p>
      </div>
    </main>
  );
}
