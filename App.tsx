import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';

import theme from './src/global/styles/theme';

import { SignIn } from './src/screens/SignIn';

import { AuthProvider } from './src/hooks/auth';

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
      <NavigationContainer>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
    );
}