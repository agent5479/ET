export default function SectionHeader({ kicker, title, lede, as: Tag = 'h2' }) {
  return (
    <header className="et-section-header">
      {kicker ? <p className="et-kicker">{kicker}</p> : null}
      <Tag>{title}</Tag>
      {lede ? <p className="et-lede">{lede}</p> : null}
    </header>
  );
}
