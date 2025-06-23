import React, { useState, useEffect } from "react";
import { FaSun, Famoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "dark" ? <FaSun size={18} /> : <Famoon size={18} />}
      </button>
    </>
  );
};

export default ThemeToggle;

/*

cini old yg lama sudah masuk ccontext tinggal diwakili oleh const {theme,toggleTheme } =useTheme() 
sbb:
  const [theme, setTheme] = useState(() => {
    //check local sotrangenya dulu /dan preferensinya
    //jika ada perubahan
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme:dark)").matches
        ? "dark"
        : "light")
    );
  });
  //jika ada perubahan  state theme simpan ke localstorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  //function toggleTheme
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");








*/
