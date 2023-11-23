import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';  

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleNav = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  document.documentElement.style.setProperty('--dynamic-margin', '30px');
  return (
    /* Start Side Bar */
    <div className="app" id="main">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" class="closebtn" onClick={toggleNav}>×</a>
        <Link to="/">Home</Link>
        <Link to="/request-account">Request Account</Link>
        <Link to="/approved-accounts">Approved Accounts</Link>
        <Link to="/decline-accounts">Decline Accounts</Link>
        <Link to="/all-request-account">All Account</Link>
      </div>
    {/*End Side Bar */}
    {/*Start Content Here*/}
      <div id="main">
        <button className="openbtn" onClick={toggleNav}>☰</button>
      </div>
    </div>
  );
};

export default SideBar;