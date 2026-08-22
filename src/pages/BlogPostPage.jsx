import { Link, useParams } from 'react-router-dom';
import AesBedShapes from '../components/diagrams/AesBedShapes.jsx';
import { Card } from '../components/ui/Card.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
import { getPost } from '../content/blogPosts.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './BlogPage.css';

function PostDiagram({ type }) {
  if (type === 'bed-shapes') return <AesBedShapes />;
  return null;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);

  usePageMeta({
    title: post?.title || 'Field note',
    description: post?.excerpt,
  });

  if (!post) {
    return (
      <main className="et-page">
        <PageHero title="Post not found" />
        <Section reveal={false}>
          <p style={{ textAlign: 'center' }}>
            <Link className="et-text-link" to="/blog">
              Back to Field Notes
            </Link>
          </p>
        </Section>
      </main>
    );
  }

  const paragraphs = post.body.split('\n\n');

  return (
    <main className="et-page">
      <PageHero kicker="Field Notes" title={post.title} lede={post.date} />
      <Section reveal={false}>
        <Card padLg className="et-article-card">
          <ul className="et-tags">
            {post.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {paragraphs.slice(0, 1).map((para) => (
            <p key={para.slice(0, 32)} className="et-article-p">
              {para}
            </p>
          ))}
          {post.diagram ? (
            <div className="et-article-diagram">
              <PostDiagram type={post.diagram} />
            </div>
          ) : null}
          {paragraphs.slice(1).map((para) => (
            <p key={para.slice(0, 32)} className="et-article-p">
              {para}
            </p>
          ))}
        </Card>
      </Section>
    </main>
  );
}
