import React from 'react'

const MovieSearchbar = props => {
  return (
    <>
      <div>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            placeholder="請輸入搜尋內容"
            style={{
              placeholder: '#ffa510',
            }}
          />
          <button className="btn light btn-outline active">搜尋</button>
        </form>
      </div>
    </>
  )
}
export default MovieSearchbar
