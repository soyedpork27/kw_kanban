import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
  return (
    <>
      404 Not Found

      <Link to='/'> 홈으로 </Link>
    </>
  );
}

export default NotFound;