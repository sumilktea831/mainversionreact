import React from 'react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonFollowRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '跟隨', iconType: 'fas fa-user-alt' }
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

export default ActionButtonFollowRoy
