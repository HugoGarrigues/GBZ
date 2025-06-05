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
  Switch,
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

type Muscle = {
  id: number;
  name: string;
};

type Exercise = {
  id: number;
  name: string;
  description?: string;
  published: boolean;
  muscles: Muscle[];
};

export const ExerciseList: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseDescription, setNewExerciseDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [selectedMuscleIds, setSelectedMuscleIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getToken = () => localStorage.getItem("accessToken") || "";

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/exercises", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des exercices");
      const data: Exercise[] = await res.json();
      setExercises(data);
      setFilteredExercises(data);
    } catch (error: any) {
      message.error(error.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const fetchMuscles = async () => {
    try {
      const res = await fetch("http://localhost:3000/muscles", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des muscles");
      const data: Muscle[] = await res.json();
      setMuscles(data);
    } catch (error: any) {
      message.error(error.message || "Erreur lors du chargement des muscles");
    }
  };

  useEffect(() => {
    fetchExercises();
    fetchMuscles();
  }, []);

  useEffect(() => {
    setFilteredExercises(
      exercises.filter((ex) =>
        ex.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, exercises]);

  const deleteExercise = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/exercises/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      message.success("Exercice supprimé");
      const updated = exercises.filter((ex) => ex.id !== id);
      setExercises(updated);
      setFilteredExercises(
        updated.filter((ex) =>
          ex.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    }
  };

  const startEdit = (record: Exercise) => {
    setEditingId(record.id);
    setEditingName(record.name);
    setEditingDescription(record.description || "");
    setSelectedMuscleIds(record.muscles.map((m) => m.id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditingDescription("");
    setSelectedMuscleIds([]);
  };

  const saveEdit = async (id: number) => {
    if (!editingName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3000/exercises/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: editingName.trim(),
          description: editingDescription.trim(),
          musclesIds: selectedMuscleIds,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      message.success("Exercice modifié");

      const updatedExercise = await res.json();

      const updated = exercises.map((ex) =>
        ex.id === id ? updatedExercise : ex
      );
      setExercises(updated);
      setFilteredExercises(
        updated.filter((ex) =>
          ex.name.toLowerCase().includes(searchText.toLowerCase())
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
    setNewExerciseName("");
    setNewExerciseDescription("");
    setSelectedMuscleIds([]);
  };

  const togglePublished = async (record: Exercise) => {
    try {
      const res = await fetch(`http://localhost:3000/exercises/${record.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ published: !record.published }),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");
  
      const updated = await res.json();
      const newList = exercises.map((ex) =>
        ex.id === record.id ? updated : ex
      );
      setExercises(newList);
      setFilteredExercises(
        newList.filter((ex) =>
          ex.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewExerciseName("");
    setNewExerciseDescription("");
    setSelectedMuscleIds([]);
  };

  const createExercise = async () => {
    if (!newExerciseName.trim()) {
      message.error("Le nom ne peut pas être vide");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3000/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: newExerciseName.trim(),
          description: newExerciseDescription.trim(),
          musclesIds: selectedMuscleIds,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur lors de la création");
      }
      message.success("Exercice créé");
      setIsModalVisible(false);
      fetchExercises();
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
      sorter: (a: Exercise, b: Exercise) => a.id - b.id,
      render: (id: number) => (
        <span style={{ fontSize: 18, fontWeight: "bold" }}>{id}</span>
      ),
    },
    {
      title: "Nom de l'exercice",
      dataIndex: "name",
      key: "name",
      sorter: (a: Exercise, b: Exercise) => a.name.localeCompare(b.name),
      render: (_: any, record: Exercise) =>
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: any, record: Exercise) =>
        editingId === record.id ? (
          <Input.TextArea
            value={editingDescription}
            onChange={(e) => setEditingDescription(e.currentTarget.value)}
            disabled={saving}
            style={{ maxWidth: 300, fontSize: 16, height: 80 }}
          />
        ) : (
          <span style={{ fontSize: 16, whiteSpace: "pre-wrap" }}>
            {record.description || "—"}
          </span>
        ),
    },
    {
      title: "Muscles associés",
      key: "muscles",
      render: (_: any, record: Exercise) =>
        editingId === record.id ? (
          <Select
            mode="multiple"
            style={{ minWidth: 300, fontSize: 18 }}
            placeholder="Choisir des muscles"
            value={selectedMuscleIds}
            onChange={(value) => setSelectedMuscleIds(value)}
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
            {muscles.map((m) => (
              <Option key={m.id} value={m.id}>
                {m.name}
              </Option>
            ))}
          </Select>
        ) : (
          <span style={{ fontSize: 18 }}>
            {record.muscles.map((m) => m.name).join(", ") || "—"}
          </span>
        ),
    },
    {
      title: "Publié",
      dataIndex: "published",
      key: "published",
      width: 120,
      align: "center" as const,
      render: (_: any, record: Exercise) => (
        <Switch
          checked={record.published}
          onChange={() => togglePublished(record)}
          checkedChildren=""
          unCheckedChildren=""
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (_: any, record: Exercise) =>
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
              title="Supprimer cet exercice ?"
              onConfirm={() => deleteExercise(record.id)}
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
                Liste des Exercices
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
                  Nouvel exercice
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchExercises}
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
            placeholder="Rechercher un exercice"
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
            dataSource={filteredExercises}
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
          title={<span style={{ fontSize: 24 }}>Créer un nouvel exercice</span>}
          visible={isModalVisible}
          onOk={createExercise}
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
            placeholder="Nom de l'exercice"
            value={newExerciseName}
            onChange={(e) => setNewExerciseName(e.currentTarget.value)}
            disabled={saving}
            style={{ fontSize: 20, height: 44, marginBottom: 16 }}
            autoFocus
          />
          <Input.TextArea
            placeholder="Description (optionnelle)"
            value={newExerciseDescription}
            onChange={(e) => setNewExerciseDescription(e.currentTarget.value)}
            disabled={saving}
            style={{ fontSize: 18, height: 80, marginBottom: 16 }}
          />
          <Select
            mode="multiple"
            placeholder="Choisir des muscles associés"
            value={selectedMuscleIds}
            onChange={(value) => setSelectedMuscleIds(value)}
            loading={loading}
            disabled={saving}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            style={{ width: "100%", fontSize: 18 }}
            dropdownStyle={{ fontSize: 18 }}
          >
            {muscles.map((m) => (
              <Option key={m.id} value={m.id}>
                {m.name}
              </Option>
            ))}
          </Select>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
