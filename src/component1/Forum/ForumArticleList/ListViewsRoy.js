import React from './node_modules/reacte_modules/react'

const ListViewsRoy = props => {
  return (
    <>
      <div className="d-flex">
        <div>
          <i className="fas fa-eye mx-2 text-light" />
        </div>
        <div>
          <h5 className="text-light my-0 ml-2">{props.listforumViews}</h5>
        </div>
      </div>
    </>
  )
}

export default ListViewsRoy
