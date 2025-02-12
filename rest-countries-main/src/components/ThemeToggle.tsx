"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import { CiDark } from "react-icons/ci";
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <>
    { theme !== 'dark'? <div className="flex items-center gap-3"><CiDark  onClick={() => setTheme(theme === "dark" ? "light" : "dark")} size={30} className='cursor-pointer'/> Dark Mode</div>: <div className="flex items-center gap-3"><WiDaySunny  onClick={() => setTheme(theme === "dark" ? "light" : "dark")} size={30} className='cursor-pointer'/> Light Mode</div>}

    </>
  );
}