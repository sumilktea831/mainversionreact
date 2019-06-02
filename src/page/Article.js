import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../component/article/ArticleList/ArticleButton/Pagination'
import ArticleCard from '../component/article/ArticleCard'
import ArticleSlider from '../component/article/ArticleList/ArticleSlider/ArticleSlider'
// import ContactForm from '../component/article/ArticleMail/send'

const memberId = sessionStorage.getItem('memberId')
var data

class Article extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '專業的影評人分析與影視消息',
      midSlogan: '汲取新知與品味。',
      smallSlogan: '開始瀏覽',
      heroSectionPic: 'https://cdn.hipwallpaper.com/i/3/95/r4wFeW.jpg',
      articleData: [], //content  sid author
      pagination: 0, //int
      viewCounter: 0,
      SliderData: [],
      width: 0,
      inputText: '',
      isSeached: true,
    }
    this.byNew = this.byNew.bind(this)
    this.byHot = this.byHot.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  async componentDidMount() {
    // 偵聽視窗寬度
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    try {
      // 倒入文章資訊
      const res = await fetch('http://localhost:5555/articleCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      data = await res.json()
      console.log(data)
      // 該頁的文章為  第1~5
      const articleData = data.slice(0, 7)
      const SliderData = data.slice(0, 6)

      // 全部資料的長度除以 per page 並且無條件進位
      const paginationData = Math.ceil(data.length / 5)
      console.log('pages:' + paginationData)
      this.setState({ articleData: articleData })
      this.setState({ SliderData: SliderData })
      this.setState({ pagination: paginationData })
    } catch (err) {
      console.log(err)
    }
  }

  // 偵聽寬度
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  byNew() {
    const byNewArray = data.reverse()
    console.log(byNewArray)
    this.setState({ articleData: byNewArray })
  }

  byHot() {
    let byHotArray = data.sort(function(a, b) {
      return b.viewCounter - a.viewCounter
    })
    this.setState({ articleData: byHotArray })
  }

  // handleClick = () => {
  //   alert('1324')
  // if (memberId) {
  //   console.log(this.state.memberAllData)
  //   // var newMark = []
  //   var newMark = [...this.state.memberInfo]

  //   // const Marked = newMark.find(item => item === this.state.thisId)

  //   this.setState({ isMarked: !this.state.isMarked })

  //   if (this.state.isMarked) {
  //     newMark = newMark.filter(element => {
  //       return element !== this.state.thisId
  //     })
  //   } else {
  //     newMark = [this.state.thisId, ...this.state.memberInfo]
  //     console.log(typeof this.state.thisId + ':' + this.state.thisId)
  //     console.log('false')
  //     console.log(newMark)
  //   }

  //   // 新的會員資訊 (更新收藏文章項目)
  //   let newMemberData = {
  //     id: this.state.memberAllData.id,
  //     name: this.state.memberAllData.name,
  //     nickname: this.state.memberAllData.nickname,
  //     gender: this.state.memberAllData.gender,
  //     mobile: this.state.memberAllData.mobile,
  //     birth: this.state.memberAllData.birth,
  //     email: this.state.memberAllData.email,
  //     pwd: this.state.memberAllData.pwd,
  //     avatar: this.state.memberAllData.avatar,
  //     city: this.state.memberAllData.city,
  //     address: this.state.memberAllData.address,
  //     fav_type: this.state.memberAllData.fav_type,
  //     career: this.state.memberAllData.career,
  //     join_date: this.state.memberAllData.join_date,
  //     permission: this.state.memberAllData.permission,
  //     collectFilm: this.state.memberAllData.collectFilm,
  //     collectCinema: this.state.memberAllData.collectCinema,
  //     collectArticle: newMark,
  //     collectActivity: this.state.memberAllData.collectActivity,
  //     collectActivityJoin: this.state.memberAllData.collectActivityJoin,
  //     collectForum: this.state.memberAllData.collectForum,
  //     markList: this.state.memberAllData.markList,
  //   }

  //   const data = newMemberData

  //   try {
  //     const res = await fetch(
  //       'http://localhost:5555/member/' + this.state.memberAllData.id,
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(data), //新的會員收藏資料
  //         headers: new Headers({
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         }),
  //       }
  //     )
  //     const newMarkData = await res.json()
  //     const newMarkA = newMarkData.collectArticle
  //     console.log(newMarkData)
  //     console.log('Aid:')
  //     console.log(newMarkA)
  //     // fetch新資料後的判斷渲染套餐(收藏)
  //     // const MarkYN

  //     this.shouldComponentUpdate()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // } else {
  //   alert('please login')
  // }
  // }

  // --------------------------------搜尋套餐--------------------------------
  handleSearch = event => {
    const search = document.querySelector('#articleSerch').value
    // alert(search)
    console.log(search)
    const searchContent = data.filter(
      item => item.content.includes(search) || item.title.includes(search)
    )

    if (searchContent.length !== 0) {
      // addElement()
      this.setState({
        // 將右半邊顯示
        articleData: searchContent,
        isSeached: true,
      })
      // 重新渲染畫面
      // this.setState({ listdataReverse: serchResultArray })
      // await this.setState({
      //   nowIDdata: this.state.listdataReverse[0],
      //   currentcommentApi: this.state.listdataReverse[0].forumCommentArea,
      // })
    } else {
      this.setState({
        isSeached: false,
      })
    }
  }

  render() {
    // if (this.state.articleData.markId === undefined) {
    //   return <></>
    // }
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
          {this.state.width < 1024 ? (
            ''
          ) : (
            <>
              <Row className="px-5">
                <div className="col-md-11 d-flex my-4">
                  <h4 className="text-lighttext-center border-bottom border-light">
                    .Movieee精選
                  </h4>
                </div>
              </Row>

              <Row className="justify-content-md-center">
                <Col md={11}>
                  <ArticleSlider SliderData={this.state.SliderData} />
                </Col>
              </Row>
            </>
          )}

          <div className="mycontainer">
            {/* <ContactForm /> */}
            <Row className="mb-4 d-flex justify-content-between px-5">
              {/* <Col md={}className=""> */}
              <Col className="d-flex my-2" sm={6} md={'auto'}>
                <div
                  className="text-center border-bottom border-light"
                  onClick={this.byNew}
                >
                  <h4 className="text-light">最新消息</h4>
                </div>
                <div
                  className="mx-3 text-center border-bottom border-light"
                  onClick={this.byHot}
                >
                  <h4 className="text-light">熱門文章</h4>
                </div>
                {/* <div className="mx-3 text-center border-bottom border-light">
                <h4 className="text-light">影評專欄</h4>
              </div> */}
              </Col>
              <Col
                sm={6}
                md={'auto'}
                className="my-2 justify-content-start d-flex"
              >
                <div className="input-group pr-4" style={{ width: 360 }}>
                  <input
                    type="text"
                    className="form-control inp_email"
                    placeholder="請輸入關鍵字"
                    id="articleSerch"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn_Subscribe nomarginBtn"
                      onClick={this.handleSearch}
                    >
                      搜尋
                    </button>
                  </div>
                </div>
              </Col>
              {/* </Col> */}
            </Row>

            <Row>
              {this.state.isSeached === true ? (
                <>
                  {this.state.articleData.map(element => (
                    <ArticleCard
                      key={element.index}
                      // 需再設定一個值給Link
                      sid={element.id}
                      cardImg={'/images/article/' + element.image}
                      cardTitle={element.title}
                      date={element.date}
                      author={element.author}
                      cardText={element.content}
                      viewCounter={element.viewCounter}
                      handleClick={this.handleClick}
                    />
                  ))}
                </>
              ) : (
                <Col md={10} className="text-center">
                  找不到相關文章
                </Col>
              )}
            </Row>

            {/* <Row className="justify-content-center">
              <Pagination totalPages={this.state.pagination} />
            </Row> */}
          </div>
        </div>
      </>
    )
  }
}

export default Article
