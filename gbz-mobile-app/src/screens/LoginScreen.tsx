import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

const handleLogin = async () => {
  setError('');
  try {
    console.log('Envoi login:', { email, password });
    const response = await fetch('http://192.168.1.17:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Réponse non OK:', errText);
      setError('Email ou mot de passe incorrect');
      return;
    }

    const data = await response.json();
    console.log('Réponse login:', data);

    const { accessToken } = data;
    if (!accessToken) {
      setError('Token manquant dans la réponse');
      return;
    }

    await AsyncStorage.setItem('accessToken', accessToken);
    onLoginSuccess();
  } catch (e) {
    console.error('Erreur fetch login:', e);
    setError('Erreur de connexion au serveur');
  }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={[styles.inner, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.title}>Connexion</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Se connecter
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  inner: { marginHorizontal: 20, padding: 20, borderRadius: 8, elevation: 2 },
  title: { marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});
