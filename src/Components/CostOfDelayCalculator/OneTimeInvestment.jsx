import React from 'react'
import { useState, useEffect } from 'react'

function OneTimeInvestment(props) {
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
      <div>
        <br />
        <div class='show-value-inner-box'>
          <p class='calculate-value-for'>Cost of Delay</p>

          <p class='calculate-value-amount'>
            <i class='fa fa-inr' aria-hidden='true'></i>{' '}
            {props.oneTimeInvestment} <br />
            one time
          </p>
          <p class='calculate-value-details'>
            In case you delay your investment by{' '}
            <span>{props.delayInInvestment} year(s),</span> you have to Invest{' '}
            <span>
              {' '}
              <i class='fa fa-inr' aria-hidden='true'></i>{' '}
              {props.oneTimeInvestment}
            </span>{' '}
            extra in order to achieve your goal amount of{' '}
            <span>
              {' '}
              <i class='fa fa-inr' aria-hidden='true'></i>{' '}
              {props.principleValueWithUnit}{' '}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default OneTimeInvestment
