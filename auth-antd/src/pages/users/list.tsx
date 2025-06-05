import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
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
  Checkbox,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [editingIsAdmin, setEditingIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);

  const getToken = () => localStorage.getItem("accessToken") || "";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs");
      const data: User[] = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(searchText.toLowerCase()) ||
          u.email.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, users]);

  const deleteUser = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      message.success("Utilisateur supprimé");
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      setFilteredUsers(updated);
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditingName(user.name);
    setEditingEmail(user.email);
    setEditingIsAdmin(user.isAdmin);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditingEmail("");
    setEditingIsAdmin(false);
  };

  const saveEdit = async (id: number) => {
    if (!editingName.trim() || !editingEmail.trim()) {
      return message.error("Nom et email sont requis");
    }
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: editingName.trim(),
          email: editingEmail.trim(),
          isAdmin: editingIsAdmin,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      const updatedUser = await res.json();
      const updated = users.map((u) => (u.id === id ? updatedUser : u));
      setUsers(updated);
      setFilteredUsers(updated);
      message.success("Utilisateur modifié");
      cancelEdit();
    } catch (error: any) {
      message.error(error.message || "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  const createUser = async () => {
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      return message.error("Tous les champs sont requis");
    }
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim(),
          password: newPassword
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur lors de la création");
      }
      message.success("Utilisateur créé");
      setIsModalVisible(false);
      fetchUsers();
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
      width: 80,
      sorter: (a: User, b: User) => a.id - b.id,
      render: (id: number) => <strong>{id}</strong>,
    },
    {
      title: "Nom",
      dataIndex: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      render: (_: any, record: User) =>
        editingId === record.id ? (
          <Input
            value={editingName}
            onChange={(e) => setEditingName(e.currentTarget.value)}
            onPressEnter={() => saveEdit(record.id)}
            disabled={saving}
          />
        ) : (
          record.name
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
      render: (_: any, record: User) =>
        editingId === record.id ? (
          <Input
            value={editingEmail}
            onChange={(e) => setEditingEmail(e.currentTarget.value)}
            onPressEnter={() => saveEdit(record.id)}
            disabled={saving}
          />
        ) : (
          record.email
        ),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      width: 100,
      render: (_: any, record: User) =>
        editingId === record.id ? (
          <Checkbox
            checked={editingIsAdmin}
            onChange={(e) => setEditingIsAdmin(e.target.checked)}
            disabled={saving}
          />
        ) : record.isAdmin ? (
          <span style={{ color: "green", fontWeight: "bold" }}>Oui</span>
        ) : (
          "Non"
        ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (_: any, record: User) =>
        editingId === record.id ? (
          <Space>
            <Link to={`/users/${record.id}/show`}>
              <Button icon={<EyeOutlined />} />
            </Link>
            <Button icon={<SaveOutlined />} onClick={() => saveEdit(record.id)} loading={saving} />
            <Button icon={<CloseOutlined />} onClick={cancelEdit} disabled={saving} />
          </Space>
        ) : (
          <Space>
            <Link to={`/users/${record.id}/show`}>
              <Button icon={<EyeOutlined />} />
            </Link>
            <Button icon={<EditOutlined />} onClick={() => startEdit(record)} />
            <Popconfirm
              title="Supprimer cet utilisateur ?"
              onConfirm={() => deleteUser(record.id)}
              okText="Oui"
              cancelText="Non"
            >
              <Button danger icon={<DeleteOutlined />} />
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
      <div style={{ padding: 32 }}>
        <Card>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2}>Liste des Utilisateurs</Title>
            </Col>
            <Col>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouvel utilisateur
                </Button>
                <Button icon={<ReloadOutlined />} onClick={fetchUsers} loading={loading} />
              </Space>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Input.Search
            placeholder="Rechercher un utilisateur"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ marginBottom: 16 }}
          />
          <Table
            dataSource={filteredUsers}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title="Créer un nouvel utilisateur"
          open={isModalVisible}
          onOk={createUser}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={saving}
          okText="Créer"
          cancelText="Annuler"
        >
          <Input
            placeholder="Nom"
            value={newName}
            onChange={(e) => setNewName(e.currentTarget.value)}
            style={{ marginBottom: 12 }}
          />
          <Input
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.currentTarget.value)}
            style={{ marginBottom: 12 }}
          />
          <Input.Password
            placeholder="Mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            style={{ marginBottom: 12 }}
          />
        </Modal>
      </div>
    </ConfigProvider>
  );
};
