import React, { PropTypes } from 'react';

import { Page, Toolbar, BackButton } from 'react-onsenui';

const RecordingDetailsPage = ({recording, navigator}) => {
  const renderToolbar = () => {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => navigator.popPage()}>
            <span className="back-button__label">Todos</span>
          </BackButton>
        </div>
        <div className="center">Recording Details</div>
      </Toolbar>
    );
  };

  return (
    <Page
      renderToolbar={renderToolbar}
    >
      <div style={{margin: '20px auto', display: 'table'}}>
        {recording.text}
      </div>
    </Page>
  );
};

RecordingDetailsPage.propTypes = {
  recording: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
};

export default RecordingDetailsPage;
