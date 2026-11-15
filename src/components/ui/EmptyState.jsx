export default function EmptyState({ title, children }) {
  return <div className="empty-state"><span className="empty-symbol" aria-hidden="true">↗</span><div><h3>{title}</h3><p>{children}</p></div></div>;
}
