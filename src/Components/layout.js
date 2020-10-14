import React from 'react'
import { Layout } from "antd";
import FooterLayout from "./footer";
import SideNav from "./sideNav";
const { Header, Content} = Layout;

const Extend = (props) =>{
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