import React from './node_modules/reacte_modules/react'
import ActionButtonRoy from './ActionButtonRoy'

class ActionButtonReportRoy extends React.Component {
  constructor() {
    super()
    this.state = { buttonType: '檢舉', iconType: 'fas fa-flag' }
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

export default ActionButtonReportRoy
