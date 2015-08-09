import React from 'react';
import Timer from './components/timer.jsx'

const App = React.createClass({
  render() {
    return <div>
      <h2>Is it beer o'clock yet?</h2>
      <Timer />
    </div>
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
