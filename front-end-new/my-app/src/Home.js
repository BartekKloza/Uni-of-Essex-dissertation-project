import React, { Component } from 'react'
import Form from './Form';
import Footer from './Footer';

export default class Home extends Component {
  render() {
    return (
        <div>
            <div id="welcome_jumbotron" className="jumbotron text-center">
                {/* Welcome to Weatherbe panel */}
                <div className="container">
                <h1 className="display-4">Welcome to Weatherbe!</h1>
                <p className="lead">This is a test version of the website.</p>
                </div>
            </div>
            <div className="container">
                <Form />
                <Footer/>
            </div>
        </div>
        
    )
  }
}
