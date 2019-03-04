import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <div>
          <div className="row text-center">
            <div className="col">
              <h1 className="display-4 ">Available activities</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <img className="card-img-top" src="https://images.pexels.com/photos/1175023/pexels-photo-1175023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="card-title">Golf</h5>
                  <p className="card-text">Use Weatherbe to easily check weather conditions for your upcoming golf sessions.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
                <div className="card">
                  <img className="card-img-top" src="https://images.pexels.com/photos/414247/pexels-photo-414247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Windsurfings/Sailing</h5>
                    <p className="card-text">Coming soon.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <img className="card-img-top" src="https://images.pexels.com/photos/634612/pexels-photo-634612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Horses</h5>
                    <p className="card-text">Coming soon.</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
    )
  }
}
