import React from 'react';
import '../../../index.css';

export const Square = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);