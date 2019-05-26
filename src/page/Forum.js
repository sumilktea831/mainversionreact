import React from 'react'
import { Link } from 'react-router-dom'
import ForumArticleListRoy from '../component/Forum/ForumArticleList/ForumArticleListRoy'
import ForumSearchbarRoy from '../component/Forum/ForumSearchbarRoy'
import ForumArticleContentRoy from '../component/Forum/ForumArticleContent/ForumArticleContentRoy'
import ForumArticleCommentRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentRoy'
import ActionButtonCategoryRoy from '../component/Forum/ForumActionButton/ActionButtonCategoryRoy'
import ActionButtonFilterRoy from '../component/Forum/ForumActionButton/ActionButtonFilterRoy'
import ActionBtnScrollTopRoy from '../component/Forum/ForumActionButton/ActionBtnScrollTopRoy'
import ActionBtnScrollBottomRoy from '../component/Forum/ForumActionButton/ActionBtnScrollBottomRoy'
import ActionBtnCreateRoy from '../component/Forum/ForumActionButton/ActionBtnCreateRoy'
import ForumSideActionBarRoy from '../component/Forum/ForumSideActionBarRoy'
import ForumCategoryTextRoy from '../component/Forum/ForumArticleComment/ForumCategoryTextRoy'
import ForumCommentCountRoy from '../component/Forum/ForumArticleComment/ForumCommentCountRoy'
import ForumArticleCommentInputRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentInputRoy'
import ForumCommentCancelRoy from '../component/Forum/ForumArticleComment/ForumCommentCancelRoy'
import ForumCommentCreateRoy from '../component/Forum/ForumArticleComment/ForumCommentCreateRoy'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      // 用來接JSONSERVER所FETCH到的資料
      // 再didmount裡有reverse過要注意陣列索引值
      listdata: [],
      // 用來接列表點擊後當文章對應到的所有內容，用來渲染到文章內容用
      currentdata: {},
      // 用來裝留言，因為要MAP所以要用陣列方式
      currentcommentdata: [],
      // 裝params id比對成功撈出的資料
      currentdataforApi: {},
      // 發表文章光香彈出判斷
      show: false,
      imagePath: '/images/',
      forumData: [],
      id: 0,
      headline: '',
      forumSpoilers: true,
      forumViews: 0,
      forumCreateDate: '',
      forumCreateDateInSecond: 0,
      forumName: '',
      forumAvatar: '9743_2.jpg',
      forumArticlePic: '',
      forumReview: '',
      forumCommentCount: '',
      forumCommentArea: [],
      // 判斷列表是否有被點擊
      listClickChek: false,
      // 裝留言input欄位變更後站存空間，到最後在發送留言時再引入值
      commentTempStorage: '',
      // 確認留言欄是否有輸入內容當作狀態判斷讓送出按鈕控制是否要不要作用
      CommentInputStatus: false,
    }
  }

  // 上傳圖片名稱到STATE
  handleArticlePicChange = evt => {
    this.setState({ forumArticlePic: evt.target.files[0].name })
    console.log(evt.target.files[0].name.split('.')[0])
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })
      // 從JSONSERVER中抓forum這個陣列的的JSON檔
      const response = await fetch('http://localhost:5555/forum', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      if (!response.ok) throw new Error(response.statusText)

      const jsonObject = await response.json()

      await this.setState({
        // 用來下面ForumArticleListRoy渲染列表內容
        // 在這裡反轉物件順序，不要在ForumArticleListRoy MAP前用，否則每當重新渲染就會順序反過來
        listdata: jsonObject.reverse(),
        // 預設載入最新文章內容，在下面ForumArticleContentRoy元件渲染
        //帶入參數 jsonObject.length - 1為預設顯示最後一筆資料
        currentdata: jsonObject[jsonObject.length - 1],
        // 這邊重建一個留言區的陣列用來裝，直接用currentdata會有問題，
        //因為currentdata預設為物件，在MAP的時候會有問題
        currentcommentdata: jsonObject[0].forumCommentArea,
      })
      console.log(jsonObject)
      console.log(this.state.currentcommentdata)
      // 用params抓app的router id比對 listdata id相同的那筆資料，並撈出來倒進currentdataAPI
      // 提供API連接頁面用
      const currentdataAPI = this.state.listdata.find(
        item => item.id === +this.props.match.params.id
      )
      console.log(currentdataAPI)
      this.setState({
        // 若還沒有資料先撈預設最後一筆最新資料
        currentdataforApi: currentdataAPI ? currentdataAPI : jsonObject[0],
      })
      // console.log(this.state.currentdataforApi.forumCommentArea)
      // console.log(this.state.currentcommentdata)
      // console.log(this.state.currentdataforApi)
      // console.log(this.props.match)
      // console.log(this.state.listClickChek)
      // console.log(this.state.listdata[0])
    } catch (e) {
      console.log(e)
    }
  }
  // --------------------------------列表點選控制state供後續渲染文章start-------------
  // 點列表顯示頁面功能
  // element:點擊到列表的對應物件，index當個文章的索引值
  handleClick = (index, element) => {
    // 用來接列表點擊後當文章對應到的所有內容，用來渲染到文章內容ForumArticleContentRoy
    this.setState({
      currentdata: element,
      // 將當下點到的物件中的forumCommentArea留言區陣列設回去STATE
      currentcommentdata: element.forumCommentArea,
      // 將click轉為true後判斷用currentdata顯示資料造成不用刷新頁面
      listClickChek: true,
    })
    console.log(this.state.listClickChek)
  }
  // --------------------------------列表點選控制state供後續渲染文章end-------------

  // --------------------------------爆雷顯示偵測功能start------------------------
  // 爆雷偵測套餐
  handleSpoilerChange = evt => {
    // this.setState({ forumSpoilers: evt.target.checked })
    console.log(this.state.forumSpoilers)
  }
  handleSpoilerToggle = () => {
    this.setState({ forumSpoilers: !this.state.forumSpoilers })
    console.log(this.state.forumSpoilers)
  }
  // --------------------------------列表爆雷顯示偵測功能end--------------------------

  // --------------------------------留言功能start-----------------------------------
  //確認發文後沒重新導向頁面馬上按留言會有問題
  // 留言區塊onchange撈值回傳到state後再提供給handleCommentInput要送出的參數
  handleCommentInputArea = e => {
    console.log(e.target.value)
    this.setState({
      // 將textarea輸入的\n轉化成<br>，再到ForumArticleCommentRoy用dangerouslySetInnerHTML轉化tag
      commentTempStorage: e.target.value.replace(/\r\n|\r|\n/g, '<br />'),
      // 若無內容設狀態提供留言按鈕判斷
      CommentInputStatus: e.target.value === '' ? false : true,
    })
    // console.log(this.state.CommentInputStatus)
  }
  // 留言清除功能
  handleCommentInputCancel = () => {
    document.querySelector('#CommentArea').value = ''
  }
  // 留言空白警告
  handleCommentInputAreaCheck = () => {
    alert('請輸入內容')
  }
  // 留言功能，由上方控制是否啟動
  handleCommentInput = async () => {
    // 搜尋到所點擊的文章回傳的內容物件倒入onClickArticle
    const onClickArticle = this.state.listdata.find(
      item => item.id === +this.props.match.params.id
    )

    // 選取該筆文章裡面的留言區塊陣列forumCommentArea
    const onClickArticleComment = onClickArticle.forumCommentArea
    // console.log(onClickArticle)

    // 將要留言的內容倒入newComment
    // 判斷目前陣列最後一筆所帶的id是多少然後+1賦予，用index容易缺中間某筆資料造成抓做資料
    // 先用三元運算判斷是否初始留言數是否為0來排除索引值為-1的狀況
    // 如果初始無留言直接賦予forumCommentId為0+1
    const newComment = {
      forumCommentId:
        (onClickArticle.forumCommentArea.length > 0
          ? onClickArticleComment[onClickArticle.forumCommentArea.length - 1]
              .forumCommentId
          : 0) + 1,
      forumComment: this.state.commentTempStorage,
      forumCommentLike: 0,
      forumCommentDislike: 0,
      forumCommentName: 'bbc',
      forumCommentAvatar: '9743_2.jpg',
      forumCommentUserId: 0,
    }

    // 將整包要更新的內容重新打包，不能漏掉任何屬性即使沒變
    const UpdateArticle = {
      headline: onClickArticle.headline,
      forumSpoilers: onClickArticle.forumSpoilers,
      forumViews: onClickArticle.forumViews,
      forumCreateDate: onClickArticle.forumCreateDate,
      forumCreateDateInSecond: onClickArticle.forumCreateDateInSecond,
      forumName: onClickArticle.forumName,
      forumAvatar: onClickArticle.forumAvatar,
      forumArticlePic: onClickArticle.forumArticlePic,
      forumReview: onClickArticle.forumReview,
      forumCommentCount: onClickArticle.forumCommentCount,
      // 將原本的留言陣列onClickArticleComment內容展開後再把新的留言newComment加入
      forumCommentArea: [...onClickArticleComment, newComment],
    }
    // console.log(UpdateArticle.forumCommentArea)
    console.log(this.state.listdata)

    try {
      // const data = newData
      // 將更新後的文章內容包進data最後用PUT方式丟回SERVER
      const data = UpdateArticle
      // console.log(data)
      const response = await fetch(
        'http://localhost:5555/forum/' + this.props.match.params.id,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const jsonObject = await response.json()
      // console.log(jsonObject)

      // 在State中設定特定陣列中的物件，這邊一邊設定回原始listdata中比對到的forumCommentArea陣列
      await this.setState(prevState => ({
        listdata: prevState.listdata.map(obj =>
          // 比對當下指定到的文章
          obj.id === +this.props.match.params.id
            ? Object.assign(obj, {
                forumCommentArea: UpdateArticle.forumCommentArea,
              })
            : obj
        ),
      }))
      // 同時設定新留言到用來渲染留言的currentcommentdata state
      await this.setState(
        { currentcommentdata: UpdateArticle.forumCommentArea },
        () => {
          // 發文後後把留言內容清掉
          document.querySelector('#CommentArea').value = ''
          alert('留言成功!')
          // this.handleClose()
          // console.log(this.state.listdata)
          // window.location.href = '/forum/'
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
  // --------------------------------留言功能end-----------------------------------

  // --------------------------------發文功能start-----------------------------------
  // 對應跳出視窗的表單的欄位變動，這是一種常見的使用方式
  // ，讓下層元件保持為函式型元件，仍然是有表單可控元件
  // 不過onChange與state會寫在上層元件中
  handleModalFormInputChange = event => {
    let value = event.target.value
    const name = event.target.name

    // 創造ID
    // 注意：id(學號)與生日，需先轉為數字類型再進入state中
    if (name === 'id' || name === 'birth') value = +value

    this.setState({ [name]: value })
  }

  // 新增文章modal  toggle用
  handleClose = () => {
    this.setState({ show: false })
  }
  // 新增文章modal  toggle用
  handleShow = () => {
    this.setState({ show: true })
  }

  // 發送文章
  handleModalFormInputSave = async () => {
    // 簡單的檢查部份

    if (this.state.headline.trim() === '') {
      alert('請輸入標題!')
      return
    }
    if (this.state.forumReview.trim() === '') {
      alert('請輸入評論!')
      return
    }

    // 處理新增資料的儲存
    // 先檢查學號是否重覆
    // const index = this.state.listdata.findIndex(
    //   item => item.id === this.state.id
    // )

    // if (index > -1) {
    //   alert('學號已存在!')
    //   return
    // }

    // 處理新增的儲存
    const item = {
      id: this.state.listdata[0].id + 1,
      headline: this.state.headline,
      forumSpoilers: this.state.forumSpoilers,
      forumViews: this.state.forumViews,
      // 發文當下時間2019/5/20 23:59:40 先設時區格式chinese，再給第二參數設定24時制
      // 不要用formSubmit自動抓時間，送出會為空值，在這裡直接給值
      forumCreateDate: new Date().toLocaleString('chinese', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      // 發文當下距離1970總秒數，用一元正字或可用new Date().getTime()
      forumCreateDateInSecond: +new Date(),
      forumName: this.state.forumName ? this.state.forumName : 'Jack',
      forumAvatar: this.state.forumAvatar,
      forumArticlePic: this.state.forumArticlePic,
      // 將textarea輸入的\n轉化成<br>，再到ForumArticleContentRoy用dangerouslySetInnerHTML轉化tag
      forumReview: this.state.forumReview.replace(/\r\n|\r|\n/g, '<br />'),
      forumCommentCount: this.state.forumCommentCount,
      forumCommentArea: this.state.forumCommentArea,
    }
    console.log(this.state.listdata[0].id)
    const newData = [item, ...this.state.listdata]

    try {
      const data = item

      const response = await fetch('http://localhost:5555/forum', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      const jsonObject = await response.json()

      console.log(jsonObject)

      await this.setState({ listdata: newData }, () => {
        alert('資料已成功新增!')
        this.handleClose()
        console.log(this.state.listdata)
        // 送出表單後重新導向最新一筆頁面
        window.location.href = '/forum/' + this.state.listdata[0].id
      })
    } catch (e) {
      console.log(e)
    }
  }
  // --------------------------------發文功能end-----------------------------------
  // handleArticleDelete = id => {
  //   const newData = this.state.listdata
  //   console.log(newData)
  //   // this.setState({ listdata: newData }, () => {
  //   //   alert('資料已成功刪除!')
  //   // })
  // }

  render() {
    return (
      <>
        <div
          className="container-fuild justify-content-center"
          style={{ marginTop: '120px' }}
        >
          <div className="row justify-content-center ">
            <div className="col-3 mr-4 p-0 ">
              <div className="">
                <ActionBtnCreateRoy
                  onClick={this.handleShow}
                  onhide={this.handleClose}
                  show={this.state.show}
                  handleModalFormInputChange={this.handleModalFormInputChange}
                  handleModalFormInputSave={this.handleModalFormInputSave}
                  forumName={this.state.forumName}
                  headline={this.state.headline}
                  forumReview={this.state.forumReview}
                  forumSpoilers={this.state.forumSpoilers}
                  // 爆雷公能，兩個handle都必須同時要有
                  handleSpoilerToggle={this.handleSpoilerToggle}
                  handleSpoilerChange={this.handleSpoilerChange}
                  // 上傳圖片
                  forumArticlePic={this.state.forumArticlePic}
                  handleArticlePicChange={this.handleArticlePicChange}
                />
                <div className="my-4">
                  <ForumSearchbarRoy />
                </div>
                <div className="d-flex mb-3">
                  <ActionButtonCategoryRoy />
                  <div className=" ml-3">
                    <ActionButtonFilterRoy />
                  </div>
                </div>
                <ActionBtnScrollTopRoy />
                {/* 將陣列倒入COMPINET，用MAP的方式，記得設定KEY */}
                {/* 同時撈將各index */}
                {this.state.listdata.map((element, index) => (
                  <Link
                    to={'/forum/' + element.id}
                    // hover無底線
                    className="text-decoration-none"
                  >
                    {/* {console.log(element)} */}
                    <ForumArticleListRoy
                      //MAP之所在，KEY之所在
                      key={element.id}
                      listheadline={element.headline}
                      listforumSpoilers={element.forumSpoilers}
                      listforumViews={element.forumViews}
                      listforumCreateDate={element.forumCreateDate}
                      listforumName={element.forumName}
                      listforumAvatar={element.forumAvatar}
                      // 用bind綁定偵測點擊當下的element之index，並傳入handleClick得到index值
                      // click後將listClickChek state轉為true
                      onClick={this.handleClick.bind(this, index, element)}
                      // 圖像路徑開頭
                      avatarPath={this.state.imagePath}
                    />
                  </Link>
                ))}
                <ActionBtnScrollBottomRoy />
              </div>
            </div>
            <div className="col-7 ml-4">
              <div className="row m-0 p-0">
                <div className="col-12  p-5 border border-dark">
                  {/* <button
                    onClick={this.handleArticleDelete(
                      this.props.match.params.id
                    )}
                  >
                    刪除
                  </button> */}
                  <ForumArticleContentRoy
                    // 將點擊文章列表後所產生的物件中的值傳下去，同時更新文章內容
                    // 檢查是否有點擊上方ForumArticleListRoy列表
                    // 並在handleClick裡將listClickChek轉成true，用link方式重新render則會再回到false
                    // 有就用FETCH到的資料RENDER，如果是用LINK方式判斷FALSE就用params判斷id後所倒入的另一個state撈資料
                    // currentdataforApi為params倒入的state
                    // currentdata為click倒入的state
                    contentheadline={
                      this.state.listClickChek
                        ? this.state.currentdata.headline
                        : this.state.currentdataforApi.headline
                    }
                    contentUserAvatar={
                      this.state.listClickChek
                        ? this.state.currentdata.forumAvatar
                        : this.state.currentdataforApi.forumAvatar
                    }
                    contentUserName={
                      this.state.listClickChek
                        ? this.state.currentdata.forumName
                        : this.state.currentdataforApi.forumName
                    }
                    contentIssueDate={
                      this.state.listClickChek
                        ? this.state.currentdata.forumCreateDate
                        : this.state.currentdataforApi.forumCreateDate
                    }
                    contentReview={
                      this.state.listClickChek
                        ? this.state.currentdata.forumReview
                        : this.state.currentdataforApi.forumReview
                    }
                    contentArticlePic={
                      this.state.listClickChek
                        ? this.state.currentdata.forumArticlePic
                        : this.state.currentdataforApi.forumArticlePic
                    }
                    // 圖片路徑前墜
                    avatarPath={this.state.imagePath}
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-12 p-5 border border-dark">
                  <div className="d-flex ">
                    <div className="">
                      <ForumCategoryTextRoy />
                    </div>
                    <div className="mx-5">
                      <ForumCommentCountRoy
                        // 計算該篇文章下面留言數量
                        commentCount={this.state.currentcommentdata.length}
                      />
                    </div>
                  </div>
                  {/* 待確認 */}
                  {this.state.currentcommentdata.map((e, index) => (
                    <ForumArticleCommentRoy
                      // map要用陣列，先建立一個陣列裝對應當篇文章下面的留言
                      key={e.forumCommentId}
                      commentComment={e.forumComment}
                      commentLike={e.forumCommentLike}
                      commentDislike={e.forumCommentDislike}
                      commentUserName={e.forumCommentName}
                      commentAvatar={e.forumCommentAvatar}
                      // 圖片路徑前墜
                      avatarPath={this.state.imagePath}
                    />
                  ))}
                  <div className="mt-5">
                    <ForumArticleCommentInputRoy
                      handleCommentInputArea={this.handleCommentInputArea}
                    />
                  </div>
                  <div className="my-4 d-flex justify-content-end">
                    <div className="mx-4">
                      <ForumCommentCancelRoy
                        // 留言清除輸入內容
                        handleCommentInputCancel={this.handleCommentInputCancel}
                      />
                    </div>
                    <ForumCommentCreateRoy
                      handleCommentInput={
                        // 確認handleCommentInputArea有沒有輸入內容有再觸發送出否則警告
                        this.state.CommentInputStatus
                          ? this.handleCommentInput
                          : this.handleCommentInputAreaCheck
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="px-3 py-4 rounded border border-warning position-fixed"
          style={{ right: 0, top: '25vh' }}
        >
          <ForumSideActionBarRoy />
        </div>
      </>
    )
  }
}

export default Forum
