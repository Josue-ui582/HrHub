import { Form, Input, Button, Card, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { registerUser } from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError("");
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      await registerUser(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );

      navigate("/login");
    } catch (err: any) {
      setError("Erreur lors de l’inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card title="Créer un compte" className="w-full max-w-md shadow-lg">
        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            className="mb-4"
          />
        )}

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label="Prénom"
            name="firstName"
            rules={[{ required: true, message: "Prénom requis" }]}
          >
            <Input placeholder="Votre prénom" />
          </Form.Item>

          <Form.Item
            label="Nom"
            name="lastName"
            rules={[{ required: true, message: "Nom requis" }]}
          >
            <Input placeholder="Votre nom" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email requis" },
              { type: "email", message: "Email invalide" },
            ]}
          >
            <Input placeholder="exemple@email.com" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Mot de passe requis" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirmer le mot de passe"
            name="confirmPassword"
            rules={[{ required: true, message: "Confirmation requise" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              S’inscrire
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
