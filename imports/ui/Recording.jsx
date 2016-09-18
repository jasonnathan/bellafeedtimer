import React, { PropTypes } from 'react';
import { ListItem, Icon, Button } from 'react-onsenui';
import ons from 'onsenui';
import Store from '/imports/client/Store';
import {stopRecording} from '/imports/client/Actions/currentSession';

const Recording = ({recording, onClick}) => {
  const deleteThisRecording = () => {
    Store.dispatch(stopRecording(recording._id));
  };
  let modifier = "longdivider ";
  modifier += ons.platform.isAndroid() && 'material';

  return (
    <ListItem
      modifier={modifier}
      tappable
      tapBackgroundColor="rgba(0,0,0,.3)"
    >
      <div className="center" onClick={onClick} >
        <div className="ListItem">
          {recording.startTime}
        </div>
      </div>
      <Button
        modifier="light"
        ripple
        className="right btn blackButton"
        onClick={deleteThisRecording}
      >
        <Icon
          icon={{default: 'ion-android-close'}}
        />
      </Button>
    </ListItem>
  );
};

Recording.propTypes = {
  recording: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default Recording;
