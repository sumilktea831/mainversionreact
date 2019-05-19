import React from 'react'
import ActionButtonPushRoy from './ForumActionButton/ActionButtonPushRoy'
import ActionButtonFollowRoy from './ForumActionButton/ActionButtonFollowRoy'
import ActionButtonCommentRoy from './ForumActionButton/ActionButtonPushRoy'
import ActionButtonSaveRoy from './ForumActionButton/ActionButtonSaveRoy'
import ActionButtonShareRoy from './ForumActionButton/ActionButtonShareRoy'
import ActionButtonReportRoy from './ForumActionButton/ActionButtonReportRoy'

const ForumSideActionBarRoy = () => (
  <div className="">
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: '350px' }}
    >
      <ActionButtonPushRoy />
      <ActionButtonFollowRoy />
      <ActionButtonCommentRoy />
      <ActionButtonSaveRoy />
      <ActionButtonShareRoy />
      <ActionButtonReportRoy />
    </div>
  </div>
)

export default ForumSideActionBarRoy
