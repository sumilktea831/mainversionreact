import React from 'react'
// import ActionButtonRoy from './ActionButtonRoy'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// 算好BUTTON點下去後一定要讓第一筆的ID顯示在PATH上面
const ActionButtonFilterRoy = props => {
  // console.log(props.nowAllData)

  // 陣列要用複製的，不能直接拿來SLCIE會改變原陣列，算出的結果會反過來
  const items = [...props.nowAllData]
  // console.log(props.handleViewFilterStatus)
  if (props.handleViewFilterStatus === true) {
    // // sort by value
    // 大到小排序
    items.sort(function(a, b) {
      return b.forumViews - a.forumViews
    })
  } else {
    // 小到大排序
    items.sort(function(a, b) {
      return a.forumViews - b.forumViews
    })
  }
  // console.log(items.slice(0, 10)[0].id)
  const nowPathId = items.slice(0, 10)[0].id

  return (
    <>
      <Link to={'/forum/' + nowPathId}>
        <button
          type="button"
          className="btn btn-outline-warning px-3  m-0"
          hidden={props.filterBarShow ? '' : 'hidden'}
          onClick={props.handleViewFilter}
        >
          <i
            className={
              props.handleViewFilterStatus
                ? 'fas fa-sort-amount-up px-1'
                : 'fas fa-sort-amount-down px-1'
            }
          />
          收藏
        </button>
      </Link>
    </>
  )
}

export default ActionButtonFilterRoy
