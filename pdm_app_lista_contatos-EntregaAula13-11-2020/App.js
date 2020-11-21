import React from 'react';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import ContactsNavigator from './navigation/ContactsNavigator';
import ignoreWarnings from 'react-native-ignore-warnings';

ignoreWarnings(['Setting a timer']);

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  return !fontsLoaded ? <AppLoading /> : <ContactsNavigator />
}
