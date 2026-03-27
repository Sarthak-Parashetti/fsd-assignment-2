import { useState } from "react";
import "./GoalForm.css";

function GoalForm({ onAdd, categories }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Strength");
  const [priority, setPriority] = useState("Medium");
  const [targetDate, setTargetDate] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text, category, priority, targetDate });
    setText("");
    setTargetDate("");
    setExpanded(false);
  };

  const categoryIcons = {
    Strength: "🏋️",
    Cardio: "🏃",
    Flexibility: "🧘",
    Nutrition: "🥗",
    Other: "⭐",
  };

  const priorityColors = {
    Low: "#10b981",
    Medium: "#f59e0b",
    High: "#ef4444",
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <div className="form-main-row">
        <input
          type="text"
          className="goal-input"
          placeholder="Add a new fitness goal..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <button type="submit" className="add-btn">
          <span>+ Add</span>
        </button>
      </div>

      {expanded && (
        <div className="form-extra">
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <div className="cat-options">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-pill ${category === cat ? "active" : ""}`}
                    onClick={() => setCategory(cat)}
                  >
                    {categoryIcons[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-row two-col">
            <div className="form-group">
              <label>Priority</label>
              <div className="priority-options">
                {["Low", "Medium", "High"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`priority-pill ${priority === p ? "active" : ""}`}
                    style={priority === p ? { background: priorityColors[p], color: "#000" } : {}}
                    onClick={() => setPriority(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Target Date (optional)</label>
              <input
                type="date"
                className="date-input"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default GoalForm;