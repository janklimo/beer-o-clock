import React from 'react';
import Timer from './components/timer.jsx'

const App = React.createClass({
  render() {
    return <div>
      <h1>Is it beer o'clock yet?</h1>
      <Timer />
    </div>
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
