import React, { useState, useCallback } from 'react';
import './App.css';
import TopNavBar from './TopNavBar';
import AddHabitCard from './AddHabitCard';
import HabitList from './HabitList';
import CalendarSection from './CalendarSection';

// PUBLIC_INTERFACE
function App() {
  // The list of habits and in-app state management
  const [habits, setHabits] = useState([]);

  // Returns a unique id
  const generateId = () => Date.now() + '-' + Math.floor(Math.random() * 10000);

  // PUBLIC_INTERFACE
  // Add a new habit (from AddHabitCard)
  const handleAddHabit = (habit) => {
    const newHabit = {
      ...habit,
      id: generateId(),
      streak: 0, // initial streak 0
      doneToday: false,
      // For demo, track completion dates on one habit for simplicity
      completionDates: [],
      streakDates: [],
      missedDates: [],
    };
    setHabits([newHabit, ...habits]);
  };

  // PUBLIC_INTERFACE
  // Toggle done for today, increment streak if marking true; reset if unmark (for demo)
  const handleToggleDone = id => {
    setHabits(prevHabits =>
      prevHabits.map(h =>
        h.id === id
          ? {
              ...h,
              doneToday: !h.doneToday,
              streak: !h.doneToday ? h.streak + 1 : Math.max(h.streak - 1, 0),
              // For demo: toggle today's date in completionDates
              completionDates: h.completionDates
                ? (
                    h.completionDates.includes(new Date().toISOString().slice(0, 10))
                      ? h.completionDates.filter(d => d !== new Date().toISOString().slice(0, 10))
                      : [...h.completionDates, new Date().toISOString().slice(0, 10)]
                  )
                : [new Date().toISOString().slice(0, 10)],
            }
          : h
      )
    );
  };

  // PUBLIC_INTERFACE
  // (Stub) Edit habit
  const handleEditHabit = id => {
    // TODO: Implement edit modal
    alert("Edit habit coming soon! (id: " + id + ")");
  };

  // PUBLIC_INTERFACE
  // Delete a habit by id
  const handleDeleteHabit = id => {
    setHabits(prevHabits => prevHabits.filter(h => h.id !== id));
  };

  // --- CalendarSection integration/demo:
  // For now, show only for first habit if exists
  const selectedHabit = habits.length > 0 ? habits[0] : null;

  // For streak/missed: naive simulation for demo (user logic can expand later)
  // Streak: consecutive days up to today in completionDates
  // Missed: any date in month that's not in completionDates, up to yesterday

  // Utility to build completion, streak, missed arrays for current month
  function getCalendarData() {
    if (!selectedHabit) return { completed: [], streak: [], missed: [] };
    const completedSet = new Set(selectedHabit.completionDates || []);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Streak: count consecutive completed days up to today
    let streakArr = [];
    let missedArr = [];
    let inStreak = true;
    let completedArr = [];
    let lookback = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = new Date(year, month, i).toISOString().slice(0, 10);
      if (completedSet.has(dateStr)) {
        completedArr.push(dateStr);
        if (inStreak && i <= today.getDate()) {
          streakArr.push(dateStr);
        }
      } else {
        inStreak = false;
        // missed only if that day <= yesterday
        if (i < today.getDate()) {
          missedArr.push(dateStr);
        }
      }
    }
    return { completed: completedArr, streak: streakArr, missed: missedArr };
  }

  const calendarData = getCalendarData();

  return (
    <div className="app">
      <TopNavBar />
      {/* Content area below navbar */}
      <main style={{ paddingTop: 72, minHeight: "100vh", background: "var(--base-dark,#fff)" }}>
        {/* Center the add-habit card below navbar */}
        <AddHabitCard onAddHabit={handleAddHabit} />
        <div className="habitlist-container">
          <HabitList
            habits={habits}
            onToggleDone={handleToggleDone}
            onEdit={handleEditHabit}
            onDelete={handleDeleteHabit}
          />
        </div>
        <CalendarSection
          habitName={selectedHabit ? selectedHabit.name : ""}
          completedDates={calendarData.completed}
          streakDates={calendarData.streak}
          missedDates={calendarData.missed}
        />
      </main>
    </div>
  );
}

export default App;