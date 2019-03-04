import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authentication';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  onLogout(e) {
      e.preventDefault();
      this.props.logoutUser(this.props.history);
  }
  render() {
    const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/usersettings">User Settings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">Bookings</Link>
              </li>
              <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                  <img src={user.avatar} alt={user.name} title={user.name}
                      className="rounded-circle"
                      style={{ width: '25px', marginRight: '5px'}} />
                          Logout
              </a>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Log in</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Create account</Link>
          </li>
        </ul>
      )
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <Link className="navbar-brand" to="/">Weatherbe</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    )
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));