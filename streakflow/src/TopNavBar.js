import React from "react";

/**
 * PUBLIC_INTERFACE
 * TopNavBar displays the StreakFlow app name on the left and a profile icon on the right.
 * - Minimalist style: soft light background, subtle shadow, 20px font, and clean bottom border.
 */
function TopNavBar() {
  return (
    <nav className="sf-navbar">
      <div className="sf-navbar-content">
        <div className="sf-navbar-left" aria-label="App logo and name">
          <span style={{marginRight: 8, fontSize: "1.25em"}} role="img" aria-label="chart">📈</span>
          StreakFlow
        </div>
        <div className="sf-navbar-right" aria-label="Profile">
          {/* Profile Icon: Emoji or simple SVG */}
          <span 
            className="sf-profile-icon" 
            title="Profile" 
            role="img" 
            aria-label="profile"
          >
            👤
          </span>
        </div>
      </div>
    </nav>
  );
}

export default TopNavBar;
