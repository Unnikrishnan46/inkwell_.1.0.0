import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSelectedThemeData } from '@/redux/themeState';
import ThemesDataList from '@/util/themeDataList';

export function useInitializeTheme() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        const initialTheme = storedTheme ? JSON.parse(storedTheme) : ThemesDataList[0];
        dispatch(setSelectedThemeData(initialTheme));
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    fetchTheme();
  }, [dispatch]);
}
