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

type Muscle = {
  id: number;
  name: string;
};

type Exercise = {
  id: number;
  name: string;
  description?: string;
  muscles: Muscle[];
};

type ExercisesScreenProps = {
  onSelectExercise?: (exercise: Exercise) => void;
};

export default function ExercisesScreen({ onSelectExercise }: ExercisesScreenProps) {
  const theme = useTheme();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMuscles, setLoadingMuscles] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // États pour création/édition
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formMusclesIds, setFormMusclesIds] = useState<number[]>([]);

  const getToken = async () => {
    return (await AsyncStorage.getItem("accessToken")) || "";
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const fetchExercises = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch("http://192.168.1.17:3000/exercises", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des exercices");
      const data: Exercise[] = await res.json();
      setExercises(data);
    } catch (e: any) {
      setError(e.message || "Erreur inconnue");
      showSnackbar(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const fetchMuscles = async () => {
    setLoadingMuscles(true);
    try {
      const token = await getToken();
      const res = await fetch("http://192.168.1.17:3000/muscles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des muscles");
      const data: Muscle[] = await res.json();
      setMuscles(data);
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    } finally {
      setLoadingMuscles(false);
    }
  };

  useEffect(() => {
    fetchExercises();
    fetchMuscles();
  }, []);

  const handleSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    if (onSelectExercise) onSelectExercise(exercise);
    showSnackbar(`Exercice "${exercise.name}" sélectionné`);
  };

  const confirmDeleteExercise = (id: number) => {
    Alert.alert(
      "Confirmer la suppression",
      "Voulez-vous vraiment supprimer cet exercice ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => deleteExercise(id) },
      ]
    );
  };

  const deleteExercise = async (id: number) => {
    try {
      const token = await getToken();
      const res = await fetch(`http://192.168.1.17:3000/exercises/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      showSnackbar("Exercice supprimé avec succès");
      setSelectedExercise(null);
      fetchExercises();
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    }
  };

  const renderItem = ({ item }: { item: Exercise }) => (
    <Card
      style={[styles.exerciseCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => handleSelect(item)}
      mode="elevated"
      elevation={3}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleSection}>
            <Avatar.Icon 
              size={40} 
              icon="weight-lifter" 
              style={[styles.exerciseAvatar, { backgroundColor: theme.colors.primaryContainer }]}
            />
            <View style={styles.titleContainer}>
              <Text variant="titleMedium" style={[styles.exerciseTitle, { color: theme.colors.onSurface }]}>
                {item.name}
              </Text>
              <Text variant="bodySmall" style={[styles.muscleCount, { color: theme.colors.onSurfaceVariant }]}>
                {item.muscles?.length || 0} muscle{(item.muscles?.length || 0) > 1 ? 's' : ''}
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
            style={[styles.exerciseDescription, { color: theme.colors.onSurfaceVariant }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        ) : null}

        <View style={styles.musclesContainer}>
          {item.muscles?.length > 0 ? (
            item.muscles.slice(0, 3).map((muscle) => (
              <Chip 
                key={muscle.id} 
                style={[styles.muscleChip, { backgroundColor: theme.colors.secondaryContainer }]}
                textStyle={[styles.chipText, { color: theme.colors.onSecondaryContainer }]}
                compact
              >
                {muscle.name}
              </Chip>
            ))
          ) : (
            <Text variant="bodySmall" style={[styles.noMuscleText, { color: theme.colors.onSurfaceVariant }]}>
              Aucun muscle ciblé
            </Text>
          )}
          {item.muscles?.length > 3 && (
            <Chip 
              style={[styles.moreChip, { backgroundColor: theme.colors.outline }]}
              textStyle={[styles.chipText, { color: theme.colors.onSurfaceVariant }]}
              compact
            >
              +{item.muscles.length - 3}
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const startEditing = (exercise?: Exercise) => {
    if (exercise) {
      setEditMode(true);
      setEditingExerciseId(exercise.id);
      setFormName(exercise.name);
      setFormDescription(exercise.description || "");
      setFormMusclesIds(exercise.muscles ? exercise.muscles.map((m) => m.id) : []);
    } else {
      setEditMode(false);
      setEditingExerciseId(null);
      setFormName("");
      setFormDescription("");
      setFormMusclesIds([]);
    }
    setModalVisible(true);
  };

  const resetForm = () => {
    setModalVisible(false);
    setEditMode(false);
    setEditingExerciseId(null);
    setFormName("");
    setFormDescription("");
    setFormMusclesIds([]);
  };

  const submitForm = async () => {
    if (!formName.trim()) {
      showSnackbar("Le nom de l'exercice est requis");
      return;
    }
    try {
      const token = await getToken();
      const url = editMode
        ? `http://192.168.1.17:3000/exercises/${editingExerciseId}`
        : "http://192.168.1.17:3000/exercises";
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
          musclesIds: formMusclesIds,
        }),
      });
      if (!res.ok) throw new Error(editMode ? "Erreur lors de la modification" : "Erreur lors de la création");

      showSnackbar(editMode ? "Exercice modifié avec succès" : "Exercice créé avec succès");
      resetForm();
      fetchExercises();
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    }
  };

  const toggleMuscleSelection = (id: number) => {
    if (formMusclesIds.includes(id)) {
      setFormMusclesIds(formMusclesIds.filter((mid) => mid !== id));
    } else {
      setFormMusclesIds([...formMusclesIds, id]);
    }
  };

  if (loading) {
    return (
      <Surface style={[styles.centeredContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" animating={true} color={theme.colors.primary} />
          <Text variant="titleMedium" style={[styles.loadingText, { color: theme.colors.onBackground }]}>
            Chargement des exercices...
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
            onPress={fetchExercises}
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

  if (selectedExercise) {
    return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.selectedExerciseContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={[styles.selectedExerciseCard, { backgroundColor: theme.colors.surface }]} mode="elevated" elevation={4}>
            <Card.Content style={styles.selectedCardContent}>
              <Avatar.Icon 
                size={60} 
                icon="weight-lifter" 
                style={[styles.selectedExerciseAvatar, { backgroundColor: theme.colors.primaryContainer }]}
              />
              
              <Text variant="headlineMedium" style={[styles.selectedTitle, { color: theme.colors.onSurface }]}>
                {selectedExercise.name}
              </Text>
              
              {selectedExercise.description ? (
                <Text variant="bodyLarge" style={[styles.selectedDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {selectedExercise.description}
                </Text>
              ) : null}
              
              <Divider style={[styles.selectedDivider, { backgroundColor: theme.colors.outline }]} />
              
              <Text variant="titleLarge" style={[styles.musclesTitle, { color: theme.colors.onSurface }]}>
                Muscles ciblés
              </Text>
              
              <View style={styles.selectedMusclesContainer}>
                {selectedExercise.muscles.length > 0 ? (
                  selectedExercise.muscles.map((muscle, index) => (
                    <Chip 
                      key={muscle.id} 
                      style={[
                        styles.selectedMuscleChip, 
                        { backgroundColor: theme.colors.secondaryContainer }
                      ]}
                      textStyle={[styles.selectedChipText, { color: theme.colors.onSecondaryContainer }]}
                      icon="human"
                    >
                      {muscle.name}
                    </Chip>
                  ))
                ) : (
                  <View style={styles.noMusclesContainer}>
                    <Avatar.Icon 
                      size={48} 
                      icon="human" 
                      style={[styles.noMuscleIcon, { backgroundColor: theme.colors.surfaceVariant }]}
                    />
                    <Text style={[styles.noMusclesText, { color: theme.colors.onSurfaceVariant }]}>
                      Aucun muscle ciblé
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
            onPress={() => setSelectedExercise(null)}
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
            onPress={() => confirmDeleteExercise(selectedExercise.id)}
            style={styles.bottomButton}
            contentStyle={styles.buttonContent}
          >
            Supprimer
          </Button>
        </Surface>

        <FAB
          icon="pencil"
          style={[styles.editFab, { backgroundColor: theme.colors.primary }]}
          onPress={() => startEditing(selectedExercise)}
          color={theme.colors.onPrimary}
        />
      </Surface>
    );
  }

  // Vue liste des exercices
  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
          Mes Exercices
        </Text>
        <Text variant="titleMedium" style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
          Gérez votre bibliothèque d'exercices
        </Text>
      </View>

      {exercises.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Avatar.Icon 
            size={100} 
            icon="weight-lifter" 
            style={[styles.emptyIcon, { backgroundColor: theme.colors.surfaceVariant }]}
          />
          <Text variant="headlineSmall" style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
            Aucun exercice
          </Text>
          <Text variant="bodyLarge" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
            Créez votre premier exercice pour enrichir votre entraînement
          </Text>
        </View>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
              {editMode ? "Modifier l'exercice" : "Nouvel exercice"}
            </Text>

            <TextInput
              mode="outlined"
              label="Nom de l'exercice"
              value={formName}
              onChangeText={setFormName}
              style={styles.input}
              left={<TextInput.Icon icon="weight-lifter" />}
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
              Muscles ciblés
            </Text>

            {loadingMuscles ? (
              <ActivityIndicator size="small" style={styles.musclesLoader} />
            ) : (
              <View style={styles.musclesGrid}>
                {muscles.map((muscle) => {
                  const selected = formMusclesIds.includes(muscle.id);
                  return (
                    <Chip
                      key={muscle.id}
                      selected={selected}
                      onPress={() => toggleMuscleSelection(muscle.id)}
                      style={[
                        styles.modalMuscleChip,
                        selected && { backgroundColor: theme.colors.primaryContainer }
                      ]}
                      textStyle={{
                        color: selected ? theme.colors.onPrimaryContainer : theme.colors.onSurface
                      }}
                      mode={selected ? "flat" : "outlined"}
                      icon={selected ? "check-circle" : "circle-outline"}
                    >
                      {muscle.name}
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
  exerciseCard: {
    marginBottom: 12,
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
  exerciseAvatar: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  exerciseTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  muscleCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  editButton: {
    margin: 0,
  },
  exerciseDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  musclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleChip: {
    borderRadius: 20,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreChip: {
    borderRadius: 20,
  },
  noMuscleText: {
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
  // Exercice sélectionné
  selectedExerciseContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 100,
  },
  selectedExerciseCard: {
    borderRadius: 20,
  },
  selectedCardContent: {
    padding: 32,
    alignItems: 'center',
  },
  selectedExerciseAvatar: {
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
  musclesTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedMusclesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  selectedMuscleChip: {
    marginBottom: 12,
    borderRadius: 24,
    minWidth: 140,
  },
  selectedChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noMusclesContainer: {
    alignItems: 'center',
    gap: 12,
  },
  noMuscleIcon: {
    opacity: 0.6,
  },
  noMusclesText: {
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
  musclesLoader: {
    marginVertical: 20,
  },
  musclesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
    justifyContent: 'center',
  },
  modalMuscleChip: {
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