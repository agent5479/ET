export default function SimplePage({ title, description, body }) {
  return (
    <main className="et-section">
      <h1>{title}</h1>
      {description ? <p className="et-lede">{description}</p> : null}
      <p>{body}</p>
    </main>
  );
}
