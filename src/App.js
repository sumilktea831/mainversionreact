import React from 'react'
//Import Bootstrap,Router
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

//Import Page
import Mainpage from './page/Mainpage'
import Theater from './page/Theater'
import Movie from './page/Movie'
import Article from './page/Article'
import ArticlePage from './page/ArticlePage'
import Activity from './page/Activity'
import ActivityInfo from './page/ActivityInfo'
import ActivityJoin from './page/ActivityJoin'
import Forum from './page/Forum'
import LoginSign from './page/SignUp'
import BackMainpage from './page/BackMainpage'

//Import Component
import ScroolToTop from './component/activity/ActivityScrollToTop/ActivityScrollToTop'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      navbar: '',
      currentHeight: 0,
      prevHeight: 0,
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    const isBackmainpage = window.location.href.toString().indexOf('BackMainpage')
    if(isBackmainpage>0){this.setState({ navbar: 'active' })}
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = event => {
    let currentHeight = document.documentElement.scrollTop
    this.setState({ currentHeight: currentHeight })
    let prevHeight = this.state.prevHeight
    if (document.documentElement.scrollTop > 630) {
      this.setState({ navbar: 'active' })
      if (document.documentElement.scrollTop > 750) {
        if (currentHeight > prevHeight) {
          this.setState({ navbar: 'active hiddenNav' })
        } else {
          this.setState({ navbar: 'active showNav' })
        }
      }
    } else {
      this.setState({ navbar: '' })
    }
    prevHeight = JSON.parse(JSON.stringify(currentHeight))
    this.setState({ prevHeight: prevHeight })
    const isBackmainpage = window.location.href.toString().indexOf('BackMainpage')
    if(isBackmainpage>0){this.setState({ navbar: 'active' })}
  }
  render() {
    return (
      <Router>
        <ScroolToTop>
          <Navbar bg="light" expand="lg" className={this.state.navbar}>
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
            <Route path="/article/:id" component={ArticlePage} />
            <Route exact path="/activity/join/:id" component={ActivityJoin} />
            <Redirect from="/activity/:id/return" to="/activity/:id" />
            <Route exact path="/activity/:id" component={ActivityInfo} />
            <Route exact path="/activity" component={Activity} />
            <Route path="/forum/:id" component={Forum} />
            <Route path="/forum" component={Forum} />
            <Route path="/LoginSign" component={LoginSign} />
            <Route path="/BackMainpage" component={BackMainpage} />
          </Switch>
        </ScroolToTop>
      </Router>
    )
  }
}

export default App
