import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const ReadMore = props => {
  // console.log(props);
  // const itemid = props.mykey;
  return (
    <>
      <div className="text-right my-2 text-sm">
        <Link to={'/article/' + props.sid}>閱讀更多......</Link>
      </div>
    </>
  );
};

export default ReadMore;
