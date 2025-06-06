import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  Text,
  Card,
  ActivityIndicator,
  Button,
  useTheme,
  Chip,
  Divider,
  Surface,
  Avatar,
  IconButton,
  Badge
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BasicUser = {
  id: string;
  name: string;
  email: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  programs?: { id: string; name: string }[];
};

interface ProfileScreenProps {
  onLogout: () => void;
}

const formatDate = (dateStr?: string) =>
  dateStr
    ? new Date(dateStr).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const theme = useTheme();
  const [basicUser, setBasicUser] = useState<BasicUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingBasicUser, setLoadingBasicUser] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBasicUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) throw new Error('Aucun token trouvé.');

        const res = await fetch('http://192.168.1.17:3000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erreur lors de la récupération du profil.');

        const data: BasicUser = await res.json();
        setBasicUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingBasicUser(false);
      }
    };

    fetchBasicUser();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!basicUser?.id) return;

      setLoadingUser(true);
      setError(null);

      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) throw new Error('Aucun token trouvé.');

        const res = await fetch(`http://192.168.1.17:3000/users/${basicUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données utilisateur.");

        const data: User = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserDetails();
  }, [basicUser]);

  const isLoading = loadingBasicUser || loadingUser;

  if (isLoading) {
    return (
      <Surface style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator animating size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={{ color: theme.colors.onBackground, marginTop: 16 }}>
          Chargement du profil...
        </Text>
      </Surface>
    );
  }

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Surface style={[styles.headerCard, { backgroundColor: theme.colors.primaryContainer }]} elevation={3}>
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={80}
              label={user ? getInitials(user.name) : '??'}
              style={{ backgroundColor: theme.colors.primary }}
              labelStyle={{ color: theme.colors.onPrimary, fontSize: 24, fontWeight: 'bold' }}
            />
            {user?.isAdmin && (
              <Badge
                style={[styles.adminBadge, { backgroundColor: theme.colors.tertiary }]}
                size={24}
              >
                ★
              </Badge>
            )}
          </View>
          <Text variant="headlineSmall" style={[styles.userName, { color: theme.colors.onPrimaryContainer }]}>
            {user?.name || 'Utilisateur'}
          </Text>
          <Text variant="bodyMedium" style={[styles.userEmail, { color: theme.colors.onPrimaryContainer }]}>
            {user?.email || ''}
          </Text>
        </Surface>

        <Card style={[styles.mainCard, { backgroundColor: theme.colors.surface }]} elevation={2}>
          {error ? (
            <Card.Content style={styles.errorContainer}>
              <Text variant="bodyLarge" style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </Text>
            </Card.Content>
          ) : user ? (
            <Card.Content style={styles.cardContent}>
              <View style={styles.statsContainer}>
                <Surface style={[styles.statCard, { backgroundColor: theme.colors.surfaceVariant }]} elevation={1}>
                  <Text variant="titleMedium" style={[styles.statNumber, { color: theme.colors.primary }]}>
                    {user.programs?.length ?? 0}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Programmes
                  </Text>
                </Surface>

                <Surface style={[styles.statCard, { backgroundColor: theme.colors.surfaceVariant }]} elevation={1}>
                  <Text variant="titleMedium" style={[styles.statNumber, { color: theme.colors.primary }]}>
                    {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Jours
                  </Text>
                </Surface>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.detailsContainer}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                  Informations du compte
                </Text>

                <InfoRow
                  icon={user.isAdmin ? "shield-account" : "account"}
                  label="Statut"
                  value={
                    <Chip
                      icon={user.isAdmin ? "shield-check" : "account-circle"}
                      mode="flat"
                      compact
                      style={[
                        styles.statusChip,
                        { backgroundColor: user.isAdmin ? theme.colors.tertiaryContainer : theme.colors.secondaryContainer }
                      ]}
                      textStyle={{
                        color: user.isAdmin ? theme.colors.onTertiaryContainer : theme.colors.onSecondaryContainer,
                        fontSize: 12
                      }}
                    >
                      {user.isAdmin ? 'Administrateur' : 'Utilisateur'}
                    </Chip>
                  }
                  theme={theme}
                />

                <InfoRow
                  icon="calendar-plus"
                  label="Membre depuis"
                  value={formatDate(user.createdAt)}
                  theme={theme}
                />

                {user.lastLogin && (
                  <InfoRow
                    icon="login"
                    label="Dernière connexion"
                    value={formatDate(user.lastLogin)}
                    theme={theme}
                  />
                )}
              </View>
            </Card.Content>
          ) : (
            <Card.Content style={styles.noDataContainer}>
              <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                Aucune donnée utilisateur disponible.
              </Text>
            </Card.Content>
          )}

          <Card.Actions style={{ justifyContent: 'center', paddingVertical: 24 }}>
            <Button
              mode="contained"
              onPress={onLogout}
              icon="logout"
              buttonColor={theme.colors.error}
              textColor={theme.colors.onError}
              style={{ borderRadius: 12, width: '80%' }}
              contentStyle={{ paddingVertical: 6 }}
            >
              Déconnexion
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </Surface>
  );
}

function InfoRow({
  icon,
  label,
  value,
  theme
}: {
  icon: string;
  label: string;
  value: string | React.ReactNode;
  theme: any;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        <IconButton
          icon={icon}
          size={20}
          iconColor={theme.colors.primary}
          style={styles.infoIcon}
        />
        <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
          {label}
        </Text>
      </View>
      <View style={styles.infoRowRight}>
        {typeof value === 'string' ? (
          <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
            {value}
          </Text>
        ) : (
          value
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  headerCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  adminBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    opacity: 0.8,
    textAlign: 'center',
  },
  mainCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    paddingTop: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  divider: {
    marginVertical: 16,
  },
  detailsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoRowRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoIcon: {
    margin: 0,
    marginRight: 8,
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    textAlign: 'right',
    flexShrink: 1,
  },
  statusChip: {

  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  errorText: {
    textAlign: 'center',
  },
  noDataContainer: {
    paddingVertical: 32,
  }
});
