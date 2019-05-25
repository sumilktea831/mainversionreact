import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './article.css';
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
} from 'react-icons/fa';
import { BrowserRouter as Link } from 'react-router-dom';
import ReadMore from './ArticleList/ArticleButton/ReadMore';
import ArticleLike from './ArticleList/ArticleButton/Like';
import ArticleMark from './ArticleList/ArticleButton/Mark';
import ArticleShare from './ArticleList/ArticleButton/Share';
import ArticleComment from './ArticleList/ArticleButton/Comment';
// const memberId = '4';
// const CardImd = require('./background.jpeg/' + props.cardImg);
const ArticleCard = props => {
  // console.log(props.markSid);
  return (
    <>
      <Row className="my-3">
        <Col className="justify-content-center" xs={12} md={9}>
          <div className="mb-3 article-card">
            {props.isMarked ? (
              <div type="" className="">
                <FaBookmark className="mr-1 righ-mark text-warning" />
              </div>
            ) : (
              <div type="" className="">
                <FaBookmark className="mr-1 righ-mark" />
              </div>
            )}
            {/* <div>memberId = {props.markSid} true</div> */}
            <div className="row no-gutters">
              <div className="col-md-4 article_pic d-flex justify-content-center">
                <img src={props.cardImg} className="img56 card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {/* 設定標題字串只取前28個字 */}
                    {props.cardTitle.substr(0, 28) + ''}
                  </h5>
                  <span className="">
                    {/*.replace(/(<([^>]+)>)/ig,"")
                   設定內容字串，replace HTML 標籤，且只取前100個字，並加上'.......' */}
                    {props.cardText
                      .replace(/(<([^>]+)>)/gi, '')
                      .substr(0, 160) + '......'}
                  </span>
                  <ReadMore sid={props.sid} />
                  <div className="btn-mygroup d-flex justify-content-end">
                    <ArticleMark onClick={props.handleMark} />
                    <ArticleShare />
                    <ArticleLike />
                    <ArticleComment />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ArticleCard;
