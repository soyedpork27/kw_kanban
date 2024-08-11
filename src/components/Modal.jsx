import React, { useContext, useState } from 'react';

import '../style/modal.css';

import { IoIosCloseCircleOutline } from "react-icons/io";
import { kanbanContext } from '../context/kanbanContext';


function Modal({value, index, modalClose}) {

  const {fixItem} = useContext(kanbanContext);

  const [content, setContent] = useState(value.content);

  const [title, setTitle] = useState(value.title);

  const handleContent = (e) => {
    setContent(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: value.id,
      title : title,
      sDate : '2024-08-10',
      eDate : '2024-09-10',
      content,
    }


    fixItem(value.id, data, index);
    modalClose();
  }


  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const preventEnter = (e) => {
    if(e.key==="Enter"){
      e.preventDefault();
    }
  }

  return (
    <div className='modal-bg' >


      <section className='modal-box'>
        
            <IoIosCloseCircleOutline className='modal-close' onClick={modalClose} />
        <form onSubmit={handleSubmit} >

            <h3 className='modal-title'>
              <input type="text" value={title} onChange={handleTitle} className='title-input' placeholder={!title?'제목을 입력해주세요.':title} onKeyDown={preventEnter}  />
            </h3>


          <div className='modal-row'>
            <h4 className='row-title'>상태</h4>
            {index===0&&<p className='kanban-type'>대기중</p>}
            {index===1&&<p className='kanban-type'>진행중</p>}
            {index===2&&<p className='kanban-type'>완료</p>}
          </div>

          <div className='modal-row'>
            <h4 className='row-title'>
              시작일
            </h4>
            <p className='row-date'>
              {value.sDate}
            </p>

          </div>

          <div className='modal-row'>
            <h4 className='row-title'>
              목표 종료일
            </h4>
            <p className='row-date'>
              {value.eDate}
            </p>

          </div>

          <div className='modal-row'>
            <h4 className='row-title'>내용</h4>
            <textarea className='modal-content' value={content} placeholder={!content?'내용을 입력해주세요.':''} onChange={handleContent} >
            </textarea>
          </div>


          <button type='submit' className='modal-submit_btn'>
            변경하기
          </button>


        </form>



      </section>



    </div>
  );
}

export default Modal;