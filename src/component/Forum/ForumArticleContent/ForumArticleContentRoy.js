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
        />
        <ForumArticleContentDateRoy contentIssueDate={props.contentIssueDate} />
      </div>
      <div className="my-4">
        <img
          src={
            'http://localhost:3000/images/' + props.contentArticlePic + '.jpg'
          }
          className="h-100 w-100"
          alt=""
        />
      </div>
      <p className="text-light my-4 "> {props.contentReview}</p>
    </>
  )
}

export default ForumArticleContentRoy
