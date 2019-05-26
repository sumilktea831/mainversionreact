import React from 'react'
import CardKagaStar from './CardKagaStar'
import CardKagaEditToAreaButton from './CardKagaEditToAreaButton'
import { Link } from 'react-router-dom'

class CardKagaBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markText: '',
    }
  }
  componentDidMount() {
    const markProps = this.props.mark
    let markData = { markId: '', markContent: '' }
    markProps.map(item => {
      if (item.markId === this.props.id) {
        markData.markId = item.markId
        markData.markContent = item.markContent
      }
      return item
    })
    this.setState({ markText: markData.markContent })
  }
  mouseOver = event => () => {
    const realevent = '#' + event
    let cardTopMaskKaga = document.querySelector(realevent)
    //
    let elseCard = [...document.getElementsByName('TopOpenClose')]
    elseCard.map(item => {
      return (item.className = 'cardTopMaskKaga')
    })
    cardTopMaskKaga.className = 'cardTopMaskKagaZero'
  }

  mouseOut = event => () => {
    const realevent = '#' + event
    let cardTopMaskKaga = document.querySelector(realevent)
    cardTopMaskKaga.className = 'cardTopMaskKaga'
  }

  render() {
    return (
      <>
        <span
          onMouseOver={this.mouseOver('a' + this.props.id)}
          onMouseOut={this.mouseOut('a' + this.props.id)}
          key={this.props.id}
          className="col-3 flex-column aCardText position-relative"
        >
          {/* 外框＋底圖 */}
          <div
            className="card text-center flex-column border-0 cardAreaBgKaga"
            style={{
              backgroundImage: `url(${this.props.img})`,
            }}
          >
            {/* 上方淺色遮罩 */}
            <div
              id={'a' + this.props.id}
              name="TopOpenClose"
              className="pr-1 cardTopMaskKaga"
            />

            {/* 下方深色遮罩 */}
            <Link to={this.props.link}>
              <div className="h-30 d-flex flex-column justify-content-center cardBottomMaskKaga">
                <h6 className="card-title mb-1">{this.props.subtitle}</h6>
                <h4 className="card-title m-0">{this.props.title}</h4>
              </div>
            </Link>

            {/* 滑鼠滑入後彈出區塊 */}
            <div className="card-body align-items-center p-0 text-center cardPopupMaskKaga">
              {this.props.member ? (
                <>
                  <div>
                    <h4 className="mt-4 mb-2">我的評分</h4>
                  </div>
                  <CardKagaStar star={this.props.star} />
                  <h4 className="card-title mt-3">註記</h4>
                  {/* 文字標籤,給他一個寬度,超過就會變成點點點 */}
                  <span
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '200px',
                    }}
                  >
                    {this.state.markText !== ''
                      ? this.state.markText
                      : '尚無備註'}
                  </span>
                  <div className="row d-flex justify-content-center mt-4">
                    {/* 編輯按鈕, 觸發editArea元件 */}
                    <CardKagaEditToAreaButton
                      id={this.props.id}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      star={this.props.star}
                      mark={this.props.mark}
                      newStarAndMark={this.props.newStarAndMark}
                      starAmimation={this.props.starAmimation}
                    />

                    {/* 刪除按鈕 */}
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={this.props.del}
                    >
                      刪除
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="mt-4 mb-2">目前評分</h4>
                  </div>
                  <CardKagaStar star={this.props.star} />
                  <h4 className="card-title mt-3">註記</h4>
                  {/* 文字標籤,給他一個寬度,超過就會變成點點點 */}
                  <span
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '200px',
                    }}
                  >
                    {this.state.markText !== ''
                      ? this.state.markText
                      : '尚無備註'}
                  </span>
                  <div className="row d-flex justify-content-center mt-4">
                    {/* 編輯按鈕, 觸發editArea元件 */}
                    <CardKagaEditToAreaButton
                      id={this.props.id}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      star={this.props.star}
                      mark={this.props.mark}
                      newStarAndMark={this.props.newStarAndMark}
                      member={this.props.member}
                      starAmimation={this.props.starAmimation}
                    />
                    {/* 有給刪除值就有刪除按鈕 */}
                    {this.props.del ? (
                      <button
                        type="button"
                        className="btn btn-danger ml-2"
                        onClick={this.props.del}
                      >
                        刪除
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </span>
      </>
    )
  }
}
export default CardKagaBox
