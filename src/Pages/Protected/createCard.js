import React, {useState} from "react";
import debounce from "lodash/debounce";
import Editor from "rich-markdown-editor";
import { Row, Col, Input,Select } from 'antd';
import {PlusCircleFilled, MinusCircleFilled} from "@ant-design/icons";
const { TextArea } = Input;



const  CreateCard = () => {
    const [value,setValue] = useState(undefined)
    const [focus, setFocus] = useState(null)
    const [inputList, setInputList] = useState([{ title: "", body: "", tags:null, status: false}]);
    const handleTagChange = (tagValue, i) => {
      const list = [...inputList];
      list[i]['tags'] = tagValue;
      setInputList(list);
        console.log(`selected ${tagValue}`);
        console.log(inputList)
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
      console.log(inputList)
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
      console.log(inputList)
    },10);

    const handleFocus = (index) => {
      setFocus(index)
    }

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
                        {/* <TextArea className='cardBody' autoSize rows={2} style={{
                            height:50
                        }}  value={x.body} name='body' onChange={(e)=>handleInputChange(e,i)} placeholder='Great things start here...' bordered={false} /> */}
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
    // <>
    //     <Row>
    //         <Col span={14} offset={4}>
    //             <div style={{marginTop:20}}>
    //                 <Editor
    //                     className='editorStyle'
    //                     readOnly={false}
    //                     readOnlyWriteCheckboxes
    //                     value={value}
    //                     template={false}
    //                     defaultValue=""
    //                     scrollTo={window.location.hash}
    //                     onSave={options => console.log("Save triggered", options)}
    //                     onChange={handleChange}
    //                     autoFocus
    //                 />
    //             </div>
    //         </Col>
    //      </Row>
    // </>
);
}

export default CreateCard

