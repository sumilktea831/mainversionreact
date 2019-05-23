import React from 'react';
// import ActivitySection from '../component/activity/ActivitySection/ActivitySection';
import ArricleList from '../component/article/ArticleList';
import ActivitySection from '../component/activity/ActivitySection/ActivitySection';
import { Row, Col } from 'react-bootstrap';
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination';
import ArticleCard from '../component/article/ArticleList';
// import ArticlePage from '../component/article/ArticlePage/ArticlePage';
const memberId = '4';
class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      bigSlogan: '專業的影評人分析與影視消息',
      midSlogan: '汲取新知與品味。',
      smallSlogan: '開始瀏覽',
      heroSectionPic: 'https://cdn.hipwallpaper.com/i/3/95/r4wFeW.jpg',
      articleData: [],
      paginationData: [],
      // isMarked: true,
      // markSid: ['1', '2'],
      // markCounter: 0,
      // isLiked: false,
      // likeCounter: 0,
      // viewCounter: 0,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8888/article_list', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(data[0].data);
      const articleData = data[0].data;
      const paginationData = data[0].totalPages;
      console.log(data[0].data[0]);
      console.log(data[0].totalPages);
      // const memberMarkSid = data[0].data[0].memberMarkSid.split(',');
      // const memberLikeSid = data[0].data[0].memberLikeSid.split(',');
      // console.log(memberMarkSid);
      this.setState({ articleData: articleData });
      this.setState({ paginationDatisMarkeda: paginationData });
      // const member = '4';
      // const isMarked = memberMarkSid.find(item => item === member)
      //   ? true
      //   : false;
      // const isLiked = memberLikeSid.find(item => item === member)
      //   ? true
      //   : false;
      // this.setState({ isMarked: isMarked });
      // this.setState({ isLiked: isLiked });
      // this.setState({ markCounter: memberMarkSid.length });
      // this.setState({ likeCounter: memberLikeSid.length });
      // console.log(memberMarkSid.length);
    } catch (err) {
      console.log(err);
    }
  }
  handleMark = sid => async () => {
    const newMember = [...this.state.articleData, memberId];

    const res = await fetch('http://localhost:5555/article_list', {
      method: 'PUT',
      body: JSON.stringify(newMember),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const jsonObj = await res.json();
    console.log(jsonObj);
    await this.setState(newMember);
  };
  render() {
    return (
      <>
        <div className="container-fuild">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivitySection
                bigSlogan={this.state.bigSlogan}
                midSlogan={this.state.midSlogan}
                smallSlogan={this.state.smallSlogan}
                pictureSrc={this.state.heroSectionPic}
              />
              {/* <ArricleList image={this.state.imgSrc}/> */}
            </div>
          </div>
          <div className="mycontainer">
            <Row className="mb-4">
              <div className="mx-3 text-center border-bottom border-light">
                <h4 className="text-light">最新消息</h4>
              </div>
              <div className="mx-3 text-center border-bottom border-light">
                <h4 className="text-light">熱門文章</h4>
              </div>
              <div className="mx-3 text-center border-bottom border-light">
                <h4 className="text-light">影評專欄</h4>
              </div>
            </Row>
            <Row>
              {/* articleData = 最初設定的state名稱 */}
              {this.state.articleData.map((element, index) => (
                <>
                  {console.log(element.memberMarkSid.split(','))}
                  <ArticleCard
                    key={element.sid}
                    // 需再設定一個值給Link
                    sid={element.sid}
                    cardImg={'/images/article/' + element.image}
                    cardTitle={element.title}
                    cardText={element.content}
                    isMarked={element.memberMarkSid
                      .split(',')
                      .find(item => memberId === item)}
                    handleMark={this.handleMark}
                  />
                </>
              ))}
              {/* {this.state.articleData.map(function(element){
                console.log('111')
                return(
                <ArticleList

                  key={element.sid}
                  // 需再設定一個值給Link
                  sid={element.sid}
                  cardImg={'/images/article/' + element.image}
                  cardTitle={element.title}
                  cardText={element.content}
                  markSid={element.memberMarkSid}
                />)
              }} */}
            </Row>

            <Row className="justify-content-center">
              <Pagination totalPages={this.state.paginationData} />
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export default Article;
