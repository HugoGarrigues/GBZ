import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Text,
  Card,
  Button,
  Chip,
  Surface,
  ActivityIndicator,
  Divider,
  IconButton,
  useTheme,
  Modal,
  Portal,
  FAB,
  Snackbar,
  TextInput,
  Avatar,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: screenWidth } = Dimensions.get('window');

type Exercise = {
  id: number;
  name: string;
};

type Session = {
  id: number;
  name: string;
  description?: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
};

export default function SessionsScreen() {
  const theme = useTheme();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Modal + form state
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formExerciseIds, setFormExerciseIds] = useState<number[]>([]);

  const getToken = async () => {
    return (await AsyncStorage.getItem("accessToken")) || "";
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const fetchSessions = async () => {
    setLoadingSessions(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch("http://192.168.1.17:3000/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des séances");
      const data: Session[] = await res.json();
      setSessions(data);
    } catch (e: any) {
      setError(e.message || "Erreur inconnue");
      showSnackbar(e.message || "Erreur inconnue");
    } finally {
      setLoadingSessions(false);
    }
  };

  const fetchExercises = async () => {
    setLoadingExercises(true);
    try {
      const token = await getToken();
      const res = await fetch("http://192.168.1.17:3000/exercises", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des exercices");
      const data: Exercise[] = await res.json();
      setExercises(data);
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    } finally {
      setLoadingExercises(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchExercises();
  }, []);

  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
    showSnackbar(`Séance "${session.name}" sélectionnée`);
  };

  const confirmDeleteSession = (id: number) => {
    Alert.alert(
      "Confirmer la suppression",
      "Voulez-vous vraiment supprimer cette séance ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => deleteSession(id) },
      ]
    );
  };

  const deleteSession = async (id: number) => {
    try {
      const token = await getToken();
      const res = await fetch(`http://192.168.1.17:3000/sessions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      showSnackbar("Séance supprimée avec succès");
      setSelectedSession(null);
      fetchSessions();
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    }
  };

  const renderItem = ({ item }: { item: Session }) => (
    <Card
      style={[styles.sessionCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => handleSelectSession(item)}
      mode="elevated"
      elevation={3}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleSection}>
            <Avatar.Icon 
              size={40} 
              icon="calendar-check" 
              style={[styles.sessionAvatar, { backgroundColor: theme.colors.primaryContainer }]}
            />
            <View style={styles.titleContainer}>
              <Text variant="titleMedium" style={[styles.sessionTitle, { color: theme.colors.onSurface }]}>
                {item.name}
              </Text>
              <Text variant="bodySmall" style={[styles.exerciseCount, { color: theme.colors.onSurfaceVariant }]}>
                {item.exercises?.length || 0} exercice{(item.exercises?.length || 0) > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => startEditing(item)}
            iconColor={theme.colors.primary}
            style={styles.editButton}
          />
        </View>

        {item.description ? (
          <Text 
            variant="bodyMedium" 
            style={[styles.sessionDescription, { color: theme.colors.onSurfaceVariant }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        ) : null}

        <View style={styles.exercisesContainer}>
          {item.exercises?.length > 0 ? (
            item.exercises.slice(0, 3).map((exercise) => (
              <Chip 
                key={exercise.id} 
                style={[styles.exerciseChip, { backgroundColor: theme.colors.secondaryContainer }]}
                textStyle={[styles.chipText, { color: theme.colors.onSecondaryContainer }]}
                compact
              >
                {exercise.name}
              </Chip>
            ))
          ) : (
            <Text variant="bodySmall" style={[styles.noExerciseText, { color: theme.colors.onSurfaceVariant }]}>
              Aucun exercice configuré
            </Text>
          )}
          {item.exercises?.length > 3 && (
            <Chip 
              style={[styles.moreChip, { backgroundColor: theme.colors.outline }]}
              textStyle={[styles.chipText, { color: theme.colors.onSurfaceVariant }]}
              compact
            >
              +{item.exercises.length - 3}
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const startEditing = (session?: Session) => {
    if (session) {
      setEditMode(true);
      setEditingSessionId(session.id);
      setFormName(session.name);
      setFormDescription(session.description || "");
      setFormExerciseIds(session.exercises ? session.exercises.map(e => e.id) : []);
    } else {
      setEditMode(false);
      setEditingSessionId(null);
      setFormName("");
      setFormDescription("");
      setFormExerciseIds([]);
    }
    setModalVisible(true);
  };

  const resetForm = () => {
    setModalVisible(false);
    setEditMode(false);
    setEditingSessionId(null);
    setFormName("");
    setFormDescription("");
    setFormExerciseIds([]);
  };

  const submitForm = async () => {
    if (!formName.trim()) {
      showSnackbar("Le nom de la séance est requis");
      return;
    }
    try {
      const token = await getToken();
      const url = editMode
        ? `http://192.168.1.17:3000/sessions/${editingSessionId}`
        : "http://192.168.1.17:3000/sessions";
      const method = editMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formName,
          description: formDescription,
          exercisesIds: formExerciseIds,
        }),
      });
      if (!res.ok) throw new Error(editMode ? "Erreur lors de la modification" : "Erreur lors de la création");

      showSnackbar(editMode ? "Séance modifiée avec succès" : "Séance créée avec succès");
      resetForm();
      fetchSessions();
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    }
  };

  const toggleExerciseSelection = (id: number) => {
    if (formExerciseIds.includes(id)) {
      setFormExerciseIds(formExerciseIds.filter(eid => eid !== id));
    } else {
      setFormExerciseIds([...formExerciseIds, id]);
    }
  };

  if (loadingSessions) {
    return (
      <Surface style={[styles.centeredContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" animating={true} color={theme.colors.primary} />
          <Text variant="titleMedium" style={[styles.loadingText, { color: theme.colors.onBackground }]}>
            Chargement des séances...
          </Text>
          <Text variant="bodySmall" style={[styles.loadingSubtext, { color: theme.colors.onSurfaceVariant }]}>
            Veuillez patienter un instant
          </Text>
        </View>
      </Surface>
    );
  }

  if (error) {
    return (
      <Surface style={[styles.centeredContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContent}>
          <Avatar.Icon 
            size={80} 
            icon="alert-circle" 
            style={[styles.errorIcon, { backgroundColor: theme.colors.errorContainer }]}
          />
          <Text variant="headlineSmall" style={[styles.errorTitle, { color: theme.colors.error }]}>
            Oups ! Une erreur est survenue
          </Text>
          <Text variant="bodyMedium" style={[styles.errorText, { color: theme.colors.onSurfaceVariant }]}>
            {error}
          </Text>
          <Button
            mode="contained"
            onPress={fetchSessions}
            style={styles.retryButton}
            icon="refresh"
            contentStyle={styles.buttonContent}
          >
            Réessayer
          </Button>
        </View>
      </Surface>
    );
  }

  if (selectedSession) {
    return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.selectedSessionContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={[styles.selectedSessionCard, { backgroundColor: theme.colors.surface }]} mode="elevated" elevation={4}>
            <Card.Content style={styles.selectedCardContent}>
              <Avatar.Icon 
                size={60} 
                icon="calendar-check" 
                style={[styles.selectedSessionAvatar, { backgroundColor: theme.colors.primaryContainer }]}
              />
              
              <Text variant="headlineMedium" style={[styles.selectedTitle, { color: theme.colors.onSurface }]}>
                {selectedSession.name}
              </Text>
              
              {selectedSession.description ? (
                <Text variant="bodyLarge" style={[styles.selectedDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {selectedSession.description}
                </Text>
              ) : null}
              
              <Divider style={[styles.selectedDivider, { backgroundColor: theme.colors.outline }]} />
              
              <Text variant="titleLarge" style={[styles.exercisesTitle, { color: theme.colors.onSurface }]}>
                Exercices
              </Text>
              
              <View style={styles.selectedExercisesContainer}>
                {selectedSession.exercises.length > 0 ? (
                  selectedSession.exercises.map((exercise, index) => (
                    <Chip 
                      key={exercise.id} 
                      style={[
                        styles.selectedExerciseChip, 
                        { backgroundColor: theme.colors.secondaryContainer }
                      ]}
                      textStyle={[styles.selectedChipText, { color: theme.colors.onSecondaryContainer }]}
                      icon="dumbbell"
                    >
                      {exercise.name}
                    </Chip>
                  ))
                ) : (
                  <View style={styles.noExercisesContainer}>
                    <Avatar.Icon 
                      size={48} 
                      icon="dumbbell" 
                      style={[styles.noExerciseIcon, { backgroundColor: theme.colors.surfaceVariant }]}
                    />
                    <Text style={[styles.noExercisesText, { color: theme.colors.onSurfaceVariant }]}>
                      Aucun exercice configuré
                    </Text>
                  </View>
                )}
              </View>
            </Card.Content>
          </Card>
        </ScrollView>

        <Surface style={[styles.bottomBar, { backgroundColor: theme.colors.surface }]}>
          <Button
            mode="outlined"
            icon="arrow-left"
            onPress={() => setSelectedSession(null)}
            style={[styles.bottomButton, { borderColor: theme.colors.outline }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ color: theme.colors.onSurface }}
          >
            Retour
          </Button>

          <Button
            mode="contained"
            icon="delete"
            buttonColor={theme.colors.error}
            onPress={() => confirmDeleteSession(selectedSession.id)}
            style={styles.bottomButton}
            contentStyle={styles.buttonContent}
          >
            Supprimer
          </Button>
        </Surface>

        <FAB
          icon="pencil"
          style={[styles.editFab, { backgroundColor: theme.colors.primary }]}
          onPress={() => startEditing(selectedSession)}
          color={theme.colors.onPrimary}
        />
      </Surface>
    );
  }

  // Vue liste des séances
  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
          Mes Séances
        </Text>
        <Text variant="titleMedium" style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
          Gérez vos séances d'entraînement
        </Text>
      </View>

      {sessions.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Avatar.Icon 
            size={100} 
            icon="calendar-check" 
            style={[styles.emptyIcon, { backgroundColor: theme.colors.surfaceVariant }]}
          />
          <Text variant="headlineSmall" style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
            Aucune séance
          </Text>
          <Text variant="bodyLarge" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
            Créez votre première séance pour commencer votre entraînement
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loadingSessions}
          onRefresh={fetchSessions}
        />
      )}

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => startEditing()}
        label="Nouveau"
        color={theme.colors.onPrimary}
      />

      {/* Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={resetForm}
          contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text variant="headlineSmall" style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
              {editMode ? "Modifier la séance" : "Nouvelle séance"}
            </Text>

            <TextInput
              mode="outlined"
              label="Nom de la séance"
              value={formName}
              onChangeText={setFormName}
              style={styles.input}
              left={<TextInput.Icon icon="calendar-check" />}
            />

            <TextInput
              mode="outlined"
              label="Description (optionnel)"
              value={formDescription}
              onChangeText={setFormDescription}
              multiline
              numberOfLines={3}
              style={styles.input}
              left={<TextInput.Icon icon="text" />}
            />

            <Divider style={[styles.modalDivider, { backgroundColor: theme.colors.outline }]} />

            <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Exercices
            </Text>

            {loadingExercises ? (
              <ActivityIndicator size="small" style={styles.exercisesLoader} />
            ) : (
              <View style={styles.exercisesGrid}>
                {exercises.map((exercise) => {
                  const selected = formExerciseIds.includes(exercise.id);
                  return (
                    <Chip
                      key={exercise.id}
                      selected={selected}
                      onPress={() => toggleExerciseSelection(exercise.id)}
                      style={[
                        styles.modalExerciseChip,
                        selected && { backgroundColor: theme.colors.primaryContainer }
                      ]}
                      textStyle={{
                        color: selected ? theme.colors.onPrimaryContainer : theme.colors.onSurface
                      }}
                      mode={selected ? "flat" : "outlined"}
                      icon={selected ? "check-circle" : "circle-outline"}
                    >
                      {exercise.name}
                    </Chip>
                  );
                })}
              </View>
            )}

            <View style={styles.modalButtons}>
              <Button
                mode="outlined"
                onPress={resetForm}
                style={styles.modalButton}
                contentStyle={styles.buttonContent}
              >
                Annuler
              </Button>
              <Button
                mode="contained"
                onPress={submitForm}
                style={styles.modalButton}
                contentStyle={styles.buttonContent}
              >
                {editMode ? "Enregistrer" : "Créer"}
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingContent: {
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingSubtext: {
    textAlign: 'center',
  },
  errorContent: {
    alignItems: 'center',
    gap: 16,
    maxWidth: 300,
  },
  errorIcon: {
    marginBottom: 8,
  },
  errorTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 8,
    minWidth: 140,
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    opacity: 0.8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sessionCard: {
    marginBottom: 16,
    borderRadius: 16,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sessionAvatar: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  sessionTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  exerciseCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  editButton: {
    margin: 0,
  },
  sessionDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  exercisesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exerciseChip: {
    borderRadius: 20,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreChip: {
    borderRadius: 20,
  },
  noExerciseText: {
    fontStyle: 'italic',
    fontSize: 13,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    borderRadius: 16,
  },
  // Séance sélectionnée
  selectedSessionContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 100,
  },
  selectedSessionCard: {
    borderRadius: 20,
  },
  selectedCardContent: {
    padding: 32,
    alignItems: 'center',
  },
  selectedSessionAvatar: {
    marginBottom: 20,
  },
  selectedTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  selectedDescription: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  selectedDivider: {
    width: '100%',
    marginBottom: 24,
  },
  exercisesTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedExercisesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  selectedExerciseChip: {
    marginBottom: 12,
    borderRadius: 24,
    minWidth: 140,
  },
  selectedChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noExercisesContainer: {
    alignItems: 'center',
    gap: 12,
  },
  noExerciseIcon: {
    opacity: 0.6,
  },
  noExercisesText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomButton: {
    flex: 1,
    borderRadius: 12,
  },
  editFab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    borderRadius: 16,
  },
  // Modal
  modalContainer: {
    margin: 20,
    borderRadius: 20,
    padding: 24,
    maxHeight: '100%',
  },
  modalTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  modalDivider: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  exercisesLoader: {
    marginVertical: 20,
  },
  exercisesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
    justifyContent: 'center',
  },
  modalExerciseChip: {
    borderRadius: 20,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
  },
  snackbar: {
    marginBottom: 20,
  },
});