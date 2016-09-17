import React, {PropTypes} from 'react';
import ons from 'onsenui';
import {
    Page,
    Toolbar,
    Row,
    Col
} from 'react-onsenui';
import moment from 'moment';
import Tracker from 'tracker-component';
import _ from 'underscore';

import {Recordings} from '../api/RecordingCollection.js';

import RecordingList from './RecordingList.jsx';

import RecordButton from './RecordButton.jsx';

import Store from '/imports/client/Store';
import {startRecording, stopRecording} from '/imports/client/Actions/currentSession';

//Store.dispatch(startRecording({position: "LEFT"}));


class MainPage extends Tracker.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessions: Recordings.find({_id: moment().format('YYYYMMDD')}).fetch()
        };

        this.autorun(()=> {
          let session = this.getCurrentSession(),
              sessions = this.state.sessions.map(s => s && s.toJS);
          return this.setState({toJS: session ? session.toJSON : JSON.stringify(sessions, null, 2)});
        });

        setInterval( () => {
          let session = this.getCurrentSession();
          if(session){
            session.duration = session.durationMilliseconds()
          }

        }, 1e3);

        this.recordClickHandler = this.recordClickHandler.bind(this);
    }

    getCurrentSession(){
      return _.find(this.state.sessions, s => s && s.recording());
    }

    isRecording(position){
      const session = this.getCurrentSession();
      return session ? session.position === position : false;
    }

    stopSession(session){
      session.ended = moment();
      session.recording(false);
      console.log(session.toJS);
      return Recordings.update({_id: session._id}, {$set: session.toJS});
    }

    recordClickHandler(event){
      let currentSession = this.getCurrentSession(),
      position = event.currentTarget.id.replace("record", "").toUpperCase();

      if(currentSession){
        if(currentSession.position === position)
          return this.stopSession(currentSession);

        this.stopSession(currentSession);
        currentSession = null;
      }

      if(!currentSession){
        currentSession = new Session({position: position});
      }

      currentSession.started ? this.stopSession(currentSession) : (currentSession.started = moment());
      this.setState({ sessions: this.state.sessions.concat([currentSession]) });
    }

    renderToolbar() {
        return (
          <Toolbar>
            <div className="center">Bella Feed Timer</div>
          </Toolbar>
        );
    }


    render(){
      const currentSession = this.getCurrentSession(),
                      text = currentSession ? currentSession.toJSON + "\nNumber of sessions: " + this.state.sessions.length : "";
      return (
        <Page renderToolbar={this.renderToolbar}>
          <Row style={{ minHeight: '100px'}}>
            <Col verticalAlign="center" className="mainButtonContainer left">
              <RecordButton
                duration={currentSession ? currentSession.durationText : ""}
                handler={this.recordClickHandler}
                recording={this.isRecording('LEFT')}
                position="LEFT"
              />
            </Col>
            <Col>&nbsp;</Col>
            <Col verticalAlign="center" className="mainButtonContainer right">
              <RecordButton
                duration={currentSession ? currentSession.durationText : ""}
                handler={this.recordClickHandler}
                recording={this.isRecording('RIGHT')}
                position="RIGHT"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <RecordingList navigator={this.navigator} /> */}
              <pre>
                <small>{text}</small>
              </pre>
            </Col>
          </Row>
        </Page>
      );
    }

}
//
// const MainPage = ({navigator}) => {
//     const handleNewRecordingClick = () => {
//         ons.notification.prompt({title: 'New Recording', message: 'Include a recording title.', placeholder: 'I want to...', cancelable: true, buttonLabel: 'Save Recording'}).then(saveRecording);
//     };
//
//     let currentSession;
//
//     const saveRecording = inputValue => {
//         const text = inputValue.trim();
//
//         if (text) {
//             Recordings.insert({text, createdAt: new Date()});
//
//         } else {
//             ons.notification.alert('You must provide a recording title!')
//         }
//     };
//
//     const renderToolbar = () => {
//         return (
//             <Toolbar>
//                 <div className="center">Todos</div>
//                 <div className="right">
//                     {ons.platform.isAndroid()
//                         ? null
//                         : (
//                             <ToolbarButton onClick={handleNewRecordingClick}>
//                                 New
//                             </ToolbarButton>
//                         )
//                     }
//                 </div>
//             </Toolbar>
//         );
//     };
//
//     let buttonStyle = {
//         color: '#fff',
//         borderColor: 'transparent',
//         borderRadius: 0,
//         background: 'url(/drawButton.png) no-repeat 0 0/cover',
//         minHeight: '90px'
//     }
//
//     let recordClickHandler = () => {
//         if (currentSession && currentSession.recording())
//             return;
//
//         currentSession = new Session();
//         currentSession.recording(true);
//         currentSession.started(moment())
//         console.log(currentSession.started().toDate());
//     }
//
//     return (
//         <Page renderToolbar={renderToolbar}>
//             <Row style={{
//                 minHeight: '100px'
//             }}>
//                 <Col verticalAlign="center" style={{
//                     marginLeft: '1rem',
//                     marginTop: '1rem',
//                     marginBottom: '1rem'
//                 }}>
//                     <Button style={buttonStyle} modifier="outline large" ripple onClick={recordClickHandler}>
//                         <img src="/feed-left.svg" height="50px" alt="Left Feed"/>
//                         <small style={{
//                             textTransform: "uppercase",
//                             display: 'block',
//                             textAlign: 'center',
//                             lineHeight: .2
//                         }}>Left</small>
//                     </Button>
//                 </Col>
//                 <Col>
//                     &nbsp;
//                 </Col>
//                 <Col verticalAlign="center" style={{
//                     marginRight: '1rem',
//                     marginTop: '1rem',
//                     marginBottom: '1rem'
//                 }}>
//                     <Button style={buttonStyle} modifier="outline large" ripple onClick={recordClickHandler}>
//                         <img className="imgMirror" src="/feed-left.svg" height="50px" alt="Left Feed"/>
//                         <small style={{
//                             textTransform: "uppercase",
//                             display: 'block',
//                             textAlign: 'center',
//                             lineHeight: .2
//                         }}>Right</small>
//                     </Button>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <RecordingList navigator={navigator}/>
//                 </Col>
//             </Row>
//         </Page>
//     );
// };

MainPage.propTypes = {
    navigator: PropTypes.object
};

export default MainPage;
