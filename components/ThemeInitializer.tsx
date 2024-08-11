import React from 'react';
import { useInitializeTheme } from './useInitializeTheme';

function ThemeInitializer({ children }:any) {
  useInitializeTheme();
  return <>{children}</>;
}

export default ThemeInitializer;
