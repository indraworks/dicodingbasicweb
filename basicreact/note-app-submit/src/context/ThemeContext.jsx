import { useState, useContext, useEffect, createContext } from "react";
export const ThemeContext = createContext(); //create context bernama ThemeContext

//create wrapper providernya
export const ThemeProvider = ({ children }) => {
  //state theme,setTheme utk nilai diambol dari prubahan yg ada di storageItem
  const [theme, setTheme] = useState(() => {
    //ambil nilai awal localstorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
    //if nopt in the localStorage check on preference system
    return window.matchMedia("(prefers-colors-scheme:dark)").matches
      ? "dark"
      : "light";
  });

  //jika ada perubahan local storage maka setItem them dgn nilai "dark"/"light "
  //tergantign perubahan saatini
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  //function utk set theme
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    //smua state dan function dari context dilwatkan pada provder yg mana sbgai wrapper utk diterima
    //oleh consumer di masing2 component /children component yg diwraper
    //yg masuk state = theme dan func toggleTheme! ingat bukan setThemenya !! :)))
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}

/*

Old local :



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









*/
