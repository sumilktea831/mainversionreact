import React from 'react'
import ActivityPageSection from '../component/activity/ActivityPageSection/ActivityPageSection'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import ActivityPageCard from '../component/activity/ActivityPageCard/ActivityPageCard'

class ActivityInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ['戲院資訊', '現場照片', '活動資訊', '相關活動', '相關影片'],
      //   "id": 1,
      //   "theater": "非凡戲院",
      //   "title": "慶祝周年慶，非凡爆米花免費吃",
      //   "content": "慶祝周年慶，非凡爆米花免費吃",
      //   "imgSrc": "https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      //   "isCollect": false,
      //   "theaterMap": "106台北市大安區通化街24巷1號",
      //   "GUINumber": "16086448",
      //   "website": "https://www.google.com/",
      //   "email": "theater@gmail.com"
      activityPageData: [],
      streetView: false,
    }
  }

  async componentDidMount() {
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
      console.log(activityPageData)
      this.setState({ activityPageData: activityPageData })
      this.setState({ activityHeroImage: activityPageData.imgSrc })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <div className="container-fuild">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityPageSection
                theater={this.state.activityPageData.theater}
                title={this.state.activityPageData.title}
                content={this.state.activityPageData.content}
                HeroImage={this.state.activityPageData.imgSrc}
              />
            </div>
          </div>
        </div>
        <div className="container-fuild fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[0]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
              <ActivityPageCard
                theater={this.state.activityPageData.theater}
                theaterMap={this.state.activityPageData.theaterMap}
                phone={this.state.activityPageData.phone}
                GUINumber={this.state.activityPageData.GUINumber}
                website={this.state.activityPageData.website}
                email={this.state.activityPageData.email}
                lat={this.state.activityPageData.lat}
                lng={this.state.activityPageData.lng}
                streetView={this.state.streetView}
                handleOnClickMap={() => this.setState({ streetView: true })}
                handleOnClickMaplocal={() =>
                  this.setState({ streetView: false })
                }
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ActivityInfo
