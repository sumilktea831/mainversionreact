import React from 'react'

const ListAvatarRoy = () => {
  return (
    <>
      <div className="d-flex align-items-center">
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: '34px', height: '34px' }}
        >
          <img
            src="http://localhost:3000/images/9743_2.jpg"
            className="h-100 w-100 "
          />
        </div>
        <div>
          <h5 className="text-light my-0 mx-2">Amy</h5>
        </div>
      </div>
    </>
  )
}

export default ListAvatarRoy
