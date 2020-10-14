import React from 'react'
import { Layout } from "antd";
import FooterLayout from "./footer";
import SideNav from "./sideNav";
import {sessionItem} from '../Store/configs/index'
const { Header, Content} = Layout;

const Extend = (props) =>{
    const user = JSON.parse(sessionStorage.getItem(sessionItem));
    if(!user){
      props.children.props.history.push('/login')
    }
    else{
      if(user.isVerified !== 1){
        props.children.props.history.push('/account-verification')
      }
    }
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