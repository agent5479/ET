import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../content/blogPosts.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './BlogPage.css';

export default function BlogPage() {
  usePageMeta({
    title: 'Field Notes',
    description: 'First-party notes from Environment Technology on AES design, consents and NZ site realities.',
  });

  return (
    <main className="et-page">
      <div className="et-wrap">
        <p className="et-kicker">Blog</p>
        <h1>Field Notes</h1>
        <p className="et-lede">
          Improvised first-party commentary for the rebuild — consent talk, constrained sites, retrofits and commercial
          loading. Not generic septic filler.
        </p>
        <div className="et-blog-list">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="et-blog-item">
              <time dateTime={post.date}>{post.date}</time>
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <ul className="et-tags">
                {post.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
