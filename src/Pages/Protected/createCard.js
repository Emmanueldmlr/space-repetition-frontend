import React, {useState} from "react";
import { Row, Col, Input,Select } from 'antd';
import {PlusCircleFilled, MinusCircleFilled} from "@ant-design/icons";

const { TextArea } = Input;

const  CreateCard = () => {
    const [body, setBody] = useState([{content: "", status: false}]);
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState([])

    const handleTitleChange = (e) =>{
      setTitle(e.target.value)
      console.log(title)
    }

    const handleBodyAdd = () => {
      setBody([...body, { content: "", status: false }]);
    };

    const handleBodyRemove = index => {
       const list = [...body];
       list.splice(index, 1);
       setBody(list);
    };

    const handleBodyChange = (e,index) => {
        const { name, value } = e.target;
        const list = [...body];
        list[index][name] = value;
        setBody(list);
    }

    const handleTagChange = (tagValue) => {
    setTags(tagValue);
    console.log(`selected ${tagValue}`);
    console.log(tags)
    }

    const toggleShowButton = (index) => {
      const list = [...body];
      list[index]['status'] = !list[index]['status']
      setBody(list)
    }

return (
    <>       
        {
            <Row justify="center">
                <Col span={14}>
                  <span className='cardStatus'> You Saved 10 minutes ago </span>  
                  <TextArea className='cardTitle'   style={{
                    overflow:'hidden', overflowWrap:'break-word', height:45
                  }} maxLength={100} name='title' value={title} onChange={(e)=>handleTitleChange(e) }  placeholder='Start with a title...' bordered={false} />
                  {
                    body.map((x,i) => (
                      <Row style={{marginLeft:'-48px'}} onMouseLeave={() => toggleShowButton(i)} onMouseEnter={() => toggleShowButton(i)}>
                      <Col span={2}  >
                        {
                          x.status &&
                          <div>
                            <PlusCircleFilled onClick={handleBodyAdd} className='actionButton' /> 
                            {
                               body.length > 1 && <MinusCircleFilled onClick={()=> handleBodyRemove(i)} className='actionButton'/> 
                            }  
                          </div>
                        }       
                      </Col>
                      <Col span={14}>
                        <TextArea className='cardBody' autoSize rows={2} style={{height:50}} 
                        name='content' value={x.content} onChange={(e) => handleBodyChange(e,i)}  placeholder='Great things start here...' bordered={false} />
                      </Col>
                    </Row>
                    ))
                  }
                  <Select className='cardTag' onChange={handleTagChange}  mode="tags" placeholder='Add Tags' bordered={false} style={{ width: '100%' }}  tokenSeparators={[',']}>
                  </Select>
                </Col>
            </Row>
        }
    </>
);
}

export default CreateCard
