import React from 'react'
import ForumArticleAvatarRoy from '../ForumArticleAvatarRoy'
import ForumArticleContentTiltleRoy from './ForumArticleContentTiltleRoy'
import ForumArticleContentDateRoy from './ForumArticleContentDateRoy'

const ForumArticleContentRoy = props => {
  return (
    <>
      <div className="d-flex">
        <ForumArticleContentTiltleRoy
          handleHeadlineEditSave={props.handleHeadlineEditSave}
          handleHeadlineEditCancel={props.handleHeadlineEditCancel}
          handleHeadlineEditKeyboardControl={
            props.handleHeadlineEditKeyboardControl
          }
          // 確認是否有點擊編輯文章標按鈕
          handleHeadlineEditTrigger={props.handleHeadlineEditTrigger}
          contentheadline={props.contentheadline}
          contentheadlineId={props.contentheadlineId}
          // 傳送是否可編輯部林值確認是否啟動編輯
          handleHeadlineEditStatus={props.handleHeadlineEditStatus}
          HeadlineEditBtnStatus={props.HeadlineEditBtnStatus}
          HeadlineSaveBtnStatus={props.HeadlineSaveBtnStatus}
          HeadlineCancelBtnStatus={props.HeadlineCancelBtnStatus}
        />
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <ForumArticleAvatarRoy
          contentUserAvatar={props.contentUserAvatar}
          contentUserName={props.contentUserName}
          // 圖片路徑前墜
          avatarPath={props.avatarPath}
          articleCreateTimeCount={props.articleCreateTimeCount}
          forumCreateTimeCount={props.forumCreateTimeCount}
        />
        <div className="">
          <div className="d-flex justify-content-end">
            <div className="justify-content-end d-flex align-items-center ml-2 mt-1 ">
              <button
                className={
                  'btn btn-outline-warning mb-3 ' + props.ArticleCancelBtnStatus
                }
                onClick={props.handleArticleEditCancel}
              >
                取消
              </button>
            </div>
            <div className="justify-content-end d-flex align-items-center ml-2 mt-1 ">
              <button
                className={
                  'btn btn-outline-warning mb-3 ' + props.ArticleEditBtnStatus
                }
                onClick={props.handleArticleEditTrigger}
              >
                編輯內文
              </button>
            </div>
            <div className="justify-content-end d-flex  align-items-center  ml-2 mt-1 ">
              <button
                className={
                  'btn btn-outline-warning mb-3 ' + props.ArticleSaveBtnStatus
                }
                onClick={props.handleArticleEditSave}
              >
                儲存
              </button>
            </div>
            <div className="justify-content-end d-flex align-items-center  ml-2 mt-1">
              <button
                className="btn btn-outline-warning mb-3 "
                onClick={props.handleArticleDelete}
              >
                刪文
              </button>
            </div>
          </div>
          <ForumArticleContentDateRoy
            contentIssueDate={props.contentIssueDate}
          />
        </div>
      </div>
      <div className="my-4">
        {/* 路徑前墜+後墜 */}
        <img
          src={props.avatarPath + props.contentArticlePic}
          className="h-100 w-100"
          alt=""
        />
      </div>
      <p
        id={'contentArticleId' + props.contentheadlineId}
        className="text-light my-4 "
        // 將文字內容tag用html方式render到頁面
        dangerouslySetInnerHTML={{ __html: props.contentReview }}
        contentEditable={props.handleArticleEditStatus}
        // 關閉警告在REACT控制範圍內變更實體DOM產生的警告
        suppressContentEditableWarning={true}
      />
    </>
  )
}

export default ForumArticleContentRoy
