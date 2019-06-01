import React from 'react'

const ListViewsRoy = props => {
  return (
    <>
      <div className="d-flex">
        <div>
          <h5 className="text-light my-0 ml-2">
            {props.listforumViews > 999 ? '999+' : props.listforumViews}
          </h5>
        </div>
        <div className="py-1">
          <i className="fas fa-bookmark mx-2 text-light" />
        </div>
      </div>
    </>
  )
}

export default ListViewsRoy
