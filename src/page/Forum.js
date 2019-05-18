import React from 'react'
import ForumArticleListRoy from '../Component/Forum/ForumArticleList/ForumArticleListRoy'
import ForumSearchbarRoy from '../Component/Forum/ForumSearchbarRoy'
import ForumArticleContentRoy from '../Component/Forum/ForumArticleContent/ForumArticleContentRoy'
import ForumArticleCommentRoy from '../Component/Forum/ForumArticleComment/ForumArticleCommentRoy'
import ActionButtonCategoryRoy from '../Component/Forum/ForumActionButton/ActionButtonCategoryRoy'
import ActionButtonFilterRoy from '../Component/Forum/ForumActionButton/ActionButtonFilterRoy'
import ActionBtnScrollTopRoy from '../Component/Forum/ForumActionButton/ActionBtnScrollTopRoy'
import ActionBtnScrollBottomRoy from '../Component/Forum/ForumActionButton/ActionBtnScrollBottomRoy'
import ActionBtnCreateRoy from '../Component/Forum/ForumActionButton/ActionBtnCreateRoy'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="container-fuild">
          <div className="row justify-content-center">
            <div className="col-3 mx-2 p-0">
              <ActionBtnCreateRoy />
              <div className="my-4">
                <ForumSearchbarRoy />
              </div>
              <div className="row mx-0 mb-3">
                <ActionButtonCategoryRoy />
                <div className="mx-3">
                  <ActionButtonFilterRoy />
                </div>
              </div>
              <ActionBtnScrollTopRoy />
              <ForumArticleListRoy />
              <ForumArticleListRoy />
              <ForumArticleListRoy />
              <ForumArticleListRoy />
              <ForumArticleListRoy />
              <ActionBtnScrollBottomRoy />
            </div>
            <div className="col-7 ">
              <div className="row ">
                <div className="col-12 mx-5 p-5 border border-dark">
                  <ForumArticleContentRoy />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-12 mx-5 p-5 border border-dark">
                  <ForumArticleCommentRoy />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Forum
