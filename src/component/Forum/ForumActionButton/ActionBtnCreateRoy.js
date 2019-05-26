import React from 'react'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'

const ActionBtnCreateRoy = props => (
  <>
    <button
      variant="primary"
      className="btn btn-warning  w-100"
      onClick={props.onClick}
    >
      發表評論
    </button>

    <Modal show={props.show} onHide={props.onhide} centered>
      <Modal.Header closeButton className="bg-dark border-0">
        <Modal.Title>
          {/* 學生資料 {props.disableIdField ? '編輯' : '新增'} */}
          發表評論
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark border-0 ">
        <InputGroup className="mb-2 ">
          <InputGroup.Prepend style={{ width: '90px' }}>
            <InputGroup.Text className="w-100 " id="inputGroup-sizing-default">
              標題
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="headline"
            value={props.headline}
            onChange={props.handleModalFormInputChange}
          />
        </InputGroup>
        {/* <br /> */}
        <InputGroup className="mb-2 border-0" hidden>
          <InputGroup.Prepend style={{ width: '90px' }}>
            <InputGroup.Text className="w-100" id="inputGroup-sizing-default">
              發文者
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="hidden"
            name="forumName"
            value={props.forumName}
            onChange={props.handleModalFormInputChange}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-2">
          <InputGroup.Prepend style={{ width: '90px' }}>
            <InputGroup.Text>評論內容</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            name="forumReview"
            aria-label="With textarea"
            style={{ height: '100px' }}
            onChange={props.handleModalFormInputChange}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-2">
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              // 要先反轉check
              checked={!props.forumSpoilers}
              // 爆雷偵測套餐
              onChange={props.handleSpoilerChange}
              onClick={props.handleSpoilerToggle}
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label="Text input with checkbox"
            placeholder="是否爆雷"
            // value={props.forumSpoilers}
          />
        </InputGroup>
        <br />
        <div class="mb-2 custom-file border-0 rounded">
          <input
            type="file"
            class="custom-file-input border-0"
            name="forumArticlePic"
            onChange={props.handleArticlePicChange}
          />
          <label class="custom-file-label border border-warning" />
        </div>
        <br />
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0 ">
        <Button variant="secondary btn-warning" onClick={props.onhide}>
          關閉
        </Button>
        <Button
          variant="primary btn-warning"
          onClick={props.handleModalFormInputSave}
        >
          發送
        </Button>
      </Modal.Footer>
    </Modal>
  </>
)

export default ActionBtnCreateRoy
