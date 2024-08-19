import React from 'react';
import { Link } from 'react-router-dom';


function Header(props) {

  // const {undo,progress,done} = useContext(kanbanContext);

  const GNB = [
    {
      text : 'KanBan',
      to : '/'
    },
    {
      text : 'Setting',
      to : '/setting'
    },
    {
      text : 'Log in',
      to : '/login'
    },
    {
      text : 'Sign in',
      to : '/register'
    }
  ];


  return (
    <header className='Header'>
      <h1 className='Logo'>Logo</h1>

      <ul className='GNB'>
        {GNB.map((i,idx)=>(<li key={idx}><Link to={i.to}>{i.text}</Link></li>))}
      </ul>
    </header>
  );
}

export default Header;