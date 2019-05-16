import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import styled from 'styled-components';
import { mixins, media } from '../styles';
import { Grommet, Box, Text } from 'grommet';
import { Auth } from 'aws-amplify';
import { Clock } from 'grommet-icons';
import { ResponsiveGrid } from '../components/ResponsiveGrid';

const ButtonContainer = styled.div`
  ${mixins.flexCenter};
  ${media.thone`flex-flow: column wrap;`};
  a {
    ${mixins.button};
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: [],
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const notes = await this.notes();

      this.setState({
        notes,
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return API.get('notes', '/notes');
  }

  renderLanding() {
    return (
      <Box>
        <ButtonContainer>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </ButtonContainer>
      </Box>
    );
  }

  handleLogout = async () => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
    this.props.history.push('/');
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    const { notes } = this.state;

    return !this.props.isAuthenticated
      ? this.renderLanding()
      : !this.state.isLoading && (
          <Grommet full={true}>
            <Box
              direction="row"
              align="center"
              justify="center"
              pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Box
                direction="row"
                width="100%"
                align="center"
                justify="between">
                <Link to="/">thoughtcatcher</Link>
                <Link to="/" onClick={this.handleLogout}>
                  logout
                </Link>
              </Box>
            </Box>
            <ResponsiveGrid>
              <Box
                background="#D2EFFE"
                round="3px"
                width="95%"
                pad="xsmall"
                margin="small"
                responsive={true}
                align="center"
                justify="center">
                <Link to="notes/new">Create New</Link>
              </Box>
              {notes &&
                notes.map((note, i) => (
                  <Box
                    key={i}
                    background="#D2EFFE"
                    round="3px"
                    width="95%"
                    pad="xsmall"
                    margin="small"
                    responsive={true}>
                    <Link to={`notes/${note.notesId}`}>
                      <Box>
                        <Text size="medium">{note.title}</Text>
                        <Text size="small">
                          <Clock size="12px" />{' '}
                          {new Date(note.createdAt).toLocaleString()}
                        </Text>
                        <Box>
                          <Text truncate={true} size="small">
                            {note.content}
                          </Text>
                        </Box>
                      </Box>
                    </Link>
                  </Box>
                ))}
            </ResponsiveGrid>
          </Grommet>
        );
  }
}

export default Home;
