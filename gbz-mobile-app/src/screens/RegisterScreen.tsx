import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterScreen({ onRegisterSuccess, onSwitchToLogin }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleRegister = async () => {
    setError('');
    if (!name || !email || !password) {
      setError('Merci de remplir tous les champs');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.17:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Erreur inscription:', errText);
        setError('Impossible de s\'inscrire avec ces informations');
        return;
      }

      // Inscription OK, on peut prévenir ou rediriger vers login
      onRegisterSuccess();
    } catch (e) {
      console.error('Erreur fetch inscription:', e);
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={[styles.inner, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.title}>Inscription</Text>

        <TextInput
          label="Nom complet"
          value={name}
          onChangeText={setName}
          style={styles.input}
          autoCapitalize="words"
        />
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

        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          S'inscrire
        </Button>

        <Button onPress={onSwitchToLogin} style={{ marginTop: 10 }}>
          Déjà un compte ? Se connecter
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
