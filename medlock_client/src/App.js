import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
import { Route } from 'react-router-dom'; 
import Inbox from './components/inbox/Inbox';
import Resources from './components/resources/Resources';
import PatientData from './components/patientData/PatientData';
import Profile from './components/profile/Profile';
import DashHeader from './components/dashboard/DashHeader';
import PDISurvey from './components/survey/PDISurvey';
import Callback from './components/Callback';
import Home from './components/home/Home';
import Dispenser from './components/test/Dispenser'; 
import auth0client from './auth/Auth';
import SecuredRoute from './components/SecuredRoute';
import Login from './components/login/Login';
import SideBar from './components/nav/SideBar';
import { withRouter } from 'react-router-dom';

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth0client.handleAuthentication();
    }
}

const makeMainRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <SecuredRoute path="/home" component={Home} />
      <SecuredRoute path="/dashboard" component={Dashboard} />
      <Route path="/callback" render={(props) =>{
          console.log("called");
          handleAuthentication(props);
          return <Callback {...props} />
      }} />
    </div>
  );
}

class App extends Component {

  render() {
    return ( 
      <div>
        <div>
          { makeMainRoutes() } 
        </div>
      </div>

    );
  }
}

export default withRouter(App);
