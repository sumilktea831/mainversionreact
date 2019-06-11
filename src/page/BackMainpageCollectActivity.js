import React from 'react'
import { Row } from 'react-bootstrap'
import MemberBackSidenav from '../component/backSidenav/MemberBackSidenav'
import {FetchDomainName} from '../FetchDomainName'

class BackSidenav extends React.Component {
  constructor() {
    super()
    const path = window.location.pathname.slice(1)
    console.log(path)
    this.state = {
      sidenavItems: [],
    }
  }

  async componentDidMount() {
    try {
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(`http://${FetchDomainName}:5555/memberBackSidenav`, {
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
      return (
        <>
          <Row>
            <MemberBackSidenav sidenavItems={this.state.sidenavItems} />
            <div //右邊內容框，之後要引入內容component
              className="col container-fluid"
              style={{ background: '#2b333d' }}
            >
              <div style={{ height: '194px' }} />
              test
            </div>
          </Row>
        </>
      )
    }
  }
}

export default BackSidenav
