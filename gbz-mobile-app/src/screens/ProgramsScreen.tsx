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

type Session = {
  id: number;
  name: string;
};

type Program = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  sessions: Session[];
  authorId?: number;
};

type ProgramsScreenProps = {
  onSelectProgram?: (program: Program) => void;
};

export default function ProgramsScreen({ onSelectProgram }: ProgramsScreenProps) {
  const theme = useTheme();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // États pour création/édition
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formSessionsIds, setFormSessionsIds] = useState<number[]>([]);

  const getToken = async () => {
    return (await AsyncStorage.getItem("accessToken")) || "";
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch("http://192.168.1.17:3000/programs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des programmes");
      const data: Program[] = await res.json();
      setPrograms(data);
    } catch (e: any) {
      setError(e.message || "Erreur inconnue");
      showSnackbar(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    setLoadingSessions(true);
    try {
      const token = await getToken();
      const res = await fetch("http://192.168.1.17:3000/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des séances");
      const data: Session[] = await res.json();
      setSessions(data);
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    } finally {
      setLoadingSessions(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchSessions();
  }, []);

  const handleSelect = (program: Program) => {
    setSelectedProgram(program);
    if (onSelectProgram) onSelectProgram(program);
    showSnackbar(`Programme "${program.name}" sélectionné`);
  };

  const confirmDeleteProgram = (id: number) => {
    Alert.alert(
      "Confirmer la suppression",
      "Voulez-vous vraiment supprimer ce programme ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => deleteProgram(id) },
      ]
    );
  };

  const deleteProgram = async (id: number) => {
    try {
      const token = await getToken();
      const res = await fetch(`http://192.168.1.17:3000/programs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      showSnackbar("Programme supprimé avec succès");
      setSelectedProgram(null);
      fetchPrograms();
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    }
  };

  const renderItem = ({ item }: { item: Program }) => (
    <Card
      style={[styles.programCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => handleSelect(item)}
      mode="elevated"
      elevation={3}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleSection}>
            <Avatar.Icon 
              size={40} 
              icon="dumbbell" 
              style={[styles.programAvatar, { backgroundColor: theme.colors.primaryContainer }]}
            />
            <View style={styles.titleContainer}>
              <Text variant="titleMedium" style={[styles.programTitle, { color: theme.colors.onSurface }]}>
                {item.name}
              </Text>
              <Text variant="bodySmall" style={[styles.sessionCount, { color: theme.colors.onSurfaceVariant }]}>
                {item.sessions?.length || 0} séance{(item.sessions?.length || 0) > 1 ? 's' : ''}
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
            style={[styles.programDescription, { color: theme.colors.onSurfaceVariant }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        ) : null}

        <View style={styles.sessionsContainer}>
          {item.sessions?.length > 0 ? (
            item.sessions.slice(0, 3).map((session) => (
              <Chip 
                key={session.id} 
                style={[styles.sessionChip, { backgroundColor: theme.colors.secondaryContainer }]}
                textStyle={[styles.chipText, { color: theme.colors.onSecondaryContainer }]}
                compact
              >
                {session.name}
              </Chip>
            ))
          ) : (
            <Text variant="bodySmall" style={[styles.noSessionText, { color: theme.colors.onSurfaceVariant }]}>
              Aucune séance configurée
            </Text>
          )}
          {item.sessions?.length > 3 && (
            <Chip 
              style={[styles.moreChip, { backgroundColor: theme.colors.outline }]}
              textStyle={[styles.chipText, { color: theme.colors.onSurfaceVariant }]}
              compact
            >
              +{item.sessions.length - 3}
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const startEditing = (program?: Program) => {
    if (program) {
      setEditMode(true);
      setEditingProgramId(program.id);
      setFormName(program.name);
      setFormDescription(program.description || "");
      setFormSessionsIds(program.sessions ? program.sessions.map((s) => s.id) : []);
    } else {
      setEditMode(false);
      setEditingProgramId(null);
      setFormName("");
      setFormDescription("");
      setFormSessionsIds([]);
    }
    setModalVisible(true);
  };

  const resetForm = () => {
    setModalVisible(false);
    setEditMode(false);
    setEditingProgramId(null);
    setFormName("");
    setFormDescription("");
    setFormSessionsIds([]);
  };

  const submitForm = async () => {
    if (!formName.trim()) {
      showSnackbar("Le nom du programme est requis");
      return;
    }
    try {
      const token = await getToken();
      const url = editMode
        ? `http://192.168.1.17:3000/programs/${editingProgramId}`
        : "http://192.168.1.17:3000/programs";
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
          sessionsIds: formSessionsIds,
        }),
      });
      if (!res.ok) throw new Error(editMode ? "Erreur lors de la modification" : "Erreur lors de la création");

      showSnackbar(editMode ? "Programme modifié avec succès" : "Programme créé avec succès");
      resetForm();
      fetchPrograms();
    } catch (e: any) {
      showSnackbar(e.message || "Erreur inconnue");
    }
  };

  const toggleSessionSelection = (id: number) => {
    if (formSessionsIds.includes(id)) {
      setFormSessionsIds(formSessionsIds.filter((sid) => sid !== id));
    } else {
      setFormSessionsIds([...formSessionsIds, id]);
    }
  };

  if (loading) {
    return (
      <Surface style={[styles.centeredContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" animating={true} color={theme.colors.primary} />
          <Text variant="titleMedium" style={[styles.loadingText, { color: theme.colors.onBackground }]}>
            Chargement des programmes...
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
            onPress={fetchPrograms}
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

  if (selectedProgram) {
    return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.selectedProgramContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={[styles.selectedProgramCard, { backgroundColor: theme.colors.surface }]} mode="elevated" elevation={4}>
            <Card.Content style={styles.selectedCardContent}>
              <Avatar.Icon 
                size={60} 
                icon="dumbbell" 
                style={[styles.selectedProgramAvatar, { backgroundColor: theme.colors.primaryContainer }]}
              />
              
              <Text variant="headlineMedium" style={[styles.selectedTitle, { color: theme.colors.onSurface }]}>
                {selectedProgram.name}
              </Text>
              
              {selectedProgram.description ? (
                <Text variant="bodyLarge" style={[styles.selectedDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {selectedProgram.description}
                </Text>
              ) : null}
              
              <Divider style={[styles.selectedDivider, { backgroundColor: theme.colors.outline }]} />
              
              <Text variant="titleLarge" style={[styles.sessionsTitle, { color: theme.colors.onSurface }]}>
                Séances d'entraînement
              </Text>
              
              <View style={styles.selectedSessionsContainer}>
                {selectedProgram.sessions.length > 0 ? (
                  selectedProgram.sessions.map((session, index) => (
                    <Chip 
                      key={session.id} 
                      style={[
                        styles.selectedSessionChip, 
                        { backgroundColor: theme.colors.secondaryContainer }
                      ]}
                      textStyle={[styles.selectedChipText, { color: theme.colors.onSecondaryContainer }]}
                      icon="play-circle"
                    >
                      {session.name}
                    </Chip>
                  ))
                ) : (
                  <View style={styles.noSessionsContainer}>
                    <Avatar.Icon 
                      size={48} 
                      icon="calendar-blank" 
                      style={[styles.noSessionIcon, { backgroundColor: theme.colors.surfaceVariant }]}
                    />
                    <Text style={[styles.noSessionsText, { color: theme.colors.onSurfaceVariant }]}>
                      Aucune séance configurée
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
            onPress={() => setSelectedProgram(null)}
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
            onPress={() => confirmDeleteProgram(selectedProgram.id)}
            style={styles.bottomButton}
            contentStyle={styles.buttonContent}
          >
            Supprimer
          </Button>
        </Surface>

        <FAB
          icon="pencil"
          style={[styles.editFab, { backgroundColor: theme.colors.primary }]}
          onPress={() => startEditing(selectedProgram)}
          color={theme.colors.onPrimary}
        />
      </Surface>
    );
  }

  // Vue liste des programmes
  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
          Mes Programmes
        </Text>
        <Text variant="titleMedium" style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
          Sélectionnez votre programme d'entraînement
        </Text>
      </View>

      {programs.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Avatar.Icon 
            size={100} 
            icon="clipboard-list" 
            style={[styles.emptyIcon, { backgroundColor: theme.colors.surfaceVariant }]}
          />
          <Text variant="headlineSmall" style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
            Aucun programme
          </Text>
          <Text variant="bodyLarge" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
            Créez votre premier programme pour commencer votre entraînement
          </Text>
        </View>
      ) : (
        <FlatList
          data={programs}
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
              {editMode ? "Modifier le programme" : "Nouveau programme"}
            </Text>

            <TextInput
              mode="outlined"
              label="Nom du programme"
              value={formName}
              onChangeText={setFormName}
              style={styles.input}
              left={<TextInput.Icon icon="dumbbell" />}
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
              Séances d'entraînement
            </Text>

            {loadingSessions ? (
              <ActivityIndicator size="small" style={styles.sessionsLoader} />
            ) : (
              <View style={styles.sessionsGrid}>
                {sessions.map((session) => {
                  const selected = formSessionsIds.includes(session.id);
                  return (
                    <Chip
                      key={session.id}
                      selected={selected}
                      onPress={() => toggleSessionSelection(session.id)}
                      style={[
                        styles.modalSessionChip,
                        selected && { backgroundColor: theme.colors.primaryContainer }
                      ]}
                      textStyle={{
                        color: selected ? theme.colors.onPrimaryContainer : theme.colors.onSurface
                      }}
                      mode={selected ? "flat" : "outlined"}
                      icon={selected ? "check-circle" : "circle-outline"}
                    >
                      {session.name}
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
  programCard: {
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
  programAvatar: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  programTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  sessionCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  editButton: {
    margin: 0,
  },
  programDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  sessionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sessionChip: {
    borderRadius: 20,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreChip: {
    borderRadius: 20,
  },
  noSessionText: {
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
  // Programme sélectionné
  selectedProgramContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 100,
  },
  selectedProgramCard: {
    borderRadius: 20,
  },
  selectedCardContent: {
    padding: 32,
    alignItems: 'center',
  },
  selectedProgramAvatar: {
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
  sessionsTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedSessionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  selectedSessionChip: {
    marginBottom: 12,
    borderRadius: 24,
    minWidth: 140,
  },
  selectedChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noSessionsContainer: {
    alignItems: 'center',
    gap: 12,
  },
  noSessionIcon: {
    opacity: 0.6,
  },
  noSessionsText: {
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
  sessionsLoader: {
    marginVertical: 20,
  },
  sessionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
    justifyContent: 'center',
  },
  modalSessionChip: {
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