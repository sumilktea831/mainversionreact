import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import MoviePageSection from '../component/movie/MoviePageSection/MoviePageSection'
import MovieTitle from '../component/movie/MovieTitle/MovieTitle'
import MoviePageCard from '../component/movie/MoviePageCard/MoviePageCard'
import MovieContent from '../component/movie/MovieContent/MovieContent'
import MovieQRcode from '../component/movie/MovieQRcode/MovieQRcode'
import MovieCard from '../component/movie/MovieCard/MovieCard'
import ActivityPageCard from '../component/activity/ActivityPageCard/ActivityPageCard'

import Swal from 'sweetalert2'

class MovieInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moviePageData: [],
      moviePageOtherData: [],
      streetView: false,
      collectMovie: '',
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/movieCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      const moviePageData = data.find(
        item => item.id === this.props.match.params.id
      )
      const moviePageOtherData = data.filter(
        item => item.id !== this.props.match.params.id
      )
      moviePageData.imgSrc =
        moviePageData.imgSrc.indexOf('http') == 0
          ? moviePageData.imgSrc
          : '/images/movieImg/' + moviePageData.imgSrc
      console.log(moviePageData)
      this.setState({ moviePageData: moviePageData })
      this.setState({ moviePageOtherData: moviePageOtherData })
      this.setState({ movieHeroImage: moviePageData.imgSrc })
    } catch (err) {
      console.log(err)
    }

    const memberId = sessionStorage.getItem('memberId')
    try {
      const res = await fetch('http://localhost:5555/member/' + memberId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({ collectMovie: data.collectMovie })
    } catch (err) {
      console.log(err)
    }
    const pagename = window.location.pathname.slice(7)
  }
  handleOnClick = () => {
    this.setState({ moviePageData: [] })
    const res = fetch('http://localhost:5555/movieCardData', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const data = res.json()
    const moviePageData = data.find(
      item => item.id === this.props.match.params.id
    )
    const moviePageOtherData = data.filter(
      item => item.id !== this.props.match.params.id
    )

    console.log(moviePageData)
    this.setState({ moviePageData: moviePageData })
    this.setState({ moviePageOtherData: moviePageOtherData })
    this.setState({ movieHeroImage: moviePageData.imgSrc })
  }
  handleCollect = async id => {
    const memberId = sessionStorage.getItem('memberId')
    if (memberId !== null) {
      try {
        const res = await fetch('http://localhost:5555/member/' + memberId, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        let data = await res.json()
        let isCollect = data.collectMovie.indexOf(id) > -1

        if (isCollect) {
          data.collectMovie = data.collectMovie
            .split(id)
            .toString()
            .replace(/,/g, '')
          // alert('已取消收藏')
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: '<span style="color:#d4d1cc">已取消收藏</span>',
            showConfirmButton: false,
            buttonsStyling: false,
            background: '#242b34',
          })
        } else {
          data.collectMovie += id
          // alert('已加入收藏')
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: '<span style="color:#d4d1cc">已加入收藏</span>',
            showConfirmButton: false,
            buttonsStyling: false,
            background: '#242b34',
          })
        }
        this.setState({ collectMovie: data.collectMovie })
        try {
          const res = await fetch('http://localhost:5555/member/' + memberId, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
          console.log('修改完成')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-0">
              <MoviePageSection
                theater={this.state.moviePageData.theater}
                title={this.state.moviePageData.title}
                content={this.state.moviePageData.intro}
                HeroImage={this.state.moviePageData.imgSrc}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieTitle title={'電影資訊'} className="content-title" />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
              <MoviePageCard
                imgSrc={this.state.moviePageData.imgSrc}
                cardTitle1={'電影中文名稱'}
                cardTitle2={'電影英文名稱'}
                cardTitle3={'電影分級'}
                cardTitle4={'電影導演'}
                cardTitle5={'電影語言'}
                cardTitle6={'電影片長'}
                cardTitle7={'電影上檔時間'}
                cardTitle8={'電影下檔時間'}
                cardContent1={this.state.moviePageData.title}
                cardContent2={this.state.moviePageData.titleEn}
                cardContent3={this.state.moviePageData.movie_rating}
                cardContent4={this.state.moviePageData.director}
                cardContent5={this.state.moviePageData.language}
                cardContent6={this.state.moviePageData.filmTime + '分鐘'}
                cardContent7={this.state.moviePageData.inTheaterDate}
                cardContent8={this.state.moviePageData.outTheaterDate}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieTitle title={'戲院資訊'} className="content-title" />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
              {/* <ActivityPageCard
                theater={this.state.activityPageData.theater}
                theaterMap={this.state.activityPageData.theaterMap}
                phone={this.state.activityPageData.phone}
                GUINumber={this.state.activityPageData.GUINumber}
                website={this.state.activityPageData.website}
                email={this.state.activityPageData.email}
                lat={this.state.activityPageData.lat}
                lng={this.state.activityPageData.lng}
                streetView={this.state.streetView}
                handleOnClickMap={() => this.setState({ streetView: true })}
                handleOnClickMaplocal={() =>
                  this.setState({ streetView: false })
                }
              /> */}
            </div>
          </div>
        </div>
        <div className="container-fluid fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <MovieTitle title={'相關活動'} className="content-title" />
            </div>
            {this.state.moviePageOtherData.map(data => (
              <div className="col-12 col-sm-12 col-md-6 col-lg-2 mt-5">
                {sessionStorage.getItem('memberId') !== null ? (
                  <MovieCard
                    routerId={data.id}
                    handleCollect={() => this.handleCollect(data.id)}
                    key={data.id}
                    title={data.theater}
                    subtitle={data.title}
                    imgSrc={
                      data.imgSrc.indexOf('http') == 0
                        ? data.imgSrc
                        : '/images/movieImg/' + data.imgSrc
                    }
                    collectOpen
                    isCollect={
                      this.state.collectMovie.indexOf(data.id) > -1
                        ? true
                        : false
                    }
                  />
                ) : (
                  <MovieCard
                    routerId={data.id}
                    handleCollect={() => this.handleCollect(data.id)}
                    key={data.id}
                    title={data.theater}
                    subtitle={data.title}
                    imgSrc={
                      data.imgSrc.indexOf('http') == 0
                        ? data.imgSrc
                        : '/images/movieImg/' + data.imgSrc
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default MovieInfo
