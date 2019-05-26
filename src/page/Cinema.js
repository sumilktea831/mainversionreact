import React from 'react'
import CardKaga from '../component/cinema/CardKaga/v3/CardKaga'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'

class Theater extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardData: [],
      id: '',
      cinemaName: '',
      cinemaCity: '',
      cinemaArea: '',
      cinemaLogoImg: '',
      cinemaImg: '',
      cinemaHeroImg: '',
      cinemaAccount: '',
      cinemaPassword: '',
      cinemaStar: '',
      cinemaAddress: '',
      cinemaPhone: '',
      cinemaTaxid: '',
      cinemaWeb: '',
      cinemaEmail: '',
      cinemaBackupEmail: '',
      cinemaAwesome: '',
      cinemaPageViews: '',
      cinemaSignUpDate: '',
      permission: '',
      cinemaMessage: '',
    }
  }

  // 在元件完成載入時fetch cinema的資料撈進來丟到state
  // cinema.json的資料為
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/cinema', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({
        cardData: data,
      })
    } catch (err) {
      console.log(err)
    }
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
            {this.state.cardData.map(item => (
              // 元件
              <CardKaga
                key={item.id}
                id={item.id}
                title={item.cinemaName}
                subtitle={item.cinemaCity + '/' + item.cinemaArea}
                img={'http://localhost:3000/images/' + item.cinemaImg}
                link={'/cinema/' + item.id}
                // collectionIcon
                // collectionClick={this.collectionClick}
                // collection={}
                // popup
                member
                star={item.cinemaStar}
                AVGStar
                starAmimation
                // "markList":[{"markId":"c1","markcontent":"yaaaaa"}]
                mark={item.cinemaMark}
                newStarAndMark={this.newStarAndMark}
                del={this.del}
              />
            ))}
          </div>
        </div>
      </>
    )
  }
}
export default Theater
