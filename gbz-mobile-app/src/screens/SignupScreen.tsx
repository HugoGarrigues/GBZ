import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

interface SignupScreenProps {
  onSignupSuccess?: () => void;
}

export default function SignupScreen({ onSignupSuccess }: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleSignup = () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Tous les champs sont requis');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    // TODO: remplacer par appel API réel pour créer un utilisateur
    if (onSignupSuccess) onSignupSuccess();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={[styles.inner, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.title}>Inscription</Text>

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
        <TextInput
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button mode="contained" onPress={handleSignup} style={styles.button}>
          S'inscrire
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
