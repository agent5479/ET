import { Link } from 'react-router-dom';
import { PRODUCTS } from '../config/site.js';
import { BLOG_POSTS } from '../content/blogPosts.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function StatusPage() {
  usePageMeta({ title: 'Status', description: 'ET React sales rebuild status' });

  return (
    <main className="et-page">
      <div className="et-wrap">
        <h1>Rebuild status</h1>
        <p className="et-lede">
          Public IA is the React sales site. Scraped WP HTML remains under{' '}
          <a href={`${import.meta.env.BASE_URL}mirror/index.html`}>/mirror</a> for reference.
        </p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            Products: {PRODUCTS.length} — <Link to="/products">/products</Link>
          </li>
          <li>
            Blog posts: {BLOG_POSTS.length} — <Link to="/blog">/blog</Link>
          </li>
          <li>
            <Link to="/aes">/aes</Link>
          </li>
          <li>
            <Link to="/contact">/contact</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
