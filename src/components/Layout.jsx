import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { NAV, SITE } from '../config/site.js';
import { applyDocumentMeta, localBusinessJsonLd } from '../seo/meta.js';
import './Layout.css';

export default function Layout({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    applyDocumentMeta({ title, description });
    const data = localBusinessJsonLd();
    const id = 'et-jsonld';
    let script = document.getElementById(id);
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [title, description, pathname]);

  return (
    <div className="et-shell">
      {SITE.noindex ? (
        <div className="et-test-banner" role="status">
          Test rebuild — <strong>noindex</strong> (will not compete with www.et.nz). No robots.txt shipped.
        </div>
      ) : null}
      <header className="et-header">
        <Link className="et-brand" to="/">
          <span className="et-brand-mark">ET</span>
          <span className="et-brand-text">
            <span className="et-brand-name">{SITE.name}</span>
            <span className="et-brand-line">{SITE.productLine} wastewater systems</span>
          </span>
        </Link>
        <nav className="et-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} data-active={pathname === item.to || pathname.startsWith(item.to + '/')}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <Outlet />
      <footer className="et-footer">
        <p>
          © {new Date().getFullYear()} {SITE.name}. React rebuild from mirrored www.et.nz content.
        </p>
        <p>
          <Link to="/__mirror">Open HTML mirror</Link>
          {' · '}
          <a href="/__status">Scrape status</a>
        </p>
      </footer>
    </div>
  );
}
