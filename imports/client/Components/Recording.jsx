import React, { PropTypes } from 'react';
import { ListItem, Icon, Button, Row, Col } from 'react-onsenui';
import ons from 'onsenui';
import {deleteRecording} from '../Actions/currentDay';
import {unsetCurrentRecording} from '../Actions/currentSession';
import Store from '../Store';

const Recording = ({session}) => {
  let modifier = "longdivider ";
  modifier += ons.platform.isAndroid() && 'material';

  const removeItem = () => {
    Store.dispatch(deleteRecording(session._id));
    return Store.dispatch(unsetCurrentRecording());
  }

  const renderDeleteButton = () => {
    if(!session.recording){
      return (
        <Button
          modifier="light"
          ripple
          className="btn blackButton"
          onClick={removeItem}
        >
          <Icon
            icon={{default: 'ion-ios-close-outline'}}
          />
        </Button>
      );
    }
  }
  return (
    <ListItem
      modifier={modifier}
    >
      <div className="center">
        <div className="ListItem">
          <Row>
            <Col><h5>{session.position}</h5></Col>
            <Col><small><time dateTime={session.started}>{session.startTime}</time></small></Col>
            <Col><small>{session.durationText}</small></Col>
            <Col style={{textAlign:'right'}}>{renderDeleteButton()}</Col>
          </Row>
        </div>
      </div>
    </ListItem>
  );
};

Recording.propTypes = {
  session: PropTypes.object.isRequired,
  view: PropTypes.func,
  remove: PropTypes.func
};

export default Recording;
