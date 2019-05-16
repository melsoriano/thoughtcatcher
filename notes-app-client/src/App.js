import React, { Component, Fragment } from 'react';
import { Grommet, Box, Grid } from 'grommet';
import { withRouter, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Routes from './Routes';
import { theme, media, mixins } from './styles';
import Logo from './assets/logo.png';
const { fonts, colors, transition } = theme;

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
  -webkit-text-stroke-color: ${colors.navyBlue};
  -moz-text-stroke-color: ${colors.navyBlue};
  color: transparent;
  transition: ${transition};
  ${media.tablet`font-size: 38px;`}
  ${media.phablet`font-size: 35px;`};
  ${media.phone`font-size: 28px;`};

  &.title-shadow {
    text-shadow: 4px 4px ${colors.salmonPinkRGB};
    ${media.tablet`text-shadow: 2px 2px ${
      colors.salmonPinkRGB
    };  -webkit-text-stroke-width: 2px;
  -moz-text-stroke-width: 2px;`};
  }

  &.title-shadow:hover {
    text-shadow: 0px 0px ${colors.salmonPinkRGB};
    animation: cubic-bezier(0.075, 0.82, 0.165, 1);
    transition: 200ms ease-in;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      isEditing: false,
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

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      isEditing: this.state.isEditing,
    };
    return (
      !this.state.isAuthenticating && (
        <Grommet>
          <GlobalStyle />
          <Fragment>
            <Routes childProps={childProps} />
          </Fragment>
        </Grommet>
      )
    );
  }
}

export default withRouter(App);
