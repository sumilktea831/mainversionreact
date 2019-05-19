import React from 'react'
import CardKaga from '../component/cinema/CardKaga/v2/CardKaga'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'

class Theater extends React.Component {
  constructor() {
    super()
    this.state = {
      cardData: [],
      bigSlogan: '擇你所愛，愛你所擇',
      midSlogan: '找尋您的專屬活動。',
      smallSlogan: '開始找尋',
      heroSectionPic:
        'https://images.unsplash.com/photo-1506512420485-a28339abb3b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    }
  }

  // 在元件完成載入時fetch cinemaCard的資料撈進來丟到state
  // cinema.json的資料為
  // {"cinemaid": "001","cinemaName": "光點台北","cinemaCity": "台北市","cinemaImg": "spott.jpg"}
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/cinemaCard', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      console.log(data)
      this.setState({ cardData: data })
    } catch (err) {
      console.log(err)
    }
  }
  collectionClick = () => () => {}
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
            </div>
          </div>
        </div>
        {/*  */}
        <div
          className="row"
          style={{
            padding: '0 120px',
          }}
        >
          {this.state.cardData.map(item => (
            <CardKaga
              title={item.cinemaName}
              subtitle={item.cinemaCity + item.cinemaArea}
              img={'http://localhost:3000/images/' + item.cinemaImg}
              collectionIcon
              collectionClick={this.collectionClick}
              collection={item.collection}
            />
          ))}
        </div>
      </>
    )
  }
}

export default Theater
