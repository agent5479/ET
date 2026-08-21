import { Link } from 'react-router-dom';
import { PRODUCTS } from '../config/site.js';

export default function ProductsPage() {
  return (
    <main className="et-section">
      <h1>Products</h1>
      <p className="et-lede">
        Dedicated product entities for the rebuild — each gets its own URL for AI/local entity matching.
      </p>
      <ul className="et-pillars">
        {PRODUCTS.map((p) => (
          <li key={p.slug}>
            <Link to={`/products/${p.slug}`}>
              <strong>{p.title}</strong>
            </Link>
            <span>{p.summary}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
