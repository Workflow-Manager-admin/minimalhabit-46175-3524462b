import React, { useState, useRef } from "react";
import "./App.css";
import ProgressRing from "./ProgressRing";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PUBLIC_INTERFACE
 * HabitList renders a grid of HabitCard items.
 * Displays list of habits and handles pass-through of events (toggle, edit, delete).
 * Now animates card completion with bounce, and fade-out on deletion.
 */
function HabitList({ habits, onToggleDone, onEdit, onDelete }) {
  // For demo, set a fixed goal for each habit (e.g., 21-day streak)
  const STREAK_GOAL = 21;
  // Track which habit is bouncing for completion animation
  const [bouncingId, setBouncingId] = useState(null);

  // Handle done animation and logic.
  const handleToggleDone = (id) => {
    setBouncingId(id); // trigger bounce
    // Give time for bounce animation before updating model
    setTimeout(() => {
      onToggleDone(id);
      setBouncingId(null);
    }, 310); // matches the bounce duration below
  };

  // When deleting, let AnimatePresence handle fade-out (onDelete triggers removal from list)
  return (
    <div className="habit-list">
      <AnimatePresence initial={false}>
        {habits && habits.length > 0 ? (
          habits.map((habit) => (
            <motion.div
              key={habit.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{
                opacity: 1,
                scale: bouncingId === habit.id ? [1, 1.12, 0.99, 1.07, 1] : 1,
                y: 0,
                transition: bouncingId === habit.id
                  ? {
                      scale: {
                        duration: 0.31,
                        times: [0, 0.3, 0.5, 0.73, 1],
                        ease: "easeOut",
                      },
                    }
                  : { duration: 0.25, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 22,
                transition: { duration: 0.36, ease: "easeIn" }
              }}
              style={{
                willChange: "transform, opacity"
              }}
            >
              <HabitCard
                habit={habit}
                onToggleDone={handleToggleDone}
                onEdit={onEdit}
                onDelete={onDelete}
                streakGoal={STREAK_GOAL}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            style={{ gridColumn: "1/-1", textAlign: "center", color: "#684655", opacity: 0.67 }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            key="no-habits"
          >
            <span role="img" aria-label="notebook">📔</span> No habits yet.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// PUBLIC_INTERFACE
function HabitCard({ habit, onToggleDone, onEdit, onDelete, streakGoal }) {
  const { name, frequency, streak, doneToday } = habit;
  const progress = Math.min(Math.max(streak, 0), streakGoal); // Clamp between 0-goal
  const percent = Math.round((progress / streakGoal) * 100);

  // Unique IDs for inputs
  const checkboxId = `habit-done-${habit.id}`;

  // For the ring: today's habit progress. If not doneToday, pulse the ring.
  // Assume daily completion is binary for this demo.
  const ringPercent = doneToday ? 100 : percent;
  const showPulsingGlow = !doneToday;

  return (
    <div className="habit-card" tabIndex={0}>
      <div className="habit-card-main" style={{ alignItems: "center" }}>
        <div>
          <div className="habit-card-title">{name}</div>
          <div className="habit-card-meta">
            <span className="habit-card-frequency">{frequency}</span>
            <span className="habit-card-streak">
              <span role="img" aria-label="flame">🔥</span> {streak} day{streak !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        {/* Animated ProgressRing SVG */}
        <div style={{ minWidth: 54, marginLeft: "auto" }}>
          <ProgressRing
            value={ringPercent}
            size={44}
            showText={false}
            pulse={showPulsingGlow}
            ariaLabel={doneToday
              ? `Habit completed for today: ${name}`
              : `Habit incomplete for today: ${name}. Progress ${percent}%`}
          />
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
