import React from 'react';
import { Table, Tag, Typography } from "antd";
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Text } = Typography;

interface PresenceRecord {
  id: string;
  date: string;
  duration: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Props {
  data: PresenceRecord[];
  loading: boolean;
}

const PresenceTable: React.FC<Props> = ({ data, loading }) => {
  const columns: ColumnsType<PresenceRecord> = [
    {
      title: "Employé",
      key: "user",
      render: (_, record) => (
        <div className="flex flex-col">
          <Text strong>{`${record.user.firstName} ${record.user.lastName}`}</Text>
          <Text type="secondary" className="text-xs">{record.user.email}</Text>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: "Durée",
      dataIndex: "duration",
      render: (min: number) => {
        const hours = Math.floor(min / 60);
        const minutes = min % 60;
        return <Text>{min > 0 ? `${hours}h ${minutes}m` : "---"}</Text>;
      },
    },
    {
      title: "Statut",
      key: "status",
      render: (_, record) => {
        const isComplete = record.duration > 0;
        return (
          <Tag color={isComplete ? "green" : "volcano"} className="rounded-full px-3">
            {isComplete ? "COMPLET" : "INCOMPLET"}
          </Tag>
        );
      },
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      rowKey="id" 
      loading={loading}
      pagination={{ pageSize: 10 }}
      className="bg-white"
    />
  );
};

export default PresenceTable;