import React from 'react'
import ActivitySectionImg from './ActivitySectionImg'
import ActivitySectionContent from './ActivitySectionContent'

const ActivitySection = props => (
  <>
    <div className="position-relative">
      <ActivitySectionImg pictureSrc={props.pictureSrc} />
      <div
        className="position-absolute d-flex flex-column align-items-center justify-content-center"
        style={{
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          color: 'white',
        }}
      >
        <ActivitySectionContent
          bigSlogan={props.bigSlogan}
          midSlogan={props.midSlogan}
          smallSlogan={props.smallSlogan}
        />
      </div>
    </div>
  </>
)

export default ActivitySection
