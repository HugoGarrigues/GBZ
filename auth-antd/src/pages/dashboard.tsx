import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Space, Spin, Alert } from "antd";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type User = {
  id: string;
  name: string;
  email: string;
};

export const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("Aucun token trouvé.");
        }

        const response = await fetch("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Échec de récupération des données utilisateur.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Row gutter={[32, 32]} style={{ padding: "30px" }}>
      <Col span={12}>
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
          {loading ? (
            <Spin />
          ) : error ? (
            <Alert type="error" message={error} />
          ) : (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space>
                <UserOutlined />
                <Text strong>Nom :</Text>
                <Text>{user?.name}</Text>
              </Space>

              <Space>
                <MailOutlined />
                <Text strong>Email :</Text>
                <Text>{user?.email}</Text>
              </Space>

              <Space>
                <IdcardOutlined />
                <Text strong>ID :</Text>
                <Text>{user?.id}</Text>
              </Space>
            </Space>
          )}
        </Card>
      </Col>

      <Col span={12}>
        <Card
          title={
            <Title level={4} style={{ margin: 0, textAlign: "center" }}>
              Permissions
            </Title>
          }
          style={{
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Text type="secondary">Fonctionnalité à venir...</Text>
        </Card>
      </Col>
    </Row>
  );
};
