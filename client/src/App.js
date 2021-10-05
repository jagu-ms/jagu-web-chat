import Auth from 'Auth';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import {Chat, NotFound, Register, Login, Password} from 'views';


class App extends React.Component {

  constructor(props){
    super(props);
    Auth.init();
  }
  
  render() {
    return (
      <div id="main-container" className="container-fluid">
        <Router>
          <Switch>
            <AppRoute path="/" exact component={Chat} can={Auth.auth} redirect='/login'/>
            <AppRoute path="/password" exact component={Password} can={Auth.auth} redirect='/login'/>
            <AppRoute path="/register" exact component={Register} can={Auth.guest} redirect='/'/>
            <AppRoute path="/login" exact component={Login} can={Auth.guest} redirect='/'/>
            <AppRoute component={NotFound}/>
          </Switch>
        </Router>
      </div>
    );
  } 
}

export default App;
