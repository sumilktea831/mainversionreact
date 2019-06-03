import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import PieClass from './ActivityD3'
import ActivityTitle from '../ActivityTitle/ActivityTitle'

class ActivityD3root extends React.Component {
  constructor() {
    super()
    this.state = {
      totalCountData: [
        { cinemaD3guessLook: 0, value: 10 },
        { cinemaD3memberLook: 0, value: 20 },
        { cinemaD3memberJoin: 0, value: 30 },
        { cinemaD3memberCancel: 0, value: 40 },
      ],
    }
  }
  componentDidMount = () => {
    fetch('http://localhost:5555/cinema/' + sessionStorage.getItem('cinemaId'))
      .then(res => res.json())
      .then(res => {
        const data = JSON.parse(JSON.stringify(this.state.totalCountData))
        const newData = JSON.parse(JSON.stringify(res))
        data[0].value = newData.cinemaD3guessLook
      })
  }

  render() {
    return (
      <div id="root">
        <div className="row">
          <div className="col-md-12 p-0">
            <ActivityTitle title="歷史總活動流量" />
          </div>
          <div className="col-md-4 mt-5">
            <PieClass
              data={this.state.totalCountData}
              width={300}
              height={300}
              innerRadius={40}
              outerRadius={150}
            />
          </div>
          <div className="col-md-8 mt-5">
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#9ecae1',
                }}
              />
              <span style={{ fontSize: '24px' }}>訪客觀看人次：</span>
            </div>
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#c6dbef',
                }}
              />
              <span style={{ fontSize: '24px' }}>會員觀看人次：</span>
            </div>
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#deebf7',
                }}
              />
              <span style={{ fontSize: '24px' }}>會員報名人次：</span>
            </div>
            <div className="wrapper mb-5">
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  background: '#f7fbff',
                }}
              />
              <span style={{ fontSize: '24px' }}>報名取消人次：</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<ActivityD3root />, rootElement)
export default ActivityD3root
