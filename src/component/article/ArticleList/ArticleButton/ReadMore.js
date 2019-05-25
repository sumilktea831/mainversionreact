import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class ReadMore extends React.Component {
  constructor(props) {
    super(props)
  }
  // console.log(props);
  // const itemid = props.mykey;
  render() {
    return (
      <>
        <div className="text-right my-2 text-sm">
          <Link
            to={'/article/' + this.props.sid}
            // onClick={() => this.props.handleClick(1)}
          >
            閱讀更多......
          </Link>
        </div>
      </>
    )
  }
}

export default ReadMore
