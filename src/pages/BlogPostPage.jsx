import { Link, useParams } from 'react-router-dom';
import { getPost } from '../content/blogPosts.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './BlogPage.css';

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
        <div className="et-wrap">
          <h1>Post not found</h1>
          <Link to="/blog">Back to Field Notes</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="et-page">
      <article className="et-wrap et-blog-article">
        <p className="et-kicker">
          <Link to="/blog">Field Notes</Link>
        </p>
        <time dateTime={post.date}>{post.date}</time>
        <h1>{post.title}</h1>
        <ul className="et-tags">
          {post.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {post.body.split('\n\n').map((para) => (
          <p key={para.slice(0, 32)}>{para}</p>
        ))}
      </article>
    </main>
  );
}
