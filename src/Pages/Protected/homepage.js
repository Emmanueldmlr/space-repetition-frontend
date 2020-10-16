import React from 'react'
import { Card, Col, Row ,Empty} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import {useStoreState} from 'easy-peasy'

function Homepage() {
    const {todos} = useStoreState(State => State.todo)
    console.log(todos)
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {
            todos.length < 1 ? 
            <Empty className='content-centralize' />
            :
            todos.map((main)=>(
              <Col style={{marginTop:10}} span={8}>
                <Card title={main.main.title} bordered={false}>
                  {console.log(main.subTodo)}
                  {
                    main.main.sub_todos.map((subTodo) => (
                      <div>
                          {
                            subTodo.isCompleted === 1 ?
                            <CloseCircleOutlined style={{ "float":"right", "fontSize":"23px", "cursor":"pointer" }} />
                            :
                            <CheckCircleOutlined style={{ "float":"right", "fontSize":"23px", "cursor":"pointer" }} />
                          }               
                          {
                            subTodo.isCompleted === 1 ? 
                            <p style={{ textDecoration: "line-through" }}>{subTodo.todo}</p>
                            :
                            <p>{subTodo.todo}</p>
                          }  
                     </div>
                    ))
                  }
                </Card>
              </Col>
            ))
          }       
        </Row>
      </div>
    );
}

export default Homepage
