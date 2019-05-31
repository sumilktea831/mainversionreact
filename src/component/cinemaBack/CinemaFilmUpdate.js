import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import InputWithLabel_Su from '../inputs/InputWithLabel_Su'
import CheckboxMultiSu from '../inputs/CheckboxMultiSu'
import ActivityTitle from '../activity/ActivityTitle/ActivityTitle'

class CinemaFilmUpdate extends React.Component {
  constructor() {
    super()
    this.state = {
      inputH: '48px', //設定所有input高
      inputmsg: [],
      favTypeOptions: [],
      usertext:
      {
        id: '',
        title: '',
        titleEn: '',
        movie_rating: '',
        imgSrc: '',
        type: '',
        director: '',
        langauge: '',
        intro: '',
        fullIntro: '',
        filmTime: '',
        updateDate: '',
        inTheaterDate: '',
        outTheaterDate: '',
        schedule: [],
        filmStar: [],
        isagreed: false,
      },

      checkok: {
        //儲存格式驗證是否通過
        cinemaEmail: false,
        cinemaTaxid: false,
        cinemaName: false,
        cinemaArea: false,
        cinemaAddress: false,
        cinemaPhone: false,
        cinemaType: false,
        cinemaAccount: false,
        cinemaPassword: false,
        cinemaRepwd: false,
      },
    }
  }
  async componentDidMount() {
    try {
      //取得欄位資訊
      //fetch:json-server連線的位址/json中的項目/該項目中id
      const response = await fetch(
        'http://localhost:5555/cinemaFilmEditInputMsg',
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
      //取得喜愛電影類型項目
      const response = await fetch(
        'http://localhost:5555/memberFavTypeOptions',
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      if (!response.ok) throw new Error(response.statusText)
      const jsonObject = await response.json()
      const data = await jsonObject
      await this.setState({ favTypeOptions: data })
    } catch (e) {
      console.log(e)
    }

  }
  //輸入框onchange事件
  handleInputTextChange = event => {
    let value = event.target.value //拿到value
    let name = event.target.name //拿到input的name
    let newtext = { ...this.state.usertext } //先複製出要改變的state
    let newcheckstate = { ...this.state.checkok } //先複製出要改變的state


    //account驗證:格式、是否存在
    if (name === 'cinemaAccount') {
      newcheckstate.cinemaAccount = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        if (value.length < 2) {
          //驗證格式是否正確
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入開頭為英文，且總共至少6個字元的英數組合'
        } else {
          //格式正確，再比對是否已存在
          let accountexisted = this.props.cinemadata.find(
            item => item.cinemaAccount === value
          )
          if (accountexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '此帳號已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaAccount = true
            this.setState(
              { checkok: newcheckstate },
              () => (document.querySelector('#' + name + 'help').innerHTML = '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }

    //戲院名稱驗證:格式、是否已被使用
    if (name === 'cinemaName') {
      newcheckstate.cinemaName = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷字元數 > 2
          document.querySelector('#' + name + 'help').innerHTML =
            '請輸入最少兩個字元'
        } else {
          let cinemaexisted = this.props.cinemadata.find(
            item => item.cinemaName === value
          )
          if (cinemaexisted) {
            document.querySelector('#' + name + 'help').innerHTML =
              '名稱已被使用'
          } else {
            // console.log(value)
            newcheckstate.cinemaName = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + name + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + name + 'help').innerHTML = ''
      }
      // console.log(newcheckstate)
    }


    //判斷如果拿到的name屬於state裡面的屬性，就把剛才複製的state的該項目更新，然後再setState回去
    if (
      name === 'title' ||
      name === 'titleEn' ||
      name === 'director' ||
      name === 'intro' ||
      name === 'fullIntro' ||
      name === 'filmTime' ||
      name === 'inTheaterDate' ||
      name === 'outTheaterDate'
    ) {
      newtext[name] = value
      this.setState({ usertext: newtext })
    } else if (name === 'movie_rating' || name === 'language') {
      //if是所在縣市
      let selectedIndex = event.target.selectedIndex
      newtext[name] = event.target.options[selectedIndex].text
      this.setState({ usertext: newtext }, () => {
        console.log(this.state.usertext)
      })
    } else if (name === 'cinemaCity') {
      // console.log(event.target.selectedIndex) //被選取的option的index
      let selectedIndex = event.target.selectedIndex
      newtext[name] = event.target.options[selectedIndex].text //被選取的option的文字內容
      this.setState({ usertext: newtext }, () =>
        console.log(this.state.usertext)
      )
    } else if (name === 'imgSrc') {
      // console.log(event.target.files[0])
      // console.log(event.target.files[0].name)

      var file = event.target.files[0]
      var uploadFileName = event.target.files[0].name
      let formdata = new FormData()
      formdata.append('myfile', file)
      fetch('http://localhost:3001/api/cinema-upload-single', {
        method: 'POST',
        body: formdata,
      })
        .then(res => res.json())
        .then(obj => {
          // console.log(obj)
          if (obj.success == true) {
            newtext[name] = obj.filename
            this.setState({ usertext: newtext }, () =>
              console.log(this.state.usertext)
            )
            document.querySelector(
              '#' + name + 'filename'
            ).innerHTML = uploadFileName
          } else {
            newtext[name] = ''
            this.setState({ usertext: newtext }, () =>
              console.log(this.state.usertext)
            )
            document.querySelector('#' + name + 'filename').innerHTML = obj.info
          }
        })
    } else if (name === 'type') {
      //if是喜愛類型
      let favTypeOptionAll = [...this.state.favTypeOptions] //複製所有喜愛類型
      let AlloptionName = Object.values(favTypeOptionAll.map(item => item.name)) //篩出所有類型的中文name
      let newFavType = [...this.state.thisfavType] //複製原本的喜愛類型
      //取出該選項喜愛類型的name(中文字)
      let optionName = this.state.favTypeOptions.filter(
        item => item.id === value
      )[0].name
      console.log('optionname: ' + optionName)
      console.log('checked: ' + event.target.checked)
      console.log('value: ' + event.target.value)
      if (event.target.checked == false) {
        //點選之後checked狀態會先變，故原本已勾選的選項，會判斷是false
        //將該選項從喜愛類型中過濾掉，同時設定給copyData
        if (optionName === '全選') {
          newFavType = []
          this.setState({ thisfavType: newFavType })
        } else {
          if (newFavType.find(item => item == '全選')) {
            newFavType = newFavType.filter(item => item !== '全選')
          }
          newFavType = newFavType.filter(item => item !== optionName)
          console.log('newFavType: ' + newFavType)
          this.setState({ thisfavType: newFavType })
        }
        newtext[name] = newFavType
      } else {
        //將該選項加入喜愛類型中，同時設定給copyData
        if (optionName === '全選') {
          //取得除了全選以外的所有喜愛項目[{},{},...]
          // let favTypeOptionWithoutAll = [...this.state.favTypeOptions].filter(item => item.id !== value)
          //=====>結果不能這樣，必須把全選也放入才能判定全選的check狀態
          //故先複製所有類型選項(包含全選)===>拉到一開始宣告
          // let favTypeOptionAll = [...this.state.favTypeOptions]
          //再從取得的陣列中，取出每一個物件item中的name的value===>拉到一開始宣告
          // let AlloptionName = Object.values(favTypeOptionAll.map(item => item.name))
          console.log(AlloptionName)
          newFavType = AlloptionName
        } else {
          newFavType.push(optionName)
          console.log('newFavType22: ' + newFavType)
          console.log(AlloptionName.filter(item => item !== '全選'))
          if (newFavType.length == AlloptionName.length - 1) {
            newFavType.push('全選')
          }
        }
        this.setState({ thisfavType: newFavType })
        newtext[name] = newFavType
      }
    }
  }
  render() {
    return (
      <>
        <Row>
          <div className="col-lg-5 mt-3 h5">
            {this.state.inputmsg.map(item => (
              <>
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
                  onChange={this.handleInputTextChange}
                />
                <small id={item.id + 'help'} class="form-text text-danger " />
              </>
            ))}
          </div>
          <div className="col-lg-7 my-4 h5">
            <p className="h5 my-4">影片摘要</p>
            <textarea
              name="intro"
              className="border border-warning bg-back-input rounded text-orange"
              placeholder="請輸入影片簡介..."
              style={{
                width: '100%',
                height: '200px',
              }}
              onChange={this.handleInputTextChange}
            />
            <p className="h5 my-4">影片介紹</p>
            <textarea
              name="fullIntro"
              className="border border-warning bg-back-input rounded text-orange"
              placeholder="請輸入影片完整內容介紹..."
              style={{
                width: '100%',
                height: '200px',
              }}
              onChange={this.handleInputTextChange}
            // cols="50"
            // rows="5"
            />
          </div>
        </Row>
        <div className="row mt-5 mb-3">
          <div className="col-md-12 p-0">
            <ActivityTitle title={'影片類型'} className="content-title" />
          </div>
        </div>
        <Row>
          {this.state.favTypeOptions.map(item => (
            <CheckboxMultiSu
              thisData={this.state.thisData}
              inputName="fav_type"
              optionId={item.id}
              optionName={item.name}
              thisfavType={this.state.thisfavType}
              onChange={this.handleInputTextChange}
            />
          ))}
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <Button
            className="btn btn-warning border-0 px-5"
          // onClick={this.props.handleCinemaSignup(
          //   this.state.usertext,
          //   this.state.checkok
          // )}
          >
            確認送出
        </Button>
        </Row>
      </>
    )
  }
}

export default CinemaFilmUpdate
