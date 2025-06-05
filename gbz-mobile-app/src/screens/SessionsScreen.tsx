import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SessionsScreen() {
  return (
    <View style={styles.container}>
      <Text>Sessions Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
