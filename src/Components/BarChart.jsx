import React from 'react'
import 'zingchart/es6'
import ZingChart from 'zingchart-react'
function BarChart(props) {
  return (
    <div>
      <div id='summary-box'>
        <div class='mt-2'>
          <div>
            <ZingChart data={props.config} width='362' height='181' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarChart
