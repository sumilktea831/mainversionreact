import React from 'react'

const InputFile_Su = props => {
  return (
    <>
      <div
        className="custom-file border-0 rounded"
        style={{
          height: `${props.inputHeight}`,
        }}
      >
        <label
          className=" d-flex flex-nowrap"
          type="button"
          style={{
            width: `${props.inputWidth ? props.inputWidth : '100%'}`,
            height: `${props.inputHeight}`,
            background: '#1F242A',
            color: '#FFA510',
          }}
        >
          <input
            type="file"
            className="custom-file-input border-0"
            name={props.id}
            id={props.id}
            style={{
              height: `${props.inputHeight}`,
              display: 'none',
            }}
            onChange={props.onChange}
          />
          <div
            id={props.id + 'filename'}
            className="col px-0 pt-2 border border-warning rounded-left"
            style={{
              // height: `${props.inputHeight}`,
              background: '#1F242A',
              // color: '#FFA510',
            }}
          >
            這裡是檔案名稱
          </div>
          <div
            className="col-3 px-1 pt-2  border border-left-0 border-warning rounded-right"
            style={{
              height: `${props.inputHeight}`,
              background: '#1F242A',
              color: '#FFA510',
            }}
          >
            選擇檔案
          </div>
          {/* <label
            className="custom-file-label border border-warning"
            style={{
              background: '#1F242A',
              color: '#FFA510',
              height: `${props.inputHeight}`,
            }}
            htmlFor={props.id}
            data-browse=""
          >
            {props.placeholder}
          </label> */}
        </label>
      </div>
    </>
  )
}
export default InputFile_Su
