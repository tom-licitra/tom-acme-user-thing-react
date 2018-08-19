import React from 'react';

const User = ({ user }) => {
  return (
    <div className="User">
      <div className="UserName"><h3>{user.name}</h3></div>
      <div className="UserThings">{user.things.map( thing => <div key={thing.id}>{thing.name}</div>)}</div>
    </div>
  )
}

export default User;
