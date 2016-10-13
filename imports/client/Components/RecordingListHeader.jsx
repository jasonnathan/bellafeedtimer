import React, {PropTypes, Component} from 'react';
// import Tracker from 'tracker-component';
import {ListHeader} from 'react-onsenui';
import {connect} from 'react-redux';
import moment from 'moment';
import Humanize from '/imports/helpers/Humanize';

class RecordingListHeader extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <ListHeader style={{color: '#444'}}>
        {this.props.dateText}
        <br />
        {this.props.durationText}
      </ListHeader>
    )
  }
}

RecordingListHeader.propTypes = {
  dateText: PropTypes.string,
  durationText: PropTypes.string,
  totalRecordings: PropTypes.number,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  const cd = state.currentDay;
  return {
    dateText: moment(cd._id, 'YYYYMMDD').format("ddd, MM Do YYYY"),
    durationText: Humanize(cd.counts.duration),
    totalRecordings: cd.counts.sessions
  };
};

export default connect(mapStateToProps)(RecordingListHeader);
