import React from 'react'
import ForumArticleContentRoy from '../component/Forum/ForumArticleContent/ForumArticleContentRoy'
import ForumArticleCommentRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentRoy'

class Activity extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="container-fuild">
          <div className="row">
            <div className="col-md-12  border border-dark">
              <ForumArticleContentRoy />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12  border border-dark">
              <ForumArticleCommentRoy />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Activity
