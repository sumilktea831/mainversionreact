import React from 'react'
import { Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'
import MemberBackSidenav from '../component/backSidenav/MemberBackSidenav'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'

class BackSidenav extends React.Component {
  constructor(props) {
    super(props.props)
    const path = window.location.pathname.slice(1)
    console.log(path)
    this.state = {
      sidenavItems: [],
      activityPageData: [],
      activityPageOtherData: [],
    }
  }

  async componentDidMount() {
    try {
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch('http://localhost:5555/memberBackSidenav', {
        method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ sidenavItems: data })
      //   await console.log(data)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
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
      const pagename = this.props.location.pathname.slice(14)
      return (
        <>
          <Row>
            <MemberBackSidenav sidenavItems={this.state.sidenavItems} />
            <div //右邊內容框，之後要引入內容component
              className="col container-fluid"
              style={{
                background: '#2b333d',
                padding: '240px 120px 120px 120px',
              }}
            >
              {pagename == 'activityMemberBoard' ? (
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
