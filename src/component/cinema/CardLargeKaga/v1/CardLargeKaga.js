import React from 'react'
const memberId = sessionStorage.getItem('memberId')
class CardLargeKaga extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      awesome: [], //array
      awesomeLength: '', //number
      pageviews: props.pageviews, //number
      collection: [], //array
      collectionLength: '', //number
    }
  }
  componentDidMount() {
    this.setState({
      awesome: this.props.awesome,
      awesomeLength: this.props.awesomeLength,
      collection: this.props.collection,
      collectionLength: this.props.collectionLength,
    })
  }

  // 按讚功能回傳並改變渲染----完成
  awesomeCardClick = () => {
    // 如果有登錄的話
    if (memberId) {
      let newAwesome = []
      let awesomeLength = +this.state.awesomeLength
      // 如果awesome裡面有會員id的話
      if (this.props.awesome.find(item => item === memberId)) {
        // 就把不是這個id的資料丟進newAwesome裡面
        this.props.awesome.map(item => {
          if (item !== memberId) {
            newAwesome.push(item)
          }
          return item
        })
        // 然後把長度-1
        awesomeLength--
        // 把兩個更新後的值丟回去父層
        this.props.awesomeClick(newAwesome, awesomeLength)
        // 然後同時改變自己這層的state
        this.setState(
          {
            awesome: newAwesome,
            awesomeLength: awesomeLength,
          },
          () => {
            console.log('click + state')
            console.log(this.state.awesomeLength)
          }
        )
      } else {
        // 如果沒有的話
        // 把會員id新增到陣列裡面
        newAwesome = [...this.props.awesome, memberId]
        // 然後把長度+1
        awesomeLength++
        // 把兩個更新後的值丟回去父層
        this.props.awesomeClick(newAwesome, awesomeLength)
        // 然後同時改變自己這層的state
        this.setState(
          {
            awesome: newAwesome,
            awesomeLength: awesomeLength,
          },
          () => {
            console.log('click - state')
            console.log(this.state.awesomeLength)
          }
        )
      }
      // 如果沒登錄的話
    } else {
      alert('直接導向登錄會員')
    }
  }

  // 收藏功能回傳並改變渲染----完成
  collectionCardClick = () => {
    console.log(this.props.collection)
    // 如果有登錄的話
    if (memberId) {
      let newCollection = []
      let collectionLength = +this.state.collectionLength
      // 如果awesome裡面有會員id的話
      if (this.props.collection.find(item => item === this.props.id)) {
        // 就把不是這個id的資料丟進newAwesome裡面
        this.props.collection.map(item => {
          if (item !== this.props.id) {
            newCollection.push(item)
          }
          return item
        })
        // 然後把長度-1
        collectionLength--
        // 把兩個更新後的值丟回去父層
        this.props.collectionClick(newCollection, collectionLength)
        // 然後同時改變自己這層的state
        this.setState(
          {
            collection: newCollection,
            collectionLength: collectionLength,
          },
          () => {
            console.log('click + state')
            console.log(this.state.collectionLength)
          }
        )
      } else {
        // 如果沒有的話
        // 把會員id新增到陣列裡面
        newCollection = [...this.props.collection, this.props.id]
        // 然後把長度+1
        collectionLength++
        // 把兩個更新後的值丟回去父層
        this.props.collectionClick(newCollection, collectionLength)
        // 然後同時改變自己這層的state
        this.setState(
          {
            collection: newCollection,
            collectionLength: collectionLength,
          },
          () => {
            console.log('click - state')
            console.log(this.state.collectionLength)
          }
        )
      }
      // 如果沒登錄的話
    } else {
      alert('直接導向登錄會員')
    }
  }

  render() {
    return (
      <>
        <div className="col-12 my-3">
          <div
            className="card"
            style={{
              height: '450px',
              overflow: 'hidden',
              background: '#28333d',
              boxShadow: '0 0 2px #000000',
            }}
          >
            <div className="row no-gutters h-100">
              <div className="col-md-6">
                <img
                  src={this.props.img}
                  className="card-img h-100"
                  alt="..."
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-6 d-flex flex-column h-100">
                {/* 上方區塊 */}
                <div className="d-flex h-100 my-2">
                  <div className="col-3 d-flex flex-column justify-content-around ml-4 px-0">
                    <h4 className="mr-3">地址</h4>
                    <h4 className="mr-3">電話</h4>
                    <h4 className="mr-3">統一編號</h4>
                    <h4 className="mr-3">官方網站</h4>
                    <h4 className="mr-3">電子信箱</h4>
                  </div>
                  <div className="col-9 d-flex flex-column justify-content-around pl-0">
                    {this.props.address ? (
                      <h5>{this.props.address}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.phone ? (
                      <h5>{this.props.phone}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.taxid ? (
                      <h5>{this.props.taxid}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.web ? (
                      <a href={this.props.web} target="_blank">
                        <i
                          className="fas fa-external-link-square-alt mb-2"
                          style={{ fontSize: '25px' }}
                        />
                      </a>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                    {this.props.email ? (
                      <h5>{this.props.email}</h5>
                    ) : (
                      <h5>暫無資料</h5>
                    )}
                  </div>
                </div>
                {/* 下方區塊 */}
                <div className="d-flex mb-4 mt-3" style={{ fontSize: '25px' }}>
                  <div
                    className="mx-4"
                    onClick={this.awesomeCardClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fas fa-thumbs-up mr-2" />
                    {this.state.awesomeLength}
                  </div>
                  <div className="mx-5">
                    <i className="fas fa-eye mr-2" />
                    {this.props.pageviews}
                  </div>
                  <div
                    className="ml-4"
                    onClick={this.collectionCardClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fas fa-bookmark mr-2" />
                    {this.state.collectionLength}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default CardLargeKaga
