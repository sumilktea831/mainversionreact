import React from 'react'
import CardLargeKaga from '../component/cinema/CardLargeKaga/v1/CardLargeKaga'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import TitleKaga from '../component/cinema/TitleKaga'

//撈目前已登陸的會員資料
const memberId = sessionStorage.getItem('memberId')
class TheateInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      cinemaData: '',
      memberData: '',
      activityData: '',
      HeroSection: '',
      BigCarData: '',
      ActivityCardData: [],
    }
  }

  // 在元件完成載入時fetch 這張表格的資料進來整理成個元件需要的資料
  async componentDidMount() {
    console.log(this.props.match.params.id)
    try {
      //劇院
      const resCinema = await fetch(
        'http://localhost:5555/cinema/' + this.props.match.params.id,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const dataCinema = await resCinema.json()

      //會員
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
      const dataMember = await resMember.json()

      //活動
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
      const dataAct = await resActivity.json()
      // 比對活動中, 戲院名稱根本頁戲院id一致的資料
      const dataActivity = []
      dataAct.map(item => {
        if (item.theater === dataCinema.cinemaName) {
          dataActivity.push(item)
        }
        return item
      })
      // 所以該劇院的活動資料就是 dataActivity

      // HeroSection參數整理
      const HeroSection = {
        pictureSrc: dataCinema.cinemaHeroImg,
        bigSlogan: dataCinema.cinemaName,
        midSlogan:
          (dataCinema.cinemaCity ? dataCinema.cinemaCity : '') +
          '/' +
          (dataCinema.cinemaArea ? dataCinema.cinemaArea : ''),
        smallSlogan: dataCinema.cinemaInfoText,
      }
      // 大卡片參數整理 戲院+會員
      const BigCarData = {
        id: dataCinema.id,
        img: dataCinema.cinemaHeroImg,
        address: dataCinema.cinemaAddress,
        phone: dataCinema.cinemaPhone,
        taxid: dataCinema.cinemaTaxid,
        web: dataCinema.cinemaWeb,
        email: dataCinema.cinemaEmail,
        awesome: dataCinema.cinemaAwesome,
        awesomeLength: dataCinema.cinemaAwesome.length,
        pageviews: dataCinema.cinemaPageViews,
        collection: dataMember.collectCinema,
        collectionLength: dataMember.collectCinema.length,
        awesomeClick: this.awesomeClick,
        collectionClick: this.collectionClick,
      }
      // 活動小卡片參數整理
      const ActivityCardData = dataActivity.map(item => ({
        key: item.id,
        id: item.id,
        title:
          item.title.length > 6 ? item.title.slice(0, 6) + '...' : item.title, //
        subtitle:
          item.content.length > 12
            ? item.content.slice(0, 12) + '...'
            : item.content,
        img: item.imgSrc,
        // 因為是原頁面跳轉 所以直接帶這樣才能實現跳轉
        link: '/activity/' + item.id,
        collection: dataMember.collectActivity,
      }))
      // 影片小卡片需要參數
      // 待捕
      // 最後把上面這些準備好的素材都丟回去state給下面dom抓
      this.setState({
        cinemaData: dataCinema,
        memberData: dataMember,
        activityData: dataAct,
        HeroSection: HeroSection,
        BigCarData: BigCarData,
        ActivityCardData: ActivityCardData,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 按讚功能跟資料庫對接----完成
  awesomeClick = async (newAwesome, newAwesomeLength) => {
    // console.log('father get')
    // console.log(newAwesome)
    // console.log(newAwesomeLength)
    //按讚資料改變只影響到戲院本身資料 所以先做好要蓋回戲院的資料
    try {
      //改變後的資料
      const NewMemberData = {
        id: this.state.cinemaData.id,
        cinemaName: this.state.cinemaData.cinemaName,
        cinemaCity: this.state.cinemaData.cinemaCity,
        cinemaArea: this.state.cinemaData.cinemaArea,
        cinemaLogoImg: this.state.cinemaData.cinemaLogoImg,
        cinemaImg: this.state.cinemaData.cinemaImg,
        cinemaHeroImg: this.state.cinemaData.cinemaHeroImg,
        cinemaInfoText: this.state.cinemaData.cinemaInfoText,
        cinemaAccount: this.state.cinemaData.cinemaAccount,
        cinemaPassword: this.state.cinemaData.cinemaPassword,
        cinemaStar: this.state.cinemaData.cinemaStar,
        cinemaAddress: this.state.cinemaData.cinemaAddress,
        cinemaPhone: this.state.cinemaData.cinemaPhone,
        cinemaTaxid: this.state.cinemaData.cinemaTaxid,
        cinemaWeb: this.state.cinemaData.cinemaWeb,
        cinemaEmail: this.state.cinemaData.cinemaEmail,
        cinemaBackupEmail: this.state.cinemaData.cinemaBackupEmail,
        cinemaAwesome: newAwesome,
        cinemaPageViews: this.state.cinemaData.cinemaPageViews,
        cinemaSignUpDate: this.state.cinemaData.cinemaSignUpDate,
        permission: this.state.cinemaData.permission,
        cinemaMessage: this.state.cinemaData.cinemaMessage,
      }
      //蓋回去資料庫
      const response = await fetch(
        'http://localhost:5555/cinema/' + this.props.match.params.id,
        {
          method: 'PUT',
          body: JSON.stringify(NewMemberData),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const jsonObject = await response.json()
      console.log(jsonObject)
      // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
      // 收藏功能影響到的只有BigCardData
      const BigCarData = {
        id: this.state.BigCarData.id,
        img: this.state.BigCarData.img,
        address: this.state.BigCarData.address,
        phone: this.state.BigCarData.phone,
        taxid: this.state.BigCarData.taxid,
        web: this.state.BigCarData.web,
        email: this.state.BigCarData.email,
        awesome: newAwesome,
        awesomeLength: newAwesomeLength,
        pageviews: this.state.BigCarData.pageviews,
        collection: this.state.BigCarData.collection,
        collectionLength: this.state.BigCarData.collectionLength,
        awesomeClick: this.awesomeClick,
        collectionClick: this.collectionClick,
      }
      await this.setState({ BigCarData: BigCarData })
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  // 收藏功能跟資料庫對接----完成
  collectionClick = async (newCollectionm, collectionLength) => {
    //改變後的資料
    try {
      const NewMemberData = {
        id: this.state.memberData.id,
        name: this.state.memberData.name,
        nickname: this.state.memberData.nickname,
        gender: this.state.memberData.gender,
        mobile: this.state.memberData.mobile,
        birth: this.state.memberData.birth,
        email: this.state.memberData.email,
        pwd: this.state.memberData.pwd,
        avatar: this.state.memberData.avatar,
        city: this.state.memberData.city,
        address: this.state.memberData.address,
        fav_type: this.state.memberData.fav_type,
        career: this.state.memberData.career,
        join_date: this.state.memberData.permission,
        permission: this.state.memberData.permission,
        collectFilm: this.state.memberData.collectFilm,
        collectCinema: newCollectionm,
        collectArticle: this.state.memberData.collectArticle,
        collectActivity: this.state.memberData.collectActivity,
        collectForum: this.state.memberData.collectForum,
        markList: this.state.memberData.markList,
      }
      //蓋回去資料庫
      const response = await fetch('http://localhost:5555/member/' + memberId, {
        method: 'PUT',
        body: JSON.stringify(NewMemberData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const jsonObject = await response.json()
      console.log('fa jsonBack')
      console.log(jsonObject)

      // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
      // 收藏功能影響到的只有BigCardData
      const BigCarData = {
        id: this.state.BigCarData.id,
        img: this.state.BigCarData.img,
        address: this.state.BigCarData.address,
        phone: this.state.BigCarData.phone,
        taxid: this.state.BigCarData.taxid,
        web: this.state.BigCarData.web,
        email: this.state.BigCarData.email,
        awesome: this.state.BigCarData.awesome,
        awesomeLength: this.state.BigCarData.awesomeLength,
        pageviews: this.state.BigCarData.pageviews,
        collection: newCollectionm,
        collectionLength: collectionLength,
        awesomeClick: this.awesomeClick,
        collectionClick: this.collectionClick,
      }
      await this.setState({ BigCarData: BigCarData })
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  // Activity小卡收藏按鈕回傳
  collectionClickActivity = () => {
    alert('collectioClick')
  }
  newStarAndMark = val => {
    console.log(val)
    alert('Use Fetch Update New Star And Mark To Database!!')
  }

  render() {
    console.log(this.state)
    return (
      <>
        {/* 英雄頁面----串接完成 */}
        <ActivitySection
          pictureSrc={
            'http://localhost:3000/images/' + this.state.HeroSection.pictureSrc
          }
          bigSlogan={this.state.HeroSection.bigSlogan}
          midSlogan={this.state.HeroSection.midSlogan}
          smallSlogan={this.state.HeroSection.smallSlogan}
        />
        <div className="container-fluid" style={{ padding: '100px 120px' }}>
          {/* 大的卡片----製作與串接完成 */}
          <TitleKaga title="戲院資訊" />
          <div className="h-100 d-flex justify-content-center">
            <CardLargeKaga
              key={this.state.BigCarData.id}
              img={'http://localhost:3000/images/' + this.state.BigCarData.img}
              address={this.state.BigCarData.address}
              phone={this.state.BigCarData.phone}
              taxid={this.state.BigCarData.taxid}
              web={this.state.BigCarData.web}
              email={this.state.BigCarData.email}
              awesome={this.state.BigCarData.awesome}
              awesomeLength={this.state.BigCarData.awesomeLength}
              pageviews={this.state.BigCarData.pageviews}
              collection={this.state.BigCarData.collection}
              collectionLength={this.state.BigCarData.collectionLength}
              awesomeClick={this.awesomeClick}
              collectionClick={this.collectionClick}
            />
          </div>

          {/* 圖片列 */}
          <div className="py-5">
            <TitleKaga title="圖像（還沒人的可以偷)" />
          </div>
          <div
            className="bg-info"
            style={{
              height: '400px',
              weight: '100%',
              textAlign: 'center',
              fontSize: '50px',
            }}
          >
            圖片列
          </div>

          {/* 上映影片卡片 */}
          <div className="py-5">
            <TitleKaga title="目前上映" />
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
              {this.state.ActivityCardData.length !== 0 ? (
                this.state.ActivityCardData.map(item => (
                  <CardKaga
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    img={'http://localhost:3000/images/' + item.img}
                    link={item.link}
                  />
                ))
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center w-100"
                  style={{ height: '300px', fontSize: '30px' }}
                >
                  目前沒有進行中的活動喔
                </div>
              )}
            </div>
          </div>

          {/* 活動卡片 */}
          <div className="py-5">
            <TitleKaga title="目前進行中活動" />
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
              {this.state.ActivityCardData.length !== 0 ? (
                this.state.ActivityCardData.map(item => (
                  <CardKaga
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    img={'http://localhost3000/images/' + item.img}
                    link={item.link}
                  />
                ))
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center w-100"
                  style={{ height: '300px', fontSize: '30px' }}
                >
                  目前沒有進行中的活動喔
                </div>
              )}
            </div>
          </div>

          {/* 留言板區塊 */}
          <div className="py-5">
            <TitleKaga title="留言板" />
          </div>
          <div
            className="bg-warning "
            style={{
              height: '400px',
              weight: '100%',
              textAlign: 'center',
              fontSize: '50px',
            }}
          >
            留言板
          </div>
        </div>
      </>
    )
  }
}
export default TheateInfo
