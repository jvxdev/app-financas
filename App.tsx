import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/styles/theme';

import { CategorySelect } from './src/screens/CategorySelect';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black
} from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_900Black
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return ( 
    <ThemeProvider theme={theme}>
      <CategorySelect />
    </ThemeProvider>
    );
}