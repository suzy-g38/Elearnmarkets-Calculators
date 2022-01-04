import React from 'react'
import { useState } from 'react'
import Slider from 'react-custom-slider'

import MonthlyPremiumAmount from './MonthlyPremiumAmount'
import apy_details from './apy_details'
//import apy_total_amount from './apy_details'

function ApyCalculation() {
  const [principleValue, setPrincipleValue] = useState(
    Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 5,
    }).format(2000)
  )
  const [nomineePrice, setNomineePrice] = useState(0)
  const [monthlyInvestment, setMonthlyInvestment] = useState(0)
  const [yearValue, setYearValue] = useState(25)
  const [leftYear, setLeftYear] = useState(0)
  const [principleValueWithUnit, setPrincipleValueWithUnit] = useState('')
  const [principleNumber, setPrincipleNumber] = useState('2K')
  const [ApyAmountWithUnit, setApyAmountWithUnit] = useState('')
  const [showCalculation, setshowCalculation] = useState(false)
  const [showCalculateButton, setShowCalculateButton] = useState(true)
  const principleValueArr = ['5K', '4K', '3K', '2K', '1K']
  const apy_total_amount = {
    1000: '170000',
    2000: '340000',
    3000: '510000',
    4000: '680000',
    5000: '850000',
  }
  const ApyResult = () => {
    var investment = parseInt(
      principleValue.replace(/â‚¹/g, '').replace(/,/g, '')
    )
    let rectifiedInvestmentAmount = convertCurrency(investment)
    setPrincipleValueWithUnit(rectifiedInvestmentAmount)

    let monthlyinvestment = convertCurrency(
      apy_details[yearValue][investment].monthly
    )

    let quaterlyinvestment = apy_details[yearValue][investment].qtrly

    let halfYearlyinvestment = apy_details[yearValue][investment].hlfyrly

    let yearlyinvestment = apy_details[yearValue][investment].yrly

    let nomineeprice = convertCurrency(apy_total_amount[investment])

    let return_age = 60

    let leftYears = return_age - yearValue
    setNomineePrice(nomineeprice)
    setLeftYear(leftYears)
    setMonthlyInvestment(monthlyinvestment)

    //let finalpresentValue = convertCurrency(presentValue)
    //setApyAmountWithUnit(finalpresentValue)
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
    if (amount.toString().includes('K')) {
      rectifiedAmount = amount.split('K')[0] * 1000
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

  const handleApyCalculation = () => {
    ApyResult()
    setshowCalculation(true)

    setShowCalculateButton(false)
  }

  return (
    <div>
      <div className='col-lg-12 card-class'>
        <div className='card custom-Calculator-card '>
          <div className='row mb-1 item'>
            <div className='col-lg-12 mb-2 '>
              <p className='topic-name mb-0'>
                Desired Monthly Pension after Retirement
              </p>
            </div>
            <div className='col-lg-12 mb-1 item'>
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
            <div className='col-lg-12'>
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
            <div className='col-lg-12 mb-1 '>
              <p className='topic-name mb-2'>
                Age when you want to start investing (Between 18 to 39)
              </p>
            </div>
            <div className='col-lg-12 mb-1'>
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
                trackLength={400}
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

          <div className='row item'>
            {showCalculateButton ? (
              <div className='col-lg-12 text-center'>
                <a
                  type='submit'
                  className='btn calculate-btn'
                  onClick={() => handleApyCalculation()}
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
                <MonthlyPremiumAmount
                  ApyAmountWithUnit={ApyAmountWithUnit}
                  leftYear={leftYear}
                  nomineePrice={nomineePrice}
                  monthlyInvestment={monthlyInvestment}
                  principleValueWithUnit={principleValueWithUnit}
                  principleValue={principleValue}
                  ApyResult={ApyResult}
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
export default ApyCalculation
