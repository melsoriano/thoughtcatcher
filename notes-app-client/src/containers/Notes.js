import React, { Component, Fragment } from 'react';
import { API, Storage } from 'aws-amplify';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './Notes.css';
import { s3Upload } from '../libs/awsLib';

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      note: null,
      content: '',
      title: '',
      attachmentURL: null,
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const note = await this.getNote();
      const { content, attachment, title } = note;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      this.setState({
        note,
        content,
        title,
        attachmentURL,
      });
    } catch (e) {
      alert(e);
    }
  }

  getNote() {
    return API.get('notes', `/notes/${this.props.match.params.id}`);
  }

  saveNote(note) {
    return API.put('notes', `/notes/${this.props.match.params.id}`, {
      body: note,
    });
  }

  deleteNote() {
    return API.del('notes', `/notes/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.content.length > 0 && this.state.title.length > 0;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, '');
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  handleSubmit = async event => {
    let attachment;

    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    this.setState({ isLoading: true });

    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }

      await this.saveNote({
        content: this.state.content,
        title: this.state.title,
        attachment: attachment || this.state.note.attachment,
      });
      this.props.history.push('/');

      // this.props.location({
      //   pathname: '/',
      //   state: { note: this.state.note },
      // });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  };

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteNote();
      this.props.history.push('/');
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="Notes">
          {this.state.note && (
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="title">
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.title}
                  componentClass="input"
                />
              </FormGroup>
              <FormGroup controlId="content">
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.content}
                  componentClass="textarea"
                />
              </FormGroup>
              {this.state.note.attachment && (
                <FormGroup>
                  <ControlLabel>Attachment</ControlLabel>
                  <FormControl.Static>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={this.state.attachmentURL}>
                      {this.formatFilename(this.state.note.attachment)}
                    </a>
                  </FormControl.Static>
                </FormGroup>
              )}
              <FormGroup controlId="file">
                {!this.state.note.attachment && (
                  <ControlLabel>Attachment</ControlLabel>
                )}
                <FormControl onChange={this.handleFileChange} type="file" />
              </FormGroup>

              <LoaderButton
                block
                bsStyle="primary"
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Save"
                loadingText="Saving…"
              />

              <LoaderButton
                block
                bsStyle="danger"
                bsSize="large"
                isLoading={this.state.isDeleting}
                onClick={this.handleDelete}
                text="Delete"
                loadingText="Deleting…"
              />
            </form>
          )}
        </div>
      </Fragment>
    );
  }
}
