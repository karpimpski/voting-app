import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';
import './index.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {polls: [], user: null, currentPolls: [], pollIndex: 0};
  }

  componentDidMount(){
    Client.get('/api/polls', (res) => {
      this.setState({polls: res, currentPolls: res.slice(this.state.pollIndex, this.state.pollIndex + 4)});
    });
    Client.get('/api/currentuser', (res) => {
      this.setState({user: res.res})
    });
  }

  checkVote(e){
    if(!this.state.user){
      e.preventDefault();
      alert('You need to be signed in!');
    }
  }

  nextPage(){
    if(this.state.pollIndex < this.state.polls.length - 4){
      this.setState({
        currentPolls: this.state.polls.slice(this.state.pollIndex + 4, this.state.pollIndex + 8),
        pollIndex: this.state.pollIndex + 4
      });
    }
  }

  previousPage(){
    if(this.state.pollIndex > 0){
      this.setState({
        currentPolls: this.state.polls.slice(this.state.pollIndex - 4, this.state.pollIndex),
        pollIndex: this.state.pollIndex - 4
      });
    }
  }

  link(p){
    if(p){
      return <Link to={`/poll/${encodeURIComponent(p.name)}`}><div className='button index-button'><span>{p.name}</span></div></Link>
    }
    
  }

  render(){
    let polls = this.state.currentPolls;
    let newLink = this.state.user ? '/newpoll' : '/login';
    let emptyPoll = <Link to={newLink}><div className='button index-button'><span>Add a poll!</span></div></Link>
    let nextClass = this.state.pollIndex < this.state.polls.length - 4 ? 'active' : '';
    let previousClass = this.state.pollIndex > 0 ? 'active' : '';
    return (
      <div id='polls'>
        <Header />
          <div id='poll-list'>
            <div id='poll-boxes'>
              <div className={'navigation ' + previousClass} onClick={this.previousPage.bind(this)}>{'<'}</div>
              <div className='center row'>
                {this.link(polls[0]) ? this.link(polls[0]) : emptyPoll}
                {this.link(polls[1]) ? this.link(polls[1]) : emptyPoll}
              </div>
              <div className='center row'>
                {this.link(polls[2]) ? this.link(polls[2]) : emptyPoll}
                {this.link(polls[3]) ? this.link(polls[3]) : emptyPoll}
              </div>
              <div className={'right navigation ' + nextClass} onClick={this.nextPage.bind(this)}>{'>'}</div>
            </div>
          
          <div className='center row'>
            {this.state.user ? <Link to={`/newpoll`} onClick={this.checkVote.bind(this)}><div className='tall thin button' id='new-poll'>New Poll</div></Link> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;