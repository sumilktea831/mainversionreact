import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const ForumPage = props => {
  // 先預設空白陣列
  var ForumTotalPages = []
  for (let i = 1; i <= props.ForumTotalPages; i++) {
    // 迴圈將數值引入陣列 並且push    需有**key**
    ForumTotalPages.push(
      <bu className="btn btn-outline-warning mx-1 " key={i}>
        <Link to={'/forum/1'} className="text-warning">
          {i}
        </Link>
      </bu>
    )
  }
  return (
    <>
      <div className="d-flex justify-content-between ">
        <div className="btn btn-outline-warning mx-1">上一頁</div>
        <div>{ForumTotalPages}</div>
        {/* <div className="btn btn-outline-warning">/ {props.ForumTotalPages}</div> */}
        <div className="btn btn-outline-warning mx-1">下一頁</div>
      </div>
    </>
  )
}

export default ForumPage
