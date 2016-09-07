import React, {PropTypes} from 'react';
import {Button, Icon} from 'react-onsenui';

export default class RecordButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = props;
      this.handler = this.props.handler.bind(this);
    }

    render() {
        let elementId = this.props.position === "LEFT"
            ? "recordLeft"
            : "recordRight";
        let elementText = this.props.position === "LEFT"
            ? "Left"
            : "Right";
        return this.props.recording ?
          <Button onClick={this.handler} id={elementId} className="recordButton recording" modifier="outline large" ripple>
            <Icon icon="ion-stop" className="recordingIcon" />
            <small className="properCase">{this.props.duration}</small>
          </Button>
         :
        (
          <Button onClick={this.props.handler} id={elementId} className="recordButton" modifier="outline large" ripple>
            <img src="/feed-left.svg" height="50px" alt={"Record " + elementText + " Feed"} />
            <small>{elementText}</small>
          </Button>
        )
    }
}

RecordButton.propTypes = {
    duration: PropTypes.string,
    recording: PropTypes.bool,
    position: PropTypes.string,
    handler: PropTypes.func
};
