import { useEffect } from 'react';
import rangeSlider from 'range-slider-input';

import './index.css';

const Range = ({ setLoanAmount, minMax }) => {
  useEffect(() => {
    rangeSlider(document.querySelector('#range-slider'), {
      step: '1',
      min: minMax.min,
      max: minMax.max,
      thumbsDisabled: [true, false],
      onInput: (value) => {
        setLoanAmount(value[1])
      }
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div id="range-slider"></div>
  )
};


export default Range;

