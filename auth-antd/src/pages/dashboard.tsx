import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Space, Spin, Alert, Tag } from "antd";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  CalendarOutlined,
  LockOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

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

export const DashboardPage: React.FC = () => {
  const [basicUser, setBasicUser] = useState<BasicUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingBasicUser, setLoadingBasicUser] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  useEffect(() => {
    const fetchBasicUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Aucun token trouvé.");

        const res = await fetch("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération du profil.");

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
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Aucun token trouvé.");

        const res = await fetch(`http://localhost:3000/users/${basicUser.id}`, {
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

  return (
    <Row justify="center" gutter={[16, 16]} style={{ padding: "20px" }}>
      <Col span={24} md={16} lg={12} xl={10}>
        <Card
          title={
            <Title level={4} style={{ margin: 0, textAlign: "center" }}>
              Profil utilisateur
            </Title>
          }
          style={{
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {isLoading ? (
            <Spin tip="Chargement..." />
          ) : error ? (
            <Alert type="error" message={error} />
          ) : user ? (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space>
                <UserOutlined />
                <Text strong>Nom :</Text>
                <Text>{user.name}</Text>
              </Space>

              <Space>
                <MailOutlined />
                <Text strong>Email :</Text>
                <Text>{user.email}</Text>
              </Space>

              <Space>
                <IdcardOutlined />
                <Text strong>ID :</Text>
                <Text>{user.id}</Text>
              </Space>

              <Space>
                <LockOutlined />
                <Text strong>Rôle :</Text>
                {user.isAdmin ? (
                  <Tag icon={<CheckCircleOutlined />} color="green">
                    Administrateur
                  </Tag>
                ) : (
                  <Tag color="blue">Utilisateur</Tag>
                )}
              </Space>

              <Space>
                <CalendarOutlined />
                <Text strong>Créé le :</Text>
                <Text>{formatDate(user.createdAt)}</Text>
              </Space>

              <Space>
                <FieldTimeOutlined />
                <Text strong>Dernière mise à jour :</Text>
                <Text>{formatDate(user.updatedAt)}</Text>
              </Space>

              <Space>
                <ProfileOutlined />
                <Text strong>Nombre de programmes :</Text>
                <Text>{user.programs?.length ?? 0}</Text>
              </Space>
            </Space>
          ) : (
            <Text>Aucune donnée utilisateur disponible.</Text>
          )}
        </Card>
      </Col>
    </Row>
  );
};
