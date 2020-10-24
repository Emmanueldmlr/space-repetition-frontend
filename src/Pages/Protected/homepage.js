import React from 'react'
import { Card, Col, Row ,Empty} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import {useStoreActions, useStoreState} from 'easy-peasy'

function Homepage() {
    const {todos} = useStoreState(State => State.todo)
    const {updateTodos, deleteTodo} = useStoreActions(Actions => Actions.todo)

    const DeleteTodo = (id) => {
        deleteTodo(id)
    }

    const UpdateTodo = (id, status) => {
      const params = {
        formData : {
          isCompleted : status
        },
        id:id
      }
        updateTodos(params)
    }
    
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {
            todos.length < 1 ? 
            <Empty className='content-centralize' />
            :
            todos.map((main)=>(
              <Col style={{marginTop:10}} span={8}>
                <Card title={main.main.title} extra={<DeleteOutlined onClick={()=>DeleteTodo(main.main.id)} style={{"color":"red"}} />}  bordered={false}>
                  {
                    main.main.sub_todos.map((subTodo) => (
                      <div>
                          {
                            subTodo.isCompleted === 1 ?
                            <CloseCircleOutlined onClick= {() => UpdateTodo(subTodo.id, 0)} style={{ "float":"right", "fontSize":"23px", "cursor":"pointer" }} />
                            :
                            <CheckCircleOutlined onClick= {() => UpdateTodo(subTodo.id, 1)} style={{ "float":"right", "fontSize":"23px", "cursor":"pointer" }} />
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
