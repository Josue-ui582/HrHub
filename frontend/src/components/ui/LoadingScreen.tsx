import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <Spin indicator={antIcon} />
        <p className="mt-4 text-gray-500 font-medium">Chargement en cours...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;