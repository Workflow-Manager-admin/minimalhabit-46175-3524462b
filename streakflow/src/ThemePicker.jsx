import React from "react";
import "./App.css";

// PUBLIC_INTERFACE
/**
 * ThemePicker allows user to switch among 5 premium themes.
 * Uses radio buttons for accessibility, appears as pill buttons.
 * Calls onThemeChange(themeName) with selected theme.
 */
function ThemePicker({ activeTheme, onThemeChange }) {
  const themes = [
    { name: "nature", display: "Nature" },
    { name: "tech", display: "Tech" },
    { name: "minimal", display: "Minimal" },
    { name: "pastel", display: "Pastel" },
    { name: "dark", display: "Dark" }
  ];

  return (
    <div className="theme-picker">
      <span className="theme-picker-label">Theme:&nbsp;</span>
      {themes.map(({ name, display }) => (
        <label
          key={name}
          className={
            "theme-picker-option" +
            (activeTheme === name ? " theme-picker-option--active" : "")
          }
          tabIndex={0}
        >
          <input
            type="radio"
            name="theme"
            value={name}
            checked={activeTheme === name}
            onChange={() => onThemeChange(name)}
            aria-checked={activeTheme === name}
          />
          {display}
        </label>
      ))}
    </div>
  );
}

export default ThemePicker;
