import React from './node_modules/reacte_modules/react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonSaveRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '收藏', iconType: 'fas fa-bookmark' }
  }

  render() {
    return (
      <>
        <ActionButtonRoy
          variant="outline-success"
          buttonText={this.state.buttonType}
          buttonIcon={this.state.iconType}
        />
      </>
    )
  }
}

export default ActionButtonSaveRoy
