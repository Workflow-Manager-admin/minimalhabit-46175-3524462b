import React, { useMemo } from "react";
import "./App.css";

// Motivational quotes - rotate daily using the day-of-year
const MOTIVATIONAL_QUOTES = [
  "The secret of getting ahead is getting started.",
  "Small steps make big changes.",
  "Your habits shape your future.",
  "Every accomplishment begins with the decision to try.",
  "Success is the sum of small efforts repeated daily.",
  "Creativity is intelligence having fun.",
  "Discipline is choosing between what you want now and what you want most.",
];

function getQuoteForToday() {
  // Rotate quote based on day of year (ensures daily "freshness")
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
}

// PUBLIC_INTERFACE
/**
 * FooterInsights displays an animated progress bar for today's completed tasks,
 * a stats summary, and an animated, rotating motivational quote.
 * Responsive, pastel/glass themed.
 *
 * Props:
 * - habits: Array of habit objects.
 */
function FooterInsights({ habits }) {
  // --- Stats calculations (basic, from available data) ---
  // Total tasks (habits)
  const totalTasks = habits.length;
  // Tasks completed today
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const completedToday = habits.filter(h =>
    h.completionDates && h.completionDates.includes(todayISO)
  ).length;
  // Overdue: Habits not done today and with startDate in the past or today
  const overdueTasks = habits.filter(h => {
    if (!h.startDate) return false;
    const dateStr = typeof h.startDate === "string"
      ? h.startDate
      : new Date(h.startDate).toISOString().slice(0, 10);
    return dateStr <= todayISO && !(h.completionDates && h.completionDates.includes(todayISO));
  }).length;
  // Total time spent: not implemented, so show placeholder
  const totalTimeSpent = totalTasks > 0 ? (5 * completedToday) : 0; // e.g., 5min per completion

  // --- Progress calculation ---
  const percentComplete =
    totalTasks === 0 ? 0 : Math.round((completedToday / totalTasks) * 100);

  // --- Animated quote ---
  const quote = getQuoteForToday();

  // --- Animations (slide/fade transitions for quote and progress) ---
  // Rely on CSS for transitions

  return (
    <footer className="footer-insights-glass" role="contentinfo">
      <div className="footer-progress-row">
        <span className="footer-progress-label">Today's Completion</span>
        <span className="footer-progress-percent">{percentComplete}%</span>
      </div>
      <div className="footer-progressbar-bg" aria-label="Today's completion progress">
        <div
          className="footer-progressbar-fg"
          style={{ width: `${percentComplete}%` }}
          aria-valuenow={percentComplete}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="footer-stats-row">
        <div>
          <span className="footer-stat-label">Total Habits</span><br />
          <span className="footer-stat-value">{totalTasks}</span>
        </div>
        <div>
          <span className="footer-stat-label">Completed Today</span><br />
          <span className="footer-stat-value">{completedToday}</span>
        </div>
        <div>
          <span className="footer-stat-label">Overdue</span><br />
          <span className="footer-stat-value">{overdueTasks}</span>
        </div>
        <div>
          <span className="footer-stat-label">Total Time</span><br />
          <span className="footer-stat-value">{totalTimeSpent} min</span>
        </div>
      </div>
      <div className="footer-quote-row" aria-live="polite">
        <span className="footer-quote-marks" aria-hidden="true">“</span>
        <span className="footer-quote-text">{quote}</span>
        <span className="footer-quote-marks" aria-hidden="true">”</span>
      </div>
    </footer>
  );
}

export default FooterInsights;
