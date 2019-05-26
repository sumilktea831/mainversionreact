import React from 'react'
import ActivityPageSectionImg from './ActivityPageSectionImg'
import ActivityPageSectiontent from './ActivityPageSectionContent'

const ActivitySection = props => (
  <>
    <div className="position-relative">
      <ActivityPageSectionImg pictureSrc={props.HeroImage} />
      <div
        className="position-absolute d-flex flex-column align-items-center justify-content-center"
        style={{
          top: '0',
          bottom: '0',
          left: '120px',
          textShadow: '0 0 10px black',
        }}
      >
        <ActivityPageSectiontent
          theater={props.theater}
          title={props.title}
          content={props.content}
        />
      </div>
    </div>
  </>
)

export default ActivitySection
