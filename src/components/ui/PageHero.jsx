export default function PageHero({ kicker, title, lede }) {
  return (
    <div className="et-page-hero et-wrap">
      {kicker ? <p className="et-kicker">{kicker}</p> : null}
      <h1>{title}</h1>
      {lede ? <p className="et-lede">{lede}</p> : null}
    </div>
  );
}
