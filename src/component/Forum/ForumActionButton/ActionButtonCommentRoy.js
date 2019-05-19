import React from 'react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonCommentRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '留言', iconType: 'fas fa-comment-alt' }
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

export default ActionButtonCommentRoy
