import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Routes from './Routes';
import { Navbar, Main } from './styles';

const NavLinkContainer = styled.div`
  display: flex;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticatind: true,
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push('/login');
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      !this.state.isAuthenticating && (
        <Main>
          <GlobalStyle />
          <Navbar>
            <NavLinkContainer className="nav-links">
              <Link to="/">thoughtcatcher</Link>
            </NavLinkContainer>
            {this.state.isAuthenticated ? (
              <Link onClick={this.handleLogout} to="/logout">
                Logout
              </Link>
            ) : (
              <NavLinkContainer className="nav-links">
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </NavLinkContainer>
            )}
          </Navbar>
          <Fragment />
          <Routes childProps={childProps} />
        </Main>
      )
    );
  }
}

export default withRouter(App);
