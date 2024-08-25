import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
  return (
    <article className='notfound'>
      <h2>
        404 Not Found<br />
        페이지를 찾을 수 없습니다..
      </h2>
      <Link to='/' className='NF_link' > 칸반보드로 돌아가기 <img src={`${process.env.PUBLIC_URL}/images/char01_1.gif`} alt="gif 이미지" className='NF_gif' /> </Link>
    </article>
  );
}

export default NotFound;