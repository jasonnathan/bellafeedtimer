/*global document*/
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import ons from 'onsenui';
// import '../imports/ui/styles/dark-theme.styl';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components-dark-theme.css';
// import 'onsenui/stylus/blue-theme.styl';


import '../imports/ui/styles/Main.styl';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  ons.ready(() => {
    render(<App />, document.getElementById('render-target'));
  });
});
