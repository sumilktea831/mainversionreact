import React from 'react'
import { Row, Col } from 'react-bootstrap'
import CardLargeKaga from '../component/cinema/CardLargeKaga/v1/CardLargeKaga'
import CinemaSection from '../component/cinema/CinemaSection/CinemaSection'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import TitleKaga from '../component/cinema/TitleKaga'
import CinemaSlider from '../component/cinema/CinemaSlider/CinemaSlider'
import MessageBoard from '../component/cinema/MessageBoard/MessageBoard'
import MessageBoardInput from '../component/cinema/MessageBoard/MessageBoardInput'
//撈目前已登陸的會員資料
const memberId = sessionStorage.getItem('memberId')
const cinemaId = sessionStorage.getItem('cinemaId')
class TheateInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      cinemaData: '', // 此頁顯示的戲院資料
      cinemaThisData: '', // 登陸的戲院資料
      memberData: '', // 所有會員資料
      memberThisData: '', // 登陸的會員資料
      activityData: '',
      dataFile: '',
      HeroSection: '',
      BigCarData: '',
      SliderData: [],
      ActivityCardData: [],
      FilmCardData: [],
      MessageBoard: [],
      messageLength: 4,
      elseCard: [],
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  // 在元件完成載入時fetch 這張表格的資料進來整理成個元件需要的資料
  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    try {
      //劇院
      const resCinema = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 全部的戲院資料
      const dataAllCinema = await resCinema.json()
      // 此頁顯示的劇院資料
      const dataCine = dataAllCinema.filter(
        item => item.id === this.props.match.params.id
      )
      const dataCinema = dataCine[0]
      // 現在登陸的戲院資料
      const dataLoginCine = dataAllCinema.filter(item => item.id === cinemaId)
      const dataLoginCinema = dataLoginCine[0]

      // 更新瀏覽數
      dataCinema.cinemaPageViews = +dataCinema.cinemaPageViews + 1
      const response = await fetch(
        'http://localhost:5555/cinema/' + this.props.match.params.id,
        {
          method: 'PUT',
          body: JSON.stringify(dataCinema),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const jsonObject = await response.json()

      //會員
      const resMember = await fetch('http://localhost:5555/member', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 完整的會員資料
      const dataMember = await resMember.json()
      // 登錄會員的資料
      const dataThisMember = dataMember.filter(item => item.id === memberId)

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
      // 完整的活動資料
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

      // 影片
      const resFilm = await fetch('http://localhost:5555/movieCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // 完整得影片資料
      const dataFil = await resFilm.json()

      // 篩選出影片json中上映影院和本影院一樣的
      const dataFilm = dataFil.filter(
        el => el.theater === dataCine[0].cinemaName
      )

      // HeroSection參數整理
      const HeroSection = {
        pictureSrc: dataCinema.cinemaHeroImg,
        bigSlogan: dataCinema.cinemaName,
        midSlogan:
          (dataCinema.cinemaCity ? dataCinema.cinemaCity : '') +
          '/' +
          (dataCinema.cinemaArea ? dataCinema.cinemaArea : ''),
        smallSlogan: dataCinema.cinemaIntro,
      }

      // 大卡片參數整理 戲院+會員
      // 找出所有會員資料收藏戲院蘭裡面有這間戲院id的
      const BigCardCollectionLength = []
      dataMember.map(item => {
        return item.collectCinema.filter(items => {
          if (items === dataCinema.id) {
            BigCardCollectionLength.push(items)
          }
          return items
        })
      })
      const BigCardCollection = []
      dataThisMember.map(item =>
        item.collectCinema.map(items => BigCardCollection.push(items))
      )

      const thisCinema = dataCine[0] ? dataCine[0] : dataCine
      const hadOrNot = thisCinema.cinemaStar.some(el => el.starId === memberId)
      //找到自己評過分的星星資料 dataStar
      let dataStar = 0
      let starLength = thisCinema.cinemaStar.length
      // 如果你有登錄會員 又評過分 一開始直接顯示你的評分
      if (memberId && hadOrNot) {
        let propsData = thisCinema.cinemaStar
        propsData.map(item => {
          if (item.starId === memberId) {
            dataStar = item.star
          }
          return item
        })
        // 如果你沒登陸或是沒評過分 一開始就顯示平均分數
      } else {
        const dataStarArray = thisCinema.cinemaStar.map(el => el.star)
        if (dataStarArray.length === 0) {
          dataStar = 0
        } else {
          const dataStarSum = dataStarArray.reduce((a, b) => a + b)
          const dataStarAverage = dataStarSum / dataStarArray.length
          dataStar = Math.round(dataStarAverage)
        }
      }
      const BigCarData = {
        id: dataCinema.id,
        img: dataCinema.cinemaLogoImg,
        address: dataCinema.cinemaAddress,
        phone: dataCinema.cinemaPhone,
        taxid: dataCinema.cinemaTaxid,
        web: dataCinema.cinemaWeb,
        email: dataCinema.cinemaEmail,
        awesome: dataCinema.cinemaAwesome,
        awesomeLength: dataCinema.cinemaAwesome.length,
        pageviews: dataCinema.cinemaPageViews,
        collection: BigCardCollection,
        collectionLength: BigCardCollectionLength.length,
        awesomeClick: this.awesomeClick,
        collectionClick: this.collectionClick,
        star: dataStar,
        starLength: starLength,
      }

      this.setState({ BigCarData: BigCarData })
      // 照片框參數整理
      const SliderData = {
        id: dataCinema.id,
        img: dataCinema.cinemaImg,
      }

      // 活動小卡片參數整理
      const ActivityCardData = dataActivity.map(item => ({
        key: item.id,
        id: item.id,
        title:
          item.title.length > 6 ? item.title.slice(0, 6) + '...' : item.title,
        subtitle:
          item.content.length > 12
            ? item.content.slice(0, 12) + '...'
            : item.content,
        img:
          item.imgSrc.indexOf('http') == 0
            ? item.imgSrc
            : '/images/activityImg/' + item.imgSrc,
        // 因為是原頁面跳轉 所以直接帶這樣才能實現跳轉
        link: '/activity/' + item.id,
        // 不先驗證是否有會員的會會跳錯
        collection: [],
      }))

      // 影片小卡片需要參數
      const FilmCardData = dataFilm.map(item => {
        return {
          key: item.id,
          id: item.id,
          title:
            item.title.length > 6 ? item.title.slice(0, 6) + '...' : item.title, //
          subtitle:
            item.titleEn.length > 12
              ? item.titleEn.slice(0, 12) + '...'
              : item.titleEn,
          img:
            item.imgSrc.indexOf('http') == 0
              ? item.imgSrc
              : '/images/movieImg/' + item.imgSrc,
          // 因為是原頁面跳轉 所以直接帶這樣才能實現跳轉
          link: '/movie/' + item.id,
          // 不先驗證是否有會員的會會跳錯
          collection: memberId
            ? String(
                dataThisMember[0].collectFilm.some(item1 => item1 === item.id)
              )
            : [],
        }
      })

      // dataAllCinema 全部戲院的原始資料
      // dataCinema 這頁顯示的戲院原始資料
      const elseCardDat = dataAllCinema.filter(
        el => el.cinemaType === dataCinema.cinemaType
      )
      const elseCardData = elseCardDat.filter(el => el.id !== dataCinema.id)
      console.log('elseCardData')
      console.log(elseCardData)
      const elseCardFourData = []
      elseCardData.map((el, index) => {
        if (index < 4) {
          elseCardFourData.push(el)
        }
        return el
      })

      const elseCard = elseCardFourData.map(el => {
        return {
          key: el.id,
          id: el.id,
          title: el.cinemaName,
          subtitle: el.cinemaCity + '/' + el.cinemaArea,
          img: 'http://localhost:3000/images/cinemaImg/' + el.cinemaHeroImg,
          // 因為是原頁面跳轉 所以直接帶這樣才能實現跳轉
          link: '/cinema/' + dataCinema.id + '/' + el.id,
          // 不先驗證是否有會員的會會跳錯
          collection: [],
        }
      })

      this.setState({
        cinemaData: dataCinema,
        cinemaThisData: dataLoginCinema,
        memberData: dataMember,
        memberThisData: dataThisMember,
        activityData: dataAct,
        filmData: dataFil,
        HeroSection: HeroSection,
        SliderData: SliderData,
        ActivityCardData: ActivityCardData,
        FilmCardData: FilmCardData,
        MessageBoard: dataCinema.cinemaMessage,
        elseCard: elseCard,
      })
    } catch (err) {
      console.log(err)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  // 大卡按讚功能跟資料庫對接----完成
  awesomeClick = async (newAwesome, newAwesomeLength) => {
    // console.log('father get')
    //按讚資料改變只影響到戲院本身資料 所以先做好要蓋回戲院的資料
    try {
      //改變後的資料
      const newCinemaData = this.state.cinemaData
      newCinemaData.cinemaAwesome = newAwesome

      //蓋回去資料庫
      const response = await fetch(
        'http://localhost:5555/cinema/' + this.props.match.params.id,
        {
          method: 'PUT',
          body: JSON.stringify(newCinemaData),
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
        star: this.state.BigCarData.star,
        starLength: this.state.BigCarData.starLength,
      }
      await this.setState({ BigCarData: BigCarData })
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  // 大卡收藏功能跟資料庫對接----完成
  collectionClick = async (newCollectionm, collectionLength) => {
    //改變後的資料
    let memberThisDataOutArray = ''
    if (this.state.memberThisData[0]) {
      memberThisDataOutArray = this.state.memberThisData[0]
    } else {
      memberThisDataOutArray = this.state.memberThisData
    }
    try {
      const NewMemberData = memberThisDataOutArray
      NewMemberData.collectCinema = newCollectionm

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
        star: this.state.BigCarData.star,
        starLength: this.state.BigCarData.starLength,
      }
      await this.setState({ BigCarData: BigCarData })
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  // 影片小卡收藏跟資料庫對接----完成
  collectionClickFilm = async (id, val) => {
    // 找到符合id的這比電影資料
    // 先判斷會員資料近來是否為陣列 不是就直接用
    // 如果是拿掉會員資料的陣列 因為登陸只會有一個人 直接[0]比較方便
    let memberThisDataOutArray = ''
    if (this.state.memberThisData[0]) {
      memberThisDataOutArray = this.state.memberThisData[0]
    } else {
      memberThisDataOutArray = this.state.memberThisData
    }
    // 驗證現在這個會員的收藏裡是否已有收藏過
    // 這邊拿到最新的NewMemberData.collectFilm陣列
    let newCollectionData = []
    if (val === 'false') {
      // 如果回傳是false 等等要裝進去的資料就是拿掉此影片以外的所有收藏id
      newCollectionData = memberThisDataOutArray.collectFilm.filter(
        items => items !== id
      )
    } else {
      // 如果回傳是true 就加上去
      newCollectionData = [...memberThisDataOutArray.collectFilm, id]
    }

    // 把剛拿到最新的陣列丟回去這個會員的會員資料中
    const NewMemberData = memberThisDataOutArray
    NewMemberData.collectFilm = newCollectionData

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
    console.log(jsonObject)

    // // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
    // CardData可能有多筆資料  所以要乖乖map
    const FilmCardData = this.state.FilmCardData.map(item => ({
      key: item.id,
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      img: item.img,
      link: item.link,
      // 如果id是回傳的id 代表要改的就是這筆！！  讓他吃val的值  其他筆就照舊吧
      collection: item.id === id ? val : item.collection,
    }))
    await this.setState({
      FilmCardData: FilmCardData,
      memberThisData: NewMemberData,
    })
  }

  // 活動小卡收藏跟資料庫對接----完成
  collectionClickActivity = async (id, val) => {
    // 找到符合id的這比電影資料
    // 先判斷會員資料近來是否為陣列 不是就直接用
    // 如果是拿掉會員資料的陣列 因為登陸只會有一個人 直接[0]比較方便
    let memberThisDataOutArray = ''
    if (this.state.memberThisData[0]) {
      memberThisDataOutArray = this.state.memberThisData[0]
    } else {
      memberThisDataOutArray = this.state.memberThisData
    }

    let newCollectionData = []
    if (val === 'false') {
      // 如果回傳是false 等等要裝進去的資料就是拿掉此影片以外的所有收藏id
      newCollectionData = memberThisDataOutArray.collectFilm.filter(
        items => items !== id
      )
    } else {
      // 如果回傳是true 就加上去
      newCollectionData = [...memberThisDataOutArray.collectFilm, id]
    }
    const NewMemberData = memberThisDataOutArray
    NewMemberData.collectActivity = newCollectionData

    // //蓋回去資料庫
    // const response = await fetch('http://localhost:5555/member/' + memberId, {
    //   method: 'PUT',
    //   body: JSON.stringify(NewMemberData),
    //   headers: new Headers({
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   }),
    // })
    // const jsonObject = await response.json()
    // console.log(jsonObject)

    // // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
    // CardData可能有多筆資料  所以要乖乖map
    const ActivityCardData = this.state.ActivityCardData.map(item => ({
      key: item.id,
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      img: item.img,
      link: item.link,
      // 如果id是回傳的id 代表要改的就是這筆！！  讓他吃val的值  其他筆就照舊吧
      collection: item.id === id ? val : item.collection,
    }))
    await this.setState({
      ActivityCardData: ActivityCardData,
      memberThisData: NewMemberData,
    })
  }

  // 訊息按下新增後----完成
  MessageBoardSave = async newText => {
    //抓到發文人的ip
    // require module

    let thisMember = this.state.memberThisData[0]
      ? this.state.memberThisData[0]
      : this.state.memberThisData //現在登陸的這名會員
    let thisCinema = this.state.cinemaThisData //現在登陸的戲院
    let thisLogin = {}
    if (memberId) {
      thisLogin.name = thisMember.nickname
      thisLogin.img = thisMember.avatar
    } else if (cinemaId) {
      thisLogin.name = thisCinema.cinemaName
      thisLogin.img = thisCinema.cinemaLogoImg
    } else {
      thisLogin = ''
    }
    let imgLocation = memberId ? 'member' : cinemaId ? 'cinemaImg' : 'cinemaImg'

    let newVisitor = {
      id: +new Date(),
      name: '訪客',
      img: 'asianman.jpg',
      message: newText,
      time: +new Date(),
      awesome: [],
      boo: [],
      imgLocation: imgLocation,
    }

    let newMemberMessage = {
      id: +new Date(),
      name: thisLogin.name,
      img: thisLogin.img !== '' ? thisLogin.img : 'asianman.jpg',
      message: newText,
      time: +new Date(),
      awesome: [],
      boo: [],
      imgLocation: imgLocation,
    }
    let newMemberMessageData = [newMemberMessage, ...this.state.MessageBoard]
    let newVisitorData = [newVisitor, ...this.state.MessageBoard]
    let NewData = thisLogin !== '' ? newMemberMessageData : newVisitorData
    this.setState({ MessageBoard: NewData })

    // 然後更新回資料庫 留言資料放在戲院自己裡面 cinemaMessage
    const NewCinemaMessage = this.state.cinemaData
    NewCinemaMessage.cinemaMessage = NewData

    const resCinema = await fetch(
      'http://localhost:5555/cinema/' + this.props.match.params.id,
      {
        method: 'PUT',
        body: JSON.stringify(NewCinemaMessage),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const jsonObject = await resCinema.json()
    console.log(jsonObject)
  }

  // 訊息顯示更多----完成
  messageLengthChange = () => {
    this.setState({
      messageLength: this.state.messageLength + 4,
    })
  }

  // 大卡星星數改變接資料庫----完成
  StarChange = async (id, star) => {
    // 先判斷對方有沒有平過分
    console.log('this.state.cinemaData')
    console.log(this.state.cinemaData)
    let hadOrNot = this.state.cinemaData.cinemaStar.some(
      el => el.starId === memberId
    )
    console.log(hadOrNot)

    //先複製一份此頁面的資料等等用 也做一份等等要新增或蓋回去的資料
    const CinemaData = this.state.cinemaData
    const newStar = {
      starId: memberId,
      star: star,
    }
    // 如果hadOrNot false代表沒有給過星星就是新增
    if (hadOrNot === false) {
      const newStarData = [...this.state.cinemaData.cinemaStar, newStar]
      CinemaData.cinemaStar = newStarData
      const newBigCarData = this.state.BigCarData
      newBigCarData.starLength++
      console.log(newBigCarData)
      this.setState({ BigCarData: newBigCarData })
    } else {
      // 如果hadOrNot true就是有那就要修改
      const newStarData = CinemaData.cinemaStar.map(el => {
        if (el.starId === memberId) {
          el = newStar
        }
        return el
      })
      CinemaData.cinemaStar = newStarData
    }
    const resCinema = await fetch(
      'http://localhost:5555/cinema/' + this.props.match.params.id,
      {
        method: 'PUT',
        body: JSON.stringify(CinemaData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const jsonObject = await resCinema.json()
    console.log(jsonObject)
  }

  handleScroll = event => {
    console.log()
    if (window.pageYOffset > document.body.offsetHeight - 1500) {
      document.querySelector('.elseCard').style =
        // 'bottom:-' + window.pageYOffset + 'px'
        'left:0;opacity:1'
    }
    if (window.pageYOffset <= document.body.offsetHeight - 2000) {
      document.querySelector('.elseCard').style =
        // 'bottom:-' + window.pageYOffset + 'px'
        'left:-100%;opacity:0'
    }
    console.log('the scroll things', window.pageYOffset)
  }

  elseCardExitHandleOver = () => {
    document.querySelector('#elseCardBtn').style =
      'background:rgba(0, 0, 0, 0.2) ; color:#ffa510 ; font-size:80px'
  }

  elseCardExitHandleOut = () => {
    document.querySelector('#elseCardBtn').style =
      'background:rgba(0, 0, 0, 0) ; font-size:60px'
  }

  elseCardExitHandleClick = () => {
    document.querySelector('.elseCard').style = 'left:-100% ; opacity:0'
  }

  render() {
    return (
      <>
        <div className="overflow-hidden">
          {/* 英雄頁面----串接完成 */}
          <CinemaSection
            pictureSrc={
              'http://localhost:3000/images/cinemaImg/' +
              this.state.HeroSection.pictureSrc
            }
            bigSlogan={this.state.HeroSection.bigSlogan}
            midSlogan={this.state.HeroSection.midSlogan}
            smallSlogan={this.state.HeroSection.smallSlogan}
          />

          <div
            className="container-fluid h-100 "
            style={{ padding: '100px 120px' }}
          >
            {/* 大的卡片----製作與串接完成 */}
            <TitleKaga title="戲院資訊" />
            <div className="h-100 d-flex justify-content-center" id="bigCard">
              {memberId ? (
                <CardLargeKaga
                  key={this.state.BigCarData.id}
                  id={this.state.BigCarData.id}
                  img={
                    'http://localhost:3000/images/cinemaImg/' +
                    this.state.BigCarData.img
                  }
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
                  wantStar
                  star={this.state.BigCarData.star}
                  StarChange={this.StarChange}
                  starLength={this.state.BigCarData.starLength}
                  collectionColor={
                    this.state.BigCarData.collection !== undefined
                      ? this.state.BigCarData.collection.some(
                          el => el === this.state.BigCarData.id
                        )
                      : []
                  }
                  awesomeColor={
                    this.state.BigCarData.awesome !== undefined
                      ? this.state.BigCarData.awesome.some(
                          el => el === memberId
                        )
                      : []
                  }
                />
              ) : (
                <CardLargeKaga
                  key={this.state.BigCarData.id}
                  id={this.state.BigCarData.id}
                  img={
                    'http://localhost:3000/images/cinemaImg/' +
                    this.state.BigCarData.img
                  }
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
                  justStar
                  star={this.state.BigCarData.star}
                  starLength={this.state.BigCarData.starLength}
                  collectionColor={false}
                  awesomeColor={false}
                />
              )}
            </div>

            {/* 圖片列 */}
            <div className="py-5">
              <TitleKaga title="環境照片" />
            </div>
            <div style={{ height: '400px' }}>
              <Row className="justify-content-md-center w-100">
                <Col md={11}>
                  <CinemaSlider sData={this.state.SliderData} />
                </Col>
              </Row>
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
                {this.state.FilmCardData.length !== 0 ? (
                  memberId !== null ? (
                    this.state.FilmCardData.map(item => (
                      <CardKaga
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={item.img}
                        link={item.link}
                        collectionIcon
                        collectionClick={this.collectionClickFilm}
                        collection={item.collection}
                      />
                    ))
                  ) : (
                    this.state.FilmCardData.map(item => (
                      <CardKaga
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={item.img}
                        link={item.link}
                      />
                    ))
                  )
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center w-100"
                    style={{ height: '300px', fontSize: '30px' }}
                  >
                    目前沒有上架的影片喔
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
                  memberId !== null ? (
                    this.state.ActivityCardData.map(item => (
                      <CardKaga
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={item.img}
                        link={item.link}
                        collectionIcon
                        collectionClick={this.collectionClickActivity}
                        collection={item.collection}
                      />
                    ))
                  ) : (
                    this.state.ActivityCardData.map(item => (
                      <CardKaga
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={item.img}
                        link={item.link}
                      />
                    ))
                  )
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
            <div className="col h-100">
              <div className="py-5">
                <TitleKaga title="評論區" />
              </div>
              {this.state.MessageBoard.map((item, index) =>
                index < this.state.messageLength ? (
                  <MessageBoard
                    listData={item}
                    awesomeClick={this.awesomeClick}
                    booeClick={this.booeClick}
                  />
                ) : (
                  ''
                )
              )}
              <div className="d-flex justify-content-center">
                {this.state.MessageBoard.length > this.state.messageLength ? (
                  <button
                    type="button"
                    class="btn btn-outline-warning mb-5 mx-auto"
                    onClick={this.messageLengthChange}
                  >
                    更多評論
                  </button>
                ) : (
                  ''
                )}
              </div>
              <MessageBoardInput MessageBoardSave={this.MessageBoardSave} />
            </div>
            {/* <div style={{ height: '10px' }} /> */}
          </div>
        </div>

        <div id="elseCard" class="elseCard d-flex justify-content-end">
          {/* 標題區 */}
          <div
            id="elseCardBtn"
            onMouseOver={this.elseCardExitHandleOver}
            onMouseOut={this.elseCardExitHandleOut}
            onClick={this.elseCardExitHandleClick}
            className="col-1 mt-0 d-flex justify-content-center h-100 align-items-center"
            style={{ fontSize: '60px' }}
          >
            <i class="fas fa-arrow-circle-left" />
          </div>
          {/* 內容區 */}
          <div className="d-flex flex-column col-11">
            {cinemaId ? (
              <>
                <div className="py-2 text-white">
                  <TitleKaga title="相似對手" />
                </div>
                <div className="d-flex flex-wrap col-lg-11">
                  {this.state.elseCard.map(item => (
                    <CardKaga
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      subtitle={item.subtitle}
                      img={item.img}
                      link={item.link}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="py-2 text-white mb-2">
                  <TitleKaga title="推薦戲院" />
                </div>
                <div className="d-flex flex-wrap col-lg-11">
                  {this.state.elseCard.map(item => (
                    <CardKaga
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      subtitle={item.subtitle}
                      img={item.img}
                      link={item.link}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default TheateInfo
