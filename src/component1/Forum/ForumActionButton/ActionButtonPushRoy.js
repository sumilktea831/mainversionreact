import React from './node_modules/reacte_modules/react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonPushRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '按讚', iconType: 'fas fa-thumbs-up' }
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

export default ActionButtonPushRoy
