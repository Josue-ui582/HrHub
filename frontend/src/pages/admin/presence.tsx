import { useEffect, useState } from "react";
import { Card, Input, Space, Typography, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getAllPresence } from "../../services/presence.service";
import PresenceTable from "./presenceTable";

const { Title } = Typography;

interface PresenceRecord {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  date: string;
  duration: number;
}

const PresencePage = () => {
  const [data, setData] = useState<PresenceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllPresence();
        
        if (Array.isArray(res)) {
          setData(res);
        } else if (res && typeof res === 'object' && Array.isArray(res.presences)) {
          setData(res.presences);
        } else {
          console.error("Format de réponse invalide:", res);
          setData([]);
        }
      } catch (err: any) {
        message.error("Erreur de connexion au serveur");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = Array.isArray(data) 
    ? data.filter((item) => 
        `${item.user?.firstName} ${item.user?.lastName}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex md:flex-row flex-col justify-between items-center gap-4">
        <div>
          <Title level={2} style={{ margin: 0 }} className="text-center">Registre des Présences</Title>
          <Typography.Text type="secondary">Historique détaillé des pointages</Typography.Text>
        </div>
        <Space>
          <Input 
            placeholder="Rechercher un employé..." 
            prefix={<SearchOutlined />} 
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
        </Space>
      </div>

      <Card className="shadow-sm border-0">
        <PresenceTable data={filteredData} loading={loading} />
      </Card>
    </div>
  );
}

export default PresencePage;