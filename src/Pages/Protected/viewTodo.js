import React  from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { CheckCircleOutlined } from '@ant-design/icons';

const Todo = () => {
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
      author={<a>Han Solo</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
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
