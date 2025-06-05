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

type Session = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  authorId?: number;
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

export const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newProgramName, setNewProgramName] = useState("");
  const [newSelectedSessionIds, setNewSelectedSessionIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [selectedSessionIds, setSelectedSessionIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  const getToken = () => localStorage.getItem("accessToken") || "";

  // Charger les programs
  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/programs", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des programmes");
      const data: Program[] = await res.json();
      setPrograms(data);
      setFilteredPrograms(data);
    } catch (error: any) {
      message.error(error.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  // Charger toutes les sessions (pour sélection multiple)
  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:3000/sessions", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des sessions");
      const data: Session[] = await res.json();
      setSessions(data);
    } catch (error: any) {
      message.error(error.message || "Erreur lors du chargement des sessions");
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchSessions();
  }, []);

  useEffect(() => {
    setFilteredPrograms(
      programs.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, programs]);

  // Supprimer un program
  const deleteProgram = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/programs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      message.success("Programme supprimé");
      const updated = programs.filter((p) => p.id !== id);
      setPrograms(updated);
      setFilteredPrograms(
        updated.filter((p) =>
          p.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    }
  };

  // Commencer l'édition
  const startEdit = (record: Program) => {
    setEditingId(record.id);
    setEditingName(record.name);
    setSelectedSessionIds(record.sessions.map((s) => s.id));
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setSelectedSessionIds([]);
  };

  // Sauvegarder l'édition
  const saveEdit = async (id: number) => {
    if (!editingName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3000/programs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: editingName.trim(),
          sessionsIds: selectedSessionIds,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      message.success("Programme modifié");

      const updatedProgram = await res.json();

      const updated = programs.map((p) =>
        p.id === id ? updatedProgram : p
      );
      setPrograms(updated);
      setFilteredPrograms(
        updated.filter((p) =>
          p.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      cancelEdit();
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  // Modal création
  const showModal = () => {
    setIsModalVisible(true);
    setNewProgramName("");
    setNewSelectedSessionIds([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewProgramName("");
    setNewSelectedSessionIds([]);
  };

  const createProgram = async () => {
    if (!newProgramName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3000/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: newProgramName.trim(),
          description: "",
          sessionsIds: newSelectedSessionIds,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur lors de la création");
      }
      message.success("Programme créé");
      setIsModalVisible(false);
      fetchPrograms();
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
      sorter: (a: Program, b: Program) => a.id - b.id,
      render: (id: number) => (
        <span style={{ fontSize: 18, fontWeight: "bold" }}>{id}</span>
      ),
    },
    {
      title: "Nom du programme",
      dataIndex: "name",
      key: "name",
      sorter: (a: Program, b: Program) => a.name.localeCompare(b.name),
      render: (_: any, record: Program) =>
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
      title: "Sessions liées",
      key: "sessions",
      render: (_: any, record: Program) =>
        editingId === record.id ? (
          <Select
            mode="multiple"
            style={{ minWidth: 300, fontSize: 18 }}
            placeholder="Choisir des sessions"
            value={selectedSessionIds}
            onChange={(value) => setSelectedSessionIds(value)}
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
            {sessions.map((s) => (
              <Option key={s.id} value={s.id}>
                {s.name}
              </Option>
            ))}
          </Select>
        ) : (
          <span style={{ fontSize: 18 }}>
            {record.sessions.map((s) => s.name).join(", ") || "—"}
          </span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (_: any, record: Program) =>
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
              title="Supprimer ce programme ?"
              onConfirm={() => deleteProgram(record.id)}
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
              <Title level={2} style={{ margin: 0, fontSize: 32, fontWeight: "bold" }}>
                Liste des Programmes
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
                  Nouveau programme
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchPrograms}
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
            placeholder="Rechercher un programme"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ marginBottom: 24, fontSize: 20, height: 48, padding: "0 16px" }}
          />
          <Table
            dataSource={filteredPrograms}
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
          title={<span style={{ fontSize: 24 }}>Créer un nouveau programme</span>}
          visible={isModalVisible}
          onOk={createProgram}
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
            placeholder="Nom du nouveau programme"
            value={newProgramName}
            onChange={(e) => setNewProgramName(e.currentTarget.value)}
            onPressEnter={createProgram}
            disabled={saving}
            autoFocus
            style={{ fontSize: 20, height: 44, marginBottom: 16 }}
          />

          <Select
            mode="multiple"
            placeholder="Choisir des sessions"
            value={newSelectedSessionIds}
            onChange={(value) => setNewSelectedSessionIds(value)}
            loading={loading}
            disabled={saving}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            dropdownStyle={{ fontSize: 18 }}
            style={{ width: "100%", fontSize: 18 }}
          >
            {sessions.map((s) => (
              <Option key={s.id} value={s.id}>
                {s.name}
              </Option>
            ))}
          </Select>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
