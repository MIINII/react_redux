import React from 'react';
import './Chart.css';

// components
import ChartBar from './ChartBar';

const Chart = props => {
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
  const totalMaximun = Math.max(...dataPointValues); // 객체배열의 특정속성

  return (
    <div className='chart'>
      {props.dataPoints.map(dataPoint => (
        <ChartBar key={dataPoint.label} value={dataPoint.value} maxValue={totalMaximun} label={dataPoint.label} />
      ))}
    </div>
  );
};

export default Chart;
