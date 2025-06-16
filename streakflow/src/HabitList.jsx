import React from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * HabitList renders a grid of HabitCard items.
 * Displays list of habits and handles pass-through of events (toggle, edit, delete).
 */
function HabitList({ habits, onToggleDone, onEdit, onDelete }) {
  // For demo, set a fixed goal for each habit (e.g., 21-day streak)
  const STREAK_GOAL = 21;

  return (
    <div className="habit-list">
      {habits && habits.length > 0 ? (
        habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleDone={onToggleDone}
            onEdit={onEdit}
            onDelete={onDelete}
            streakGoal={STREAK_GOAL}
          />
        ))
      ) : (
        <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#684655", opacity: 0.67 }}>
          <span role="img" aria-label="notebook">📔</span> No habits yet.
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
// HabitCard displays habit details and renders a horizontal progress bar for the current streak.
function HabitCard({ habit, onToggleDone, onEdit, onDelete, streakGoal }) {
  const { name, frequency, streak, doneToday } = habit;
  const progress = Math.min(Math.max(streak, 0), streakGoal); // Clamp between 0-goal
  const percent = Math.round((progress / streakGoal) * 100);

  // Unique IDs for inputs
  const checkboxId = `habit-done-${habit.id}`;

  return (
    <div className="habit-card" tabIndex={0}>
      <div className="habit-card-main">
        <div>
          <div className="habit-card-title">{name}</div>
          <div className="habit-card-meta">
            <span className="habit-card-frequency">{frequency}</span>
            <span className="habit-card-streak">
              <span role="img" aria-label="flame">🔥</span> {streak} day{streak !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="habit-card-actions">
          <button title="Edit" className="habit-icon-btn" onClick={() => onEdit(habit.id)} tabIndex={-1}>
            <span role="img" aria-label="edit">✏️</span>
          </button>
          <button title="Delete" className="habit-icon-btn" onClick={() => onDelete(habit.id)} tabIndex={-1}>
            <span role="img" aria-label="delete">🗑️</span>
          </button>
        </div>
      </div>
      <label className="habit-done-checkbox" htmlFor={checkboxId}>
        <input
          type="checkbox"
          id={checkboxId}
          checked={!!doneToday}
          onChange={() => onToggleDone(habit.id)}
        />
        Mark done for today
      </label>

      {/* Progress Bar Section */}
      <div className="habit-progress-bar-wrap" aria-label={`Progress bar for ${name}`}>
        <div className="habit-progress-labels">
          <span className="habit-progress-current">
            {progress}/{streakGoal} days complete
          </span>
          <span className="habit-progress-percent" aria-label="Goal percentage">
            {percent}%
          </span>
        </div>
        <div className="habit-progress-bar-bg">
          <div
            className="habit-progress-bar-fg"
            style={{
              width: `${percent}%`,
              // animation: animate width via CSS transition
              // background: gradient, see App.css,
            }}
            data-testid="habit-progress-bar"
          />
        </div>
      </div>
    </div>
  );
}

export default HabitList;
