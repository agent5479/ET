import { useEffect, useMemo } from 'react';
import { mirrorSrcForPath } from '../sitemap.js';
import './MirrorFrame.css';

/**
 * Full-viewport iframe of the scraped HTML document.
 * Preserves WP CSS/JS/layout 1:1 without re-implementing components.
 */
export default function MirrorFrame({ path }) {
  const src = useMemo(() => mirrorSrcForPath(path), [path]);

  useEffect(() => {
    document.title = `ET mirror · ${path === '/' ? 'home' : path}`;
    // Test site: do not compete with live et.nz
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
  }, [path]);

  return (
    <div className="mirror-shell">
      <div className="mirror-toolbar" role="navigation" aria-label="Mirror chrome">
        <a href="/__status">Routes</a>
        <span className="mirror-path">{path}</span>
        <a href={src} target="_blank" rel="noreferrer">
          Open raw HTML
        </a>
      </div>
      <iframe className="mirror-frame" title={`Mirror ${path}`} src={src} />
    </div>
  );
}
