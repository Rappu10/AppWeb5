import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MenuDynamic from "../models/MenuDynamic";

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200}>
        <MenuDynamic />
      </Sider>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", padding: "2%", background: "#fff" }}
        >
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Dashboard;