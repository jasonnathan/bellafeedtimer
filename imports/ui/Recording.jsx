import React, { PropTypes } from 'react';
import { ListItem, Icon, Button } from 'react-onsenui';
import ons from 'onsenui';

import {Session} from '../api/Session.js';

const Recording = ({recording, onClick}) => {
  const deleteThisRecording = () => {
    Recordings.remove(recording._id);
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
          {recording.text}
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
