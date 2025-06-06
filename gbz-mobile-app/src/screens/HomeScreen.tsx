import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { Button, Text, useTheme, Surface, Card, IconButton } from 'react-native-paper';

type ExerciseSession = {
  id: number;
  exerciseName: string;
  sets: number;
  reps: number;
};

const mockFetchSessions = (): Promise<ExerciseSession[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, exerciseName: 'Rowing', sets: 2, reps: 6 },
        { id: 2, exerciseName: 'Smith Incliné', sets: 3, reps: 6 },
        { id: 3, exerciseName: 'Tirage Vertical', sets: 2, reps: 8 },
        { id: 4, exerciseName: 'Tirage Horizontal', sets: 1, reps: 6 },
        { id: 5, exerciseName: 'JM Press', sets: 2, reps: 8 },
      ]);
    }, 1000);
  });
};

const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const [sessions, setSessions] = useState<ExerciseSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempSets, setTempSets] = useState<string>('');
  const [tempReps, setTempReps] = useState<string>('');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const data = await mockFetchSessions();
      setSessions(data);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (id: number) => {
    const session = sessions.find(s => s.id === id);
    if (!session) return;
    setEditingId(id);
    setTempSets(session.sets.toString());
    setTempReps(session.reps.toString());
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempSets('');
    setTempReps('');
  };

  const saveEdit = () => {
    if (editingId === null) return;
    const setsNum = parseInt(tempSets, 10);
    const repsNum = parseInt(tempReps, 10);
    if (isNaN(setsNum) || setsNum < 1 || isNaN(repsNum) || repsNum < 1) return;

    setSessions(prev =>
      prev.map(s => (s.id === editingId ? { ...s, sets: setsNum, reps: repsNum } : s))
    );
    cancelEdit();
  };

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={[styles.welcomeCard, { backgroundColor: colors.surface }]} elevation={4}>
        <Card.Content style={styles.cardContent}>
          <Text variant="displaySmall" style={[styles.title, { color: colors.primary }]}>
            Séance Upper
          </Text>
        </Card.Content>
      </Card>

      <View style={{ width: '100%', maxWidth: 400 }}>

        {loading ? (
          <Text style={{ textAlign: 'center', color: colors.onSurfaceVariant }}>Chargement...</Text>
        ) : sessions.length === 0 ? (
          <Text style={{ textAlign: 'center', color: colors.onSurfaceVariant }}>
            Aucune séance en cours
          </Text>
        ) : (
          <FlatList
            data={sessions}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const isEditing = editingId === item.id;
              return (
                <Card style={[styles.sessionCard, { backgroundColor: colors.surface }]}>
                  <Card.Content
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Text variant="titleMedium" style={{ flex: 1 }}>
                      {item.exerciseName}
                    </Text>

                    {isEditing ? (
                      <>
                        <TextInput
                          keyboardType="number-pad"
                          style={[styles.input, { borderColor: colors.primary, color: colors.onSurface }]}
                          value={tempSets}
                          onChangeText={setTempSets}
                          placeholder="Séries"
                          maxLength={2}
                        />
                        <Text style={{ marginHorizontal: 4, color: colors.onSurface }}>séries ×</Text>
                        <TextInput
                          keyboardType="number-pad"
                          style={[styles.input, { borderColor: colors.primary, color: colors.onSurface }]}
                          value={tempReps}
                          onChangeText={setTempReps}
                          placeholder="Répétitions"
                          maxLength={2}
                        />
                        <Text style={{ marginLeft: 4, color: colors.onSurface }}>répétitions</Text>

                        <IconButton icon="content-save" onPress={saveEdit} color={colors.primary} />
                        <IconButton icon="close" onPress={cancelEdit} color={colors.error} />
                      </>
                    ) : (
                      <>
                        <Text style={{ marginRight: 16, color: colors.onSurface }}>
                          {item.sets} séries × {item.reps} répétitions
                        </Text>
                        <IconButton icon="pencil" onPress={() => startEdit(item.id)} />
                      </>
                    )}
                  </Card.Content>
                </Card>
              );
            }}
          />
        )}
      </View>

      {/* Boutons du bas supprimés */}
    </Surface>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
    alignItems: 'center',
  },
  welcomeCard: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
    borderRadius: 16,
  },
  cardContent: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  sessionCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 50,
    textAlign: 'center',
    fontWeight: '600',
  },
});
