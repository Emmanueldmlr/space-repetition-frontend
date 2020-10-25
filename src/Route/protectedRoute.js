import React from 'react'
import { Redirect, Route } from "react-router-dom";
import Extend from '../Components/layout'
import {token} from '../Store/configs/index'
import Loader from '../Components/loader'

async function getToken (){
  const key = await token;
  return key
}
const User = ({isAuthed, component:Component, ...rest }) => (

    <Route {...rest} render={ props => (
      getToken() && isAuthed  ? (
        <Loader>
            <Extend>
                <Component {...props} />
            </Extend>
        </Loader>
        ) : (
          <Redirect
            to={{ pathname: "/login", location: { from: props.location } }}
          />
        )
  )} />
)

export default User


