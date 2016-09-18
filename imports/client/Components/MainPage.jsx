import React, { PropTypes, Component } from 'react';
import { Page, Toolbar, Row, Col } from 'react-onsenui';
import { connect } from 'react-redux';
import { startRecording, stopRecording } from '../Actions/currentSession.js';
import RecordButton from './RecordButton.jsx';

class MainPage extends Component {
  constructor( props ) {
    super( props );
    this.onRecordClick = this.onRecordClick.bind(this);
  }
  onRecordClick(event){
    let currentSession = this.props.currentSession,
      position = event.currentTarget.id.replace( "record", "" ).toUpperCase(),
      dispatch = this.props.dispatch;

    currentSession = currentSession.recording
      ? currentSession
      : false;

    if ( currentSession ) {
      dispatch(stopRecording( currentSession._id ));

      if ( currentSession.position === position )
        return;
    }

    return dispatch(startRecording( position ));
  }

  isRecording( position ) {
    let cs = this.props.currentSession.recording;
    return cs
      ? cs.position === position
      : false;
  }
  renderToolbar( ) {
    return (
      <Toolbar>
        <div className="center">Bella Feed Timer</div>
      </Toolbar>
    );
  }

  render( ) {
    const {currentSession} = this.props,
      text = currentSession
        ? JSON.stringify(currentSession, null, 2 ) + "\nNumber of sessions: "
        : "";
    return (
      <Page renderToolbar={this.renderToolbar}>
        <Row style={{ minHeight: '100px'}}>
          <Col verticalAlign="center" className="mainButtonContainer left">
            <RecordButton
              handler={this.onRecordClick}
              position="LEFT"
            />
          </Col>
          <Col>&nbsp;</Col>
          <Col verticalAlign="center" className="mainButtonContainer right">
            <RecordButton
              handler={this.onRecordClick}
              position="RIGHT"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <RecordingList navigator={this.navigator} /> */}
            <pre style={{padding: '1rem'}}>
              <small>{text}</small>
            </pre>
          </Col>
        </Row>
      </Page>
    );
  }
}

MainPage.propTypes = {
  currentSession: PropTypes.object,
  dispatch: PropTypes.func,
  subscribe: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currentSession: state.currentSession
  };
};

export default connect(mapStateToProps)(MainPage)
