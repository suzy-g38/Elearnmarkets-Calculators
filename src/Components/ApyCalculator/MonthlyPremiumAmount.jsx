import React from 'react'

import { useEffect } from 'react'

function MonthlyPremiumAmount(props) {
  useEffect(() => {
    console.log()
    props.ApyResult()
  }, [
    props.monthlyInvestment,
    props.nomineePrice,
    props.principleValue,
    props.principleValueWithUnit,
    props.interestValue,
    props.yearValue,
    props.leftYear,
  ])
  return (
    <div>
      <p class='calculate-value-for'>Monthly Premium Amount</p>
      <p class='calculate-value-amount'>
        <i class='fa fa-inr' aria-hidden='true'></i> {props.monthlyInvestment}
      </p>

      <p class='calculate-value-details'>
        You need to pay{' '}
        <span>
          <i class='fa fa-inr' aria-hidden='true'></i> {props.monthlyInvestment}
        </span>{' '}
        per month for <span>{props.leftYear} years</span> to get a monthly
        pension of{' '}
        <span>
          <i class='fa fa-inr' aria-hidden='true'></i>{' '}
          {props.principleValueWithUnit}{' '}
        </span>
        after retirement. <br /> Total amount that will be returned to nominee
        is{' '}
        <span>
          <i class='fa fa-inr' aria-hidden='true'></i> {props.nomineePrice}.
        </span>
      </p>
    </div>
  )
}

export default MonthlyPremiumAmount
