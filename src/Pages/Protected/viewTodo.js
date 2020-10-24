import React, {useEffect}  from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { CheckCircleOutlined } from '@ant-design/icons';
import {sessionItem} from '../../Store/configs/index'
import { useStoreActions} from 'easy-peasy'

const Todo = (props) => {
  const user = JSON.parse(sessionStorage.getItem(sessionItem));
  const {getTodo} = useStoreActions(Actions => Actions.todo)
  if(!user){
    props.children.props.history.push('/login')
  }
  const todo = props;
  console.log(todo)
  const actions = [
    <Tooltip key="comment-basic-dislike" title="Pending">
      <p>(Pending) </p>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Mark as Completed">
      <CheckCircleOutlined style={{ paddingLeft: "10px", fontSize: "20px" }} />
    </Tooltip>
  ];

  return (
    <Comment
      actions={actions}
      author={user.nickname}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      }
      content={
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      }
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Todo;
