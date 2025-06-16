import React, { useState, useEffect } from 'react';
import './App.css';
import TopNavBar from './TopNavBar';
import AddHabitCard from './AddHabitCard';
import HabitList from './HabitList';
import CalendarSection from './CalendarSection';
import ThemePicker from './ThemePicker';

// Theme definitions for 5 premium themes, using CSS variables
const THEME_VARS = {
  nature: {
    '--gradient1': '#a8e063',
    '--gradient2': '#56ab2f',
    '--gradient3': '#72c6ef',
    '--frost-bg': 'rgba(230,245,233,0.67)',
    '--frost-border': 'rgba(120,180,125,0.13)',
    '--sf-primary': '#67b26f',
    '--sf-accent': '#56ab2f',
    '--sf-secondary': '#bdebbf',
    '--pastel-bg': '#e6f5e9',
    '--pastel-bg-soft': '#f2fbea',
    '--pastel-accent': '#b1e5c0',
    '--pastel-secondary': '#cdf2d7',
    '--text-main': '#222e22',
  },
  tech: {
    '--gradient1': '#232526',
    '--gradient2': '#1c92d2',
    '--gradient3': '#f2fcfe',
    '--frost-bg': 'rgba(25,34,60,0.63)',
    '--frost-border': 'rgba(35,146,210,0.17)',
    '--sf-primary': '#1c92d2',
    '--sf-accent': '#12d8fa',
    '--sf-secondary': '#f2fcfe',
    '--pastel-bg': '#181e28',
    '--pastel-bg-soft': '#202733',
    '--pastel-accent': '#12d8fa',
    '--pastel-secondary': '#d3f1f9',
    '--text-main': '#edf3fb',
  },
  minimal: {
    '--gradient1': '#f8fafb',
    '--gradient2': '#e0e5ec',
    '--gradient3': '#e9ecef',
    '--frost-bg': 'rgba(255,255,255,0.60)',
    '--frost-border': 'rgba(136,136,138,0.11)',
    '--sf-primary': '#e5e7ea',
    '--sf-accent': '#bcbec0',
    '--sf-secondary': '#f8fafb',
    '--pastel-bg': '#f8fafb',
    '--pastel-bg-soft': '#f1f4f7',
    '--pastel-accent': '#d8dde2',
    '--pastel-secondary': '#e3e8ee',
    '--text-main': '#23232d',
  },
  pastel: {
    '--gradient1': '#f4c2c2',
    '--gradient2': '#a3d5ff',
    '--gradient3': '#a8d5ba',
    '--frost-bg': 'rgba(255,255,255,0.60)',
    '--frost-border': 'rgba(170,170,220,0.12)',
    '--sf-primary': '#a8d5ba',
    '--sf-accent': '#f4c2c2',
    '--sf-secondary': '#f7e9e4',
    '--pastel-bg': '#ffffff',
    '--pastel-bg-soft': '#f2f6f9',
    '--pastel-accent': '#a3d5ff',
    '--pastel-secondary': '#e4ecf7',
    '--text-main': '#22272E',
  },
  dark: {
    '--gradient1': '#232526',
    '--gradient2': '#393053',
    '--gradient3': '#17153a',
    '--frost-bg': 'rgba(35,20,50,0.72)',
    '--frost-border': 'rgba(183,135,255,0.12)',
    '--sf-primary': '#393053',
    '--sf-accent': '#b57bee',
    '--sf-secondary': '#27243a',
    '--pastel-bg': '#191926',
    '--pastel-bg-soft': '#232536',
    '--pastel-accent': '#b57bee',
    '--pastel-secondary': '#27243a',
    '--text-main': '#e9e6fb',
  },
};

// Anim gradient is always on, but colors swap with theme.
function App() {
  // Habits state management (as before)
  const [habits, setHabits] = useState([]);
  // Theme selection
  const [theme, setTheme] = useState('pastel');

  // Apply current theme variables to :root
  useEffect(() => {
    const vars = THEME_VARS[theme];
    if (!vars) return;
    for (const [k, v] of Object.entries(vars)) {
      document.documentElement.style.setProperty(k, v);
    }
  }, [theme]);

  // Unique ID generator (unchanged)
  const generateId = () => Date.now() + '-' + Math.floor(Math.random() * 10000);

  // Add habit
  const handleAddHabit = (habit) => {
    const newHabit = {
      ...habit,
      id: generateId(),
      streak: 0,
      doneToday: false,
      completionDates: [],
      streakDates: [],
      missedDates: [],
    };
    setHabits([newHabit, ...habits]);
  };

  // Toggle done for today
  const handleToggleDone = id => {
    setHabits(prevHabits =>
      prevHabits.map(h =>
        h.id === id
          ? {
              ...h,
              doneToday: !h.doneToday,
              streak: !h.doneToday ? h.streak + 1 : Math.max(h.streak - 1, 0),
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

  // Edit (stub)
  const handleEditHabit = id => {
    alert("Edit habit coming soon! (id: " + id + ")");
  };

  // Delete
  const handleDeleteHabit = id => {
    setHabits(prevHabits => prevHabits.filter(h => h.id !== id));
  };

  // Calendar region (same as previous)
  const selectedHabit = habits.length > 0 ? habits[0] : null;
  function getCalendarData() {
    if (!selectedHabit) return { completed: [], streak: [], missed: [] };
    const completedSet = new Set(selectedHabit.completionDates || []);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let streakArr = [];
    let missedArr = [];
    let inStreak = true;
    let completedArr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = new Date(year, month, i).toISOString().slice(0, 10);
      if (completedSet.has(dateStr)) {
        completedArr.push(dateStr);
        if (inStreak && i <= today.getDate()) {
          streakArr.push(dateStr);
        }
      } else {
        inStreak = false;
        if (i < today.getDate()) {
          missedArr.push(dateStr);
        }
      }
    }
    return { completed: completedArr, streak: streakArr, missed: missedArr };
  }
  const calendarData = getCalendarData();

  return (
    <div className="animated-gradient-bg">
      <div className="app">
        <TopNavBar>
          {/* If using nav slot, could put ThemePicker here */}
        </TopNavBar>
        <div className="theme-picker-wrapper">
          <ThemePicker activeTheme={theme} onThemeChange={setTheme} />
        </div>
        {/* Content area below navbar */}
        <main className="frosted-panel" style={{ paddingTop: 72, minHeight: "100vh" }}>
          {/* Frosted glass panel contains habit section */}
          <AddHabitCard onAddHabit={handleAddHabit} />
          <div className="habitlist-container frosted-panel">
            <HabitList
              habits={habits}
              onToggleDone={handleToggleDone}
              onEdit={handleEditHabit}
              onDelete={handleDeleteHabit}
            />
          </div>
          <div className="calendar-panel frosted-panel">
            <CalendarSection
              habitName={selectedHabit ? selectedHabit.name : ""}
              completedDates={calendarData.completed}
              streakDates={calendarData.streak}
              missedDates={calendarData.missed}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;