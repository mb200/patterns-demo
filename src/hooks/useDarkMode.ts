import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useMediaQuery } from './useMediaQuery';

const DARK_MODE = 'dark-mode';

function useSystemDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

function useDarkMode(): [boolean, (val: boolean | null) => void] {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(DARK_MODE);
  const prefersDarkMode = useSystemDarkMode();

  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    if (enabled) {
      document.body.classList.add(DARK_MODE);
    } else {
      document.body.classList.remove(DARK_MODE);
    }
  }, [enabled]);

  return [enabled, setDarkMode];
}

export { useDarkMode };
