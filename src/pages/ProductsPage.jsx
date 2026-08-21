import { Link } from 'react-router-dom';
import { PRODUCTS, mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './ProductsPage.css';

export default function ProductsPage() {
  usePageMeta({
    title: 'Products',
    description: 'AES wastewater systems, components, Tuf-Tite, Salcor UV, greywater and system sand from Environment Technology.',
  });

  return (
    <main className="et-page">
      <div className="et-wrap">
        <p className="et-kicker">Products</p>
        <h1>Dedicated pages for every ET offering</h1>
        <p className="et-lede">
          One URL per product entity — clearer for people, and better for local/entity-style discovery later.
        </p>
        <div className="et-product-grid">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="et-product-card">
              <img src={mirrorAsset(p.image)} alt="" loading="lazy" />
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
              <span>View details →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
