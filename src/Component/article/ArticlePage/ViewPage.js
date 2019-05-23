/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
// import './article.css';
import { BrowserRouter as Link } from 'react-router-dom';
import Goback from '../ArticleList/ArticleButton/Goback';
import {
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
  FaEye,
  FaHeart,
  FaBookmark,
} from 'react-icons/fa';

import { MdFavorite } from 'react-icons/md';

const ViewPage = props => {
  return (
    <>
      <Row className="my-5 justify-content-md-center">
        <Col md={8} sm={10}>
          <div class="mb-3 p-5">
            <div className="my-4 d-flex justify-content-center">
              <img
                src={props.pageImg}
                className=""
                style={{ width: 800 }}
                alt="..."
              />
            </div>
            <div className="row d-flex justify-content-between align-items-center">
              <h5 className="card-title">{props.title}</h5>
              {props.isMarked ? (
                <div type="" className="">
                  <FaBookmark className="mb-3 h5 text-warning" />
                </div>
              ) : (
                <div type="" className="">
                  <FaBookmark className="mb-3 h5" onClick={props.pushMarkSid} />
                </div>
              )}
            </div>
            <div className="row d-flex justify-content-between align-items-center">
              <div class="card-text">
                <small class="text-muted">{props.date}</small>{' '}
                <small class="text-muted">{props.author}</small>
              </div>
              <div className="row d-flex justify-content-between align-items-center">
                {' '}
                {props.isLiked}
                <div className="ml-3">
                  <FaHeart className="mb-1 mr-1" />
                  {props.likeCounter}
                </div>
                <div className="ml-3">
                  <FaEye className="mb-1 mr-1" />
                  {props.viewCounter}
                </div>
              </div>
            </div>
            {/* 危險的引入 innerHTML 方法 */}
            <div className="mt-3">
              <p
                class="card-text"
                dangerouslySetInnerHTML={{ __html: props.content }}
              />
            </div>
          </div>
          <Goback />
        </Col>
      </Row>
    </>
  );
};

export default ViewPage;
