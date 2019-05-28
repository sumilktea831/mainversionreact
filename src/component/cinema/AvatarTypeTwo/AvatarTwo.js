import React from 'react'

//blacklist  general vip cinema
const AvatarOne = props => {
  return (
    <>
      <div className="row d-flex flex-cloumn col-lg-6 col-md-12 col-sm-12 p-0  justify-content-center align-items-center">
        {/* 上面圖片 */}
        <div className="col-lg-12 justify-content-center d-flex align-items-end">
          <div
            className="overflow-hidden p-0 photoAvatar"
            style={{
              borderRadius: '50%',
              width: '250px',
              height: '250px',
            }}
          >
            <img
              className=" h-100"
              src={props.img}
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <label>
          <input
            type="file"
            name={props.id}
            id={props.id}
            style={{ display: 'none' }}
            onChange={props.onChange}
          />
          <div
            className="bg-warning d-flex align-items-center justify-content-center text-dark position-absolute"
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '25px',
              margin: '70px 0 0 -70px',
              cursor: 'pointer',
            }}
          >
            <i className="fas fa-edit" />
          </div>
        </label>

        {/* 下面文字 */}
        <div className="col-lg w-100 h-50 flex-column d-flex justify-content-around mt-3">
          <div className="col d-flex align-items-center justify-content-center my-1">
            <h5>{props.name}</h5>
          </div>
          <div className="col d-flex align-items-center justify-content-center mt-1 flex-wrap">
            <h5>入會日期:</h5>
            <h5 className="ml-1">{props.SignUpDate}</h5>
          </div>
        </div>
      </div>
    </>
  )
}
export default AvatarOne
