import React from 'react'
import { Redirect, Route } from "react-router-dom";
import Extend from '../Components/layout'
import {token} from '../Store/configs/index'

const User = ({isAuthed, component:Component, ...rest }) => (
    <Route {...rest} render={ props => (
      token && isAuthed  ? (
          <Extend>
              <Component {...props} />
          </Extend>
        ) : (
          <Redirect
            to={{ pathname: "/login", location: { from: props.location } }}
          />
        )
  )} />
)

export default User


