import React from 'react'

const ForumArticleContentTiltleRoy = props => {
  // console.log(props.contentheadlineId)
  return (
    <div className=" d-flex align-items-center justify-content-between">
      <div className=" my-4 text-center text-light border-bottom border-light  ">
        <h4
          id={'contentheadlineId' + props.contentheadlineId}
          onKeyPress={props.handleHeadlineEditKeyboardControl}
          className="text-light "
          // 關閉警告在REACT控制範圍內變更實體DOM產生的警告
          suppressContentEditableWarning={true}
          // 一定要把true false設為字串傳，contenteditable如果只給boolean不會顯示
          contentEditable={props.handleHeadlineEditStatus}
          // maxlength="20"
          // style={{ whiteSpace: 'nowrap' }}
          // dangerouslySetInnerHTML={{ __html: props.contentheadline }}
          required
        >
          {unescape(props.contentheadline)}
        </h4>
      </div>
      <div className="d-flex align-items-center">
        <div className="justify-content-end d-flex align-items-center ml-2 mt-1 ">
          <button
            className={
              'btn btn-outline-warning mb-3 ' + props.HeadlineCancelBtnStatus
            }
            onClick={props.handleHeadlineEditCancel}
          >
            取消
          </button>
        </div>
        <div className="justify-content-end d-flex align-items-center ml-2 mt-1 ">
          <button
            className={
              'btn btn-outline-warning mb-3 ' + props.HeadlineEditBtnStatus
            }
            onClick={props.handleHeadlineEditTrigger}
          >
            編輯標題
          </button>
        </div>
        <div className="justify-content-end d-flex  align-items-center  ml-2 mt-1 ">
          <button
            className={
              'btn btn-outline-warning mb-3 ' + props.HeadlineSaveBtnStatus
            }
            onClick={props.handleHeadlineEditSave}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForumArticleContentTiltleRoy
