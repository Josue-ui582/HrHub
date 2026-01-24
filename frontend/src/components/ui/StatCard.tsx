import { Card, Statistic } from "antd";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

 const StatCard = ({ title, value, icon, color = "#1890ff" } : StatCardProps) => {
  return (
    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
      <Statistic 
        title={<span className="text-gray-400 uppercase text-xs font-bold">{title}</span>}
        value={value}
        valueStyle={{ color: '#1f1f1f', fontWeight: '700' }}
        prefix={<span style={{ color }}>{icon}</span>}
      />
    </Card>
  );
}

export default StatCard;