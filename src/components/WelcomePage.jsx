import React from 'react';
import '../App.css';
import grafismo from '../images/grafismo-topo.png';
import group from '../images/Group.png';

export default function WelcomePage() {
  return (
    <div className="welcomepg">
      <img src={ grafismo } alt="grafismo" className="grafismoImg" />
      <img src={ group } alt="group" className="groupImg" />
    </div>
  );
}
