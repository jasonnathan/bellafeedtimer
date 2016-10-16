import React, {
  PropTypes, Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Page, Toolbar, Row, Col
} from 'react-onsenui';
import {
  startRecording, stopRecording
} from '../Actions/currentSession.js';
import RecordButton from './RecordButton.jsx';
import RecordingList from './RecordingList.jsx';

class MainPage extends Component {
  constructor( props ) {
    super( props );
    this.onRecordClick = this.onRecordClick.bind(this);
  }

  onRecordClick( event ){
    const position = event.currentTarget.id.replace( "record", "" ).toUpperCase(),
      dispatch = this.props.dispatch;

    let cs = this.props.currentSession || {};

    if(cs.recording){
      dispatch(stopRecording( cs._id ));
    }

    return !cs.recording || cs.position !== position ? dispatch(startRecording( position )) : false;
  }

  isRecording( position ) {
    let cs = this.props.currentSession.recording;
    return cs ? cs.position === position : false;
  }

  get debugText() {
    const {currentSession} = this.props;
      return currentSession
        ? JSON.stringify(currentSession, null, 2 ) + "\nNumber of sessions: " + this.props.counts.sessions + "\nTotal Duration: " + this.props.counts.duration
        : "";
  }

  renderToolbar() {
    return (
      <Toolbar> <div className="center">Bella Feed Timer</div> </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <Row style={{paddingTop:'10px'}}>
          <Col verticalAlign="center" className="mainButtonContainer left">
            <RecordButton handler={this.onRecordClick} position="LEFT" />
          </Col>
          <Col>&nbsp;</Col>
          <Col verticalAlign="center" className="mainButtonContainer right">
            <RecordButton handler={this.onRecordClick} position="RIGHT" />
          </Col>
        </Row>
        <RecordingList navigator={this.navigator} />
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
    currentSession: state.currentSession,
    counts: state.currentDay.counts
  };
};

export default connect(mapStateToProps)(MainPage);
