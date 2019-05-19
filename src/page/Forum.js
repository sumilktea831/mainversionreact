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
import ForumSideActionBarRoy from '../Component/Forum/ForumSideActionBarRoy'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      listdata: [],
      currentdata: [],
    }
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })
      // 從JSONSERVER中抓forum這個陣列的的JSON檔
      const response = await fetch('http://localhost:5555/forum', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      if (!response.ok) throw new Error(response.statusText)

      const jsonObject = await response.json()

      console.log(jsonObject)
      await this.setState({ listdata: jsonObject })
    } catch (e) {
      console.log(e)
    }
  }
  handleClick = (index, element) => {
    let a = [element]
    console.log(index)
    console.log(a)
    this.setState({ currentdata: a })
  }

  render() {
    return (
      <>
        <div className="container-fuild justify-content-center">
          <div className="row justify-content-center ">
            <div className="col-3 mr-4 p-0 ">
              <div className="">
                <ActionBtnCreateRoy />
                <div className="my-4">
                  <ForumSearchbarRoy />
                </div>
                <div className="d-flex mb-3">
                  <ActionButtonCategoryRoy />
                  <div className=" ml-3">
                    <ActionButtonFilterRoy />
                  </div>
                </div>
                <ActionBtnScrollTopRoy />
                {/* 將陣列倒入COMPINET，用MAP的方式，記得設定KEY */}
                {/* 同時撈將各index */}
                {this.state.listdata.map((element, index) => (
                  <ForumArticleListRoy
                    //MAP之所在，KEY之所在
                    key={element.id}
                    listheadline={element.headline}
                    listforumSpoilers={element.forumSpoilers}
                    listforumViews={element.forumViews}
                    listforumCreateDate={element.forumCreateDate}
                    listforumName={element.forumName}
                    listforumAvatar={element.forumAvatar}
                    // 用bind綁定偵測點擊當下的element之index，並傳入handleClick得到index值
                    onClick={this.handleClick.bind(this, index, element)}
                  />
                ))}
                <ActionBtnScrollBottomRoy />
              </div>
            </div>
            <div className="col-7 ml-4">
              <div className="row m-0 p-0">
                <div className="col-12  p-5 border border-dark">
                  <ForumArticleContentRoy
                    contentheadline={this.state.currentdata.headline}
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-12 p-5 border border-dark">
                  <ForumArticleCommentRoy />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="px-3 py-4 rounded border border-warning position-fixed"
          style={{ right: 0, top: '25vh' }}
        >
          <ForumSideActionBarRoy />
        </div>
      </>
    )
  }
}

export default Forum
