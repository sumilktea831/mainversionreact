import React from './node_modules/reacte_modules/react'
import ListSpoilersIconRoy from './ListSpoilersIconRoy'
import ListIssueDateRoy from './ListIssueDateRoy'
import ListTitleRoy from './ListTitleRoy'
import ListAvatarRoy from './ListAvatarRoy'
import ListViewsRoy from './ListViewsRoy'

const ForumArticleListRoy = props => {
  return (
    <>
      <div
        type="button"
        className="border border-dark px-4 p-2 bg-dark my-2"
        onClick={props.onClick}
      >
        {/* 列表上排 */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: '40px' }}
        >
          <ListTitleRoy listheadline={props.listheadline} />
          <ListSpoilersIconRoy listforumSpoilers={props.listforumSpoilers} />
        </div>
        {/* 列表下排 */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: '40px' }}
        >
          {/* 個人頭像，包含名稱與照片 */}
          <div className="col-4 p-0">
            <ListAvatarRoy
              listforumName={props.listforumName}
              listforumAvatar={props.listforumAvatar}
            />
          </div>
          {/* 發文時間 */}
          <div className="col-5 p-0">
            <ListIssueDateRoy listforumCreateDate={props.listforumCreateDate} />{' '}
          </div>
          {/* 觀看次數 */}
          <div className="col-3 p-0 d-flex justify-content-end">
            <ListViewsRoy listforumViews={props.listforumViews} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ForumArticleListRoy
