import React from 'react'
import { Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import MemberBackSidenav from '../component/backSidenav/MemberBackSidenav'
import CinemaBackSidenav from '../component/backSidenav/CinemaBackSidenav'
import TitleKaga from '../component/cinema/TitleKaga'
import AvatarOne from '../component/cinema/AvatarTypeOne/AvatarOne'
import DataBox from '../component/cinema/DataBoxSM/DataBox'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import MemberEditInfo from '../component/meberBack/MemberEditInfo'

//memberId
const memberId = sessionStorage.getItem('memberId')

class BackSidenav extends React.Component {
  constructor(props) {
    super(props.props)
    const path = window.location.pathname.slice(1)
    console.log(path)
    this.state = {
      // sidenave
      memberSidenavItems: [],
      cinemaSidenavItems: [],
      // 會員用state
      memberEditInputmsg: [],
      allMemberData: [],
      thisMemberData: [],
      avatarOne: '',
      boxData: '',
      filmCard: [],
      //活動用state
      activityPageData: [],
      activityPageOtherData: [],
    }
  }

  async componentDidMount() {
    //取得會員sidenav項目
    try {
      const response = await fetch('http://localhost:5555/memberBackSidenav', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ memberSidenavItems: data })
    } catch (e) {
      console.log(e)
    }
    //取得戲院sidenav項目
    try {
      const response = await fetch('http://localhost:5555/cinemaBackSidenav', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ cinemaSidenavItems: data })
    } catch (e) {
      console.log(e)
    }
    //取得會員資料
    try {
      const response = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject.find(
        item => item.id === sessionStorage.getItem('memberId')
      )
      console.log('session' + sessionStorage.getItem('memberId'))
      await this.setState({ thisMemberData: data, allMemberData: jsonObject })
    } catch (e) {
      console.log(e)
    }
    //取得會員editInfo項目
    try {
      const response = await fetch('http://localhost:5555/memberEditInputmsg', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ memberEditInputmsg: data })
    } catch (e) {
      console.log(e)
    }

    // 導入會員資料
    try {
      const resMember = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataMember = await resMember.json()

      // 導入戲院資料
      // const resCinema = await fetch('http://localhost:5555/Cinema', {
      //   method: 'GET',
      //   headers: new Headers({
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   }),
      // })
      // const dataCinema = await resCinema.json()

      // 導入論壇資料
      const resForum = await fetch('http://localhost:5555/forum', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataForum = await resForum.json()

      // 導入影片資料   --到時候串接用
      // const resFilm = await fetch('http://localhost:5555/film', {
      //   method: 'GET',
      //   headers: new Headers({
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   }),
      // })
      // const dataFilm = await resFilm.json()

      // 導入活動資料
      const resActivity = await fetch(
        'http://localhost:5555/activityCardData',
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const dataActivity = await resActivity.json()

      const activityPageData = dataActivity.find(
        item => item.id === +this.props.match.params.id
      )
      const activityPageOtherData = dataActivity.filter(
        item => item.id !== +this.props.match.params.id
      )
      this.setState({ activityPageData: activityPageData })
      this.setState({ activityPageOtherData: activityPageOtherData })

      // 會員my-preview頁面需要的資料
      const memberPageData = dataMember.find(item => item.id === memberId)
      // 元件AvatarOne -- 完成
      // 如果沒有頭像就給他預設頭像
      const memberAvatar =
        memberPageData.avatar !== '' ? memberPageData.avatar : 'movieStar.jpg'
      const avatarOneData = {
        img: 'http://localhost:3000/images/' + memberAvatar,
        name: memberPageData.name,
        purview: memberPageData.permission,
        SignUpDate: memberPageData.join_date,
      }

      // 元件DataBox -- 完成
      const forumPublishData = dataForum.filter(
        item => item.forumNameId === memberId
      )
      const dataBoxData = {
        collection: memberPageData.collectFilm.length,
        Awesome: memberPageData.collectArticle.length,
        PageViews: forumPublishData.length,
      }
      // 元件filmCard
      // 先找出影片id跟會員收藏id一致的資料 (會員收藏是array) --到時候串接用
      // const filmCard = dataFilm.filter(item =>
      //   memberPageData.collectFilm.map(items => item.id === items)
      // )
      // 如果資料筆數超過設定筆數  就只剩下這幾筆 (這邊設定4筆)  --到時候串接用
      // const newfilmCardata = []
      // this.state.filmCard.map((item, index) => {
      //   if (index < 4) {
      //     return newfilmCardata.push(item)
      //   }
      //   return item
      // })
      // const filmCardData = newfilmCardata.map(item => ({      ----到時候串接用
      const filmCardData = {
        key: '',
        id: '',
        title: '',
        subtitle: '',
        img: '',
        link: '',
        star: '',
        mark: '',
        newStarAndMark: '',
        del: '',
      }
      this.setState({
        avatarOne: avatarOneData,
        boxData: dataBoxData,
        filmCard: filmCardData,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 等拿到影片json再串吧
  filmCardNewStarAndMark = (newStar, newMark) => {
    console.log(newStar)
    console.log(newMark)
    alert('newStarAndMark is Back to father')
  }
  filmCardDel = () => {
    alert('delFunction is start')
  }

  // 登出function
  handleLogout = () => {
    //點擊登出，清除session並導回主頁
    // sessionStorage.removeItem('memberID') //不知道為什麼這個方法無效
    sessionStorage.clear()
    window.location.href = '/mainpage'
  }
  render() {
    if (
      !(
        sessionStorage.getItem('memberId') || sessionStorage.getItem('cinemaId')
      )
    ) {
      // alert('回到登入頁')
      window.location.href = '/LoginSign'
    } else {
      //判斷登入者是會員or戲院，帶入相應的sidenav
      const sidenav = sessionStorage.getItem('memberId') ? (
        <MemberBackSidenav sidenavItems={this.state.memberSidenavItems} />
      ) : (
        <CinemaBackSidenav sidenavItems={this.state.cinemaSidenavItems} />
      )
      const pagename = this.props.location.pathname.slice(14)

      return (
        <>
          {/* 暫時上方navbar區塊 */}
          <Row>
            {sidenav}
            <div //右邊內容框，之後要引入內容component
              className="col container-fluid"
              style={{
                background: '#2b333d',
                padding: '240px 120px 120px 120px',
              }}
            >
              {/* 會員公開個人資訊 */}
              {pagename === 'my-preview' ? (
                <>
                  <TitleKaga title="公開資訊卡預覽" />
                  <div
                    className="row d-flex align-items-center my-5"
                    style={{ height: '200px' }}
                  >
                    {/* 上面資訊列 */}
                    <AvatarOne
                      img={this.state.avatarOne.img}
                      name={this.state.avatarOne.name}
                      purview={this.state.avatarOne.purview}
                      SignUpDate={this.state.avatarOne.SignUpDate}
                    />
                    <DataBox
                      collection={this.state.boxData.collection}
                      Awesome={this.state.boxData.Awesome}
                      PageViews={this.state.boxData.PageViews}
                      member
                    />
                  </div>
                  {/* 隔開兩類專用 */}
                  <div className="py-5">
                    <TitleKaga title="喜愛電影類型" />
                  </div>
                  {/* 喜好列塞入處 */}
                  <div
                    className="row d-flex align-items-center bg-danger"
                    style={{ height: '200px' }}
                  >
                    喜好列 多選欄(尚無原件套用)
                  </div>
                  <div className="py-5" />
                  <TitleKaga title="收藏影片" />
                  <div className="d-flex flex-wrap col-lg-12 mt-4">
                    <CardKaga
                      key=""
                      id=""
                      title=""
                      subtitle=""
                      img=""
                      link=""
                      // collectionIcon
                      // collectionClick={this.collectionClick}
                      // collection={}
                      popup
                      member
                      star={[]}
                      starAmimation
                      mark={[]}
                      newStarAndMark={this.filmCardNewStarAndMark}
                      del={this.filmCardDel}
                    />
                    {/* {this.state.filmCard.map(item => (   --串接時使用
                      <CardKaga
                        key={item.key}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={'http://localhost:3000/images/' + item.img}
                        link={'/film/' + item.link}
                        // collectionIcon
                        // collectionClick={this.collectionClick}
                        // collection={}
                        popup
                        member
                        star={item.star}
                        starAmimation
                        mark={item.cinemaMark}
                        newStarAndMark={this.filmCardNewStarAndMark}
                        del={this.filmCardDel}
                      />
                    ))} */}
                  </div>
                  <div className="py-5" />
                  <TitleKaga title="收藏文章" />
                  <div
                    className=" d-flex flex-wrap col-lg-12 bg-danger my-5"
                    style={{
                      height: '300px',
                    }}
                  >
                    table(請找情哥)
                  </div>
                  <div className="py-5" />
                  <TitleKaga title="發文紀錄" />
                  <div
                    className=" d-flex flex-wrap col-lg-12 bg-danger my-5"
                    style={{
                      height: '300px',
                    }}
                  >
                    table(請找情哥)
                  </div>
                </>
              ) : (
                ''
              )}
              {/* 會員個人資訊編輯 */}
              {pagename == 'edit-myinfo' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'編輯個人資訊'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <MemberEditInfo
                        memberEditInputmsg={this.state.memberEditInputmsg}
                        thisData={this.state.thisMemberData}
                        allMemberData={this.state.allMemberData}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}

              {pagename == 'activityMemberBoard' ? (
                <>
                {console.log(this.state.thisMemberData)}
                {console.log(this.state.thisMemberData.collectActivity)}
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'收藏活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityPageOtherData.map(data => (
                      <LinkContainer to={'/activity/' + data.id + '/return'}>
                        <div
                          className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                          style={{ width: '250px', height: '360px' }}
                        >
                          <ActivityCard
                            onClick={this.handleOnClick}
                            key={data.id}
                            title={data.theater}
                            subtitle={data.title}
                            imgSrc={data.imgSrc}
                            isCollect={data.isCollect}
                          />
                        </div>
                      </LinkContainer>
                    ))}
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'收藏活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityPageOtherData.map(data => (
                      <LinkContainer to={'/activity/' + data.id + '/return'}>
                        <div
                          className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                          style={{ width: '250px', height: '360px' }}
                        >
                          <ActivityCard
                            onClick={this.handleOnClick}
                            key={data.id}
                            title={data.theater}
                            subtitle={data.title}
                            imgSrc={data.imgSrc}
                            collectOpen
                            isCollect={data.isCollect}
                          />
                        </div>
                      </LinkContainer>
                    ))}
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename == 'activityMemberCollect' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'收藏活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityPageOtherData.map(data => (
                      <LinkContainer to={'/activity/' + data.id + '/return'}>
                        <div
                          className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                          style={{ width: '250px', height: '360px' }}
                        >
                          <ActivityCard
                            onClick={this.handleOnClick}
                            key={data.id}
                            title={data.theater}
                            subtitle={data.title}
                            imgSrc={data.imgSrc}
                            isCollect={data.isCollect}
                          />
                        </div>
                      </LinkContainer>
                    ))}
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename == 'activityMemberSignUp' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'已報名活動'}
                        className="content-title"
                      />
                    </div>
                    {this.state.activityPageOtherData.map(data => (
                      <LinkContainer to={'/activity/' + data.id + '/return'}>
                        <div
                          className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5"
                          style={{ width: '250px', height: '360px' }}
                        >
                          <ActivityCard
                            onClick={this.handleOnClick}
                            key={data.id}
                            title={data.theater}
                            subtitle={data.title}
                            imgSrc={data.imgSrc}
                            isCollect={data.isCollect}
                          />
                        </div>
                      </LinkContainer>
                    ))}
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </Row>
        </>
      )
    }
  }
}

export default BackSidenav
