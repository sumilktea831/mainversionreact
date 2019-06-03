import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import PieClass from './ActivityD3'

const ActivityD3root = () => {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
    }))

  const [data, setData] = useState(generateData())
  const changeData = () => {
    setData(generateData())
  }

  return (
    <div id="root">
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      <div>
        <span className="label">React Class</span>
        <PieClass
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<ActivityD3root />, rootElement)
export default ActivityD3root