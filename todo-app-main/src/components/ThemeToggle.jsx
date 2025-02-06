import { useState, useEffect } from 'react';
import { WiDaySunny } from "react-icons/wi";
import { MdOutlineNightlightRound } from "react-icons/md";
function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      { theme !== 'dark'? <MdOutlineNightlightRound onClick={toggleTheme} size={30} className='text-white cursor-pointer'/>: <WiDaySunny onClick={toggleTheme} size={30} className='text-white cursor-pointer'/>}
      </>
    // <button  className="px-4 py-2 bg-gray-200 rounded">
    // </button>
  );
}

export default ThemeToggle;