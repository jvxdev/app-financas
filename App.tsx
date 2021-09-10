import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';
import theme from './src/global/styles/theme';


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

  const { userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return ( 
    <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
    );
}