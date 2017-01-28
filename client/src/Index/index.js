import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {polls: {}};
  }

  componentDidMount(){
    Client.get('/api/polls', (res) => {
      this.setState({polls: res});
    });
    Client.get('/api/currentuser', (res) => {
      this.setState({user: res.res})
    });
  }
    render(){
      return (
        <div id='polls'>
        <Header />
        {Object.keys(this.state.polls).map((key, i) => {
          var poll = this.state.polls[key]
          return (
            <Link to={`/poll/${encodeURIComponent(poll.name)}`} key={i}><p>{poll.name}</p></Link>
          )
        })}
        <Link to={`/newpoll`}><p>New Poll</p></Link>
        </div>
      );
    }
}

export default Index;