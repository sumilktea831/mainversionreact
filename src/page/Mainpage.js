import React from 'react'
import ActivitySection from '../component/activity/ActivitySection/ActivitySection'

class Mainpage extends React.Component {
  constructor() {
    super()
    this.state = {
      bigSlogan: '一部你從未看過的電影',
      midSlogan: '一個你從未發現過的驚喜',
      smallSlogan: '開始找尋',
      heroSectionPic:
        'https://images.unsplash.com/photo-1532800783378-1bed60adaf58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    }
  }

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
      </>
    )
  }
}

export default Mainpage
