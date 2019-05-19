import React from 'react'
import ForumArticleListRoy from '../component/Forum/ForumArticleList/ForumArticleListRoy'
import ForumSearchbarRoy from '../component/Forum/ForumSearchbarRoy'
import ForumArticleContentRoy from '../component/Forum/ForumArticleContent/ForumArticleContentRoy'
import ForumArticleCommentRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentRoy'
import ActionButtonCategoryRoy from '../component/Forum/ForumActionButton/ActionButtonCategoryRoy'
import ActionButtonFilterRoy from '../component/Forum/ForumActionButton/ActionButtonFilterRoy'
import ActionBtnScrollTopRoy from '../component/Forum/ForumActionButton/ActionBtnScrollTopRoy'
import ActionBtnScrollBottomRoy from '../component/Forum/ForumActionButton/ActionBtnScrollBottomRoy'
import ActionBtnCreateRoy from '../component/Forum/ForumActionButton/ActionBtnCreateRoy'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="fix-container-fluid" />
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
