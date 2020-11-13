import React, {useState, useEffect} from "react";
import debounce from "lodash/debounce";
import Editor from "rich-markdown-editor";
import { Row, Col, Input,Select } from 'antd';
import {PlusCircleFilled, MinusCircleFilled} from "@ant-design/icons";
import {useStoreActions} from 'easy-peasy';
import {v4 as uuidv4 } from 'uuid';
const { TextArea } = Input;




const  CreateCard = () => {
    const [value,setValue] = useState(undefined)
    const [focus, setFocus] = useState(null)
    const {addCard,updateCardInput} = useStoreActions(Actions => Actions.todo)

    const generateToken = () => {
      return uuidv4();
    }

    const [inputList, setInputList] = useState([{ uuid: generateToken(), title: "", body: "", tags:null, status: false}]);
    const handleTagChange = (tagValue, i) => {
      const list = [...inputList];
      list[i]['tags'] = tagValue;
      setInputList(list);
    }

    const toggleShowButton = (index) => {
      const list = [...inputList];
      list[index]['status'] = !list[index]['status']
      setInputList(list)
    }

    const handleInputChange = (e,index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
      updateCardInput(list[index])
    }

    const handleSectionRemove = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };

    const handleSectionAdd = () => {
      setInputList([...inputList, { title: "", body: "", tags:null, status:false }]);
    };

    const handleChange = debounce(textValue => {
      const text = textValue();
      const list = [...inputList];
      list[focus]['body'] = text;
      setInputList(list);
    },10);

    const handleFocus = (index) => {
      setFocus(index)
    }

    useEffect(() => {
      addCard(inputList);
      // return () => {
      //   cleanup
      // }
    }, [])

return (
    <>        
      <Row justify="center" style={{marginBottom: '25px'}}>   
          <Col span={14}>
            <span className='cardStatus'> You Saved 10 minutes ago </span>          
              {
                inputList.map((x,i) => (
                  <div>
                    <TextArea className='cardTitle'   style={{
                        overflow:'hidden', overflowWrap:'break-word', height:45
                    }} maxLength={100} name='title' value={x.title} onChange={(e)=>handleInputChange(e,i)} placeholder='Start with a title...' bordered={false} />
                    <Row style={{marginLeft:'-43px'}} onMouseLeave={() => toggleShowButton(i)} onMouseEnter={() => toggleShowButton(i)}>
                      <Col span={2}>
                        {
                          x.status &&
                          <div>
                            <PlusCircleFilled onClick={handleSectionAdd} className='actionButton' /> 
                            {
                              inputList.length > 1 && <MinusCircleFilled onClick={()=> handleSectionRemove(i)} className='actionButton'/> 
                            }        
                          </div> 
                        }
                      </Col>
                      <Col span={14}>
                      <Editor
                          className='cardBody'
                          readOnly={false}
                          readOnlyWriteCheckboxes
                          value={value}
                          template={false}
                          defaultValue=""
                          scrollTo={window.location.hash}
                          onChange={handleChange}
                          handleDOMEvents={{
                            focus: () => handleFocus(i),
                          }}
                          autoFocus
                      />
                      </Col>
                    </Row>                    
                    <Select className='cardTag'  mode="tags" placeholder='Add Tags' bordered={false} style={{ width: '100%' }} onChange={(value)=>handleTagChange(value,i)} tokenSeparators={[',']}>
                    </Select>
                  </div>
                ))
              }
          </Col>  
      </Row>
    </>
);
}

export default CreateCard

