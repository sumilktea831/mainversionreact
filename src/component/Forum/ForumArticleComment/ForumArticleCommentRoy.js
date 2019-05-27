import React from 'react'
import ForumCommentAvatarRoy from './ForumCommentAvatarRoy'
import ForumArticleCommentThumbRoy from './ForumArticleCommentThumbRoy'

const ForumArticleCommentRoy = props => {
  // console.log(props)
  return (
    <>
      {/* 設計一個ID給刪除留言時抓ID用 */}
      <div className="my-5" id={props.forumCommentId + 'nowCommentId'}>
        <div className="d-flex my-4 justify-content-between align-items-end">
          <ForumCommentAvatarRoy
            commentUserName={props.commentUserName}
            commentAvatar={props.commentAvatar}
            // 照片路徑前墜
            avatarPath={props.avatarPath}
          />
          <div className="">
            <div className="justify-content-end d-flex align-items-center  ml-2 mt-1">
              <button
                className="btn btn-outline-warning mb-3 "
                onClick={props.handleCommentDelete}
              >
                刪除留言
              </button>
            </div>
            <ForumArticleCommentThumbRoy
              commentLike={props.commentLike}
              commentDislike={props.commentDislike}
            />
          </div>
        </div>
        <div className="text-light ">
          <p
            className="m-0"
            // 將文字內容tag用html方式render到頁面
            dangerouslySetInnerHTML={{ __html: props.commentComment }}
          />
        </div>
      </div>
    </>
  )
}

export default ForumArticleCommentRoy
