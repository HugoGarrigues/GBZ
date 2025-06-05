import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, List, Typography, Spin, Alert, Input, Button, Form, Space, Popconfirm, message } from "antd";

const { Title } = Typography;

type Program = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type Session = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Exercise = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  programs: Program[];
};

type UserExerciseSession = {
  id: number;
  userId: number;
  sessionId: number;
  exerciseId: number;
  sets: number;
  reps: number;
  session: Session;
  exercise: Exercise;
};

type GroupedSession = {
  session: Session;
  exercises: {
    id: number; // user-exercise-session id
    exercise: Exercise;
    sets: number;
    reps: number;
  }[];
};

export const UserShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [groupedSessions, setGroupedSessions] = useState<GroupedSession[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProgramId, setEditingProgramId] = useState<number | null>(null);
  const [editingSessions, setEditingSessions] = useState<Record<number, boolean>>({}); // sessionId => editing?
  const [editingExercises, setEditingExercises] = useState<Record<number, boolean>>({}); // userExerciseSessionId => editing?

  const getToken = () => localStorage.getItem("accessToken") || "";

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const fetchUser = fetch(`http://localhost:3000/users/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res) => {
      if (!res.ok) throw new Error("Erreur lors du chargement de l'utilisateur");
      return res.json();
    });

    const fetchExerciseSessions = fetch(`http://localhost:3000/user-exercise-sessions/user/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res) => {
      if (!res.ok) throw new Error("Erreur lors du chargement des données d'exercices");
      return res.json();
    });

    Promise.all([fetchUser, fetchExerciseSessions])
      .then(([userData, exerciseSessionsData]) => {
        setUser(userData);
        setPrograms(userData.programs || []);

        // Regroup by session
        const grouped: Record<number, GroupedSession> = {};

        exerciseSessionsData.forEach((entry: UserExerciseSession) => {
          if (!grouped[entry.session.id]) {
            grouped[entry.session.id] = {
              session: entry.session,
              exercises: [],
            };
          }
          grouped[entry.session.id].exercises.push({
            id: entry.id,
            exercise: entry.exercise,
            sets: entry.sets,
            reps: entry.reps,
          });
        });

        setGroupedSessions(Object.values(grouped));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Handlers for Programs
  const startEditingProgram = (programId: number) => {
    setEditingProgramId(programId);
  };

  const cancelEditingProgram = () => {
    if (!user) return;
    setPrograms(user.programs);
    setEditingProgramId(null);
  };

  const saveProgram = async (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    if (!program) return;

    try {
      const res = await fetch(`http://localhost:3000/programs/${programId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: program.name,
          description: program.description,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde du programme");
      message.success("Programme sauvegardé");
      setEditingProgramId(null);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  // Handlers for Exercises editing inside Sessions
  const startEditingExercise = (uesId: number) => {
    setEditingExercises({ ...editingExercises, [uesId]: true });
  };

  const cancelEditingExercise = (uesId: number) => {
    // Reload data to reset changes
    if (!id) return;
    fetch(`http://localhost:3000/user-exercise-sessions/user/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((exerciseSessionsData: UserExerciseSession[]) => {
        const grouped: Record<number, GroupedSession> = {};
        exerciseSessionsData.forEach((entry) => {
          if (!grouped[entry.session.id]) {
            grouped[entry.session.id] = {
              session: entry.session,
              exercises: [],
            };
          }
          grouped[entry.session.id].exercises.push({
            id: entry.id,
            exercise: entry.exercise,
            sets: entry.sets,
            reps: entry.reps,
          });
        });
        setGroupedSessions(Object.values(grouped));
        setEditingExercises({ ...editingExercises, [uesId]: false });
      });
  };

  const saveExercise = async (uesId: number) => {
    // Find exercise in groupedSessions
    let toSave: { sets: number; reps: number } | null = null;
    groupedSessions.forEach((gs) => {
      gs.exercises.forEach((ex) => {
        if (ex.id === uesId) {
          toSave = { sets: ex.sets, reps: ex.reps };
        }
      });
    });
    if (!toSave) return;

    try {
      const res = await fetch(`http://localhost:3000/user-exercise-sessions/${uesId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(toSave),
      });
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde de l'exercice");
      message.success("Exercice sauvegardé");
      setEditingExercises({ ...editingExercises, [uesId]: false });
    } catch (e: any) {
      message.error(e.message);
    }
  };

  // Handle change on program fields
  const onProgramChange = (programId: number, field: "name" | "description", value: string) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === programId ? { ...p, [field]: value } : p))
    );
  };

  // Handle change on exercise sets/reps
  const onExerciseChange = (uesId: number, field: "sets" | "reps", value: string) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) return;
    setGroupedSessions((prev) =>
      prev.map((gs) => ({
        ...gs,
        exercises: gs.exercises.map((ex) =>
          ex.id === uesId ? { ...ex, [field]: numericValue } : ex
        ),
      }))
    );
  };

  if (loading) return <Spin tip="Chargement..." />;
  if (error) return <Alert message="Erreur" description={error} type="error" showIcon />;

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3}>Détails de l'utilisateur</Title>
        {user ? (
          <>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nom:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Administrateur:</strong> {user.isAdmin ? "Oui" : "Non"}</p>
            <p><strong>Créé le:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </>
        ) : (
          <p>Utilisateur non trouvé.</p>
        )}
      </Card>

      <Card title="Programmes" style={{ marginTop: 24 }}>
        <List
          dataSource={programs}
          renderItem={(program) => (
            <List.Item key={program.id}>
              {editingProgramId === program.id ? (
                <Space style={{ width: "100%" }} direction="vertical">
                  <Input
                    value={program.name}
                    onChange={(e) => onProgramChange(program.id, "name", e.target.value)}
                    placeholder="Nom du programme"
                  />
                  <Input.TextArea
                    value={program.description}
                    onChange={(e) => onProgramChange(program.id, "description", e.target.value)}
                    placeholder="Description"
                    rows={3}
                  />
                  <Space>
                    <Button type="primary" onClick={() => saveProgram(program.id)}>Enregistrer</Button>
                    <Button onClick={cancelEditingProgram}>Annuler</Button>
                  </Space>
                </Space>
              ) : (
                <Space style={{ width: "100%" }} direction="vertical">
                  <div><strong>{program.name}</strong></div>
                  <div>{program.description || "Pas de description"}</div>
                  <Button onClick={() => startEditingProgram(program.id)}>Modifier</Button>
                </Space>
              )}
            </List.Item>
          )}
          locale={{ emptyText: "Aucun programme" }}
        />
      </Card>

      <Card title="Séances & Exercices" style={{ marginTop: 24 }}>
        {groupedSessions.length === 0 ? (
          <p>Aucune séance trouvée.</p>
        ) : (
          <List
            dataSource={groupedSessions}
            renderItem={({ session, exercises }) => (
              <List.Item key={session.id} style={{ display: "block" }}>
                <Title level={4}>{session.name}</Title>
                <List
                  dataSource={exercises}
                  renderItem={({ id: uesId, exercise, sets, reps }) => (
                    <List.Item key={uesId}>
                      {editingExercises[uesId] ? (
                        <Space>
                          <span>{exercise.name}</span>
                          <Input
                            type="number"
                            style={{ width: 70 }}
                            value={sets}
                            min={1}
                            onChange={(e) => onExerciseChange(uesId, "sets", e.target.value)}
                          />
                          <span>series ×</span>
                          <Input
                            type="number"
                            style={{ width: 70 }}
                            value={reps}
                            min={1}
                            onChange={(e) => onExerciseChange(uesId, "reps", e.target.value)}
                          />
                          <span>répétitions</span>
                          <Button type="primary" onClick={() => saveExercise(uesId)}>Enregistrer</Button>
                          <Button onClick={() => cancelEditingExercise(uesId)}>Annuler</Button>
                        </Space>
                      ) : (
                        <Space>
                          <span>{exercise.name} — {sets} séries × {reps} répétitions</span>
                          <Button onClick={() => startEditingExercise(uesId)}>Modifier</Button>
                        </Space>
                      )}
                    </List.Item>
                  )}
                  locale={{ emptyText: "Aucun exercice dans cette séance" }}
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};
