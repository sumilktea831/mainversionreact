import React from 'react'
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
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: '40px' }}
        >
          <ListTitleRoy />
          <ListSpoilersIconRoy />
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: '40px' }}
        >
          <ListAvatarRoy />
          <ListIssueDateRoy />
          <ListViewsRoy />
        </div>
      </div>
    </>
  )
}

export default ForumArticleListRoy
