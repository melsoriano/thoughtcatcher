import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Routes from './Routes';
import { theme, media, mixins, Navbar, Main, Section } from './styles';
import Logo from './assets/logo.png';
const { fonts, fontSizes, colors, transition } = theme;

const LoggedInNavbar = styled.div`
  width: 100%;
  ${mixins.flexBetween};
  ${media.tablet`${mixins.flexEnd};`}

  img {
    min-width: 40px;
    width: 8%;
    ${media.tablet`width: 12%;`};
    ${media.phone`width: 20%;`};
  }
  p {
    display: inline-block;
    ${media.phablet`display:none;`};
  }
`;

const LoggedOutNavbar = styled.div`
  ${mixins.flexCenter};
  text-align: center;
  img {
    width: 15%;
  }
`;

const Title = styled.h1`
  font-family: ${fonts.Rubik};
  font-size: 60px;
  -webkit-text-stroke-width: 3px;
  -moz-text-stroke-width: 3px;
  -webkit-text-stroke-color: ${colors.brown};
  -moz-text-stroke-color: ${colors.brown};
  color: transparent;
  transition: ${transition};
  ${media.tablet`font-size: 38px;`}
  ${media.phablet`font-size: 35px;`};
  ${media.phone`font-size: 28px;`};

  &.title-shadow {
    text-shadow: 4px 4px ${colors.orangeRGB};
    ${media.tablet`text-shadow: 2px 2px ${
      colors.orangeRGB
    };  -webkit-text-stroke-width: 2px;
  -moz-text-stroke-width: 2px;`};
  }

  &.title-shadow:hover {
    text-shadow: 0px 0px ${colors.orangeRGB};
    animation: cubic-bezier(0.075, 0.82, 0.165, 1);
    transition: 200ms ease-in;
  }
`;

const SmallTitle = styled.div`
  font-family: ${fonts.Rubik};
  font-size: ${fontSizes.xxlarge};
  color: ${colors.brown};
  &:hover {
    color: ${colors.orange};
    transition: ${transition};
  }
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
    this.props.history.push('/');
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
            {this.state.isAuthenticated ? (
              <LoggedInNavbar className="Loggedin-Nav">
                <Link to="/">
                  <SmallTitle>
                    <p>thought</p>
                    <img src={Logo} alt="logo" className="logo" />
                    <p>catcher</p>
                  </SmallTitle>
                </Link>

                <Link onClick={this.handleLogout} to="/logout">
                  Logout
                </Link>
              </LoggedInNavbar>
            ) : (
              <LoggedOutNavbar className="Loggedout-Nav">
                <Link to="/">
                  <Title className="title-shadow">
                    thought
                    <img src={Logo} alt="logo" className="logo" />
                    catcher
                  </Title>
                </Link>
              </LoggedOutNavbar>
            )}
          </Navbar>
          <Section>
            <Fragment />
          </Section>
          <Routes childProps={childProps} />
        </Main>
      )
    );
  }
}

export default withRouter(App);
