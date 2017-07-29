import React from 'react';
import ReactDOM from 'react-dom';

const path = require('path');

const App = require('../app/app.js');

const dom = document.getElementById('app');

ReactDOM.render(<App />, dom);