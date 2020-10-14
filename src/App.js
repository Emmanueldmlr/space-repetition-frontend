import React from 'react';
import "antd/dist/antd.css";
import Guest from './Route/publicRoute'
import User from './Route/protectedRoute'
import {BrowserRouter as Router,Switch} from "react-router-dom";
import Login from './Pages/Auth/login';
import Register from "./Pages/Auth/register.js";
import NotFound from "./Pages/Others/404page";
import AccountVerification from "./Pages/Others/accountVerification";
import EmailInfo from "./Pages/Others/emailInfo";
import Homepage from "./Pages/Protected/homepage";
import CreateTodo from "./Pages/Protected/createTodo";
import Todo from "./Pages/Protected/viewTodo";
import { useStoreState } from "easy-peasy";

const App = () => {
  const isAuth = useStoreState(state=>state.auth.isAuthed)
  return (
    <Router>
      <Switch>
        <User exact path="/" isAuthed={isAuth} component={Homepage} />
        <User exact path="/create-todo" isAuthed={isAuth} component={CreateTodo} />
        <User exact path="/view-todo/:id" isAuthed={isAuth} component={Todo} />
        <Guest exact path="/login" component={Login} />
        <Guest exact path="/register" component={Register} />
        <Guest exact path="/registration-success-notification" component={EmailInfo} />
        <Guest exact path="/account-verification" component={AccountVerification} />
        <Guest  component={NotFound}/>
      </Switch>
    </Router>
  );
}


export default App;
