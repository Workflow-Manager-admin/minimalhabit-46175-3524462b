import React from 'react';
import './App.css';
import TopNavBar from './TopNavBar';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <TopNavBar />
      {/* Content area below navbar */}
      <main style={{ paddingTop: 72 }}>
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