import { Layout, Menu, Typography, type MenuProps } from "antd";
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  LogoutOutlined, 
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Tableau de Bord",
    },
    {
      key: "/admin/presence",
      icon: <CalendarOutlined />,
      label: "Gestion des Présences",
    },
    {
      key: "divider-1",
      type: "divider",
    },
    {
      key: "/admin/profile",
      icon: <UserOutlined />,
      label: "Mon Profil",
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Déconnexion",
      danger: true,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider 
        theme="light" 
        breakpoint="lg" 
        collapsedWidth="80"
        className="border-r border-gray-200"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg shrink-0" />
          <Title level={4} style={{ margin: 0 }} className="hidden lg:block">
            ADMIN
          </Title>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="border-none"
        />
      </Sider>

      <Layout className="bg-[#f9fafb]">
        <Content className="p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;