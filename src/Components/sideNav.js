import React from 'react';
import { Layout, Menu, Button, Tree } from "antd";
import {
  EyeOutlined,
  PoweroffOutlined,
  PlusOutlined,
  HomeOutlined,
  CheckCircleTwoTone,
  DownOutlined,
} from "@ant-design/icons";
import {useStoreActions, useStoreState} from 'easy-peasy'
import {Link} from 'react-router-dom'

const {Sider } = Layout;
const {SubMenu } = Menu;

const SideNav = (props) => {
    const {logout} = useStoreActions(Actions => Actions.auth);
    const {todos,cards} = useStoreState(State => State.todo)
    const Logout = () => {
        logout()
    }

    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };

    const truncate = (str) => {
      if(str == null ) return str
      return str.length > 10 ? str.substring(0, 15) : str;
    }
    const data = cards.map(card => (
      {
        title: truncate(card.title),
        key: card.uuid,
        children: [
          {
            title: truncate(card.body),
            key: '0-0-0-0',
          },
        ],
      }
    ))
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
            <Link to='/create-card'>
            <span  style={{marginLeft:"-70px"}}><PlusOutlined /> Add Page</span>
            </Link>
          </Button>          
        </Menu>
      </Sider>
    );
}

export default SideNav
