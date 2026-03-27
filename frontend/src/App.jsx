import { useState, useEffect } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import StatsPanel from "./components/StatsPanel";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("goals");

  const categories = ["All", "Strength", "Cardio", "Flexibility", "Nutrition", "Other"];

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/goals");
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goalData) => {
    try {
      const res = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });
      const newGoal = await res.json();
      setGoals((prev) => [newGoal, ...prev]);
    } catch (err) {
      console.error("Failed to add goal:", err);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/goals/${id}`, { method: "DELETE" });
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  const toggleComplete = async (id) => {
    const goal = goals.find((g) => g._id === id);
    try {
      const res = await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !goal.completed }),
      });
      const updated = await res.json();
      setGoals((prev) => prev.map((g) => (g._id === id ? updated : g)));
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  };

  const filteredGoals =
    activeFilter === "All"
      ? goals
      : goals.filter((g) => g.category === activeFilter);

  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="app">
      {/* Animated background */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <div className="logo-icon">💪</div>
            <div>
              <h1 className="title">FitTrack</h1>
              <p className="subtitle">Your personal fitness dashboard</p>
            </div>
          </div>
          <div className="header-right">
            <div className="overall-progress">
              <span className="progress-label">{progress}% Complete</span>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="progress-count">{completedCount}/{totalCount} goals</span>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "goals" ? "active" : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            🎯 My Goals
          </button>
          <button
            className={`tab-btn ${activeTab === "stats" ? "active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            📊 Stats
          </button>
        </div>

        {activeTab === "goals" && (
          <>
            {/* Add Goal Form */}
            <GoalForm onAdd={addGoal} categories={categories.slice(1)} />

            {/* Category Filter */}
            <div className="filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                  <span className="filter-count">
                    {cat === "All"
                      ? goals.length
                      : goals.filter((g) => g.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Goals List */}
            {loading ? (
              <div className="loader-wrap">
                <div className="loader" />
                <p>Loading your goals...</p>
              </div>
            ) : (
              <GoalList
                goals={filteredGoals}
                onDelete={deleteGoal}
                onToggle={toggleComplete}
              />
            )}
          </>
        )}

        {activeTab === "stats" && <StatsPanel goals={goals} />}
      </div>
    </div>
  );
}

export default App;