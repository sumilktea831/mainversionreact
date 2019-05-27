import React from 'react'

const ForumCommentCreateRoy = props => {
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-warning px-3"
        onClick={props.handleCommentInput}
      >
        留言
      </button>
    </>
  )
}

export default ForumCommentCreateRoy
