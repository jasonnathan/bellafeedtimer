import React, {PropTypes} from 'react';
import Tracker from 'tracker-component';
import {connect} from 'react-redux';
import ons from 'onsenui';
import {List} from 'react-onsenui';
import {TodayObserver} from '/imports/api/TodayObserver';
import {fetchTodayAsync} from '../Actions/currentDay';
import RecordingListHeader from './RecordingListHeader.jsx';
import Recording from './Recording.jsx';
// import RecordingDetailsPage from './RecordingDetailsPage.jsx';
// import Recording from './Recording.jsx';
//
class RecordingList extends Tracker.Component {
  constructor(props) {
    super(props);
    this._subs = [
      this.subscribe("fetchToday"),
      TodayObserver
    ];
    // this.renderRecording = this.renderRecording.bind(this);
  }

  componentDidMount(){
    this.props.dispatch(fetchTodayAsync());
  }

  componentWillUnmount(){
    this._subs.map(s => s && s.stop());
  }

  viewRecording(row){
    console.log(row);
  }

  renderRecording(row){
    return (<Recording key={row._id} recording={row} />);
  }

  render(){
    return (
      <List
        // length={10}
        // calculateItemHeight={() => ons.platform.isAndroid() ? 60 : 60}
        dataSource={this.props.sessions}
        renderRow={this.renderRecording}
        renderHeader={() => (<RecordingListHeader />)}
      />
    );
  }
}

RecordingList.propTypes = {
  currentDay: PropTypes.object,
  sessions: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  let cd = state.currentDay;
  return {
    currentDay: cd,
    sessions: cd.sessions || []
  };
};

export default connect(mapStateToProps)(RecordingList);

//     const RecordingList = ({
//         recordings = [],
//         navigator
//     }) => {
//         const recordingClickHandler = index => {
//             navigator.pushPage({
//                 component: RecordingDetailsPage,
//                 key: 'recording_DETAILS_PAGE',
//                 recording: recordings[index],
//                 props: {
//                     recording: recordings[index]
//                 }
//             });
//         };
//
//         const renderRecording = (recording, index) => {
//             return (<Recording key={recording._id} onClick={() => recordingClickHandler(index)} recording={recording}/>);
//         };
//
//         return (<List dataSource={recordings} renderRow={renderRecording} renderHeader={() => <ListHeader style={{
//             color: '#444'
//         }}>
//             {incompleteCount}
//         </ListHeader>}/>);
//     };
//
//     RecordingList.propTypes = {
//         recordings: PropTypes.array.isRequired,
//         incompleteCount: PropTypes.number.isRequired,
//         navigator: PropTypes.object
//     };
//
//     let dtFormat = "[Today] - Do MMM (ddd)",
//         currentTime = new ReactiveVar(moment().format(dtFormat))
//     setInterval(() => {
//         currentTime.set(moment().format(dtFormat))
//     }, 1e3);
// }
