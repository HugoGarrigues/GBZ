import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Space,
  Card,
  Typography,
  Row,
  Col,
  ConfigProvider,
  theme,
  Input,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

type Muscle = {
  id: number;
  name: string;
};

export const MuscleList: React.FC = () => {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [filteredMuscles, setFilteredMuscles] = useState<Muscle[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newMuscleName, setNewMuscleName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [saving, setSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getToken = () => localStorage.getItem("accessToken") || "";

  const fetchMuscles = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/muscles");
      if (!res.ok) throw new Error("Erreur lors du chargement");
      const data: Muscle[] = await res.json();
      setMuscles(data);
      setFilteredMuscles(data);
    } catch (error: any) {
      message.error(error.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMuscles();
  }, []);

  useEffect(() => {
    setFilteredMuscles(
      muscles.filter((m) =>
        m.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, muscles]);

  const deleteMuscle = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/muscles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      message.success("Muscle supprimé");
      const updated = muscles.filter((m) => m.id !== id);
      setMuscles(updated);
      setFilteredMuscles(
        updated.filter((m) =>
          m.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    }
  };

  const startEdit = (record: Muscle) => {
    setEditingId(record.id);
    setEditingName(record.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = async (id: number) => {
    if (!editingName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3000/muscles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name: editingName.trim() }),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      message.success("Muscle modifié");

      const updated = muscles.map((m) =>
        m.id === id ? { ...m, name: editingName.trim() } : m
      );
      setMuscles(updated);
      setFilteredMuscles(
        updated.filter((m) =>
          m.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      cancelEdit();
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setNewMuscleName("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewMuscleName("");
  };

  const createMuscle = async () => {
    if (!newMuscleName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3000/muscles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name: newMuscleName.trim() }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur lors de la création");
      }
      message.success("Muscle créé");
      setIsModalVisible(false);
      fetchMuscles();
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a: Muscle, b: Muscle) => a.id - b.id,
      render: (text: number) => <span style={{ fontSize: 18 }}>{text}</span>,
    },
    {
      title: "Nom du muscle",
      dataIndex: "name",
      key: "name",
      sorter: (a: Muscle, b: Muscle) => a.name.localeCompare(b.name),
      render: (_: any, record: Muscle) =>
        editingId === record.id ? (
          <Input
            value={editingName}
            onChange={(e) => setEditingName(e.currentTarget.value)}
            onPressEnter={() => saveEdit(record.id)}
            disabled={saving}
            style={{ maxWidth: 300, fontSize: 18 }}
          />
        ) : (
          <span style={{ fontSize: 18 }}>{record.name}</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (_: any, record: Muscle) =>
        editingId === record.id ? (
          <Space size="large">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => saveEdit(record.id)}
              loading={saving}
              size="large"
            />
            <Button
              icon={<CloseOutlined />}
              onClick={cancelEdit}
              disabled={saving}
              size="large"
            />
          </Space>
        ) : (
          <Space size="large">
            <Button
              size="large"
              icon={<EditOutlined />}
              onClick={() => startEdit(record)}
            />
            <Popconfirm
              title="Supprimer ce muscle ?"
              onConfirm={() => deleteMuscle(record.id)}
              okText="Oui"
              cancelText="Non"
            >
              <Button danger size="large" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          colorBgContainer: "#141414",
        },
      }}
    >
      <div style={{ padding: 32, minHeight: "100vh" }}>
        <Card style={{ marginBottom: 32 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ margin: 0, fontSize: 36 }}>
                Liste des Muscles
              </Title>
            </Col>
            <Col>
              <Space size="large">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showModal}
                  size="large"
                >
                  Nouveau
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchMuscles}
                  loading={loading}
                  size="large"
                />
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Input.Search
            placeholder="Rechercher un muscle"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ marginBottom: 24, fontSize: 18, maxWidth: 400 }}
            size="large"
          />
          <Table
            dataSource={filteredMuscles}
            columns={columns}
            rowKey="id"
            loading={loading}
            size="large"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title="Créer un nouveau muscle"
          visible={isModalVisible}
          onOk={createMuscle}
          onCancel={handleCancel}
          confirmLoading={saving}
          okText="Créer"
          cancelText="Annuler"
          centered
          bodyStyle={{ fontSize: 18 }}
          okButtonProps={{ size: "large" }}
          cancelButtonProps={{ size: "large" }}
        >
          <Input
            placeholder="Nom du nouveau muscle"
            value={newMuscleName}
            onChange={(e) => setNewMuscleName(e.currentTarget.value)}
            onPressEnter={createMuscle}
            disabled={saving}
            autoFocus
            size="large"
          />
        </Modal>
      </div>
    </ConfigProvider>
  );
};
