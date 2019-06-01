import React from 'react'
import CinemaFilmEditModal from './CinemaFilmEditModal'

class MemberCollectTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputH: '48px',
            inputmsg: [],
            typeOptions: [],
            scheduleCount: [],
            thisData: 0,
            thisFilmData: 0,
            disableIdField: false,
            showModal: false,
            newDate: []
        }
    }
    async componentDidMount() {
        try {
            //取得欄位資訊
            //fetch:json-server連線的位址/json中的項目/該項目中id
            const response = await fetch(
                'http://localhost:5555/cinemaFilmEditInputMsg',
                {
                    method: 'GET', //使用GET方法獲取資訊，因為是取得資訊，故不須加body
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }),
                }
            )
            if (!response.ok) throw new Error(response.statusText) //如果發生錯誤，丟出錯誤訊息
            const jsonObject = await response.json()
            // console.log('/' + jsonObject[6].selectOptions.map(item => item.name))
            const data = await jsonObject
            await this.setState({ inputmsg: data })
            // await console.log(data)
        } catch (e) {
            //抓到錯誤訊息，以及接下來要做的錯誤處理
            console.log(e)
        }
        try {
            //取得喜愛電影類型項目
            const response = await fetch(
                'http://localhost:5555/memberFavTypeOptions',
                {
                    method: 'GET',
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }),
                }
            )
            if (!response.ok) throw new Error(response.statusText)
            const jsonObject = await response.json()
            const data = await jsonObject
            await this.setState({ typeOptions: data })
        } catch (e) {
            console.log(e)
        }

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // this.setState({ thisData: nextProps.thisData }) 這不能這樣setStae，要用下面的寫法
        let stateToBeReturned = null
        if (prevState.thisData == 0 || prevState.thisFilmData == 0) {
            stateToBeReturned = {
                ...prevState,
                thisData: nextProps.thisData,
                thisFilmData: nextProps.thisData.cinemaFilm,
            }
        }
        console.log(nextProps)
        console.log(prevState)
        console.log(stateToBeReturned)
        return stateToBeReturned
    }
    // 處理跳出視窗的關閉
    handleModalClose = () => {
        this.setState({ showModal: false })
    }

    // 處理編輯用的跳出視窗
    handleEditModalShow = id => () => {
        //用id找到該筆資料，設定到state的對應值裡去
        const item = this.state.thisFilmData.find(item => item.id === id)

        // id欄位"不可以"填寫
        // 讓跳出視窗呈現
        this.setState({
            thisData: item,
            id: item.id,
            disableIdField: true,
            showModal: true,
        })
    }
    handleInputTextChange = () => { }
    render() {
        if (this.props.thisData == 0) {
            return <></>
        }
        return (
            <>
                <CinemaFilmEditModal
                    show={this.state.showModal}
                    handleClose={this.handleModalClose}
                    inputmsg={this.state.inputmsg}
                    inputH={this.state.inputH}
                    typeOptions={this.state.typeOptions}
                    thisType={this.state.thisFilmData.type}
                    thisData={this.state.thisData}
                    scheduleCount={this.state.scheduleCount}
                    handleInputTextChange={this.handleInputTextChange}
                    // handleModalFormInputChange={this.handleModalFormInputChange}
                    // handleModalFormInputSave={this.handleModalFormInputSave}
                    // id={this.state.id}
                    // name={this.state.name}
                    // birth={this.state.birth}
                    disableIdField={this.state.disableIdField}
                />
                {this.state.thisFilmData.length == 0 ? (
                    <h5 className="text-center text-mywhite mx-auto">
                        尚無紀錄，趕快
            <a href="/article" style={{ color: '#ffa510' }}>
                            前往文章
            </a>
                        添加你的收藏吧！
          </h5>
                ) : (
                        <table class="table table-borderless text-center h5">
                            <thead>
                                <tr
                                    className="text-center"
                                    style={{ border: '2px solid #ffa510 ', color: '#ffa510' }}
                                >
                                    <th style={{ width: '60px' }}>#</th>
                                    <th scope="col-lg">中文片名</th>
                                    <th scope="col-lg">上架日期</th>
                                    <th scope="col-lg">上檔日期</th>
                                    <th scope="col-lg">下檔日期</th>
                                    <th scope="col-lg">上映狀態</th>
                                    <th scope="col-lg-1">操作</th>
                                </tr>
                            </thead>
                            <tbody className="bg-back-table text-mywhite">
                                {this.state.thisFilmData.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        style={{
                                            borderBottom: '2px solid #2B333D',
                                        }}
                                    >
                                        <th scope="row">{index + 1}</th>
                                        <td
                                            style={{
                                                borderLeft: '2px solid #2B333D',
                                                borderRight: '2px solid #2B333D',
                                                verticalAlign: 'middle'
                                            }}
                                        >
                                            {/* <a href={'/article/' + item.id}>{item.title}</a> */}
                                            {item.title}
                                        </td>
                                        <td
                                            style={{
                                                borderLeft: '2px solid #2B333D',
                                                borderRight: '2px solid #2B333D',
                                                verticalAlign: 'middle'
                                            }}
                                        >
                                            {item.updateDate}
                                        </td>
                                        <td
                                            style={{
                                                borderLeft: '2px solid #2B333D',
                                                borderRight: '2px solid #2B333D',
                                                verticalAlign: 'middle'
                                            }}
                                        >
                                            {item.inTheaterDate}
                                        </td>
                                        <td
                                            style={{
                                                borderLeft: '2px solid #2B333D',
                                                borderRight: '2px solid #2B333D',
                                                verticalAlign: 'middle'
                                            }}
                                        >
                                            {item.outTheaterDate}
                                        </td>
                                        <td
                                            style={{
                                                borderLeft: '2px solid #2B333D',
                                                borderRight: '2px solid #2B333D',
                                                verticalAlign: 'middle'
                                            }}
                                        >
                                            {+new Date() < +new Date(item.inTheaterDate) ? "未上映" :
                                                +new Date() > +new Date(item.inTheaterDate) && +new Date() < +new Date(item.outTheaterDate) ? "上映中"
                                                    : +new Date() > +new Date(item.outTheaterDate) ? "已下檔"
                                                        : ""}
                                        </td>
                                        <td
                                            style={{
                                                borderLeft: '2px solid #2B333D',
                                                borderRight: '2px solid #2B333D',
                                                verticalAlign: 'middle'
                                            }}
                                        >
                                            <button className="btn btn-outline-warning mx-2"><i class="fas fa-eye btnTableEdit"></i></button>
                                            <button className="btn btn-outline-warning mx-2" onClick={this.handleEditModalShow(item.id)}><i class="fas fa-edit btnTableEdit"></i></button>
                                            <button className="btn btn-outline-warning mx-2"><i class="fas fa-trash btnTableEdit"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </>
        )
    }
}
export default MemberCollectTable
