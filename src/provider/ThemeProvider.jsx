import React, { createContext, useState } from 'react'
export const themeContext = createContext();
const ThemeProvider = ({children}) => {
 const [isDarkMode, setIsDarkMode] = useState(false);
 const theme = {isDarkMode, setIsDarkMode}
 return(
    <themeContext.Provider value={theme}>
        {children}
    </themeContext.Provider>
 )
}

export default ThemeProvider