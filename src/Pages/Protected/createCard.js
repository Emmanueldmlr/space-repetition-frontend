import React, {useState} from "react";
import debounce from "lodash/debounce";
import ReactDOM from "react-dom";
import Editor from "rich-markdown-editor";
import { Row, Col, Input,Select } from 'antd';
import {PlusCircleFilled, MinusCircleFilled} from "@ant-design/icons";


const { TextArea } = Input;
const { Option } = Select;

const  CreateCard = () => {
    const [inputList, setInputList] = useState([{ title: "", body: "", tags:null}]);
    const [showButton, setShowButton] = useState(false)

    const handleTagChange = (tagValue, i) => {
      //const { name, value } = e.target;
      const list = [...inputList];
      list[i]['tags'] = tagValue;
      setInputList(list);
        console.log(`selected ${tagValue}`);
        console.log(inputList)
    }

    const handleInputChange = (e,index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      console.log(name)
      list[index][name] = value;
      setInputList(list);
      console.log(inputList)
    }

    const handleSectionRemove = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };

    const handleSectionAdd = () => {
      setInputList([...inputList, { title: "", body: "", tags:null }]);
    };


return (
    <>       
        {
          inputList.map((x,i) => (
            <Row justify="center" style={{marginBottom: '25px'}} onMouseLeave={() => setShowButton(false)} onMouseEnter={() => setShowButton(true)}>
                <Col span={1} style={{marginTop:'0.7em'}}>
                    {
                      showButton ? 
                        <div>
                          <PlusCircleFilled onClick={handleSectionAdd} className='actionButton' /> 
                          {
                            inputList.length > 1 && <MinusCircleFilled onClick={()=> handleSectionRemove(i)} className='actionButton'/> 
                          }        
                        
                        </div> 
                        :
                        null
                    }       
                </Col>
                <Col span={14}>

                        <TextArea className='cardTitle'   style={{
                            overflow:'hidden', overflowWrap:'break-word', height:45
                        }} maxLength={100} name='title' value={x.title} onChange={(e)=>handleInputChange(e,i)} placeholder='Start with a title...' bordered={false} />
                        
                        <span className='cardStatus'> You Saved 10 minutes ago </span>          
                        
                        <TextArea className='cardBody' autoSize rows={2} style={{
                             height:50
                        }}  value={x.body} name='body' onChange={(e)=>handleInputChange(e,i)} placeholder='Great things start here...' bordered={false} />
                        
                        <Select className='cardTag'  mode="tags" placeholder='Add Tags' bordered={false} style={{ width: '100%' }} onChange={(value)=>handleTagChange(value,i)} tokenSeparators={[',']}>
                        </Select>
                </Col>  
            </Row>
          ))
        }
    </>
);
}

export default CreateCard
