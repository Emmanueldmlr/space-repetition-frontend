import React, {useState,useEffect} from 'react'
import { Form, Input, Button,notification } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {useStoreActions, useStoreState}  from 'easy-peasy'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function CreateTodo() {
    const {addTodo, clearResponse} = useStoreActions(Actions => Actions.todo)
    const {requestResponse} = useStoreState(state=> state.todo)
    const [title, setTitle] = useState('')
    const [fields, setFields] = useState([]);

    const openNotificationWithIcon = type => {
        notification[type]({
          message: 'Notification Title',
          description:requestResponse.msg
        });
      };

    useEffect(() => {
    if (requestResponse !== null) {
        if (requestResponse.type === "success") {
        openNotificationWithIcon('success')
        
        } else {
        openNotificationWithIcon('error')
        }
        setTimeout(() => {
        clearResponse();
        }, 4000);
    } else return;
    }, [requestResponse]);

    const  handleChange = (i, event) => {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    const  handleAdd = () => {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    const handleRemove = (i) => {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            title: title,
            subTodo: fields
        }
        addTodo(params)
    }


    return (
        <Form {...layout}>
            <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bolder" }}>
                Create a New Todo
            </p>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            {fields.map((field, idx) => {           
                return (
                    <Form.Item name="subTodo[]" label="Sub Todo">
                        <div key={`${field}-${idx}`}>
                            <div>
                                <CloseCircleOutlined type="button" onClick={() => handleRemove(idx)} style={{ "float":"right", "fontSize":"23px" }} />
                                <Input
                                style={{ width: "93%" }}
                                type="text"
                                placeholder="Enter text"
                                value={field.value || ""}
                                onChange={e => handleChange(idx, e)}
                                />
                            </div>
                        </div>
                    </Form.Item>
                    );
                })
            }  
            <Form.Item {...tailLayout}>
                <Button
                type="dashed"
                style={{ width: "50%" }}
                onClick={() => handleAdd()}
                >
                <PlusOutlined /> Add New Todo Input
                </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
            <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Submit
            </Button>
            </Form.Item>
        </Form>
    );
}

export default CreateTodo



