import React from 'react'

import { useState, useEffect } from 'react'

function FutureValueAmount(props) {
  useEffect(() => {
    props.futureValueAmountResult()
  }, [
    props.principleValueWithUnit,
    props.futureValueAmountWithUnit,
    props.principleValue,
    props.interestValue,
    props.yearValue,
  ])
  return (
    <div>
      <p class='calculate-value-for'>Future Value Amount</p>
      <p class='calculate-value-amount'>
        <i class='fa fa-inr' aria-hidden='true'></i>{' '}
        {props.futureValueAmountWithUnit}
      </p>

      <p class='calculate-value-details'>
        <span>
          <i class='fa fa-inr' aria-hidden='true'></i>{' '}
          {props.principleValueWithUnit}
        </span>{' '}
        invested today at <span>{props.interestValue}% </span> would become{' '}
        <span>
          <i class='fa fa-inr' aria-hidden='true'></i>{' '}
          {props.futureValueAmountWithUnit}{' '}
        </span>
        after <span>{props.yearValue} year(s)</span>.
      </p>
    </div>
  )
}

export default FutureValueAmount
