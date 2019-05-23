import React from 'react'
//多選專用，回傳值為一個陣列checkitems[]
const CheckboxMulti_Su = props => {
  return (
    <>
      <div class="form-check my-4">
        <input
          name='checkitems[]'
          class="form-check-input mr-3 my-0"
          type="checkbox"
          value={props.id}
          id={props.id}
          style={{ height: '100%' }}
          required
        />
        <label class="form-check-label" for={props.id}>
          {props.text}
        </label>
        <div class="invalid-feedback">{props.checkRemind}</div>
      </div>
    </>
  )
}

export default CheckboxMulti_Su
