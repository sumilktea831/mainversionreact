import React from 'react'

const ActivitySearchbarInput = props => (
  <>
    <input
      className="activitySearch"
      type="text"
      onChange={props.handleOnChange}
      placeholder={props.placeholder}
      style={{
        background: 'inherit',
        padding: '4px',
        border: '2px solid #ffa510',
        borderRadius: '4px',
        color: '#ffa510',
        fontSize: '24px',
        textAlign: 'center',
      }}
    />
  </>
)

export default ActivitySearchbarInput
