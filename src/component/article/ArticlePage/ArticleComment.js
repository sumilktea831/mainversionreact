import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ResComment from './ResComment'

class ArticleComment extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/articleComment', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <Row className="my-3 justify-content-md-center">
          <Col md={8} sm={12} className="box-shadow">
            <div className="col-md-8 text-left my-3">
              <h4 className="text-light">網友評論</h4>
            </div>
            <div class="media">
              <img src="..." class="mr-3" alt="..." />
              <div class="media-body">
                <div class="mt-0 col">
                  <div>{this.props.author}</div>
                  <div>{this.props.date}</div>
                </div>
                {this.props.content}
                <div class="media mt-3" />
              </div>
            </div>
            {this.props.res.map((item, index) => (
              <>
                <ResComment
                  key={index}
                  author={item.author}
                  date={item.date}
                  content={item.content}
                />
              </>
            ))}
          </Col>
        </Row>
      </>
    )
  }
}

export default ArticleComment
