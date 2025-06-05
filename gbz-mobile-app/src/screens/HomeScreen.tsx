import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';

const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={{ color: colors.onBackground }}>Bienvenue sur GBZ App</Title>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Muscles')}
        style={{ marginTop: 20 }}
        buttonColor={colors.primary}
        textColor={colors.onBackground}
      >
        Voir les muscles
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
