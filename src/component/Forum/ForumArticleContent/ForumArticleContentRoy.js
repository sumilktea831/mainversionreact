import React from 'react'
import ForumArticleAvatarRoy from '../ForumArticleAvatarRoy'
import ForumArticleContentTiltleRoy from './ForumArticleContentTiltleRoy'
import ForumArticleContentDateRoy from './ForumArticleContentDateRoy'

const ForumArticleContentRoy = props => {
  return (
    <>
      <div className="d-flex">
        <ForumArticleContentTiltleRoy contentheadline={props.contentheadline} />
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <ForumArticleAvatarRoy
          contentUserAvatar={props.contentUserAvatar}
          contentUserName={props.contentUserName}
          // 圖片路徑前墜
          avatarPath={props.avatarPath}
        />
        <ForumArticleContentDateRoy contentIssueDate={props.contentIssueDate} />
      </div>
      <div className="my-4">
        {/* 路徑前墜+後墜 */}
        <img
          src={props.avatarPath + props.contentArticlePic}
          className="h-100 w-100"
          alt=""
        />
      </div>
      <p
        className="text-light my-4 "
        // 將文字內容tag用html方式render到頁面
        dangerouslySetInnerHTML={{ __html: props.contentReview }}
      />
    </>
  )
}

export default ForumArticleContentRoy
