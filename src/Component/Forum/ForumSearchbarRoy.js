import React from 'react'

const ForumSearchbarRoy = () => (
  <div className="input-group md-form form-sm form-2 pl-0 ">
    <input
      className="form-control my-0 py-1  bg-transparent"
      type="text"
      placeholder="請輸入搜尋內容"
      aria-label="Search"
    />

    <div className="input-group-append rounded-right">
      <span className="input-group-text lighten-3 bg-warning">搜尋</span>
    </div>
  </div>
)

export default ForumSearchbarRoy
