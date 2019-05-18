import React from 'react'
import CardKaga from '../component/cinema/CardKaga/v2/CardKaga'
class Theater extends React.Component {
  constructor() {
    super()
    this.state = {
      cardData: [],
    }
  }

  // 在元件完成載入時fetch cinemaCard的資料撈進來丟到state
  // cinema.json的資料為
  // {"cinemaid": "001","cinemaName": "光點台北","cinemaCity": "台北市","cinemaImg": "spott.jpg"}
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/cinemaCard', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      console.log(data)
      this.setState({ cardData: data })
    } catch (err) {
      console.log(err)
    }
  }
  collectionClick = () => () => {}
  render() {
    return (
      <>
        {/*  */}
        <div
          className="row"
          style={{
            padding: '0 120px',
          }}
        >
          {this.state.cardData.map(item => (
            <CardKaga
              title={item.cinemaName}
              subtitle={item.cinemaCity + item.cinemaArea}
              img={'http://localhost:3000/images/' + item.cinemaImg}
              collectionIcon
              collectionClick={this.collectionClick}
              collection={item.collection}
            />
          ))}
        </div>
      </>
    )
  }
}

export default Theater
