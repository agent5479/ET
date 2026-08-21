export default function Section({ children, alt = false, className = '', id, reveal = true }) {
  const classes = [
    'et-section',
    alt ? 'et-section--alt' : '',
    reveal ? 'et-reveal' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} id={id}>
      <div className="et-wrap">{children}</div>
    </section>
  );
}
