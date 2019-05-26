import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import ActivitySearchbarTitle from '../component/activity/ActivitySearchbar/ActivitySearchbarTitle'
import ActivitySearchbarContent from '../component/activity/ActivitySearchbar/ActivitySearchbarContent'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'

import { LinkContainer } from 'react-router-bootstrap'

class Activity extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '擇你所愛，愛你所擇',
      midSlogan: '找尋您的專屬活動',
      smallSlogan: '開始找尋',
      heroSectionPic:
        'https://images.unsplash.com/photo-1506512420485-a28339abb3b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      title: ['活動列表'],
      activityCardData: [],
      searchbarRegion:['北部','中部','南部','東部'],
      searchbarPlace:['全部','咖啡廳','影院','學校'],
      searchbarRegionState:['','','',''],
      searchbarPlaceState:['active','','',''],
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
      this.setState({ activityCardData: data })
    } catch (err) {
      console.log(err)
    }
  }

  searchbarOnClick = async(id,searchName,searchKeyWord) => {
    let data=[];
    switch (searchName){
      case "searchbarRegion":
        data = JSON.parse(JSON.stringify(this.state.searchbarRegionState))
        data[id]===""
        ?(data[id]="active")
        :(data[id]="")
        this.setState({searchbarRegionState:data})
      break;
      case "searchbarPlace":
        data = ['','','','']
        data[id]===""
        ?(data[id]="active")
        :(data[id]="")
        this.setState({searchbarPlaceState:data})
      break;
    }
    try {
      
      const res = await fetch('http://localhost:5555/activityCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      let data = await res.json()
      const regionKeyword = this.state.searchbarRegionState
      const placeKeyword = this.state.searchbarPlaceState
      // console.log(placeKeyword.map(el=>el))
      // console.log(data.map((el,id)=>el))

      // console.log(data.filter((el,id)=>el['place'].indexOf("咖啡廳")>=0))
      console.log(searchKeyWord)
      switch (searchKeyWord){
        case "咖啡廳":
          data = data.filter((el,id)=>el['place'].indexOf("咖啡廳")>=0)
        break;
        case "影院":
          data = data.filter((el,id)=>el['place'].indexOf("影院")>=0)
        break;
        case "學校":
          data = data.filter((el,id)=>el['place'].indexOf("學校")>=0)
        break;
      }

      this.setState({ activityCardData: data })
    } catch (err) {
      console.log(err)
    }
    
  }
    
    

  render() {
    return (
      <>
        <div className="container-fuild position-relative">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivitySection
                bigSlogan={this.state.bigSlogan}
                midSlogan={this.state.midSlogan}
                smallSlogan={this.state.smallSlogan}
                pictureSrc={this.state.heroSectionPic}
                section={'#test'}
                pagename={'/activity'}
                pageid={'#search'}
                
              />
            </div>
          </div>
          <div
            className="position-absolute"
            id="search"
            style={{ bottom: '72px' }}
          />
        </div>
        <div className="container-fuild fix-content">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[0]}
                className="content-title"
              />
            </div>
            <div className="col-md-12 p-0 fix-inline-content">
              <div className="searchbar-wrapper d-flex mb-5">
                <div>
                  <ActivitySearchbarTitle title={'地區'}/>
                </div>
                <div>
              {this.state.searchbarRegion.map((data,id)=>
                <ActivitySearchbarContent
                className={this.state.searchbarRegionState[id]}
                handleOnClick={()=>(this.searchbarOnClick(id,'searchbarRegion',data)) }
                content={data}/>
                )
              }
                </div>
              </div>
              <div className="searchbar-wrapper d-flex mb-5">
                <div>
                  <ActivitySearchbarTitle title={'場所'}/>
                </div>
                <div>
              {this.state.searchbarPlace.map((data,id)=>            
                <ActivitySearchbarContent 
                className={this.state.searchbarPlaceState[id]}
                handleOnClick={()=>(this.searchbarOnClick(id,'searchbarPlace',data)) } content={data}/>)
              }
                </div>
              </div>
            </div>
            {this.state.activityCardData.map(data => (
              <LinkContainer to={'/activity/' + data.id}>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">
                  <ActivityCard
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
        </div>
      </>
    )
  }
}

export default Activity
