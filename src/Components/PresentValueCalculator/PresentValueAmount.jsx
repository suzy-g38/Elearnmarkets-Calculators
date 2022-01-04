import React from 'react'

import { useEffect } from 'react'

function PresentValueAmount(props) {
  useEffect(() => {
    console.log();
    props.presentValueAmountResult()
  }, [
    props.principleValue,
    props.principleValueWithUnit,
    props.presentValueAmountWithUnit,
    props.interestValue,
    props.yearValue,
  ])
  return (
    <div>
      <p class='calculate-value-for'>Present Value amount</p>
      <p class='calculate-value-amount'>
        <i class='fa fa-inr' aria-hidden='true'></i>{' '}
        {props.presentValueAmountWithUnit}
      </p>

      <p class='calculate-value-details'>
        <span>
          <i class='fa fa-inr' aria-hidden='true'></i>{' '}
          {props.principleValueWithUnit}
        </span>{' '}
        is worth{' '}
        <span>
          {' '}
          <i class='fa fa-inr' aria-hidden='true'></i>{' '}
          {props.presentValueAmountWithUnit}{' '}
        </span>{' '}
        today after accounting for <span> {props.interestValue}% </span>
        inflation rate for <span>{props.yearValue} year(s).</span>
      </p>
    </div>
  )
}

export default PresentValueAmount
