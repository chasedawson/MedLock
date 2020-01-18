import React, { Component, useEffect } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
import { Route } from 'react-router-dom'; 
import Callback from './components/Callback';
import Home from './components/home/Home';
import auth0client from './auth/Auth';
import SecuredRoute from './components/SecuredRoute';
import Login from './components/login/Login';
import Admin from './components/administration/Admin'; 
import { withRouter } from 'react-router-dom';
// import Graphs from './components/graphs/Graphs';
import ReactGA from 'react-ga'; 
import history from './components/nav/history'; 
import Register from './components/login/Register';

// ReactGA.ga('set', 'userId', '1234'); 


const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        console.log(nextState)
        console.log(nextState.location.hash)
        console.log(/access_token|id_token|error/.test(nextState.location.hash))
        auth0client.handleAuthentication();
    }
}

const makeMainRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/register" component={Register} />
      <SecuredRoute path="/home" component={Home} />
      <SecuredRoute path="/dashboard" component={Dashboard} />
      <Route path="/callback" render={(props) =>{
          handleAuthentication(props);
          return <Callback {...props} />
      }} />
    </div>
  );
}

export class App extends Component {


  render() {
    // ReactGA.initialize('UA-155183323-1'); 
    // var USER_ID = "1234"; 
    // ReactGA.ga('set', 'userId', USER_ID); 
    // ReactGA.set({ userId: USER_ID }); 

    ReactGA.ga('create', 'UA-155183323-1', 'auto', {'userId': 'as8eknlll'});

    // ReactGA.ga('create', 'UA-155183323-1', { 'userId': '1234' }); 
    // ReactGA.ga('set', 'dimension1', '1234'); 

    history.listen((location, action) => {
      console.log(location); 
      ReactGA.set({ page: location.pathname }); 
      ReactGA.pageview(location.pathname); 
    }); 

    return ( 
      <div className="App">
          { makeMainRoutes() } 
      </div>

    );
  }
}

export default withRouter(App);
