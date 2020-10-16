import React from 'react'
import { Layout, Menu } from "antd";
import {
  EyeOutlined,
  PoweroffOutlined,
  PlusOutlined,
  HomeOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import {useStoreActions} from 'easy-peasy'
import {Link} from 'react-router-dom'

const {Sider } = Layout;
const {SubMenu } = Menu;

const SideNav = (props) => {
    const {logout} = useStoreActions(Actions => Actions.auth);
    const Logout = () => {
        logout()
    }
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme="light"
      >
        <div
          className="logo"
          style={{ textAlign: "center", marginLeft: "10px" }}
        >
          <p theme="dark">Space Repetition</p>
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusOutlined />}>
            <Link to="/create-todo">Create Todo</Link>
          </Menu.Item>
          <SubMenu key="todo" icon={<EyeOutlined />} title="View Todos">
            <SubMenu
              icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
              key="sub3"
              title="Learn React"
            >
              <Menu.Item
                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                key="7"
              >
                <Link to="/view-todo/1">UseState</Link>
              </Menu.Item>
              <Menu.Item
                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                key="8"
              >
                useEffect
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="5"
              icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
            >
              Learn Javacript
            </Menu.Item>
            <SubMenu key="sub4" title="Learn Laravel">
              <Menu.Item
                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                key="7"
              >
                Routing
              </Menu.Item>
              <Menu.Item key="8">Middleware</Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item onClick={Logout} key="4" icon={<PoweroffOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    );
}

export default SideNav
