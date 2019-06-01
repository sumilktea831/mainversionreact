import React from 'react'

class AcitivityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regionState: ['active'],
      typeState: ['active'],
      formData: {},
      type: [],
      file: '',
    }
  }

  componentDidMount = () => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    this.setState({ type: ['北部', '影院'] })
    data.type = '北部,影院'
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  handleRegionButtonOnClick = (index, keyword) => {
    //
    let stateData = []
    if (stateData[index] == 'active') {
      stateData[index] = ''
    } else {
      stateData[index] = 'active'
    }
    this.setState({ regionState: stateData })

    //
    let typeData = JSON.parse(JSON.stringify(this.state.type))
    typeData[0] = keyword
    this.setState({ type: typeData }, () => {
      //
      let typeDataToString = JSON.parse(
        JSON.stringify(this.state.type)
      ).toString()

      let data = JSON.parse(JSON.stringify(this.state.formData))
      data.type = typeDataToString
      this.setState({ formData: data }, () => console.log(this.state.formData))
    })
  }
  handleTypeButtonOnClick = (index, keyword) => {
    //
    let stateData = []
    if (stateData[index] == 'active') {
      stateData[index] = ''
    } else {
      stateData[index] = 'active'
    }
    this.setState({ typeState: stateData })

    //
    let typeData = JSON.parse(JSON.stringify(this.state.type))
    typeData[1] = keyword
    this.setState({ type: typeData }, () => {
      //
      let typeDataToString = JSON.parse(
        JSON.stringify(this.state.type)
      ).toString()

      let data = JSON.parse(JSON.stringify(this.state.formData))
      data.type = typeDataToString
      this.setState({ formData: data }, () => console.log(this.state.formData))
    })
  }

  inputTitleOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.title = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  inputImgOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.imgSrc = event.target.files[0].name
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  inputContentOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.content = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  inputjoinContentOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.joinContent = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }
  inputjoinContentCurrentPeopleOnChange = event => {
    const data = JSON.parse(JSON.stringify(this.state.formData))
    data.joinContentCurrentPeople = event.target.value
    this.setState({ formData: data }, () => console.log(this.state.formData))
  }

  render() {
    return (
      <>
        <form class="activityForm">
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">
              活動標題
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                placeholder="標題必填，最多二十五字"
                value={this.state.formData.title}
                onChange={event => this.inputTitleOnChange(event)}
                required
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label class="col-sm-2 col-form-label">活動圖片</label>
            <div class="col-sm-10 ">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="imgSrc"
                  name="imgSrc"
                  style={{ background: '#1f242a' }}
                  onChange={event => this.inputImgOnChange(event)}
                  required
                />
                <label
                  class="custom-file-label"
                  for="imgSrc"
                  style={{
                    background: '#1f242a',
                    border: '1px solid #ffa510',
                    color: '#ffa310b0',
                  }}
                >
                  {this.state.formData.imgSrc
                    ? this.state.formData.imgSrc
                    : '上傳圖片'}
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="content" class="col-sm-2 col-form-label">
              活動內容
            </label>
            <div class="col-sm-10">
              <textarea
                class="form-control"
                id="content"
                name="content"
                placeholder="內容必填，最多一百個字"
                rows="4"
                cols="50"
                value={this.props.textValue}
                onChange={event => this.inputContentOnChange(event)}
                required
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              活動地區
            </label>
            <div class="col-sm-10">
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[0]
                }
                onClick={() => this.handleRegionButtonOnClick(0, '北部')}
              >
                北部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[1]
                }
                onClick={() => this.handleRegionButtonOnClick(1, '中部')}
              >
                中部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[2]
                }
                onClick={() => this.handleRegionButtonOnClick(2, '南部')}
              >
                南部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[3]
                }
                onClick={() => this.handleRegionButtonOnClick(3, '東部')}
              >
                東部
              </button>
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              場所類型
            </label>
            <div class="col-sm-10">
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[0]
                }
                onClick={() => this.handleTypeButtonOnClick(0, '影院')}
              >
                影院
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[1]
                }
                onClick={() => this.handleTypeButtonOnClick(1, '學校')}
              >
                學校
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[2]
                }
                onClick={() => this.handleTypeButtonOnClick(2, '文創園區')}
              >
                文創園區
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[3]
                }
                onClick={() => this.handleTypeButtonOnClick(3, '咖啡廳')}
              >
                咖啡廳
              </button>
            </div>
          </div>

          <div class="form-group row mt-5">
            <label for="joinContent" class="col-sm-2 col-form-label">
              報名資訊
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="joinContent"
                name="joinContent"
                placeholder="報名方式"
                value={this.props.textValue}
                onChange={event => this.inputjoinContentOnChange(event)}
                required
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label
              for="joinContentCurrentPeople"
              class="col-sm-2 col-form-label"
            >
              報名名額
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="joinContentCurrentPeople"
                name="joinContentCurrentPeople"
                placeholder="報名人數"
                value={this.props.textValue}
                onChange={event =>
                  this.inputjoinContentCurrentPeopleOnChange(event)
                }
                required
              />
            </div>
            <div class="col-sm-10 mt-5">
              <button
                type="button"
                onClick={this.sendFile}
                class="btn btn-warning mb-2"
              >
                新增活動
              </button>
            </div>
          </div>
        </form>
      </>
    )
  }
}

export default AcitivityForm
