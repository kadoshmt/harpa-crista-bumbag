import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [appTheme, setAppTheme] = useState(() => {
    const storageValue = localStorage.getItem(`@harpacrista:${key}`);

    if (storageValue) {
      return JSON.parse(storageValue);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(`@harpacrista:${key}`, JSON.stringify(appTheme));
  }, [key, appTheme]);

  return [appTheme, setAppTheme];
}

export default usePersistedState;
