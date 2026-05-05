function StatCard({ label, value, change, tone = "success" }) {
  return (
    <article className="glass-card stat-card">
      <p className="eyebrow mb-2">{label}</p>
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div>
          <h3 className="metric-value">{value}</h3>
          <small className={`metric-chip metric-chip-${tone}`}>{change}</small>
        </div>
        <div className="metric-icon">{label.slice(0, 1)}</div>
      </div>
    </article>
  );
}

export default StatCard;
