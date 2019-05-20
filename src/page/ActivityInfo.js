import React from 'react'
import ActivityPageSection from '../component/activity/ActivityPageSection/ActivityPageSection'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'

class Activity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ['戲院資訊', '戲院照片', '活動資訊', '相關活動', '相關影片'],
      activityPageData: [],
    }
  }

  async componentDidMount() {
    try {
      console.log('teset')
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
              {/* {
                "id": 1,
                "theater": "非凡戲院",
                "title": "慶祝周年慶，非凡爆米花免費吃",
                "content": "慶祝周年慶，非凡爆米花免費吃",
                "imgSrc": "https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                "isCollect": false,
                "theaterMap": "106台北市大安區通化街24巷1號",
                "GUINumber": "16086448",
                "website": "https://www.google.com/",
                "email": "theater@gmail.com"
              }, */}
              <ActivityPageSection
                theater={this.state.activityPageData.theater}
                title={this.state.activityPageData.title}
                content={this.state.activityPageData.content}
                HeroImage={this.state.activityPageData.imgSrc}
              />
            </div>
          </div>
        </div>
        <div className="container-fuild fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[0]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">
              <ActivityCard
                key={this.state.activityPageData.id}
                title={this.state.activityPageData.title}
                subtitle={this.state.activityPageData.subtitle}
                imgSrc={this.state.activityPageData.imgSrc}
                collectOpen
                isCollect={this.state.activityPageData.isCollect}
              />
            </div>
          </div>
        </div>
        <div className="container-fuild fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[1]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">TEST</div>
          </div>
        </div>
        <div className="container-fuild fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[2]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">TEST</div>
          </div>
        </div>
        <div className="container-fuild fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[3]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">TEST</div>
          </div>
        </div>
        <div className="container-fuild fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[4]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">TEST</div>
          </div>
        </div>
      </>
    )
  }
}

export default Activity
