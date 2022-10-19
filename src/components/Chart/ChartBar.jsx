import React from 'react';
import './ChartBar.css';

const ChartBar = props => {
  let barFillHeight = '0%';

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }

  return (
    <div className='chart-bar'>
      <div className='chart-bar__inner'>
        {/* NOTE 스타일 : 동적으로 출력하기 위해선 단일 중괄호 사용! */}
        <div className='chart-bar__fill' style={{ height: barFillHeight }}></div>
      </div>
      {/* 동적라벨 추가 */}
      <div className='chart-bar__label'>{props.label}</div>
    </div>
  );
};

export default ChartBar;
