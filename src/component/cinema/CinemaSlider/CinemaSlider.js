import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Slider from 'react-slick'
import '../../../../node_modules/slick-carousel/slick/slick.css'
import '../../../../node_modules/slick-carousel/slick/slick-theme.css'
import CinemaSliderlItem from './CinemaSliderlItem'

class CinemaSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
    }
    const slickImg = this.props.sData.img ? this.props.sData.img : []
    return (
      <div>
        <Slider {...settings}>
          {slickImg.map(item => (
            <div>
              <CinemaSliderlItem img={item} />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}
export default CinemaSlider
