import React from 'react'

const ListAvatarRoy = props => {
  return (
    <>
      <div className="d-flex align-items-center">
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: '34px', height: '34px' }}
        >
          {/* 發文者頭像 */}
          <img
            id="gg"
            src={props.avatarPath + props.listforumAvatar}
            className="h-100 w-100 gg "
            alt=""
          />
        </div>
        <div>
          {/* 發文者名稱 */}
          <h5 className="text-light my-0 mx-2">{props.listforumName}</h5>
        </div>
      </div>
    </>
  )
}

export default ListAvatarRoy
