import "./GoalList.css";

const categoryIcons = {
  Strength: "🏋️",
  Cardio: "🏃",
  Flexibility: "🧘",
  Nutrition: "🥗",
  Other: "⭐",
};

const priorityConfig = {
  High: { color: "#ef4444", label: "HIGH" },
  Medium: { color: "#f59e0b", label: "MED" },
  Low: { color: "#10b981", label: "LOW" },
};

function GoalList({ goals, onDelete, onToggle }) {
  if (goals.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎯</div>
        <h3>No goals yet</h3>
        <p>Add your first fitness goal to get started!</p>
      </div>
    );
  }

  const getDaysLeft = (targetDate) => {
    if (!targetDate) return null;
    const diff = Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="goal-list">
      {goals.map((goal, index) => {
        const priority = priorityConfig[goal.priority] || priorityConfig.Medium;
        const daysLeft = getDaysLeft(goal.targetDate);
        const isOverdue = daysLeft !== null && daysLeft < 0;

        return (
          <div
            key={goal._id}
            className={`goal-card ${goal.completed ? "completed" : ""}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Left accent bar colored by priority */}
            <div className="card-accent" style={{ background: priority.color }} />

            {/* Checkbox */}
            <button
              className={`check-btn ${goal.completed ? "checked" : ""}`}
              onClick={() => onToggle(goal._id)}
              title={goal.completed ? "Mark incomplete" : "Mark complete"}
            >
              {goal.completed ? "✓" : ""}
            </button>

            {/* Content */}
            <div className="card-content">
              <div className="card-top">
                <span className="goal-text">{goal.text}</span>
                <div className="card-badges">
                  {goal.category && (
                    <span className="badge category-badge">
                      {categoryIcons[goal.category] || "⭐"} {goal.category}
                    </span>
                  )}
                  <span
                    className="badge priority-badge"
                    style={{ color: priority.color, borderColor: priority.color + "44", background: priority.color + "11" }}
                  >
                    {priority.label}
                  </span>
                </div>
              </div>

              {(goal.targetDate || goal.createdAt) && (
                <div className="card-meta">
                  {goal.targetDate && (
                    <span className={`meta-chip ${isOverdue ? "overdue" : daysLeft <= 3 ? "urgent" : ""}`}>
                      {isOverdue
                        ? `⚠️ Overdue by ${Math.abs(daysLeft)}d`
                        : daysLeft === 0
                        ? "📅 Due today"
                        : `📅 ${daysLeft}d left`}
                    </span>
                  )}
                  {goal.createdAt && (
                    <span className="meta-chip muted">
                      Added {new Date(goal.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Delete */}
            <button className="delete-btn" onClick={() => onDelete(goal._id)} title="Delete goal">
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;