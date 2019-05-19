import React from './node_modules/react'
import ForumArticleAvatarRoy from '../ForumArticleAvatarRoy'
import ForumArticleCommentThumbRoy from './ForumArticleCommentThumbRoy'

const ForumArticleCommentAreaRoy = () => {
  return (
    <>
      <div className="d-flex my-4 justify-content-between align-items-end">
        <ForumArticleAvatarRoy />
        <ForumArticleCommentThumbRoy />
      </div>
      <div className="text-light ">
        <p className="m-0">
          這部電影其實就是在看人生的現實與無奈，如何一點一滴的蠶食瑟基普魯尼這個年輕的靈魂。以這個角度來看，史蒂芬康托這部紀錄片拍得很成功，因為觀眾可以在這不到90分鐘的電影裡，深刻了解瑟基普魯尼這個人的性格、他的抉擇，還有他的迷惘和傷痛。就訪談內容來看，他的家人未必能夠完全了解為何他在前途一片光明時會自毀前程，也並不了解他目前在經歷的人生關卡，反而是他的兩位皇家芭蕾學院同窗更能體會他從一個鄉下男孩，一路努力走向舞台，且終於在鎂光燈下大放異彩，卻人事已非的那種無能為力。從他兼具力與美的舞姿來看，瑟基普魯尼的確是舞台上令人神往的「優雅的野獸」，只不過在他眉宇間的那股漠然和迷惘之中，他或許仍然只是一隻「誤闖叢林的小白兔」。
        </p>
      </div>
    </>
  )
}

export default ForumArticleCommentAreaRoy
