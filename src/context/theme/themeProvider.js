// import React, { useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
// import { ThemeContext } from "./themeContext";
// import { ThemeProvider } from "@mui/material";
// import { constants } from "../../config/constant";
// import { getTheme } from "./helper";

// const ThemeProviderWrapper = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(
//     Boolean(localStorage.getItem(constants.darkMode) === "true")
//   );

//   const toggleTheme = () => {
//     const temp = !darkMode;
//     setDarkMode(temp);
//     localStorage.setItem(constants.darkMode, temp);
//   };

//   const themeValue = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);

//   useEffect(() => {
//     const updatedTheme = getTheme(darkMode);
//     document.body.style.backgroundColor =
//       updatedTheme.palette.background.default;
//   }, [darkMode]);

//   return (
//     <ThemeContext.Provider value={themeValue}>
//       <ThemeProvider theme={getTheme(darkMode)}>{children}</ThemeProvider>
//     </ThemeContext.Provider>
//   );
// };

// ThemeProviderWrapper.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ThemeProviderWrapper;
