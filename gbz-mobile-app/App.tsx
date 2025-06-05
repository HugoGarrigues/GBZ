import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PaperProvider theme={theme}>
      {isLoggedIn ? (
        <AppNavigator />
      ) : (
        <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </PaperProvider>
  );
}
