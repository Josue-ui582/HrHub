import { Card, Button, message, Typography, Space, Divider } from "antd";
import { LoginOutlined, LogoutOutlined, HistoryOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Pour la navigation
import { checkIn, checkOut } from "../../services/presence.service";

const { Title, Text } = Typography;

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleCheckIn = async () => {
    try {
      await checkIn();
      message.success("Arrivée enregistrée avec succès");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut();
      message.success("Départ enregistré avec succès");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px' 
    }}>
      <Card 
        style={{ width: '100%', maxWidth: 500, textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2} style={{ marginBottom: 0 }}>Dashboard</Title>
            <Text type="secondary">Gérez votre pointage quotidien</Text>
          </div>

          <Divider />

          <div style={{ padding: '20px 0' }}>
            <Title level={4}>Statut de présence</Title>
            <Space size="middle">
              <Button 
                type="primary" 
                size="large" 
                icon={<LoginOutlined />} 
                onClick={handleCheckIn}
                style={{ height: '50px', borderRadius: '8px' }}
              >
                Pointer l'Arrivée
              </Button>
              <Button 
                danger 
                size="large" 
                icon={<LogoutOutlined />} 
                onClick={handleCheckOut}
                style={{ height: '50px', borderRadius: '8px' }}
              >
                Pointer le Départ
              </Button>
            </Space>
          </div>

          <Divider />

          <Button 
            type="default" 
            icon={<HistoryOutlined />} 
            onClick={() => navigate("/dashboard/history")}
            block
          >
            Consulter mon historique
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default UserDashboard;