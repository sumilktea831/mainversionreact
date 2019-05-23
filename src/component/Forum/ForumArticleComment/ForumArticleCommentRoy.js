import React from 'react'
import ForumCommentAvatarRoy from './ForumCommentAvatarRoy'
import ForumArticleCommentThumbRoy from './ForumArticleCommentThumbRoy'

const ForumArticleCommentRoy = props => {
  // console.log(props)
  return (
    <>
      <div className="my-5">
        <div className="d-flex my-4 justify-content-between align-items-end">
          <ForumCommentAvatarRoy
            commentUserName={props.commentUserName}
            commentAvatar={props.commentAvatar}
            // 照片路徑前墜
            avatarPath={props.avatarPath}
          />
          <ForumArticleCommentThumbRoy
            commentLike={props.commentLike}
            commentDislike={props.commentDislike}
          />
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
