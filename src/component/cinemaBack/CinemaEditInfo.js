import React from 'react'
import InputWithLabelForEdit_Su from '../inputs/InputWithLabelForEdit_Su'
import CheckboxMultiSu from '../inputs/CheckboxMultiSu'
import ActivityTitle from '../activity/ActivityTitle/ActivityTitle'
import { Row } from 'react-bootstrap'

class CinemaEditInfo extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      originData: {},
      thisData: 0,
      checkok: {
        cinemaTaxid: true,
        cinemaName: true,
        cinemaArea: true,
        cinemaAddress: true,
        cinemaPhone: true,
        cinemaBackupEmail: true,
        // cinemaType: true,
        // cinemaAccount: true,
        // cinemaPassword: true,
        // cinemaRepwd: true,
      },
    }
  }

  async componentDidMount() {
    //若不設定，切換頁面再回來會無資料
    const data = await this.props.thisData
    await this.setState({ thisData: data })
    // try {
    //   //取得喜愛電影類型項目
    //   const response = await fetch(
    //     'http://localhost:5555/memberFavTypeOptions',
    //     {
    //       method: 'GET',
    //       headers: new Headers({
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       }),
    //     }
    //   )
    //   if (!response.ok) throw new Error(response.statusText)
    //   const jsonObject = await response.json()
    //   const data = await jsonObject
    //   await this.setState({ favTypeOptions: data })
    // } catch (e) {
    //   console.log(e)
    // }
  }
  componentWillReceiveProps() {
    //若不設定，當頁刷新會無資料
    // console.log(this.state.thisData == 0)
    if (this.state.thisData == 0) {
      //如果state中的資料為空(設定""或{}無效，必須是0)，則將props資料設定給state
      this.setState({ thisData: this.props.thisData })
    }
    this.setState({ originData: this.props.thisData })
  }

  //儲存按鈕onclick
  handleSaveInfo = () => {
    let cinemaid = this.state.thisData.id
    let isAllChecked = true
    let checkArray = Object.values(this.state.checkok)
    isAllChecked = checkArray.reduce((a, b) => a && b)
    console.log('isAllChecked: ' + isAllChecked)
    if (isAllChecked) {
      try {
        fetch('http://localhost:5555/cinema/' + cinemaid, {
          method: 'PUT',
          body: JSON.stringify(this.state.thisData),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(jsonObject => {
            this.setState({ thisData: jsonObject }, () => {
              alert('資料儲存成功')
              window.location.reload()
            })
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      alert('資料填寫有誤，請再次確認您的資料！')
    }
  }

  //輸入框change事件
  handleInputTextChange = event => {
    console.log(event.target)
    // console.log(this.state.thisData)
    console.log(event.target.value)
    console.log(event.target.name)
    console.log('text: ' + event.target.text)
    let id = event.target.id
    let value = event.target.value
    let eventName = event.target.name
    let copyData = { ...this.state.thisData }
    let AllCinemaExpectThis = this.props.allCinemaData.filter(
      item => item !== this.state.originData
    )
    // console.log(AllCinemaExpectThis)
    let newcheckstate = { ...this.state.checkok }
    // console.log(copyData)
    let taxid_pattern = /^\d{8}$/
    let phone_pattern = /^0\d{1,2}\-\d{3,4}\-\d{4}$/
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    let url_pattern = /[a-zA-z]+:\/\/[^s]*/

    //戲院名稱驗證:格式、是否已被使用
    if (eventName === 'cinemaName') {
      newcheckstate.cinemaName = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷字元數 > 2
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入最少兩個字元'
        } else {
          //判斷暱稱是否重複使用，先從所有資料中篩選出除了該筆會員的資料，再來進行比對
          let cinemaexisted = AllCinemaExpectThis.find(
            item => item.cinemaName === value
          )
          if (cinemaexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '名稱已被使用'
          } else {
            console.log(value)
            newcheckstate.cinemaName = true
            this.setState({ checkok: newcheckstate })
            document.querySelector('#' + eventName + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML =
          '名稱不能為空白'
      }
      console.log(newcheckstate)
    }
    //統編驗證:格式、是否存在
    if (eventName === 'cinemaTaxid') {
      newcheckstate.cinemaTaxid = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(taxid_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = taxid_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的統一編號'
        } else {
          //格式正確，再比對是否已存在
          let taxidexisted = AllCinemaExpectThis.find(
            item => item.cinemaTaxid === value
          )

          if (taxidexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '統一編號已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaTaxid = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //電話驗證:格式、是否存在
    if (eventName === 'cinemaPhone') {
      newcheckstate.cinemaPhone = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(phone_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = phone_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的電話號碼'
        } else {
          //格式正確，再比對是否已存在
          let phoneexisted = AllCinemaExpectThis.find(
            item => item.cinemaTaxid === value
          )
          if (phoneexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '電話已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaPhone = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //地址驗證:格式、是否與所在縣市相同
    if (eventName === 'cinemaAddress') {
      newcheckstate.cinemaAddress = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 11) {
          //判斷是否字元數 < 11 (至少=縣市:3、行政區:3、路名:3、號碼:2)
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的地址'
        } else {
          //判斷地址與所在縣市是否相同
          // console.log(value)
          let city = this.state.thisData.cinemaCity
          if (city !== '尚未選擇縣市' && city !== '') {
            if (value.substr(0, 3) === city) {
              //相同則回傳
              newcheckstate.cinemaAddress = true
              this.setState({ checkok: newcheckstate })
              document.querySelector('#' + eventName + 'help').innerHTML = ''
            } else {
              //不同則跳出提示
              document.querySelector('#' + eventName + 'help').innerHTML =
                '地址與您的所在縣市不相符，請再次確認'
            }
          } else {
            newcheckstate.cinemaAddress = true
            document.querySelector('#' + eventName + 'help').innerHTML = ''
          }
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //戲院行政區驗證:格式
    if (eventName === 'cinemaArea') {
      newcheckstate.cinemaArea = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷

        if (value.length < 2) {
          //判斷是否字元數 < 2
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的行政區域'
        } else {
          newcheckstate.cinemaArea = true
          this.setState({ checkok: newcheckstate })
          document.querySelector('#' + eventName + 'help').innerHTML = ''
        }
      } else {
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //email驗證:格式、是否存在
    if (eventName === 'cinemaBackupEmail') {
      newcheckstate.cinemaBackupEmail = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(email_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = email_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的Email'
        } else {
          //格式正確，再比對是否已存在
          let emailexisted =
            this.props.allCinemaData.find(item => item.cinemaEmail === value) ||
            this.props.allCinemaData.find(
              item => item.cinemaBackupEmail === value
            )
          if (emailexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              'Email已被使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaBackupEmail = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }
    //官方網站url驗證:格式、是否存在
    if (eventName === 'cinemaWeb') {
      newcheckstate.cinemaWeb = false //先將check狀態回復到false
      this.setState({ checkok: newcheckstate })
      console.log(url_pattern.test(value))
      if (value) {
        //先判斷是否有值，有值再進行進一步判斷
        let check = url_pattern.test(value) //格式驗證
        if (!check) {
          //驗證格式是否正確
          document.querySelector('#' + eventName + 'help').innerHTML =
            '請輸入正確的網址'
        } else {
          //格式正確，再比對是否已存在
          let urlexisted = AllCinemaExpectThis.find(
            item => item.cinemaWeb === value
          )
          if (urlexisted) {
            document.querySelector('#' + eventName + 'help').innerHTML =
              '網址重複使用'
          } else {
            //如果正確且不重複，則將check狀態改為true，並清空提示
            newcheckstate.cinemaWeb = true
            this.setState(
              { checkok: newcheckstate },
              () =>
                (document.querySelector('#' + eventName + 'help').innerHTML =
                  '')
            )
          }
        }
      } else {
        //如果沒值也清空提示
        document.querySelector('#' + eventName + 'help').innerHTML = ''
      }
      console.log(newcheckstate)
    }

    //判斷如果拿到的name屬於state裡面的屬性，就把剛才複製的state的該項目更新，然後再setState回
    if (
      eventName === 'cinemaName' ||
      eventName === 'cinemaTaxid' ||
      eventName === 'cinemaArea' ||
      eventName === 'cinemaAddress' ||
      eventName === 'cinemaPhone' ||
      eventName === 'cinemaBackupEmail' ||
      eventName === 'cinemaWeb'
      // name === 'cinemaLogoImg' ||
      // name === 'cinemaHeroImg' ||
    ) {
      copyData[eventName] = value
      this.setState({ thisData: copyData })
    } else if (eventName === 'cinemaType') {
      copyData[eventName] = event.target.id
      this.setState({ thisData: copyData }, () =>
        console.log(this.state.thisData)
      )
    } else if (eventName === 'cinemaCity') {
      console.log(event.target.selectedIndex) //被選取的option的index
      let selectedIndex = event.target.selectedIndex
      copyData[eventName] = event.target.options[selectedIndex].text //被選取的option的文字內容
      this.setState({ thisData: copyData }, () =>
        console.log(this.state.thisData)
      )
    } else if (eventName === 'cinemaImg' || eventName === 'cinemaHeroImg') {
      console.log(event.target.files[0])
      console.log(event.target.files[0].name)

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
          console.log(obj)
          if (obj.success == true) {
            copyData[eventName] = obj.filename
            this.setState({ thisData: copyData }, () =>
              console.log(this.state.thisData)
            )
            document.querySelector(
              '#' + eventName + 'filename'
            ).innerHTML = uploadFileName
          } else {
            copyData[eventName] = ''
            this.setState({ thisData: copyData }, () =>
              console.log(this.state.thisData)
            )
            document.querySelector('#' + eventName + 'filename').innerHTML =
              obj.info
          }
        })
    }
  }

  render() {
    return (
      <>
        <Row>
          <div className="col-lg-7 mt-3 h5">
            {this.props.cinemaEditInputmsg.map(item => (
              <>
                <InputWithLabelForEdit_Su
                  key={item.id}
                  id={item.id}
                  inputWidth={item.w}
                  inputHeight='48px'
                  inputType={item.inputType}
                  inputLabel={item.inputLabel}
                  iconLeft={item.iconL}
                  iconLeftSize={item.iconLS}
                  placeholder={item.placeholder}
                  iconRight={item.iconR}
                  iconRightSize={item.iconRS}
                  selectOptions={item.selectOptions}
                  onChange={this.handleInputTextChange}
                  col="col-2"
                  thisData={this.state.thisData}
                  multiple={item.multiple ? true : false}
                />
                <small
                  id={item.id + 'help'}
                  className="form-text  text-danger text-center"
                />
              </>
            ))}
          </div>
          <div className="col-lg-5 mt-3 bg-primary">
            這裡放頭像(含編輯按鈕)、email、權限
          </div>
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <button
            className="btn btn-warning h5 my-3 px-5 py-2 border-0 rounded bg-orange text-darkblue"
            // style=
            onClick={this.handleSaveInfo}
          >
            儲存變更
          </button>
        </Row>
      </>
    )
  }
}

export default CinemaEditInfo
