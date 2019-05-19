import React from 'react'
//Import Bootstrap,Router
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Import Pages
import Mainpage from './page/Mainpage'
import Theater from './page/Theater'
import Movie from './page/Movie'
import Article from './page/Article'
import Activity from './page/Activity'
import Forum from './page/Forum'
import LoginSign from './page/LoginSign'

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Router>
        <>
          <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
              <Navbar.Brand>.Movieee</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="d-flex justify-content-end"
              id="basic-navbar-nav"
            >
              <Nav>
                <LinkContainer to="/theater">
                  <Nav.Link className="mr-5">戲院</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/movie">
                  <Nav.Link className="mr-5">電影</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/article">
                  <Nav.Link className="mr-5">文章</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/activity">
                  <Nav.Link className="mr-5">活動</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum">
                  <Nav.Link className="mr-5">論壇</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/LoginSign">
                  <Nav.Link className="mr-5">登入</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/LoginSign">
                  <Nav.Link>註冊</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route path="/theater" component={Theater} />
            <Route path="/movie" component={Movie} />
            <Route path="/article" component={Article} />
            <Route path="/activity" component={Activity} />
            <Route path="/forum" component={Forum} />
            <Route path="/LoginSign" component={LoginSign} />
          </Switch>
        </>
      </Router>
    )
  }
}

export default App
