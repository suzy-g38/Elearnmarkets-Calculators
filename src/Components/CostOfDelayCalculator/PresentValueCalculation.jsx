import React from 'react'
import { useState } from 'react'
import Slider from 'react-custom-slider'

import PresentValueAmount from './PresentValueAmount'

function PresentValueCalculation() {
  const [principleValue, setPrincipleValue] = useState(
    Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 5,
    }).format(500000)
  )
  const [yearValue, setYearValue] = useState(15)
  const [interestValue, setInterestValue] = useState(12)
  const [principleValueWithUnit, setPrincipleValueWithUnit] = useState('')
  const [principleNumber, setPrincipleNumber] = useState('5L')
  const [presentValueAmountWithUnit, setPresentValueAmountWithUnit] =
    useState('')
  const [showCalculation, setshowCalculation] = useState(false)
  const [showCalculateButton, setShowCalculateButton] = useState(true)
  const principleValueArr = ['50L', '25L', '5L']

  const presentValueAmountResult = () => {
    var investment = parseInt(
      principleValue.replace(/â‚¹/g, '').replace(/,/g, '')
    )
    let rectifiedInvestmentAmount = convertCurrency(investment)
    setPrincipleValueWithUnit(rectifiedInvestmentAmount)

    let presentValue = investment / Math.pow(1 + interestValue / 100, yearValue)

    let finalpresentValue = convertCurrency(presentValue)
    setPresentValueAmountWithUnit(finalpresentValue)
  }
  const convertCurrency = (amount) => {
    let val = Math.abs(amount)
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Cr'
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' Lac'
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2) + 'K'
    }
    return val
  }
  const convertPricipleAmount = (amount) => {
    for (var i = 0; i < principleValueArr.length; i++) {
      if (principleValueArr[i] === amount) {
        setPrincipleNumber(amount)
      }
    }

    let rectifiedAmount = 0
    console.log(typeof amount)
    console.log(amount)
    if (amount.toString().includes('L')) {
      rectifiedAmount = amount.split('L')[0] * 100000
    } else if (amount === 'NaN') {
      console.log('true')
      rectifiedAmount = 0
    } else {
      rectifiedAmount = parseInt(amount)
    }
    setPrincipleValue(
      Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 10,
      }).format(rectifiedAmount)
    )
  }

  const handlePresentValueAmountCalculation = () => {
    presentValueAmountResult()
    setshowCalculation(true)

    setShowCalculateButton(false)
  }

  return (
    <div>
      <div className='col-lg-12 card-class'>
        <div className='card custom-Calculator-card '>
          <div className='row mb-1'>
            <div className='col-lg-7'>
              <p className='topic-name item mb-0'>Future Value of Investment</p>
            </div>
            <div className='col-lg-5 item'>
              <i className='fa fa-inr rupee-value' aria-hidden='true' />
              <input
                type='hidden'
                className='form-control mb-0 pt-0'
                id='inputDefault'
              />

              <input
                value={principleValue}
                className='calculator-input'
                onChange={(e) => {
                  convertPricipleAmount(e.target.value)
                }}
              />
            </div>
          </div>
          <div className='row mb-2 item'>
            <div className='col-lg-5'>
              <p className='mb-0'>Choose Amount:</p>
            </div>
            <div className='col-lg-7'>
              {principleValueArr.map((i, index) => (
                <div
                  className='sample-amount'
                  onClick={(e) => convertPricipleAmount(e.target.innerHTML)}
                  style={{
                    backgroundColor:
                      principleNumber === i ? '#ebfffd' : 'white',
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          <div className='row mb-1 item'>
            <div className='col-lg-7'>
              <p className='topic-name mb-0'>Number of years</p>
            </div>
            <div className='col-lg-5'>
              <input
                value={yearValue}
                type='text'
                className='calculator-input'
                placeholder='10'
                onChange={(e) => {
                  setYearValue(
                    parseInt(e.target.value.toString().replace('.', ''))
                  )
                }}
              />
              <span className='year-value'>years</span>
            </div>
          </div>
          <div className='row mb-2 item'>
            <div className='col-lg-12'>
              <Slider
                value={yearValue}
                trackLength={250}
                handlerShape='rounded'
                handlerSize={15}
                fillColor='#5fcaba'
                showValue={true}
                valueLabelColor='#5fcaba'
                handlerColor='#5fcaba'
                onChange={(value) => setYearValue(value)}
                valueRenderer={(value) => `${value}`}
              />
            </div>
          </div>
          <div className='row mb-1 item'>
            <div className='col-lg-7'>
              <p className='topic-name mb-0'>Expected Annual Inflation Rate</p>
            </div>
            <div className='col-lg-5'>
              <input
                value={interestValue}
                type='text'
                className='calculator-input'
                onChange={(e) => {
                  setInterestValue(
                    parseInt(e.target.value.toString().replace('.', ''))
                  )
                }}
              />
              <span className='year-value'>%</span>
            </div>
          </div>
          <div className='row mb-2 item'>
            <div className='col-lg-12'>
              <Slider
                value={interestValue}
                trackLength={250}
                handlerShape='rounded'
                handlerSize={15}
                fillColor='#5fcaba'
                showValue={true}
                valueLabelColor='#5fcaba'
                handlerColor='#5fcaba'
                onChange={(value) => setInterestValue(value)}
                valueRenderer={(value) => `${value}`}
              />
            </div>
          </div>

          <div className='row'>
            {showCalculateButton ? (
              <div className='col-lg-12 text-center'>
                <a
                  type='submit'
                  className='btn calculate-btn'
                  onClick={() => handlePresentValueAmountCalculation()}
                >
                  Calculate now
                  <div className='ripple-container' />
                </a>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {showCalculation ? (
        <div
          className='col-lg-12 result-animation'
          style={{ display: 'none;' }}
        >
          <div className='card custom-Calculator-card calculate-box'>
            <div className='inner-calculate-box'>
              <div className='inner-calculate-box'>
                <PresentValueAmount
                  presentValueAmountWithUnit={presentValueAmountWithUnit}
                  principleValueWithUnit={principleValueWithUnit}
                  principleValue={principleValue}
                  interestValue={interestValue}
                  presentValueAmountResult={presentValueAmountResult}
                  yearValue={yearValue}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default PresentValueCalculation
