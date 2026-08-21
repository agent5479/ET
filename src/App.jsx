/**
 * Aesthetic strategy (parity phase): reuse scraped Storefront CSS/HTML as-is.
 * React only provides routing + a thin chrome — no redesign until parity is verified.
 * This minimises conversion workload while preserving 1:1 visual parity.
 */
import { Route, Routes, useParams, Link } from 'react-router-dom';
import MirrorFrame from './components/MirrorFrame.jsx';
import { SITEMAP_PATHS, mirrorSrcForPath, routePathFor } from './sitemap.js';

export default function App() {
  return (
    <Routes>
      <Route path="/__status" element={<StatusPage />} />
      {/* Home */}
      <Route path="/" element={<MirrorFrame path="/" />} />
      {/* Every mirrored WP permalink → same React route */}
      {SITEMAP_PATHS.filter((p) => p !== '/').map((p) => (
        <Route key={p} path={routePathFor(p)} element={<MirrorFrame path={p} />} />
      ))}
      {/* Trailing-slash variants handled by routePathFor without slash */}
      <Route path="*" element={<NotInMirror />} />
    </Routes>
  );
}

function StatusPage() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '1.5rem',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      <h1>ET 1:1 mirror routes</h1>
      <p>
        Aesthetic approach: <strong>keep scraped WP Storefront look</strong> (assets + CSS). React routes only mount
        the mirrored document — minimal code, maximum parity.
      </p>
      <p>
        Pages: {SITEMAP_PATHS.length}. Open any path below (same URLs as www.et.nz).
      </p>
      <ol>
        {SITEMAP_PATHS.map((p) => (
          <li key={p}>
            <Link to={p}>{p}</Link>
            {' · '}
            <a href={mirrorSrcForPath(p)}>raw /mirror</a>
          </li>
        ))}
      </ol>
    </main>
  );
}

function NotInMirror() {
  const params = useParams();
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem' }}>
      <h1>No mirrored page</h1>
      <p>
        No scrape file for this path yet. <Link to="/__status">See indexed routes</Link> or{' '}
        <Link to="/">home</Link>.
      </p>
      <pre>{JSON.stringify(params)}</pre>
    </main>
  );
}
