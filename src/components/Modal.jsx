import React, { useContext, useState } from 'react';

import '../style/Home/modal.css';

import { IoIosCloseCircleOutline } from "react-icons/io";
import { kanbanContext } from '../context/kanbanContext';
import MyCalendar from './Home/Modal/MyCalendar';




function Modal({value, index, modalClose}) {

  const {fixItem, deleteItem} = useContext(kanbanContext);

  // 모달에서 제목(타이틀) 스테이트
  const [title, setTitle] = useState(value.title);

  // 모달에서 내용(콘텐츠) 스테이트
  const [content, setContent] = useState(value.content);


  const handleContent = (e) => {
    setContent(e.target.value);
  }

  // 모달에서 변경하기 값 클릭 시 이벤트!
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


  // 제목(타이틀) 값 변경하기!
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const preventEnter = (e) => {
    if(e.key==="Enter"){
      e.preventDefault();
    }
  }

  // 모달에서 삭제버튼 클릭 시 실행되는 핸들러 함수
  const handleDelete = (_, itemId, idx) => {

    // context 함수 아이디와 인덱스 넘기기!
    deleteItem(itemId, idx);

    modalClose();
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
            {index===0&&<p className='kanban-type undo'>대기중</p>}
            {index===1&&<p className='kanban-type progress'>진행중</p>}
            {index===2&&<p className='kanban-type done'>완료</p>}
          </div>

          <div className='modal-row'>
            <h4 className='row-title'>
              시작일
            </h4>
            <p className='row-date'>
              <MyCalendar Date={value.sDate} />
              {/* {value.sDate} */}
            </p>

          </div>

          <div className='modal-row'>
            <h4 className='row-title'>
              종료일
            </h4>
            <p className='row-date'>

              <MyCalendar Date={value.eDate} />
              {/* {value.eDate} */}
            </p>

          </div>

          <div className='modal-row'>
            <h4 className='row-title'>내용</h4>
            <textarea className='modal-content' value={content} placeholder={!content?'내용을 입력해주세요.':''} onChange={handleContent} >
            </textarea>
          </div>



          <div className='modal-row btn-row'>
            <button type='submit' className='modal-submit_btn'>
              변경하기
            </button>

            <button type='button' className='modal-delete_btn' onClick={(e)=>handleDelete(e, value.id, index)} >
              삭제하기
            </button>
          </div>


        </form>



      </section>



    </div>
  );
}

export default Modal;