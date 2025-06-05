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
  Select,
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
const { Option } = Select;

type Exercise = {
  id: number;
  name: string;
};

type Session = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  authorId?: number;
  exercises: Exercise[];
};

export const SessionList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newSessionName, setNewSessionName] = useState("");
  const [newSelectedExerciseIds, setNewSelectedExerciseIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getToken = () => localStorage.getItem("accessToken") || "";

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/sessions", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des sessions");
      const data: Session[] = await res.json();
      setSessions(data);
      setFilteredSessions(data);
    } catch (error: any) {
      message.error(error.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const fetchExercises = async () => {
    try {
      const res = await fetch("http://localhost:3000/exercises", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des exercices");
      const data: Exercise[] = await res.json();
      setExercises(data);
    } catch (error: any) {
      message.error(error.message || "Erreur lors du chargement des exercices");
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchExercises();
  }, []);

  useEffect(() => {
    setFilteredSessions(
      sessions.filter((s) =>
        s.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, sessions]);

  const deleteSession = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/sessions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      message.success("Session supprimée");
      const updated = sessions.filter((s) => s.id !== id);
      setSessions(updated);
      setFilteredSessions(
        updated.filter((s) =>
          s.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    }
  };

  const startEdit = (record: Session) => {
    setEditingId(record.id);
    setEditingName(record.name);
    setSelectedExerciseIds(record.exercises.map((ex) => ex.id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setSelectedExerciseIds([]);
  };

  const saveEdit = async (id: number) => {
    if (!editingName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    if (selectedExerciseIds.length === 0) {
      message.error("Vous devez sélectionner au moins un exercice");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3000/sessions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: editingName.trim(),
          exercisesIds: selectedExerciseIds,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      message.success("Session modifiée");

      const updatedSession = await res.json();

      const updated = sessions.map((s) =>
        s.id === id ? updatedSession : s
      );
      setSessions(updated);
      setFilteredSessions(
        updated.filter((s) =>
          s.name.toLowerCase().includes(searchText.toLowerCase())
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
    setNewSessionName("");
    setNewSelectedExerciseIds([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewSessionName("");
    setNewSelectedExerciseIds([]);
  };

  const createSession = async () => {
    if (!newSessionName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    if (newSelectedExerciseIds.length === 0) {
      message.error("Vous devez sélectionner au moins un exercice");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: newSessionName.trim(),
          exercisesIds: newSelectedExerciseIds,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur lors de la création");
      }
      message.success("Session créée");
      setIsModalVisible(false);
      fetchSessions();
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
      sorter: (a: Session, b: Session) => a.id - b.id,
      render: (id: number) => (
        <span style={{ fontSize: 18, fontWeight: "bold" }}>{id}</span>
      ),
    },
    {
      title: "Nom de la session",
      dataIndex: "name",
      key: "name",
      sorter: (a: Session, b: Session) => a.name.localeCompare(b.name),
      render: (_: any, record: Session) =>
        editingId === record.id ? (
          <Input
            value={editingName}
            onChange={(e) => setEditingName(e.currentTarget.value)}
            onPressEnter={() => saveEdit(record.id)}
            disabled={saving}
            style={{ maxWidth: 250, fontSize: 18, height: 40 }}
          />
        ) : (
          <span style={{ fontSize: 18 }}>{record.name}</span>
        ),
    },
    {
      title: "Exercices liés",
      key: "exercises",
      render: (_: any, record: Session) =>
        editingId === record.id ? (
          <Select
            mode="multiple"
            style={{ minWidth: 300, fontSize: 18 }}
            placeholder="Choisir des exercices"
            value={selectedExerciseIds}
            onChange={(value) => setSelectedExerciseIds(value)}
            loading={loading}
            disabled={saving}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            dropdownStyle={{ fontSize: 18 }}
          >
            {exercises.map((ex) => (
              <Option key={ex.id} value={ex.id}>
                {ex.name}
              </Option>
            ))}
          </Select>
        ) : (
          <span style={{ fontSize: 18 }}>
            {record.exercises.map((ex) => ex.name).join(", ") || "—"}
          </span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (_: any, record: Session) =>
        editingId === record.id ? (
          <Space>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => saveEdit(record.id)}
              loading={saving}
              style={{ height: 38, fontSize: 16 }}
            />
            <Button
              icon={<CloseOutlined />}
              onClick={cancelEdit}
              disabled={saving}
              style={{ height: 38, fontSize: 16 }}
            />
          </Space>
        ) : (
          <Space>
            <Button
              size="middle"
              icon={<EditOutlined />}
              onClick={() => startEdit(record)}
              style={{ height: 38, fontSize: 16 }}
            />
            <Popconfirm
              title="Supprimer cette session ?"
              onConfirm={() => deleteSession(record.id)}
              okText="Oui"
              cancelText="Non"
            >
              <Button
                danger
                size="middle"
                icon={<DeleteOutlined />}
                style={{ height: 38, fontSize: 16 }}
              />
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
              <Title
                level={2}
                style={{ margin: 0, fontSize: 32, fontWeight: "bold" }}
              >
                Liste des Sessions
              </Title>
            </Col>
            <Col>
              <Space size="large">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showModal}
                  size="large"
                  style={{ fontSize: 18, height: 48, padding: "0 24px" }}
                >
                  Nouvelle session
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchSessions}
                  loading={loading}
                  size="large"
                  style={{ fontSize: 18, height: 48 }}
                />
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Input.Search
            placeholder="Rechercher une session"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{
              marginBottom: 24,
              fontSize: 20,
              height: 48,
              padding: "0 16px",
            }}
          />
          <Table
            dataSource={filteredSessions}
            columns={columns}
            rowKey="id"
            loading={loading}
            size="middle"
            pagination={{ pageSize: 8 }}
            style={{ fontSize: 20 }}
            scroll={{ x: "max-content" }}
          />
        </Card>

        <Modal
          title={<span style={{ fontSize: 24 }}>Créer une nouvelle session</span>}
          visible={isModalVisible}
          onOk={createSession}
          onCancel={handleCancel}
          confirmLoading={saving}
          okText="Créer"
          cancelText="Annuler"
          centered
          bodyStyle={{ fontSize: 20 }}
          okButtonProps={{ style: { fontSize: 18, height: 44 } }}
          cancelButtonProps={{ style: { fontSize: 18, height: 44 } }}
        >
          <Input
            placeholder="Nom de la nouvelle session"
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.currentTarget.value)}
            onPressEnter={createSession}
            disabled={saving}
            autoFocus
            style={{ fontSize: 20, height: 44, marginBottom: 16 }}
          />
          <Select
            mode="multiple"
            style={{ width: "100%", fontSize: 18 }}
            placeholder="Choisir des exercices"
            value={newSelectedExerciseIds}
            onChange={(value) => setNewSelectedExerciseIds(value)}
            loading={loading}
            disabled={saving}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            dropdownStyle={{ fontSize: 18 }}
          >
            {exercises.map((ex) => (
              <Option key={ex.id} value={ex.id}>
                {ex.name}
              </Option>
            ))}
          </Select>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
