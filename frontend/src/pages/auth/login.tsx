import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { Alert, Button, Card, Form, Input } from "antd";



const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState("");

    const onFinish = async (value : {email: string, password: string}) => {
        setError("");
        try {
            const response = await loginUser(value.email, value.password) as any;
            login(response.user, response.token);

            if (response.user.role === "admin") {
                navigate("/admin")
            }else {
                navigate("/dashboard")
            }
        } catch (err: any) {
            setError(err.message || "Erreur de connexion");
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card
                title="Connexion"
                className="w-full max-w-md shadow-lg"
            >
                {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
                )}

                <Form
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                    { required: true, message: "Veuillez entrer votre email" },
                    { type: "email", message: "Email invalide" },
                    ]}
                >
                    <Input placeholder="exemple@email.com" />
                </Form.Item>

                <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[
                    { required: true, message: "Veuillez entrer votre mot de passe" },
                    ]}
                >
                    <Input.Password placeholder="Votre mot de passe" />
                </Form.Item>

                <Form.Item>
                    <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="bg-blue-600 hover:bg-blue-700"
                    >
                    Se connecter
                    </Button>
                </Form.Item>
                <p className="text-center">Vous n'avez pas encore un compte ? <Link to="/register" className="text-blue-600 underline">Inscrivez-vous</Link></p>
                </Form>
            </Card>
        </div>
    )
}

export default Login;