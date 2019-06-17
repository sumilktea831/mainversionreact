import React from 'react'
import { Row } from 'react-bootstrap'
const handleClick = id => event => {
  let thisRadio = document.querySelector('#' + id)
  let RadiosBtn = [...document.getElementsByName('radio-btn')]
  //   console.log(thisRadio)
  //   console.log(RadiosBtn)

  thisRadio.click()
  RadiosBtn.map(
    btn =>
      (btn.className =
        'px-2 position-absolute rounded border border-warning bg-darkblue text-mywhite mytransition5')
  )
  event.target.className =
    'px-2 position-absolute rounded border border-warning bg-orange text-darkblue mytransition5'
}
const InputRadio_Su = props => {
  return (
    <>
      <Row className="mx-0 px-0 col-lg-12 d-flex justify-content-between align-items-center">
        {props.selectOptions.map(item => (
          <React.Fragment
            key={item.id}
          >
            <div
              className={
                'custom-control custom-radio custom-control-inline mx-0 pr-0 ' +
                (props.col ? props.col : 'col-lg-2')
              }
              style={{
                height: `${props.inputHeight}`,
              }}
            >
              <input
                type="radio"
                id={item.id}
                name={props.id}
                onChange={props.onChange}
                className="custom-control-input"
                display="none"
              />

              <label className="custom-control-label" htmlFor={item.id} />
              {props.value === item.id ? (
                <button
                  name="radio-btn"
                  className="px-2 position-absolute rounded border border-warning bg-orange text-darkblue mytransition5"
                  style={{
                    width: `${props.inputWidth ? props.inputWidth : '100%'}`,
                    height: `${props.inputHeight}`,
                    left: '-1px',
                  }}
                  onClick={handleClick(`${item.id}`)}
                >
                  {item.name}
                </button>
              ) : (
                <button
                  name="radio-btn"
                  className="px-2 position-absolute rounded border border-warning bg-darkblue text-mywhite mytransition5"
                  style={{
                    width: `${props.inputWidth ? props.inputWidth : '100%'}`,
                    height: `${props.inputHeight}`,
                    left: '-1px',
                  }}
                  onClick={handleClick(`${item.id}`)}
                >
                  {item.name}
                </button>
              )}
              {/* <button
                name="radio-btn"
                className="px-2 position-absolute rounded border border-warning bg-darkblue text-mywhite"
                style={{
                  width: `${props.inputWidth ? props.inputWidth : '100%'}`,
                  height: `${props.inputHeight}`,
                  left: '-1px',
                }}
                onClick={handleClick(`${item.id}`)}
              >
                {item.name}
              </button> */}
            </div>
          </React.Fragment>
        ))}
      </Row>
    </>
  )
}

export default InputRadio_Su
