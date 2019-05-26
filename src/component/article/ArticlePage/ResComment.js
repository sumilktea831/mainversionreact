import React from 'react'

const ResComment = props => {
  return (
    <>
      <div className="row justify-content-end">
        <div className="col-md-8">
          <div class="media">
            <img src="..." class="mr-3" alt="..." />
            <div class="media-body">
              <div class="mt-0 col">
                <div>{props.author}</div>
                <div>{props.date}</div>
              </div>
              {props.content}
              <div class="media mt-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResComment
