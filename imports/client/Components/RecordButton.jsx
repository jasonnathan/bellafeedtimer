import React, {PropTypes, Component} from 'react';
import {Button, Icon} from 'react-onsenui';
import { connect } from 'react-redux';
import {updateRecordingDuration} from '../Actions/currentSession.js';

class RecordButton extends Component {
    constructor(props) {
      super(props);
      this.handler = this.props.handler.bind(this);
      this.interval = 0;
    }
    componentWillUnmount(){
      clearInterval(this.interval);
    }
    tick(){
      if(this.props.recording){
        if(this.interval <= 0)
          this.interval = setInterval(() => this.props.dispatch(updateRecordingDuration()), 1e3);
      } else {
        clearInterval(this.interval);
        this.interval = 0;
      }
    }
    get elementId(){
      return this.props.position === "LEFT" ? "recordLeft" : "recordRight";
    }
    get elementText(){
      return this.props.position === "LEFT" ? "Left" : "Right";
    }
    render() {
        this.tick();
        return this.props.recording ?
          <Button
            onClick={this.handler}
            id={this.elementId}
            className="recordButton recording"
            modifier="outline large"
            ripple
          >
            <Icon icon="ion-stop" className="recordingIcon" />
            <small className="properCase">{this.props.durationText}</small>
          </Button>
         :
        (
          <Button
            onClick={this.handler}
            id={this.elementId}
            className="recordButton"
            modifier="outline large"
            ripple
          >
            <img src="/feed-left.svg" height="50px" alt={"Record " + this.elementText + " Feed"} />
            <small>{this.elementText}</small>
          </Button>
        )
    }
}

RecordButton.propTypes = {
    recording: PropTypes.bool,
    position: PropTypes.string,
    handler: PropTypes.func,
    dispatch: PropTypes.func,
    durationText: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  let cs = state.currentSession;
  return {
    durationText: cs.durationText,
    recording: cs.recording && cs.position === ownProps.position
  };
};

export default connect(mapStateToProps)(RecordButton);
