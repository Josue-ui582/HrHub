import { useEffect, useState } from "react";
import { Row, Col, message, Alert } from "antd";
import { UserOutlined, ClockCircleOutlined, RiseOutlined } from "@ant-design/icons";
import { fetchWeeklyReport } from "../../services/report.service";
import StatCard from "../../components/ui/StatCard";
import LoadingScreen from "../../components/ui/LoadingScreen";

interface WeeklyReport {
  id: string;
  totalHours: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function Dashboard() {
  const [report, setReport] = useState<WeeklyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeeklyReport();
        setReport(data);
      } catch (err: any) {
        setError(err.message);
        message.error("Erreur lors de la récupération du rapport");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalHours = report.reduce((sum, r) => sum + r.totalHours, 0);

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      <h1 className="lg:text-2xl text-xl font-bold text-gray-800">Tableau de Bord Hebdomadaire</h1>
      
      {error && <Alert message="Erreur" description={error} type="error" showIcon className="mb-6" />}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="Employés actifs" 
            value={report.length} 
            icon={<UserOutlined />} 
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="Heures totales" 
            value={`${totalHours.toFixed(2)}h`} 
            icon={<ClockCircleOutlined />} 
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="Moyenne / employé" 
            value={`${(totalHours / (report.length || 1)).toFixed(1)}h`} 
            icon={<RiseOutlined />} 
            color="#faad14"
          />
        </Col>
      </Row>
    </div>
  );
}