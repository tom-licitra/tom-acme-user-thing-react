import React from 'react';

const Header = ({ showAll, toggleShowAll }) => {
  const toggleText = showAll ? 'Only Show Users With Things' : 'Show All Users';
  return (
    <div id="header">
      <h1>Acme Users and Things - React</h1>
      <button type="button" id="toggleBanner" onClick={toggleShowAll}>{toggleText}</button>
    </div>
  )
}

export default Header;
