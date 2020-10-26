import React, {useEffect} from 'react'
import { Layout } from "antd";
import FooterLayout from "./footer";
import SideNav from "./sideNav";
import {sessionItem} from '../Store/configs/index'
import {useStoreActions} from 'easy-peasy'
const { Header, Content} = Layout;

const Extend = (props) =>{
    const {fetchTodos}  = useStoreActions(Actions => Actions.todo);
    const user = JSON.parse(sessionStorage.getItem(sessionItem));
    if(!user){
      props.children.props.history.push('/login')
<<<<<<< HEAD
    }
    else{
      if(user.isVerified !== 1){
        props.children.props.history.push('/account-verification')
      }
=======
    } else if (!user.isVerified) {
        props.children.props.history.push('/account-verification')
>>>>>>> 97c58ad7a3bd1e5510eb542888089ab60d68573c
    }
    useEffect(() => {
      fetchTodos()
    }, [])
    return (
      <Layout>
        <SideNav/>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 500 }}
            >
              {props.children}
            </div>
          </Content>
          <FooterLayout/>
        </Layout>
      </Layout>
    );
}

export default Extend