import "./StatsPanel.css";

const categoryIcons = {
  Strength: "🏋️",
  Cardio: "🏃",
  Flexibility: "🧘",
  Nutrition: "🥗",
  Other: "⭐",
};

function StatsPanel({ goals }) {
  const total = goals.length;
  const completed = goals.filter((g) => g.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Category breakdown
  const categories = ["Strength", "Cardio", "Flexibility", "Nutrition", "Other"];
  const categoryStats = categories.map((cat) => {
    const catGoals = goals.filter((g) => g.category === cat);
    const catDone = catGoals.filter((g) => g.completed).length;
    return { name: cat, total: catGoals.length, done: catDone };
  }).filter((c) => c.total > 0);

  // Priority breakdown
  const highCount = goals.filter((g) => g.priority === "High").length;
  const medCount = goals.filter((g) => g.priority === "Medium").length;
  const lowCount = goals.filter((g) => g.priority === "Low").length;

  // Overdue
  const overdue = goals.filter((g) => {
    if (!g.targetDate || g.completed) return false;
    return new Date(g.targetDate) < new Date();
  }).length;

  if (total === 0) {
    return (
      <div className="stats-empty">
        <div className="empty-icon">📊</div>
        <h3>No data yet</h3>
        <p>Add some goals to see your stats!</p>
      </div>
    );
  }

  return (
    <div className="stats-panel">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: "rgba(0,229,255,0.1)", color: "var(--accent)" }}>🎯</div>
          <div className="kpi-value">{total}</div>
          <div className="kpi-label">Total Goals</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: "rgba(16,185,129,0.1)", color: "var(--green)" }}>✅</div>
          <div className="kpi-value" style={{ color: "var(--green)" }}>{completed}</div>
          <div className="kpi-label">Completed</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: "rgba(245,158,11,0.1)", color: "var(--yellow)" }}>⏳</div>
          <div className="kpi-value" style={{ color: "var(--yellow)" }}>{pending}</div>
          <div className="kpi-label">Pending</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: "rgba(239,68,68,0.1)", color: "var(--red)" }}>⚠️</div>
          <div className="kpi-value" style={{ color: "var(--red)" }}>{overdue}</div>
          <div className="kpi-label">Overdue</div>
        </div>
      </div>

      {/* Completion rate ring */}
      <div className="stats-row">
        <div className="stat-card ring-card">
          <h3 className="stat-title">Completion Rate</h3>
          <div className="ring-wrap">
            <svg viewBox="0 0 120 120" className="ring-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface2)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${completionRate * 3.14} 314`}
                strokeDashoffset="78.5"
                style={{ transition: "stroke-dasharray 1s ease" }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent2)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ring-text">
              <span className="ring-value">{completionRate}%</span>
              <span className="ring-label">done</span>
            </div>
          </div>
        </div>

        {/* Priority breakdown */}
        <div className="stat-card">
          <h3 className="stat-title">By Priority</h3>
          <div className="priority-bars">
            {[
              { label: "High", count: highCount, color: "var(--red)" },
              { label: "Medium", count: medCount, color: "var(--yellow)" },
              { label: "Low", count: lowCount, color: "var(--green)" },
            ].map(({ label, count, color }) => (
              <div className="pbar-row" key={label}>
                <span className="pbar-label">{label}</span>
                <div className="pbar-track">
                  <div
                    className="pbar-fill"
                    style={{ width: total > 0 ? `${(count / total) * 100}%` : "0%", background: color }}
                  />
                </div>
                <span className="pbar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      {categoryStats.length > 0 && (
        <div className="stat-card">
          <h3 className="stat-title">By Category</h3>
          <div className="cat-grid">
            {categoryStats.map(({ name, total: t, done }) => {
              const pct = t > 0 ? Math.round((done / t) * 100) : 0;
              return (
                <div className="cat-stat" key={name}>
                  <div className="cat-stat-header">
                    <span>{categoryIcons[name]} {name}</span>
                    <span className="cat-stat-pct">{pct}%</span>
                  </div>
                  <div className="pbar-track">
                    <div
                      className="pbar-fill"
                      style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--accent2), var(--accent))" }}
                    />
                  </div>
                  <div className="cat-stat-sub">{done}/{t} goals</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;