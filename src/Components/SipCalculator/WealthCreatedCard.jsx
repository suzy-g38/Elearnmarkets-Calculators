import React from 'react'
import BarChart from '../BarChart'
import { useState, useEffect } from 'react'

function WealthCreatedCard(props) {
  const [config, setconfig] = useState({})
  useEffect(() => {
    setconfig({
      type: 'hbar',

      plotarea: {
        'adjust-layout': true,
      },

      scaleX: {
        values: ['Wealth Created', 'Capital Appreciation', 'Amount Invested'],
      },
    
      series: [
        {
          values: [
            parseInt(
              props.principleValue.split(',')[0] +
                props.principleValue.split(',')[1]
            ) *
              props.yearValue *
              12,
          ],
          'background-color': '#004aad',
          "text": 'Wealth Created',
        },

        {
          values: [
            props.sipValueWithoutUnit -
              parseInt(
                props.principleValue.split(',')[0] +
                  props.principleValue.split(',')[1]
              ) *
                props.yearValue *
                12,
          ],
          'background-color': '#03989e',
          text: 'Capital Appreciation',
        },
        {
          values: [props.sipValueWithoutUnit],
          text: 'Amount Invested',
          'background-color': '#7b84b2',
        },
      ],
    })

    props.sipResult()
  }, [
    props.sipValueWithoutUnit,
    props.sipValueWithUnit,
    props.principleValue,
    props.yearValue,
    props.interestValue,
  ])
  return (
    <div>
      <div className='tab-content mt-2'>
        <div id='wealth_created' className='container tab-pane active'>
          <br />
          <div className='show-value-inner-box'>
            <p className='calculate-value-amount'>
              <i className='fa fa-inr' aria-hidden='true' />
              {props.sipValueWithUnit}
            </p>
            <p className='calculate-value-details'>
              By investing{' '}
              <span class='ng-binding'>
                <i className='fa fa-inr' aria-hidden='true' />
                {props.principleValue}
              </span>{' '}
              every month in SIP for{' '}
              <span className='ng-binding'>{props.yearValue} years</span> at
              annual rate of return of{' '}
              <span className='ng-binding'>{props.interestValue} %</span>.
            </p>
            <div id='summary-box'>
              <div className='mt-2'>
                <BarChart config={config} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WealthCreatedCard
