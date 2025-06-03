import React from "react";
import { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext(); //create context bernama ThemeContext

//create wrapper providernya
export const ThemeProvider = ({ children }) => {
  //state theme,setTheme utk nilai diambol dari prubahan yg ada di storageItem
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ||
      window.matchMedia("(prefers-color-scheme-dark)").matches
      ? "dark"
      : "light";
  });
  //mengupadte perubaha state theme dari useEffect ,jika trjadi prubahan state
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  //function utk set theme
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    //smua state dan function dari context dilwatkan pada provder yg mana sbgai wrapper utk diterima
    //oleh consumer di masing2 component /children component yg diwraper
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
