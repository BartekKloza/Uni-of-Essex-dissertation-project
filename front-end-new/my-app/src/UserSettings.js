import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      settingsArray: {},
      currentEmail: "",
      showAlert: false
    }
  }
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated) {
      let fullRoute = 'http://localhost:3001/api/me/' + user.id;
      axios.get(fullRoute).then(res => {
        console.log(res.data)
        this.setState({
          settingsArray: {
            golfTemp: res.data.weatherSettings[0],
            golfWindSpeed: res.data.weatherSettings[1], 
            golfPrecipProp: res.data.weatherSettings[2],
            surfTemp: res.data.weatherSettings[3],
            surfWindSpeed: res.data.weatherSettings[4],
            surfPrecipProp: res.data.weatherSettings[5],
            horseTemp: res.data.weatherSettings[6],
            horseWindSpeed: res.data.weatherSettings[7],
            horsePrecipProp: res.data.weatherSettings[8]
          },
          authorized: true,
          currentEmail: res.data.email
        })
      })
    }
    else {
      this.setState({
        authorized: false
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let updatedSettings = []
    let keys = Object.keys(this.state.settingsArray)
    keys.map((key) => {
      updatedSettings.push(this.state.settingsArray[key])
    })
    let requestData = {email: this.state.currentEmail, settings: updatedSettings}
    axios.post("http://localhost:3001/api/updatesettings", requestData)
    .then((res) => {
      this.setState({
        showAlert: true
      })
    })
  }

  onChange = e => {
    let tempArray = this.state.settingsArray;
    tempArray[e.target.name] = parseFloat(e.target.value);
    this.setState({
      settingsArray: tempArray
    });
  }

  showAlert = () => {
    if(this.state.showAlert){
      return (
        <div className="alert alert-primary" role="alert">
          Settings saved successfully !
        </div>
      )
    }
  }

  render() {
    // Redirect if user not logged in
    const alert = <div>alert</div>
    if (this.state.authorized) {
      return (
        <div className="padding-from-header">
          <div className="row text-center">
            <div className="col">
              {this.showAlert()}
              <h1 className="display-4 ">User Settings</h1>
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
                            <div className="form-group">
                              <label>Minimum Temperature</label>
                              <input name="golfTemp" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["golfTemp"]}
                                type="number" className="form-control" />
                              <label>Maximum Wind Speed</label>
                              <input name="golfWindSpeed" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["golfWindSpeed"]}
                                type="number" className="form-control" />
                              <label>Maximum Precip Probability</label>
                              <input name="golfPrecipProp" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["golfPrecipProp"]}
                                type="number" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Windsurfing/Sailing Settings</h5>
                            <div className="form-group">
                              <label>Minimum Temperature</label>
                              <input name="surfTemp" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["surfTemp"]}
                                type="number" className="form-control" />
                              <label>Maximum Wind Speed</label>
                              <input name="surfWindSpeed" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["surfWindSpeed"]}
                                type="number" className="form-control" />
                              <label>Maximum Precip Probability</label>
                              <input name="surfPrecipProp" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["surfPrecipProp"]}
                                type="number" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Horses Settings</h5>
                            <div className="form-group">
                              <label>Minimum Temperature</label>
                              <input name="horseTemp" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["horseTemp"]}
                                type="number" className="form-control" />
                              <label>Maximum Wind Speed</label>
                              <input name="horseWindSpeed" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["horseWindSpeed"]}
                                type="number" className="form-control" />
                              <label>Maximum Precip Probability</label>
                              <input name="horsePrecipProp" onChange={e => this.onChange(e)} defaultValue={this.state.settingsArray["horsePrecipProp"]}
                                type="number" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-center">
                      <div className="col">
                        <hr></hr>
                        <button className="btn btn-primary btn-lg" type="submit"
                          onClick={this.handleSubmit}>Save Settings</button>
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

UserSettings.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withRouter(UserSettings));