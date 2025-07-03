import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle({ darkMode, setDarkMode }) {
    return (
        <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="bg-gray-800 text-white p-2 rounded"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {darkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
}