import React, { useState } from "react";
import { AuthPage } from "@refinedev/antd";
import { Form, Input, Button, Alert } from "antd";
import { authProvider } from "../providers/AuthProvider"; // importe le authProvider

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
    <AuthPage type="register">
      <Form layout="vertical" onFinish={onFinish}>
        {error && (
          <Form.Item>
            <Alert message={error} type="error" showIcon />
          </Form.Item>
        )}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </AuthPage>
  );
};

export default Register;
