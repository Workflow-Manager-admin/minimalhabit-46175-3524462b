import React from "react";
import "./App.css";

/**
 * CalendarSection shows a calendar month view with daily habit completion highlights.
 * - Shows current month, past/future days faded.
 * - Each day: checkmark if completed; green = streak, red = missed, neutral pastel otherwise.
 * - Soft rounded borders, minimalistic accent colors.
 * - Supports per-habit completion (currently: receives `completedDates`)
 */
function CalendarSection({ habitName, completedDates = [], streakDates = [], missedDates = [], onDayClick }) {
  // Get current month/year
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0); // last date in month

  // Build calendar grid: 6 rows (to allow for months starting late in week) x 7 days
  const firstDayIndex = firstOfMonth.getDay(); // 0 = Sun, 6 = Sat
  const numDaysInMonth = lastOfMonth.getDate();

  // Calculate the previous month's final days to fill first row
  const prevMonth = new Date(year, month, 0);
  const prevMonthLastDate = prevMonth.getDate();
  // Days from last month at calendar start (to fill grid)
  const daysFromPrevMonth = firstDayIndex;

  // Build list of day objects for calendar (includes prev/next month to show a full grid)
  let days = [];

  // Helper to get "YYYY-MM-DD" string for matching
  function fmt(dt) {
    if (typeof dt === "string") return dt; // Accept string
    return dt.toISOString().slice(0, 10);
  }

  // Fill previous month's ending days (disabled)
  for (let i = daysFromPrevMonth; i > 0; i--) {
    const dayNum = prevMonthLastDate - i + 1;
    const dateObj = new Date(year, month - 1, dayNum);
    days.push({
      date: dateObj,
      thisMonth: false,
    });
  }
  // Fill current month days
  for (let i = 1; i <= numDaysInMonth; i++) {
    const dateObj = new Date(year, month, i);
    days.push({
      date: dateObj,
      thisMonth: true,
    });
  }
  // Fill start of next month to get 42 days (6 rows x 7)
  while (days.length % 7 !== 0) {
    const dayNum = days.length - (daysFromPrevMonth + numDaysInMonth) + 1;
    const dateObj = new Date(year, month + 1, dayNum);
    days.push({
      date: dateObj,
      thisMonth: false,
    });
  }
  // Fill extra rows if < 42
  while (days.length < 42) {
    const dayNum = days.length - (daysFromPrevMonth + numDaysInMonth) + 1;
    const dateObj = new Date(year, month + 1, dayNum);
    days.push({
      date: dateObj,
      thisMonth: false,
    });
  }

  // Fast lookup
  const completedSet = new Set(completedDates.map(fmt));
  const streakSet = new Set(streakDates.map(fmt));
  const missedSet = new Set(missedDates.map(fmt));
  const nowStr = fmt(today);

  // Weekday labels
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="calendar-section" aria-label="Habit Calendar">
      <div className="calendar-title">
        {habitName ? `${habitName} – Progress` : 'Habit Calendar'}
      </div>
      <div className="calendar-month-meta">
        {today.toLocaleString("default", { month: "long" })} {year}
      </div>
      <div className="calendar-grid">
        {weekdays.map((w) => (
          <div key={w} className="calendar-weekday">
            {w}
          </div>
        ))}
        {days.map(({ date, thisMonth }, idx) => {
          const dstr = fmt(date);
          const isToday = dstr === nowStr;
          const isCompleted = completedSet.has(dstr);
          const isStreak = streakSet.has(dstr);
          const isMissed = missedSet.has(dstr);
          let cellClass = "calendar-cell";
          if (!thisMonth) cellClass += " calendar-cell--faded";
          if (isStreak) cellClass += " calendar-cell--streak";
          else if (isMissed) cellClass += " calendar-cell--missed";
          else if (isCompleted) cellClass += " calendar-cell--completed";
          if (isToday) cellClass += " calendar-cell--today";
          return (
            <div
              key={dstr + idx}
              className={cellClass}
              tabIndex={thisMonth ? 0 : -1}
              title={
                (isToday ? "Today. " : "") +
                (isCompleted ? "Habit completed." : "Incomplete.") +
                (isStreak ? " Part of a streak." : isMissed ? " Missed streak." : "")
              }
              aria-pressed={!!isCompleted}
              aria-current={isToday}
              onClick={thisMonth && onDayClick ? () => onDayClick(date) : undefined}
            >
              <span className="calendar-daynum">{date.getDate()}</span>
              <span className="calendar-status">
                {isCompleted && (
                  <span role="img" aria-label="checked" className="calendar-check">✔️</span>
                )}
                {/* Optionally streak line or color already present */}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarSection;
