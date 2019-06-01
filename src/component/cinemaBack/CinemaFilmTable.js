import React from 'react'

class MemberCollectTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thisData: 0,
      thisFilmData: 0,
    }
  }

  async componentDidMount() { }
  static getDerivedStateFromProps(nextProps, prevState) {
    // this.setState({ thisData: nextProps.thisData }) 這不能這樣setStae，要用下面的寫法
    let stateToBeReturned = null
    if (prevState.thisData == 0 || prevState.thisFilmData == 0) {
      stateToBeReturned = {
        ...prevState,
        thisData: nextProps.thisData,
        thisFilmData: nextProps.thisData.cinemaFilm,
      }
    }
    console.log(nextProps)
    console.log(prevState)
    console.log(stateToBeReturned)
    return stateToBeReturned
  }

  render() {
    if (this.props.thisData == 0) {
      return <></>
    }
    return (
      <>
        {this.state.thisFilmData.length == 0 ? (
          <h5 className="text-center text-mywhite mx-auto">
            尚無紀錄，趕快
            <a href="/article" style={{ color: '#ffa510' }}>
              前往文章
            </a>
            添加你的收藏吧！
          </h5>
        ) : (
            <table class="table table-borderless text-center h5">
              <thead>
                <tr
                  className="text-center"
                  style={{ border: '2px solid #ffa510 ', color: '#ffa510' }}
                >
                  <th style={{ width: '60px' }}>#</th>
                  <th scope="col-lg">中文片名</th>
                  <th scope="col-lg">上架日期</th>
                  <th scope="col-lg">上檔日期</th>
                  <th scope="col-lg">下檔日期</th>
                  <th scope="col-lg-1">操作</th>
                </tr>
              </thead>
              <tbody className="bg-back-table text-mywhite">
                {this.state.thisFilmData.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '2px solid #2B333D',
                    }}
                  >
                    <th scope="row">{index + 1}</th>
                    <td
                      style={{
                        borderLeft: '2px solid #2B333D',
                        borderRight: '2px solid #2B333D',
                      }}
                    >
                      {/* <a href={'/article/' + item.id}>{item.title}</a> */}
                     {item.title}
                    </td>
                    <td
                      style={{
                        borderLeft: '2px solid #2B333D',
                        borderRight: '2px solid #2B333D',
                      }}
                    >
                      {item.updateDate}
                    </td>
                    <td
                      style={{
                        borderLeft: '2px solid #2B333D',
                        borderRight: '2px solid #2B333D',
                      }}
                    >
                      {item.inTheaterDate}
                    </td>
                    <td
                      style={{
                        borderLeft: '2px solid #2B333D',
                        borderRight: '2px solid #2B333D',
                      }}
                    >
                      {item.outTheaterDate}
                    </td>
                    <td
                      style={{
                        borderLeft: '2px solid #2B333D',
                        borderRight: '2px solid #2B333D',
                      }}
                    >
                      <button className="btn btn-outline-warning mx-2"><i class="fas fa-eye btnTableEdit"></i></button>
                      <button className="btn btn-outline-warning mx-2"><i class="fas fa-edit btnTableEdit"></i></button>
                      <button className="btn btn-outline-warning mx-2"><i class="fas fa-trash btnTableEdit"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </>
    )
  }
}
export default MemberCollectTable
