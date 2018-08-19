import React from 'react';
import User from './User.js';

const UserList = ({ users, showAll }) => {
  if (!showAll) {
    users = users.filter( user => {return user.things.length > 0})
  }
  return (
    <div id="UserList">
      {users.map( user => <User key={user.id} user={user} />)}
    </div>
  )
}

export default UserList;
