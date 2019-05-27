import React from 'react'
import { Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import MemberBackSidenav from '../component/backSidenav/MemberBackSidenav'
import CinemaBackSidenav from '../component/backSidenav/CinemaBackSidenav'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import MemberEditInfo from '../component/meberBack/MemberEditInfo'
import MemberEditPwd from '../component/meberBack/MemberEditPwd'
import CinemaEditInfo from '../component/cinemaBack/CinemaEditInfo'

//memberId
const memberId = sessionStorage.getItem('memberId')
class BackSidenav extends React.Component {
  constructor(props) {
    super(props.props)
    const path = window.location.pathname.slice(1)
    console.log(path)
    console.log(props)
    this.state = {
      memberSidenavItems: [],
      memberEditInputmsg: [],
      allMemberData: [],
      thisMemberData: [],
      cinemaSidenavItems: [],
      cinemaEditInputmsg: [],
      allCinemaData: [],
      thisCinemaData: [],
      activityPageData: [],
      activityPageOtherData: [],
    }
  }

  async componentDidMount() {
    try {
      //取得會員sidenav項目
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
    try {
      //取得戲院sidenav項目
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
    try {
      //取得會員資料
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
    try {
      //取得會員editInfo項目
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
    try {
      //取得戲院editInfo項目
      const response = await fetch('http://localhost:5555/cinemaEditInputmsg', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ cinemaEditInputmsg: data })
    } catch (e) {
      console.log(e)
    }
    try {
      //取得戲院資料
      const response = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject.find(
        item => item.id === sessionStorage.getItem('cinemaId')
      )
      console.log('session' + sessionStorage.getItem('cinemaId'))
      await this.setState({ thisCinemaData: data, allCinemaData: jsonObject })
    } catch (e) {
      console.log(e)
    }
    try {
      const res = await fetch('http://localhost:5555/activityCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      const activityPageData = data.find(
        item => item.id === +this.props.match.params.id
      )
      const activityPageOtherData = data.filter(
        item => item.id !== +this.props.match.params.id
      )
      this.setState({ activityPageData: activityPageData })
      this.setState({ activityPageOtherData: activityPageOtherData })
    } catch (err) {
      console.log(err)
    }
  }
  //會員編輯儲存按鈕
  handleMemberEditSave = (data, checkok) => () => {
    let memberid = sessionStorage.getItem('memberId')
    let isAllChecked = true
    let checkArray = Object.values(checkok)
    isAllChecked = checkArray.reduce((a, b) => a && b)
    console.log('isAllChecked: ' + isAllChecked)
    if (isAllChecked) {
      try {
        fetch('http://localhost:5555/member/' + memberid, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(jsonObject => {
            this.setState({ thisMemberData: jsonObject }, () => {
              alert('資料儲存成功')
            })
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      alert('資料填寫有誤，請再次確認您的資料！')
    }
  }

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
      // 若沒session，回到登入頁
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
          <Row>
            {sidenav}
            <div //右邊內容框，之後要引入內容component
              className="col container-fluid"
              style={{
                background: '#2b333d',
                padding: '240px 120px 120px 120px',
              }}
            >
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
                        handleMemberEditSave={this.handleMemberEditSave}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'edit-mypassword' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'更改密碼'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <MemberEditPwd
                        memberEditInputmsg={this.state.memberEditInputmsg}
                        thisData={this.state.thisMemberData}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'cinema-edit-info' ? (
                <>
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <ActivityTitle
                        title={'編輯戲院資訊'}
                        className="content-title"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <CinemaEditInfo
                        cinemaEditInputmsg={this.state.cinemaEditInputmsg}
                        thisData={this.state.thisCinemaData}
                        allCinemaData={this.state.allCinemaData}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {pagename === 'activityMemberCollect' ? (
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
                          className="col-12 col-sm-12 col-md-6 col-lg-3 mt-5"
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
                          className="col-12 col-sm-12 col-md-6 col-lg-3 mt-5"
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
