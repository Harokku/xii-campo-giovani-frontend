import React, {Component} from 'react';
import logo from './base.png';
import './App.scss';

class App extends Component {
  render() {
    return (
      <section className="hero is-danger is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <figure className="image is-128x128 is-inline-block">
              <img src={logo} alt="CAMPia Logo"/>
            </figure>
            <h1 className="title">
              CAMPia prospettiva
            </h1>
            <h2 className="subtitle">
              Omni Management Console
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
