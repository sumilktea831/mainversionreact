import React from 'react'
// import ActivitySection from '../component/activity/ActivitySection/ActivitySection';
import ArricleList from '../component/article/ArticleList'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination'
import ArticleList from '../component/article/ArticleList'
// import ArticlePage from '../component/article/ArticlePage/ArticlePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ViewPage from '../component/article/ArticlePage/ViewPage'
const memberId = '4'

class ArticlePage extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.match.params.id)
    this.state = {
      thisId: props.match.params.id, //該篇連結id = id
      articleInfo: [], //該篇的資料
      isMarked: false, // boolean
      markCounter: 0,
      isLiked: false,
      likeCounter: 0,
      viewCounter: 0,
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/articleCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      console.log(data)
      // console.log(data[0].data);

      // 所有文章的資料
      const pageData = data

      //將該篇資料倒入狀態
      const page = pageData.find(item => item.id === this.state.thisId)
      this.setState({ articleInfo: page })
      this.setState({ viewCounter: page.viewCounter })

      //該篇文章收藏按讚的會員ID
      const markSid = page.markId.split(',') //全部篇的 mark_id欄位
      const likeSid = page.likeId.split(',')
      console.log(markSid)

      //判斷收藏該篇的名單中 有沒有該會員 (獨立狀態) 目前會員是4號
      const isMarked = markSid.find(item => item === memberId) ? true : false
      const isLiked = likeSid.find(item => item === memberId) ? true : false

      // 資料倒入狀態 是否收藏
      this.setState({ isMarked: isMarked }) //boolean
      this.setState({ isLiked: isLiked })

      // 按讚收藏人數
      this.setState({ markCounter: markSid.length })
      this.setState({ likeCounter: likeSid.length })
    } catch (err) {
      console.log(err)
    }
  }

  // async handleClick(value) {
  //   try {
  //     const res = await fetch(
  //       'http://localhost:5555/article_list?data.sid=' +
  //         this.props.match.params.id,
  //       {
  //         method: 'PUT',
  //         headers: new Headers({
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         }),
  //         data: {
  //           veiwCounter: +this.state.viewCounter + value,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  render() {
    return (
      <ViewPage
        sid={this.state.articleInfo.id}
        title={this.state.articleInfo.title}
        author={this.state.articleInfo.author}
        content={this.state.articleInfo.content}
        date={this.state.articleInfo.date}
        pageImg={'/images//article/' + this.state.articleInfo.image}
        isMarked={this.state.isMarked}
        markCounter={this.state.markCounter}
        isLiked={this.state.isLiked}
        likeCounter={this.state.likeCounter}
        viewCounter={this.state.viewCounter}
        pushMarkSid={this.handlepushMarkSid}
        // handleClick={this.handleClick(1)}
      />
    )
  }
}
// handleClick = value => () => {
//   // const newInfo = [...this.state.articleInfo];
//   this.setState({ viewCounter: +this.state.viewCounter + value });
// };

export default ArticlePage
