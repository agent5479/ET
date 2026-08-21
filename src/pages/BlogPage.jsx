import { Card, CardGrid } from '../components/ui/Card.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
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
      <PageHero
        kicker="Blog"
        title="Field Notes"
        lede="Improvised first-party commentary for the rebuild — consent talk, constrained sites, retrofits and commercial loading. Not generic septic filler."
      />
      <Section reveal={false}>
        <CardGrid cols={2}>
          {BLOG_POSTS.map((post) => (
            <Card key={post.slug} to={`/blog/${post.slug}`}>
              <span className="et-card__meta">
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <h2 className="et-card__title">{post.title}</h2>
              <p className="et-card__body">{post.excerpt}</p>
              <ul className="et-tags">
                {post.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="et-card__cta">Read →</span>
            </Card>
          ))}
        </CardGrid>
      </Section>
    </main>
  );
}
