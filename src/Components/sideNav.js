import React from 'react'
import { Layout, Menu } from "antd";
import {
  EyeOutlined,
  PoweroffOutlined,
  PlusOutlined,
  HomeOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import {useStoreActions, useStoreState} from 'easy-peasy'
import {Link} from 'react-router-dom'

const {Sider } = Layout;
const {SubMenu } = Menu;

const SideNav = (props) => {
    const {logout} = useStoreActions(Actions => Actions.auth);
    const {todos} = useStoreState(State => State.todo)
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
            <Link to="/homepage">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusOutlined />}>
            <Link to="/create-todo">Create Todo</Link>
          </Menu.Item>
          <SubMenu key="todo" icon={<EyeOutlined />} title="View Todos">
              {
                todos.map((main) => (
                  <SubMenu key={main.main.id} title={main.main.title}>
                    {
                      main.main.sub_todos.map((subTodo)=>(
                        <Menu.Item
                        icon={ subTodo.isCompleted ===1 ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : null}
                        key={subTodo.token}
                      >
                        {
                          <Link to={{
                                pathname: `/view-todo/${subTodo.todo}`,
                                state: {
                                  todo: subTodo
                                }
                              }}
                          >                          
                          {subTodo.todo}</Link>
                        }
                      </Menu.Item>
                      ))
                    }
                  
                </SubMenu>
                ))
              }
              
          </SubMenu>
          <Menu.Item onClick={Logout} key="4" icon={<PoweroffOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    );
}

export default SideNav
