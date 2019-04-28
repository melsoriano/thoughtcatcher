import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import styled from 'styled-components';
import { theme, mixins, media } from '../styles';
const { fontSizes } = theme;

const ButtonContainer = styled.div`
  ${mixins.flexCenter};
  ${media.thone`flex-flow: column wrap;`};
  a {
    ${mixins.button};
  }
`;

const PageHeader = styled.h2`
  display: flex;
`;

const ListGroup = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListGroupItem = styled.li`
  display: flex;
`;

const Subtitle = styled.h2`
  font-size: ${fontSizes.xxlarge};
  text-align: center;
  padding: 20px;
  ${media.phablet`font-size:${fontSizes.h1}`};
`;

export default class Home extends Component {
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
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return API.get('notes', '/notes');
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <Link key={note.notesId} to={`/notes/${note.notesId}`}>
          <ListGroupItem>
            {note.content.trim().split('\n')[0] +
              'Created: ' +
              new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        </Link>
      ) : (
        <Link key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{'\uFF0B'}</b> Create a new note
            </h4>
          </ListGroupItem>
        </Link>
      )
    );
  }

  renderLanding() {
    return (
      <div>
        <Subtitle>Jot down your brilliant ideas.</Subtitle>
        <ButtonContainer>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </ButtonContainer>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return this.props.isAuthenticated
      ? this.renderNotes()
      : this.renderLanding();
  }
}
