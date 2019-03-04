import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      currentEmail: "",
      showAlert: false,
      bookingsData: ""
    }
  }
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated) {
      let fullRoute = 'http://localhost:3001/api/getbookings';
      axios.post(fullRoute, {email: user.email}).then(res => {
        console.log(res.data)
        this.setState({
          authorized: true,
          bookingsData: res.data
        })
      })
    }
    else {
      this.setState({
        authorized: false
      })
    }
  }

  render() {
    /*const bookingsList = this.state.bookingsData.map((booking, index) => 
        <div key={index} className="every-two highlight-element flex-container change-cursor">
            <div>
                <p className="">{booking.activity}. </p>
                <p className="">{booking.date} </p>
                <p className="">{booking.address}</p>
            </div>
            <div data-id={booking.email} className="">
                <p className="">X</p>
            </div>
        </div>
    );*/
    for(let a in this.state.bookingsData){
        console.log(this.state.bookingsData[a])
    }
    // Redirect if user not logged in
    if (this.state.authorized) {
      return (
        <div className="padding-from-header">
          <div className="row text-center">
            <div className="col">
              <h1 className="display-4 ">Bookings</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Golf Settings</h5>
                            
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-center">
                      <div className="col">
                        <hr></hr>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {return <Redirect to='/login' />;}
  }
}

Bookings.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Bookings));