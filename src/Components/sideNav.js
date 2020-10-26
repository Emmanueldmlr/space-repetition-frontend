import React from 'react'
<<<<<<< HEAD
import { Layout, Menu, Button, Tree } from "antd";
=======
import { Layout, Menu } from "antd";
>>>>>>> 97c58ad7a3bd1e5510eb542888089ab60d68573c
import {
  EyeOutlined,
  PoweroffOutlined,
  PlusOutlined,
  HomeOutlined,
  CheckCircleTwoTone,
<<<<<<< HEAD
  DownOutlined,
  FileOutlined
=======
>>>>>>> 97c58ad7a3bd1e5510eb542888089ab60d68573c
} from "@ant-design/icons";
import {useStoreActions, useStoreState} from 'easy-peasy'
import {Link} from 'react-router-dom'

const {Sider } = Layout;
const {SubMenu } = Menu;

const SideNav = (props) => {
    const {logout} = useStoreActions(Actions => Actions.auth);
<<<<<<< HEAD
    const {todos,cards} = useStoreState(State => State.todo)
    const Logout = () => {
        logout()
    }
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };
    const data = cards.map(card => (
      {
        title: card.title,
        key: card.key,
        children: [
          {
            title: 'No Pages Inside',
            key: '0-0-0-0',
          },
        ],
      }
    ))
    console.log(data)
=======
    const {todos} = useStoreState(State => State.todo)
    const Logout = () => {
        logout()
    }
>>>>>>> 97c58ad7a3bd1e5510eb542888089ab60d68573c
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
<<<<<<< HEAD
          <Tree
          style={{marginLeft:20, marginTop:10, marginBottom:3}}
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={data}
      />
          <Menu.Item onClick={Logout} key="4" icon={<PoweroffOutlined />}>
            Logout
          </Menu.Item>
          <Button type="dashed" block style={{position:'absolute', left:0, bottom:0}}>
            <span  style={{marginLeft:"-70px"}}><PlusOutlined /> Add Page</span>
          </Button>          
=======
          <Menu.Item onClick={Logout} key="4" icon={<PoweroffOutlined />}>
            Logout
          </Menu.Item>
>>>>>>> 97c58ad7a3bd1e5510eb542888089ab60d68573c
        </Menu>
      </Sider>
    );
}

<<<<<<< HEAD

=======
>>>>>>> 97c58ad7a3bd1e5510eb542888089ab60d68573c
export default SideNav
