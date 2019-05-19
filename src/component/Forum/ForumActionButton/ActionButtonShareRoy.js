import React from './node_modules/reacte_modules/react'
import ActionButton from './ActionButtonRoy'

class ActionButtonShareRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '分享', iconType: 'fas fa-share-square' }
  }

  render() {
    return (
      <>
        <ActionButton
          variant="outline-success"
          buttonText={this.state.buttonType}
          buttonIcon={this.state.iconType}
        />
      </>
    )
  }
}

export default ActionButtonShareRoy
