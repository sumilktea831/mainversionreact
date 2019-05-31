import React from 'react'

class AcitivityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regionState: ['active'],
      typeState: ['active'],
    }
  }
  handleRegionButtonOnClick = index => {
    let data = []
    if (data[index] == 'active') {
      data[index] = ''
    } else {
      data[index] = 'active'
    }
    this.setState({ regionState: data })
  }
  handleTypeButtonOnClick = index => {
    let data = []
    if (data[index] == 'active') {
      data[index] = ''
    } else {
      data[index] = 'active'
    }
    this.setState({ typeState: data })
  }
  render() {
    return (
      <>
        <form class="activityForm">
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              活動標題
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="staticEmail"
                placeholder="標題必填，最多二十五字"
                value={this.props.textValue}
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              活動圖片
            </label>
            <div class="col-sm-10 ">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="customFile"
                  style={{ background: '#1f242a' }}
                  lang="en"
                />
                <label
                  class="custom-file-label"
                  for="customFile"
                  style={{
                    background: '#1f242a',
                    border: '1px solid #ffa510',
                    color: '#ffa310b0',
                  }}
                >
                  上傳圖片
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              活動內容
            </label>
            <div class="col-sm-10">
              <textarea
                class="form-control"
                id="staticEmail"
                placeholder="內容必填，最多一百個字"
                rows="4"
                cols="50"
                value={this.props.textValue}
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
                onClick={() => this.handleRegionButtonOnClick(0)}
              >
                北部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[1]
                }
                onClick={() => this.handleRegionButtonOnClick(1)}
              >
                中部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[2]
                }
                onClick={() => this.handleRegionButtonOnClick(2)}
              >
                南部
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.regionState[3]
                }
                onClick={() => this.handleRegionButtonOnClick(3)}
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
                onClick={() => this.handleTypeButtonOnClick(0)}
              >
                影院
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[1]
                }
                onClick={() => this.handleTypeButtonOnClick(1)}
              >
                學校
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[2]
                }
                onClick={() => this.handleTypeButtonOnClick(2)}
              >
                文創園區
              </button>
              <button
                type="button"
                class={
                  'mr-3 btn btn-warning form-control w-25 btn-toggle ' +
                  this.state.typeState[3]
                }
                onClick={() => this.handleTypeButtonOnClick(3)}
              >
                咖啡廳
              </button>
            </div>
          </div>

          <div class="form-group row mt-5">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              報名資訊
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputPassword"
                placeholder="報名方式"
                value={this.props.textValue}
              />
            </div>
          </div>
          <div class="form-group row mt-5">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              報名名額
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="inputPassword"
                placeholder="報名人數"
                value={this.props.textValue}
              />
            </div>
            <div class="col-sm-10 mt-5">
              <button type="submit" class="btn btn-warning mb-2">
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
