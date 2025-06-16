import React, { useState } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * AddHabitCard allows users to enter a new habit's name, pick a frequency, select a start date, and add the habit.
 * - Minimalist, soft accent card with rounded corners, shadow, and fixed width.
 * - All UI elements have matching spacing and are visually clean.
 */
function AddHabitCard({ onAddHabit }) {
  // Controlled state for input fields
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(() => {
    // Default to today
    return new Date().toISOString().split("T")[0];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return; // ignore empty
    // Wrap up new habit object
    const habit = {
      name: habitName.trim(),
      frequency,
      startDate,
    };
    if (onAddHabit) onAddHabit(habit);
    setHabitName(""); // reset name but keep others
  };

  return (
    <div className="add-habit-card">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <label htmlFor="habit-name" className="add-habit-label">
          Habit Name
          <input
            type="text"
            id="habit-name"
            className="add-habit-input"
            placeholder="Walk 10,000 steps"
            value={habitName}
            onChange={e => setHabitName(e.target.value)}
            autoComplete="off"
            required
          />
        </label>

        <label htmlFor="habit-frequency" className="add-habit-label">
          Frequency
          <select
            id="habit-frequency"
            className="add-habit-select"
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>

        <label htmlFor="habit-start-date" className="add-habit-label">
          Start Date
          <input
            type="date"
            id="habit-start-date"
            className="add-habit-input"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </label>

        <button
          className="add-habit-btn"
          type="submit"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
}

export default AddHabitCard;
