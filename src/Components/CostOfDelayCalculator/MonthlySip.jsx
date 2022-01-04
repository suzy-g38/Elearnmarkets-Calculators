import React from 'react'

import { useState, useEffect } from 'react'

function MonthlySip(props) {
 
  useEffect(() => {
    props.costOfDelayResult()
  }, [
    props.principleValueWithUnit,
    props.monthlySipValueWithUnit,
    props.principleValue,
    props.delayInInvestment,
    props.interestValue,
    props.yearValue,
  ])
  return (
    <div>
      <div className='tab-content mt-2'>
        <div id='wealth_created' className='container tab-pane active'>
          <br />
          <div className='show-value-inner-box'>
            <p className='calculate-value-amount'>
              <i className='fa fa-inr' aria-hidden='true' />
              {props.monthlySipValueWithUnit}
            </p>
            <p className='calculate-value-details'>
              In case you delay your investment by{' '}
              <span>{props.delayInInvestment} year(s),</span> you have to Invest{' '}
              <span>
                {' '}
                <i class='fa fa-inr' aria-hidden='true'></i>{' '}
                {props.monthlySipValueWithUnit}
              </span>{' '}
              per month extra in order to achieve your goal amount of{' '}
              <span>
                {' '}
                <i class='fa fa-inr' aria-hidden='true'></i>{' '}
                {props.principleValueWithUnit}.
              </span>
            </p>
            <div id='summary-box'>
              <div className='mt-2'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlySip
