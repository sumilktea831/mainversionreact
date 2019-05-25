import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CardKagaStar from './CardKagaStar'
import CardKagaStaAnimation from './CardKagaStaAnimation'

// 上層傳遞參數
// id={props.id}
// title={props.title}
// subtitle={props.subtitle}
// star={props.star} // "starId":"m123","star":5}
// mark={props.mark}
// member={props.member}
const memberId = 'm123'
class CardKagaEditToAreaButton extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            id: props.id,
            show: false,
            nowStar: '',
            viewStar: '',
            updateStar: '',
            markText: '',
        }
    }
    componentDidMount() {
        // 星星進廠處理
        let propsData = this.props.star
        let dataStar = { starId: '', star: '' }
        propsData.map(item => {
            if (item.starId === memberId) {
                dataStar.starId = item.starId
                dataStar.star = item.star
            }
            return item
        })

        // 初始mark設定
        console.log(this.props)
        const markProps = this.props.mark
        let markData = { markId: '', markContent: '' }
        markProps.map(item => {
            if (item.markId === this.props.id) {
                markData.markId = item.markId
                markData.markContent = item.markContent
            }
            return item
        })
        this.setState({ markText: markData.markContent })

        // 初始state 設定
        this.setState({
            nowStar: dataStar.star,
            viewStar: dataStar.star,
            updateStar: dataStar.star,
        })
    }
    //mouseOver
    mouseOver1 = () => {
        this.setState({ viewStar: 1 })
    }
    mouseOver2 = () => {
        this.setState({ viewStar: 2 })
    }
    mouseOver3 = () => {
        this.setState({ viewStar: 3 })
    }
    mouseOver4 = () => {
        this.setState({ viewStar: 4 })
    }
    mouseOver5 = () => {
        this.setState({ viewStar: 5 })
    }
    //Click
    Click1 = () => {
        this.setState({ nowStar: 1, viewStar: 1, updateStar: 1 })
    }
    Click2 = () => {
        this.setState({ nowStar: 2, viewStar: 2, updateStar: 2 })
    }
    Click3 = () => {
        this.setState({ nowStar: 3, viewStar: 3, updateStar: 3 })
    }
    Click4 = () => {
        this.setState({ nowStar: 4, viewStar: 4, updateStar: 4 })
    }
    Click5 = () => {
        this.setState({ nowStar: 5, viewStar: 5, updateStar: 5 })
    }
    //mouseOut
    mouseOut = () => {
        let now = this.state.nowStar
        this.setState({ viewStar: now })
    }

    //modal
    handleClose = () => {
        this.setState({ show: false })
    }

    //要在多偷渡一個會員ＩＤ回去
    handleSave = () => {
        let toUserData = {
            star: { starId: memberId, star: this.state.updateStar },
            mark: { markId: this.props.id, markContent: this.state.markText },
        }
        this.props.newStarAndMark(toUserData)
        this.setState({ show: false })
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    handleChange = event => {
        this.setState({ markText: event.target.value })
    }
    render() {
        return this.props.member ? (
            // 會員版 可以編輯
            <>
                {/* 按鈕 */}
                <Button variant="primary" onClick={this.handleShow}>
                    查看編輯
                </Button>

                {/* 彈出視窗 */}
                <Modal
                    size="sm"
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton className="bg-dark border-0">
                        {/* 下面標題 */}
                        <div className="flex-column">
                            <h3 className="mt-3">{this.props.title}</h3>
                            <h5>{this.props.subtitle}</h5>
                            <div style={{ fontSize: '30px' }} className="mt-4">
                                {this.props.starAmimation ? (
                                    <CardKagaStaAnimation
                                        view={this.state.viewStar}
                                        mouseOver1={this.mouseOver1}
                                        mouseOver2={this.mouseOver2}
                                        mouseOver3={this.mouseOver3}
                                        mouseOver4={this.mouseOver4}
                                        mouseOver5={this.mouseOver5}
                                        Click1={this.Click1}
                                        Click2={this.Click2}
                                        Click3={this.Click3}
                                        Click4={this.Click4}
                                        Click5={this.Click5}
                                        mouseOut={this.mouseOut}
                                    />
                                ) : (
                                    <CardKagaStar star={this.state.viewStar} />
                                )}
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="bg-dark">
                        <div className="border-bottom border-light">
                            <h4 className="text-light">註記</h4>
                        </div>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                as="textarea"
                                rows="3"
                                onChange={this.handleChange}
                                value={this.state.markText}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark border-0 justify-content-center">
                        <Button variant="secondary" onClick={this.handleClose}>
                            離開
                        </Button>
                        {/* 按鈕 */}
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={this.handleSavet}
                        >
                            儲存
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        ) : (
            // 非會員 不能編輯
            <>
                {/* 按鈕 */}
                <Button variant="primary" onClick={this.handleShow}>
                    查看編輯
                </Button>

                {/* 彈出視窗 */}
                <Modal
                    size="sm"
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton className="bg-dark border-0">
                        {/* 下面標題 */}
                        <div className="flex-column">
                            <h3 className="mt-3">{this.props.title}</h3>
                            <h5>{this.props.subtitle}</h5>
                            <div style={{ fontSize: '30px' }} className="mt-4">
                                {this.props.starAmimation ? (
                                    <CardKagaStaAnimation
                                        view={this.state.viewStar}
                                        mouseOver1={this.mouseOver1}
                                        mouseOver2={this.mouseOver2}
                                        mouseOver3={this.mouseOver3}
                                        mouseOver4={this.mouseOver4}
                                        mouseOver5={this.mouseOver5}
                                        Click1={this.Click1}
                                        Click2={this.Click2}
                                        Click3={this.Click3}
                                        Click4={this.Click4}
                                        Click5={this.Click5}
                                        mouseOut={this.mouseOut}
                                    />
                                ) : (
                                    <CardKagaStar star={this.state.viewStar} />
                                )}
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="bg-dark">
                        <div className="border-bottom border-light">
                            <h4 className="text-light">註記</h4>
                        </div>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                as="textarea"
                                rows="3"
                                onChange={this.handleChange}
                                value={this.state.markText}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark border-0 justify-content-center">
                        <Button variant="secondary" onClick={this.handleClose}>
                            離開
                        </Button>
                        {/* 按鈕 */}
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={this.handleSave}
                        >
                            儲存
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default CardKagaEditToAreaButton
