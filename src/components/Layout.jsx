import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { NAV, SITE, publicAsset } from '../config/site.js';
import { applyDocumentMeta, localBusinessJsonLd } from '../seo/meta.js';
import './Layout.css';

export default function Layout() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    applyDocumentMeta({});
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
  }, [pathname]);

  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="et-shell">
      {SITE.noindex ? (
        <div className="et-test-banner" role="status">
          Test rebuild — <strong>noindex</strong> (not competing with www.et.nz)
        </div>
      ) : null}

      <header className={`et-header${scrolled ? ' is-scrolled' : ''}`}>
        <Link className="et-brand" to="/" onClick={() => setMenuOpen(false)}>
          <img
            className="et-brand-mark"
            src={publicAsset(SITE.brandIcon)}
            alt=""
            width={40}
            height={40}
            decoding="async"
          />
          <span className="et-brand-text">
            <span className="et-brand-name">{SITE.name}</span>
            <span className="et-brand-line">{SITE.productLine} wastewater systems</span>
          </span>
        </Link>

        <button
          type="button"
          className="et-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="et-primary-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav id="et-primary-nav" className={`et-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} data-active={isActive(item.to)} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a className="et-nav-phone" href={`tel:${SITE.freephoneTel}`}>
            {SITE.freephone}
          </a>
        </nav>
      </header>

      <Outlet />

      <footer className="et-footer">
        <div className="et-footer-grid">
          <div>
            <strong className="et-footer-brand">
              <img src={publicAsset(SITE.brandIcon)} alt="" width={28} height={28} decoding="async" />
              {SITE.name}
            </strong>
            <p>
              {SITE.address.line1}
              <br />
              {SITE.address.locality} {SITE.address.postalCode}
            </p>
          </div>
          <div>
            <p>
              <a href={`tel:${SITE.freephoneTel}`}>{SITE.freephoneLabel}</a>
              <br />
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              <br />
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
            </p>
          </div>
          <div>
            <p>
              <Link to="/products">Products</Link>
              <br />
              <Link to="/blog">Field Notes</Link>
              <br />
              <Link to="/contact">Contact</Link>
            </p>
          </div>
        </div>
        <p className="et-footer-meta">
          © {new Date().getFullYear()} {SITE.name}. Sales rebuild inspired by modern NZ industrial UX — scrape retained
          under <a href={`${import.meta.env.BASE_URL}mirror/index.html`}>/mirror</a>.
        </p>
      </footer>
    </div>
  );
}
