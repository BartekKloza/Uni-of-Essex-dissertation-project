import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import UserSettings from './UserSettings';
import Bookings from './Bookings';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="container-fluid" id="main-container" >
            <Header />
            <Route exact path ="/" component={Home} />
            <Route exact path ="/register" component={Register} />
            <Route exact path ="/login" component={Login} />
            <Route exact path ="/usersettings" component={UserSettings} />
            <Route exact path ="/bookings" component={Bookings} />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
