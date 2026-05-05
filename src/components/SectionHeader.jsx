function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
      <div>
        <h2 className="section-title mb-1">{title}</h2>
        {subtitle ? <p className="section-subtitle mb-0">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default SectionHeader;
