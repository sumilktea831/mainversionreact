import React from 'react'

class MessageBoardInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textAreaValue: '',
    }
  }

  handleChange = event => {
    console.log(event.target)
    this.setState({ textAreaValue: event.target.value })
  }

  handleSave = () => {
    this.props.MessageBoardSave(this.state.textAreaValue)
    this.setState({ textAreaValue: '' })
  }
  render() {
    return (
      <>
        <div class="form-group">
          <label for="exampleFormControlTextarea1" style={{ fontSize: '25px' }}>
            發表評論
          </label>
          <textarea
            onChange={this.handleChange}
            value={this.state.textAreaValue}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.handleSave}
          >
            送出
          </button>
        </div>
      </>
    )
  }
}
export default MessageBoardInput
