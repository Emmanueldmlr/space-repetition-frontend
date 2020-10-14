import React from 'react'
import { Card, Col, Row } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";

function Homepage() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Learn React" bordered={false}>
              <div>
                  <CloseCircleOutlined style={{ "float":"right", "fontSize":"23px" }} />
                <p style={{ textDecoration: "line-through" }}>Learn Hooks</p>
              </div>
              <div>
                  <CheckCircleOutlined style={{ "float":"right", "fontSize":"23px" }} />
                <p>Learn Routing</p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Learn Laravel" bordered={false}>
              <div>
                  <CloseCircleOutlined style={{ "float":"right", "fontSize":"23px" }} />
                <p style={{ textDecoration: "line-through" }}>
                  Learn Middleware
                </p>
              </div>
              <div>
                <CheckCircleOutlined style={{ "float":"right", "fontSize":"23px" }} />
                <p>Learn Eloquent Relationship</p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Learn Javascript" bordered={false}>
              <div>
                  <CheckCircleOutlined style={{ "float":"right", "fontSize":"23px" }} />
                <p>Learn Prototyping</p>
              </div>
              <div>
                   <CloseCircleOutlined style={{ "float":"right", "fontSize":"23px" }} />
                <p style={{ textDecoration: "line-through" }}>Learn Arrays</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
}

export default Homepage
