import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {polls: {}};
  }

  componentDidMount(){
    Client.search('polls', (res) => {
      this.setState({polls: res});
    });
  }
    render(){
      return (
        <div id='polls'>
        {Object.keys(this.state.polls).map((key, i) => {
          var poll = this.state.polls[key]
          return (
            <Link to={`/poll/${poll.name}`} key={i}><p>{poll.name}</p></Link>
          )
        })}
        <Link to={`/newpoll`}><p>New Poll</p></Link>
        </div>
      );
    }
}

export default Index;
