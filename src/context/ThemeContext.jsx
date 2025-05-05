import React, { createContext, useContext, useEffect, useState } from "react";
import { predefinedThemes } from "../styles/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themes] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("themes"));
    return saved?.length ? saved : predefinedThemes;
  });

  const [selectedTheme, setSelectedTheme] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedTheme")) || themes[0];
  });

  useEffect(() => {
    applyTheme(selectedTheme);
  }, [selectedTheme]);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    for (let key in theme.colors) {
      root.style.setProperty(`--color-${key}`, theme.colors[key]);
    }
    localStorage.setItem("selectedTheme", JSON.stringify(theme));
  };

  const value = {
    themes,
    selectedTheme,
    setSelectedTheme,
    applyTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
