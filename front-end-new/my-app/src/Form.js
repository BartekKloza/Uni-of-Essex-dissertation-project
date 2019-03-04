import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { createResponse } from './weatherAnalyser'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            date: new Date(),
            time: '',
            activity: 'Golf',
            data: '',
            showResult: false,
            resultMessage: '',
            userSettings: [],
            isAuthenticated: null,
            email: ""
        }

    }

    componentDidMount() {
        const { isAuthenticated, user } = this.props.auth;
        console.log(user)
        if (isAuthenticated) {
            console.log("dupaaaa")
            axios.post("http://localhost:3001/api/getsettings", { email: user.email })
                .then((res) => {
                    console.log(res.data.weatherSettings)
                    this.setState({
                        userSettings: res.data.weatherSettings,
                        email: user.email
                    })
                })
            this.setState({
                isAuthenticated: true,
            });
        }
        else {
            this.setState({
                isAuthenticated: false,
                userSettings: [20, 5, 0.4, 10, 10, 0.1, 0, 20, 0.1]
            });
        }
    }

    handleSubmit = (e) => {
        // validate input !
        e.preventDefault();
        let formData = {
            'address': this.state.address,
            'date': this.state.date,
            'time': this.state.time,
            'activity': this.state.activity
        }
        let url = 'http://localhost:3001/api/weatherform'
        console.log(formData);
        axios.post(url, formData)
            .then((res) => {
                this.setState({ data: res.data.message });
                this.setState({ resultMessage: createResponse(this.state.data, this.state.date, this.state.activity, this.state.userSettings) })
                this.setState({ showResult: true });
            })
            .catch((err) => {
                console.log(err);
            })

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleDateChange = (selectedDate) => {
        this.setState({
            date: selectedDate
        });
    }
    handleAddBooking = (e) => {
        e.preventDefault();
        const booking = {
            address: this.state.address,
            date: this.state.date,
            activity: this.state.activity,
            email: this.state.email
        }
        let url = 'http://localhost:3001/api/addbooking'
        axios.post(url, booking)
            .then((res) => {
                console.log("booking succesful")
            })
            .catch((err) => {
                console.log(err);
            })
    }
    displayAddBooking = () => {
        if(this.state.isAuthenticated){
            return(
                <button className="btn btn-primary" type="submit"
                    onClick={this.handleAddBooking}>Add Booking</button>
            )
        }
        else{
            return (<div></div>)
        }
    }
    handleTryAgain = (e) => {
        e.preventDefault();
        this.setState({
            showResult: false
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 text-center">
                        <h1 className="display-4 ">Features</h1>
                        <hr />
                        <p className="lead">You can use the form to check if playing golf or doing windsurfing/sailing is advisable on a particular date.
                        Additionally you can check if you should keep your horses in barns.</p>
                    </div>

                    <div className="col-lg-6">
                        {!this.state.showResult && (
                            <div className="card full-height">
                                <div className="card-body">
                                    <h5 className="card-subtitle text-muted text-center">Fill out the form to check if it's advicable to play golf on a chosen day.</h5>
                                    <hr />
                                    <form>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <input name="address" onChange={this.handleChange} placeholder="Address or Postcode"
                                                        type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <DatePicker timeFormat="HH:mm" showTimeSelect timeIntervals={60}
                                                        name="date" selected={this.state.date} onChange={this.handleDateChange}
                                                        className="form-control" dateFormat="MMMM d, yyyy h:mm aa" timeCaption="Time" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <select name="activity" className="form-control" onChange={this.handleChange}>
                                                        <option>Golf</option>
                                                        <option>Windsurfing/Sailing</option>
                                                        <option>Horses</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row float-right">
                                        <div className="col">
                                            <button className="btn btn-primary" type="submit"
                                                onClick={this.handleSubmit}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.showResult && (
                            <div className="card full-height result-component" >
                                <div className="card-body">
                                    <h1 className="card-title text-center display-4">Result</h1>
                                    <h4 className="card-subtitle text-muted text-center">Check your result below</h4>
                                    <hr />
                                    <p>{this.state.resultMessage}</p>
                                    <button className="btn btn-primary" type="submit"
                                                onClick={this.handleTryAgain}>Try Again</button>
                                    {this.displayAddBooking()}
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        )
    }
}

Form.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Form));