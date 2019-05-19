import React from './node_modules/reacte_modules/react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonFilterRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '分類', iconType: 'fas fa-list-alt' }
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

export default ActionButtonFilterRoy
