import React from 'react'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'

//撈目前已登陸的會員資料
const memberId = sessionStorage.getItem('memberId')
class Theater extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberThisData: '',
      CinemaCardData: [],
    }
  }

  // 在元件完成載入時fetch cinema的資料撈進來丟到state
  // cinema.json的資料為
  async componentDidMount() {
    try {
      const resCinema = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const dataCinema = await resCinema.json()
      this.setState({
        cardData: dataCinema,
      })
      // 撈出目前登錄的會員得資料
      const resMember = await fetch(
        'http://localhost:5555/member/' + memberId,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const memberThisData = await resMember.json()
      this.setState({ memberThisData: memberThisData })
      // 製作小卡專用資料
      // 收藏資料放在會員裡面 所以去裡面找到相關資料
      const CinemaCardData = dataCinema.map(item => ({
        key: item.id,
        id: item.id,
        title: item.cinemaName,
        subtitle: item.cinemaCity + '/' + item.cinemaArea,
        img: item.cinemaHeroImg,
        // 因為是原頁面跳轉 所以直接帶這樣才能實現跳轉
        link: '/cinema/' + item.id,
        // 如果沒登陸就給他空字串防止跳錯
        collection: memberId
          ? memberThisData.collectCinema.find(item1 => item1 === item.id)
            ? 'true'
            : 'false'
          : [],
      }))
      this.setState({ CinemaCardData: CinemaCardData })
    } catch (err) {
      console.log(err)
    }
  }

  collectionClickMovie = async (id, val) => {
    // 找到符合id的這比電影資料
    let newCollectionData = []
    if (val === 'false') {
      // 如果回傳是false 等等要裝進去的資料就是拿掉此影片以外的所有收藏id
      newCollectionData = this.state.memberThisData.collectCinema.filter(
        item => item != id
      )
    } else {
      // 如果回傳是true 就加上去
      newCollectionData = [...this.state.memberThisData.collectCinema, id]
    }
    const NewMemberData = {
      id: this.state.memberThisData.id,
      name: this.state.memberThisData.name,
      nickname: this.state.memberThisData.nickname,
      gender: this.state.memberThisData.gender,
      mobile: this.state.memberThisData.mobile,
      birth: this.state.memberThisData.birth,
      email: this.state.memberThisData.email,
      pwd: this.state.memberThisData.pwd,
      avatar: this.state.memberThisData.avatar,
      city: this.state.memberThisData.city,
      address: this.state.memberThisData.address,
      fav_type: this.state.memberThisData.fav_type,
      career: this.state.memberThisData.career,
      join_date: this.state.memberThisData.permission,
      permission: this.state.memberThisData.permission,
      collectFilm: this.state.memberThisData.collectFilm,
      collectCinema: newCollectionData,
      collectArticle: this.state.memberThisData.collectArticle,
      collectActivity: this.state.memberThisData.collectActivity,
      collectForum: this.state.memberThisData.collectForum,
      markList: this.state.memberThisData.markList,
    }
    // //蓋回去資料庫
    const response = await fetch('http://localhost:5555/member/' + memberId, {
      method: 'PUT',
      body: JSON.stringify(NewMemberData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const jsonObject = await response.json()

    // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
    const CinemaCardData = this.state.CinemaCardData.map(item => ({
      key: item.id,
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      img: item.img,
      link: item.link,
      // 如果id是回傳的id 代表要改的就是這筆！！  讓他吃val的值  其他筆就照舊吧
      collection: item.id == id ? val : item.collection,
    }))
    await this.setState({
      CinemaCardData: CinemaCardData,
      memberThisData: NewMemberData,
    })
  }

  render() {
    return (
      <>
        <ActivitySection
          pictureSrc="http://localhost:3000/images/cinemaSearch.jpg"
          bigSlogan="slogan大標"
          midSlogan="slogan中標"
          smallSlogan="slogan敘述"
        />
        <div
          className="bg-info"
          style={{
            height: '400px',
            weight: '100%',
            textAlign: 'center',
            fontSize: '50px',
          }}
        >
          篩選列 (等幹情哥的)
        </div>
        <div className="row justify-content-center">
          <div
            className=" d-flex flex-wrap col-lg-10"
            style={{
              height: '100%',
              weight: '100%',
              overflow: 'hidden',
            }}
          >
            {memberId
              ? this.state.CinemaCardData.map(item => (
                  <CardKaga
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    img={'http://localhost:3000/images/' + item.img}
                    link={item.link}
                    collectionIcon
                    collectionClick={this.collectionClickMovie}
                    collection={item.collection} //判斷初始狀態是否為已收藏 收藏資料都放在會員的json裡面
                  />
                ))
              : this.state.CinemaCardData.map(item => (
                  <CardKaga
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    img={'http://localhost:3000/images/' + item.img}
                    link={item.link}
                  />
                ))}
          </div>
        </div>
      </>
    )
  }
}
export default Theater
