import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, List, Typography, Spin, Alert } from "antd";

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
  published: boolean;
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
  sessions: Session[];
  exercises: Exercise[];
};

export const UserShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("accessToken") || "";

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/users/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de l'utilisateur");
        return res.json();
      })
      .then((data: User) => setUser(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

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
          dataSource={user?.programs || []}
          renderItem={(program) => (
            <List.Item key={program.id}>
              <strong>{program.name}</strong> — {program.description || "Pas de description"}
            </List.Item>
          )}
          locale={{ emptyText: "Aucun programme" }}
        />
      </Card>

      <Card title="Séances" style={{ marginTop: 24 }}>
        <List
          dataSource={user?.sessions || []}
          renderItem={(session) => (
            <List.Item key={session.id}>
              {session.name}
            </List.Item>
          )}
          locale={{ emptyText: "Aucune séance" }}
        />
      </Card>

      <Card title="Exercices" style={{ marginTop: 24 }}>
        <List
          dataSource={user?.exercises || []}
          renderItem={(exercise) => (
            <List.Item key={exercise.id}>
              <strong>{exercise.name}</strong>: {exercise.description}
            </List.Item>
          )}
          locale={{ emptyText: "Aucun exercice" }}
        />
      </Card>
    </div>
  );
};
