import React from 'react'
const ListTitleRoy = props => {
  return (
    <>
      {/* 發文標題 */}
      <h5 className="text-light my-0 ">
        {props.listheadline.length > 10
          ? props.listheadline.substr(0, 13) + '...'
          : props.listheadline}
      </h5>
    </>
  )
}

export default ListTitleRoy
