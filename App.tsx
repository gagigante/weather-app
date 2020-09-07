import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import { useFonts } from 'expo-font';

import Routes from './src/routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="light" translucent />

      <Routes />
    </>
  );
};

export default App;
