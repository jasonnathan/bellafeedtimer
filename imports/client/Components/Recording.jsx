import React, { PropTypes } from 'react';
import { ListItem, Icon, Button } from 'react-onsenui';
import ons from 'onsenui';
import {deleteRecording} from '../Actions/currentDay';
import Store from '../Store';

const Recording = ({recording}) => {
  let modifier = "longdivider ";
  modifier += ons.platform.isAndroid() && 'material';

  const removeItem = () => {
    return Store.dispatch(deleteRecording(recording._id))
  }
  return (
    <ListItem
      modifier={modifier}
    >
      <div className="center">
        <div className="ListItem">
          {recording.startTime}
        </div>
      </div>
      <Button
        modifier="light"
        ripple
        className="right btn blackButton"
        onClick={removeItem}
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
  view: PropTypes.func,
  remove: PropTypes.func
};

export default Recording;
