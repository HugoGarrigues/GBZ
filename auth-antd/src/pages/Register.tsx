import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserAddOutlined, MailOutlined, LockOutlined, UserOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { authProvider } from "../providers/AuthProvider";

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    const { name, email, password } = values;

    const result = await authProvider.register?.({ name, email, password });

    setLoading(false);

    if (result?.success) {
      // rediriger vers login
      window.location.href = result.redirectTo || "/login";
    } else {
      setError(result?.error?.message || "Registration failed");
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(31, 41, 55, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid #374151',
        padding: '40px',
        minWidth: '400px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <ThunderboltOutlined style={{ color: '#6366f1' }} />
            FitnessApp
          </div>
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '16px',
            margin: 0 
          }}>
            Créez votre compte
          </p>
        </div>

        {/* Form */}
        <Form 
          layout="vertical" 
          onFinish={onFinish}
          size="large"
          style={{
            '.ant-form-item-label > label': {
              color: '#f9fafb !important',
              fontWeight: '500',
            }
          }}
        >
          {error && (
            <Form.Item style={{ marginBottom: '24px' }}>
              <Alert 
                message={error} 
                type="error" 
                showIcon 
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                }}
              />
            </Form.Item>
          )}

          <Form.Item
            name="name"
            label={<span style={{ color: '#f9fafb', fontWeight: '500' }}>Nom complet</span>}
            rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
            style={{ marginBottom: '20px' }}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#6b7280' }} />}
              placeholder="Entrez votre nom complet"
              style={{
                background: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '8px',
                padding: '12px',
                color: '#f9fafb',
                fontSize: '14px',
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ color: '#f9fafb', fontWeight: '500' }}>Email</span>}
            rules={[
              { required: true, message: "Veuillez entrer votre email" },
              { type: "email", message: "Veuillez entrer un email valide" },
            ]}
            style={{ marginBottom: '20px' }}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#6b7280' }} />}
              placeholder="Entrez votre email"
              style={{
                background: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '8px',
                padding: '12px',
                color: '#f9fafb',
                fontSize: '14px',
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: '#f9fafb', fontWeight: '500' }}>Mot de passe</span>}
            rules={[
              { required: true, message: "Veuillez entrer votre mot de passe" },
              { min: 6, message: "Le mot de passe doit contenir au moins 6 caractères" }
            ]}
            style={{ marginBottom: '32px' }}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#6b7280' }} />}
              placeholder="Entrez votre mot de passe"
              style={{
                background: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '8px',
                padding: '12px',
                color: '#f9fafb',
                fontSize: '14px',
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '24px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block
              icon={<UserAddOutlined />}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '8px',
                height: '48px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3)';
              }}
            >
              Créer mon compte
            </Button>
          </Form.Item>

          {/* Link to login */}
          <div style={{
            textAlign: 'center',
            paddingTop: '16px',
            borderTop: '1px solid #374151',
          }}>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              Déjà un compte ?{' '}
              <a 
                href="/login" 
                style={{ 
                  color: '#6366f1',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#a5b4fc'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6366f1'}
              >
                Se connecter
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;