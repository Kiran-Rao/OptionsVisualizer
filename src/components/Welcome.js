import React from 'react';

const Welcome = (props) => (
  <div>
    <div>{props.message}</div>
    <div>The count is: {props.count}</div>
  </div>
);

export default Welcome;
