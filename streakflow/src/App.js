import React, { useState, useCallback } from 'react';
import './App.css';
import TopNavBar from './TopNavBar';
import AddHabitCard from './AddHabitCard';
import HabitList from './HabitList';

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
    };
    setHabits([newHabit, ...habits]);
  };

  // PUBLIC_INTERFACE
  // Toggle done for today, increment streak if marking true; reset if unmark (for demo)
  const handleToggleDone = id => {
    setHabits(prevHabits =>
      prevHabits.map(h =>
        h.id === id
          ? { ...h, doneToday: !h.doneToday, streak: !h.doneToday ? h.streak + 1 : Math.max(h.streak - 1, 0) }
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
      </main>
    </div>
  );
}

export default App;