import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import InputWithLabel_Su from '../inputs/InputWithLabel_Su'
import Checkbox_Su from '../inputs/Checkbox_Su'
import Captcha from 'captcha-mini' //驗證碼套件
class InputCardContent_CinemaSignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      inputH: '48px', //設定所有input高
      inputmsg: [],
      chooseInputmsg: [],
      usertext: [
        {
          cinemaName: '',
          cinemaId: '',
          cinemaCity: '台北市',
          cinemaArea: '',
          cinemaAddress: '',
          cinemaPhone: '',
          cinemaEmail: '',
          cinemaType: '',
          cinemaAccount:'',
          cinemaPwd:'',
          cinemaWeb: '',
          cinemaLogo: '',
          cinemaHeroImg: '',
          isagreed: false,
        },
      ],
      checkok: {
        //儲存格式驗證是否通過
        email: false,
        nickname: false,
        repwd: false,
      },
    }
  }
  async componentDidMount() {
    try {
      //取得欄位資訊
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(
        'http://localhost:5555/cinema-sign-inputmsg',
        {
          method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
      const jsonObject = await response.json()
      // console.log('/' + jsonObject[6].selectOptions.map(item => item.name))
      const data = await jsonObject
      await this.setState({ inputmsg: data })
      // await console.log(data)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }
    try {
      //取得選填欄位資訊
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(
        'http://localhost:5555/cinema-sign-choose-inputmsg',
        {
          method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
      const jsonObject = await response.json()
      const choosedata = await jsonObject
      await this.setState({ chooseInputmsg: choosedata })
      // await console.log(choosedata)
    } catch (e) {
      //抓到錯誤訊息，以及接下來要做的錯誤處理
      console.log(e)
    }
    // try {
    //   //取得所有戲院資料
    //   //fetch:json-server連線的位址/json中的項目/該項目中id
    //   const response = await fetch('http://localhost:5555/cinema', {
    //     method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
    //     headers: new Headers({
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     }),
    //   })
    //   if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
    //   const jsonObject = await response.json()
    //   const cinemadatas = await jsonObject
    //   await this.setState({ cinemadatas: cinemadatas })
    //   // await console.log(cinemadatas)
    // } catch (e) {
    //   //抓到錯誤訊息，以及接下來要做的錯誤處理
    //   console.log(e)
    // }
    //產生驗證碼
    let captcha4 = new Captcha({
      //設定驗證碼樣式，如果不設定則帶入預設值)
      lineWidth: 1, //线条宽度
      lineNum: 3, //线条数量
      dotR: 2, //点的半径
      dotNum: 20, //点的数量
      preGroundColor: [255, 255], //前景色区间
      backGroundColor: [0, 120], //背景色区间
      fontSize: 24, //字体大小
      fontFamily: ['Noto Sans TC', 'Arial'], //字体类型
      fontStyle: 'stroke', //字体绘制方法，有fill和stroke
      length: 4, //验证码长度
    })
    //把生成的驗證碼丟到canvas容器中，然後callback把它(參數自訂為r)設定給state
    captcha4.draw(document.querySelector('#captcha4'), r => {
      let newstate = [...this.state.usertext]
      newstate[0].captcha = r
      console.log(r, '驗證碼')
    })
  }

  render() {
    return (
      <>
        <Card
          className="card-box text-center signcard"
          style={{ width: '600px' }}
        >
          <Card.Body className="p-5 signcard">
            {this.state.inputmsg.map(item => (
              <InputWithLabel_Su
                key={item.id}
                id={item.id}
                inputWidth={item.w}
                inputHeight={this.state.inputH}
                // inputHeight={item.h} //如果想要每個input不一樣高，則在state.inputmsg中分別下高
                inputType={item.inputType}
                inputLabel={item.inputLabel}
                iconLeft={item.iconL}
                iconLeftSize={item.iconLS}
                placeholder={item.placeholder}
                iconRight={item.iconR}
                iconRightSize={item.iconRS}
                selectOptions={item.selectOptions}
              />
            ))}
            <Row>
              <Col>
                <hr style={{ backgroundColor: '#D4D1CC' }} />
              </Col>
              <Col>以下為選填項目</Col>
              <Col>
                <hr style={{ backgroundColor: '#D4D1CC' }} />
              </Col>
            </Row>
            {this.state.chooseInputmsg.map(item => (
              <InputWithLabel_Su
                key={item.id}
                id={item.id}
                inputWidth={item.w}
                inputHeight={this.state.inputH}
                // inputHeight={item.h} //如果想要每個input不一樣高，則在state.inputmsg中分別下高
                inputType={item.inputType}
                inputLabel={item.inputLabel}
                iconLeft={item.iconL}
                iconLeftSize={item.iconLS}
                placeholder={item.placeholder}
                iconRight={item.iconR}
                iconRightSize={item.iconRS}
                selectOptions={item.selectOptions}
              />
            ))}
            {/* 這裡是驗證碼的Row -- input + canvas */}
            <Row className="my-4 d-flex justify-content-between">
              <input
                className="border border-warning rounded font-c-primary"
                style={{ background: '#1f242a' }}
                name="captchatext"
                type="text"
                placeholder="請輸入右方的驗證碼"
                onChange={this.handleInputTextChange}
              />
              <canvas width="200" height="48" id="captcha4" />
            </Row>
            <Checkbox_Su
              id="agree-cinema-rules"
              text="我已了解並同意.Movieee戲院服務條款"
              checkRemind="請確認同意服務條款"
            />
            <Button
              className="bg-warning border-0 px-5"
              onClick={this.props.handleCinemaSignup(
                this.state.usertext,
                this.state.checkok
              )}
            >
              確認送出
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default InputCardContent_CinemaSignUp
