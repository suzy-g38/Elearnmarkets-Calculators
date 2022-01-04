import React from 'react'

import { useState, useEffect } from 'react'

function MonthlySip(props) {
  useEffect(() => {
    props.becomeCrorepatiResult()
  }, [
    props.monthlySipValueWithUnit,
    props.interestValue,
    props.targetAge,
    props.currentAge,
  ])
  return (
    <div>
      <div className='tab-content mt-2'>
        <div id='wealth_created' className='container tab-pane active'>
          <br />
          <div className='show-value-inner-box'>
            <p class='calculate-value-amount'>
              <i class='fa fa-inr' aria-hidden='true'></i> {} <br />
              per month
            </p>
            <p className='calculate-value-amount'>
              You have to invest{' '}
              <span>
                <i class='fa fa-inr' aria-hidden='true'></i> {}
              </span>{' '}
              per month for <span>{} years</span> in order to become Crorepati.
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
