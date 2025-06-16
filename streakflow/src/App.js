import React from 'react';
import './App.css';
import TopNavBar from './TopNavBar';
import AddHabitCard from './AddHabitCard';

// PUBLIC_INTERFACE
function App() {
  // No-op stub for future habit addition
  const handleAddHabit = (habit) => {
    // Placeholder: Could show toast or update state
    // console.log("Habit to add:", habit);
  };

  return (
    <div className="app">
      <TopNavBar />
      {/* Content area below navbar */}
      <main style={{ paddingTop: 72, minHeight: "100vh", background: "var(--base-dark,#fff)" }}>
        {/* Center the add-habit card below navbar */}
        <AddHabitCard onAddHabit={handleAddHabit} />
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            <h1 className="title">streakflow</h1>
            <div className="description">
              Start building your application.
            </div>
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;