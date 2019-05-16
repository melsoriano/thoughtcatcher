import React, { Component, Fragment } from 'react';
import { Grommet } from 'grommet';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import GlobalStyle from './styles/GlobalStyle';
import Routes from './Routes';

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
