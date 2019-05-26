import React from 'react'
// 按鈕按下取消TEXTAREA的內容
const ForumCommentCancelRoy = props => {
  return (
    <>
      <button
        type="button"
        className="btn btn-warning px-3"
        onClick={props.handleCommentInputCancel}
      >
        取消
      </button>
    </>
  )
}

export default ForumCommentCancelRoy
