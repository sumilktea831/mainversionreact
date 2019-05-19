import React from 'reactmArticleAvatarRoy = props => {
  return (
    <>
      <div className="media d-flex align-items-center">
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: '75px', height: '75px' }}
        >
          <img
            src={
              'http://localhost:3000/images/' + props.contentUserAvatar + '.jpg'
            }
            className="h-100 w-100 align-self-center mr-3"
            alt=""
          />
        </div>
        <div className="media-body">
          <p className="text-light m-3">{props.contentUserName}</p>
          <p className="text-light m-3">一分鐘前</p>
        </div>
      </div>
    </>
  )
}

export default ForumArticleAvatarRoy
