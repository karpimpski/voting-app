import React, { Component } from 'react';
import Client from '../Client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {response: ''};
  }

  componentDidMount(){
    Client.search('hello', (res) => {
      this.setState({response: res.test});
    });
  }
    render(){
      return (
        <p>{this.state.response}</p>
      );
    }
}

export default App;
