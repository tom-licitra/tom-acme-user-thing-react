/* eslint-disable */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import UserList from './UserList';
import Header from './Header';

class Main extends Component {
  constructor () {
    super();
    this.state = {
      users: [],
      showAll: true
    }
    this.toggleShowAll = this.toggleShowAll.bind(this);
  }

  async componentDidMount () {
    const _users = await axios.get('/users');
    this.setState({
      users: _users.data
    })
  }

  toggleShowAll () {
    let toggled = !(this.state.showAll);
    this.setState({
      showAll: (toggled)
    })
  }

  render () {
    const { users, showAll } = this.state;
    return (
      <div id="main">
        <Header showAll={showAll} toggleShowAll={this.toggleShowAll} />
        <UserList users={users} showAll={showAll} />
        <hr />
        <div id="signature">A Fullstack Academy Project</div>
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
