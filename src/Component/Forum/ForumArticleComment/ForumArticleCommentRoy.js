import React from './node_modules/react'
import ForumArticleCommentAreaRoy from './ForumArticleCommentAreaRoy'
import ForumArticleCommentInputRoy from './ForumArticleCommentInputRoy'
import ForumCommentCancelRoy from './ForumCommentCancelRoy'
import ForumCommentCreateRoy from './ForumCommentCreateRoy'
import ForumCategoryTextRoy from './ForumCategoryTextRoy'
import ForumCommentCountRoy from './ForumCommentCountRoy'

const ForumArticleCommentRoy = () => {
  return (
    <>
      <div className="d-flex ">
        <div className="">
          <ForumCategoryTextRoy />
        </div>
        <div className="mx-5">
          <ForumCommentCountRoy />
        </div>
      </div>
      <div className="my-5">
        <ForumArticleCommentAreaRoy />
      </div>
      <ForumArticleCommentInputRoy />
      <div className="my-4 d-flex justify-content-end">
        <div className="mx-4">
          <ForumCommentCancelRoy />
        </div>
        <ForumCommentCreateRoy />
      </div>
    </>
  )
}

export default ForumArticleCommentRoy
