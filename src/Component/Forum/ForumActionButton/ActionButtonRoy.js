import React from './node_modules/react'

const ActionButtonRoy = props => (
  <button type="button" className="btn btn-warning px-3">
    <i className={props.buttonIcon}> {props.buttonText}</i>
  </button>
)

export default ActionButtonRoy
