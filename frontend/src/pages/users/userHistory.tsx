import { useEffect, useState } from "react";
import { Table, Card, Typography, Tag, Button, Space, Breadcrumb } from "antd";
import { HistoryOutlined, ArrowLeftOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getMyHistory } from "../../services/presence.service";
import dayjs from "dayjs";
import { formatDisplayTime, formatDurationFriendly } from "../../utils/dateFormatter";

const { Title, Text } = Typography;

const UserHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getMyHistory()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => (
        <Space>
          <CalendarOutlined style={{ color: '#1890ff' }} />
          <Text strong>{dayjs(text).format('DD MMM YYYY')}</Text>
        </Space>
      ),
    },
    {
      title: "Heure d'Arrivée",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (time: string) => (
        <Tag color="green" icon={<ClockCircleOutlined />}>
          {formatDisplayTime(time)}
        </Tag>
      ),
    },
    {
      title: "Heure de Départ",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (time: string) => (
        <Tag color={time ? "orange" : "default"} icon={<ClockCircleOutlined />}>
          {formatDisplayTime(time)}
        </Tag>
      ),
    },
    {
      title: "Durée Totale",
      dataIndex: "duration",
      key: "duration",
      render: (duration: string) => (
        <Text type="secondary" italic>
          {formatDurationFriendly(duration)}
        </Text>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        <Breadcrumb style={{ marginBottom: '16px' }}>
          <Breadcrumb.Item><a onClick={() => navigate("/dashboard")}>Dashboard</a></Breadcrumb.Item>
          <Breadcrumb.Item>Historique</Breadcrumb.Item>
        </Breadcrumb>

        <Card 
          bordered={false}
          style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Space direction="vertical" size={0}>
              <Title level={3} style={{ margin: 0 }}>
                <HistoryOutlined /> Mon Historique de Présence
              </Title>
              <Text type="secondary">Consultez vos relevés d'entrées et de sorties</Text>
            </Space>
            
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate(-1)}
            >
              Retour
            </Button>
          </div>

          <Table 
            dataSource={data} 
            columns={columns} 
            rowKey="id" 
            loading={loading}
            pagination={{ pageSize: 10 }}
            style={{ marginTop: '10px' }}
            onRow={() => ({
              style: { cursor: 'pointer' }
            })}
          />
        </Card>
      </div>
    </div>
  );
};

export default UserHistory;