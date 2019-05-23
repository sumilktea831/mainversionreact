import React from 'react';
// import ActivitySection from '../component/activity/ActivitySection/ActivitySection';
import ArricleList from '../component/article/ArticleList';
import ActivitySection from '../component/activity/ActivitySection/ActivitySection';
import { Row, Col } from 'react-bootstrap';
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination';
import ArticleList from '../component/article/ArticleList';
// import ArticlePage from '../component/article/ArticlePage/ArticlePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ViewPage from '../component/article/ArticlePage/ViewPage';
const memberId = '4';

class ArticlePage1 extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.id);
    this.state = {
      thisId: props.match.params.id,
      pageData: [],
      isMarked: false, // boolean
      markSid: ['1', '2'],
      markCounter: 0,
      isLiked: false,
      likeCounter: 0,
      viewCounter: 0,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/article_list', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(data[0].data);
      const pageData = data[0].data;
      const page = pageData.find(item => item.sid === this.state.thisId);
      this.setState({ pageData: page });

      const memberMarkSid = data[0].data[0].memberMarkSid.split(',');
      const memberLikeSid = data[0].data[0].memberLikeSid.split(',');
      console.log(memberMarkSid);

      const isMarked = memberMarkSid.find(item => item === memberId)
        ? true
        : false;
      const isLiked = memberLikeSid.find(item => item === memberId)
        ? true
        : false;
      this.setState({ isMarked: isMarked });
      this.setState({ isLiked: isLiked });
      this.setState({ markCounter: memberMarkSid.length });
      this.setState({ likeCounter: memberLikeSid.length });
    } catch (err) {
      console.log(err);
    }
  }

  handleMark = sid => () => {
    const markSid = [...this.state.markSid];
    const newItems = markSid.push(memberId);
    this.setState({ markSid: newItems });
  };

  render() {
    console.log(this.state.pageData);
    let a = this.state.pageData;

    return (
      <>
        <ViewPage
          title={this.state.pageData.title}
          author={this.state.pageData.author}
          content={this.state.pageData.content}
          date={this.state.pageData.date}
          pageImg={'/images//article/' + this.state.pageData.image}
          isMarked={this.state.isMarked}
          markCounter={this.state.markCounter}
          isLiked={this.state.isLiked}
          likeCounter={this.state.likeCounter}
          viewCounter={this.state.viewCounter}
          pushMarkSid={this.handlepushMarkSid}
        />
      </>
    );
  }
}

export default ArticlePage;
