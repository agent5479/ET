import { Link } from 'react-router-dom';

export function CardGrid({ children, cols = 2, className = '' }) {
  const colClass = cols === 3 ? 'et-card-grid et-card-grid--3' : 'et-card-grid';
  return <div className={`${colClass} ${className}`.trim()}>{children}</div>;
}

export function Card({
  children,
  to,
  href,
  className = '',
  center = false,
  padLg = false,
  onClick,
}) {
  const classes = [
    'et-card',
    center ? 'et-card--center' : '',
    padLg ? 'et-card--pad-lg' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
