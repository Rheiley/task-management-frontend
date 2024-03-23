import React, { useState, useEffect } from 'react';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import '../styles.css';

export default function ToggleThemeBtn() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check local storage for theme preference, default to light mode if not found
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark';
    });

    useEffect(() => {
        // Update local storage when theme changes
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        // Apply the theme immediately when the component mounts
        applyTheme(isDarkMode);
    }, [isDarkMode]);

    const applyTheme = (darkMode) => {
        // Toggle body class for dark mode
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <section className="toggle-theme">
                {isDarkMode ? <LightModeIcon onClick={toggleDarkMode} className="light-mode-icon"/> : <ModeNightIcon onClick={toggleDarkMode} className="dark-mode-icon" />}
            </section>
        </div>
    );
}
