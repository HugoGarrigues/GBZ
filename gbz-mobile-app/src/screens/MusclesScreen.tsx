import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getAllMuscles } from '../services/muscleService';

const MusclesScreen = () => {
  const [muscles, setMuscles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMuscles() {
      try {
        const data = await getAllMuscles();
        setMuscles(data);
      } catch (e) {
        setError('Erreur lors du chargement des muscles');
      } finally {
        setLoading(false);
      }
    }

    fetchMuscles();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={muscles}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.muscleCard}>
          <Text style={styles.muscleName}>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default MusclesScreen;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  muscleCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3, // ombre Android
    shadowColor: '#000', // ombre iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  muscleName: { fontSize: 18, fontWeight: '600' },
});
