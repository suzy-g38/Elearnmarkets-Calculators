import React from 'react'
import { useState, useEffect } from 'react'
import Slider from 'react-custom-slider'
import { NavLink, withRouter } from 'react-router-dom'
import MonthlySip from './MonthlySip'
import WealthCreatedCard from './MonthlySip'
import OneTimeInvestment from './OneTimeInvestment'
import SensitivityAnalysis from './OneTimeInvestment'

function CostOfDelayCalculation() {
  const [delayInInvestment, setDelayInInvestment] = useState(2)
  const [yearValue, setYearValue] = useState(15)
  const [interestValue, setInterestValue] = useState(12)
  const [principleValue, setPrincipleValue] = useState(
    Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 5,
    }).format(500000)
  )
  const [principleNumber, setPrincipleNumber] = useState('5L')
  const [principleValueWithUnit, setPrincipleValueWithUnit] = useState('')
  const [isShowMonthlySip, setIsShowMonthlySip] = useState(false)
  const [monthlySipValueWithUnit, setMonthlySipValueWithUnit] = useState('')

  const [showOneTimeInvestment, setShowOneTimeInvestment] = useState(false)
  const [oneTimeInvestment, setOneTimeInvestment] = useState(0)
  const [showCalculation, setshowCalculation] = useState(false)
  const [showCalculateButton, setShowCalculateButton] = useState(true)
  const principleValueArr = ['50L', '25L', '5L']
  const costOfDelayResult = () => {
    let monthlyinvestmentgoal = 0
    let onetimeinvestmentgoal = 0
    let goalfutureValue = principleValue.replace(/â‚¹/g, '').replace(/,/g, '')
    let rectifiedPrincipleValue = convertCurrency(goalfutureValue)
    let anualRateGoal = interestValue
    let yeargoals = yearValue
    let costdelayyr = yeargoals - delayInInvestment
    let monthgoals = yeargoals * 12

    setPrincipleValueWithUnit(rectifiedPrincipleValue)
    monthlyinvestmentgoal = parseInt(
      (
        (goalfutureValue * (anualRateGoal / 100)) /
        (Math.pow(1 + anualRateGoal / 100, yeargoals) - 1) /
        12
      ).toFixed(2)
    )
    if (isNaN(monthlyinvestmentgoal) == true) {
      monthlyinvestmentgoal = 0
    }
    onetimeinvestmentgoal =
      goalfutureValue / Math.pow(1 + anualRateGoal / 100, yeargoals)

    if (anualRateGoal == 0) {
      monthlyinvestmentgoal = goalfutureValue / monthgoals
    }
    let monthlyinvestment = monthlyinvestmentgoal
    let amount_invest = monthlyinvestment * monthgoals
    let amount_profit = goalfutureValue - amount_invest
    let oneinvestment = onetimeinvestmentgoal

    let costmonthlyinvestment = parseInt(
      (
        (goalfutureValue * (anualRateGoal / 100)) /
        (Math.pow(1 + anualRateGoal / 100, costdelayyr) - 1) /
        12
      ).toFixed(2)
    )
    if (isNaN(costmonthlyinvestment) == true) {
      costmonthlyinvestment = 0
    }
    let costoneinvestment =
      goalfutureValue / Math.pow(1 + anualRateGoal / 100, costdelayyr)

    let cost_amount_invest = costmonthlyinvestment * (costdelayyr * 12)

    if (isNaN(cost_amount_invest) == true) {
      cost_amount_invest = 0
    }
    let cost_amount_profit = goalfutureValue - cost_amount_invest

    if (isNaN(cost_amount_profit) == true) {
      cost_amount_profit = 0
    }
    let extra_monthly_amount = costmonthlyinvestment - monthlyinvestment
    let extra_onetime_amount = costoneinvestment - oneinvestment

    let monthlyval = convertCurrency(extra_monthly_amount)
    setMonthlySipValueWithUnit(monthlyval)

    let onetimeval = convertCurrency(extra_onetime_amount)

    setOneTimeInvestment(onetimeval)
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

  const handleCostOfDelayCalculation = () => {
    costOfDelayResult()
    setshowCalculation(true)
    setIsShowMonthlySip(true)
    setShowOneTimeInvestment(false)
    setShowCalculateButton(false)
  }

  const handleOneTimeInvestment = () => {
    console.log('one time investment')
    setShowOneTimeInvestment(true)
    setIsShowMonthlySip(false)
  }
  const handleMonthlySip = () => {
    console.log('monthly sip')
    setIsShowMonthlySip(true)
    setShowOneTimeInvestment(false)
  }
  return (
    <div>
      <div className='col-lg-12 card-class'>
        <div className='card custom-Calculator-card '>
          <div className='row mb-1'>
            <div className='col-lg-7'>
              <p className='topic-name item mb-0'>Desired goal amount</p>
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
                markersSize={20}
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
          <div className='row mb-1 item'>
            <div className='col-lg-7'>
              <p className='topic-name mb-0'>Expected annual rate of return</p>
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
                trackLength={400}
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
          <div className='row mb-1 item'>
            <div className='col-lg-7'>
              <p className='topic-name mb-0'>Delay in investment</p>
            </div>
            <div className='col-lg-5'>
              <input
                value={delayInInvestment}
                type='text'
                className='calculator-input'
                onChange={(e) => {
                  setDelayInInvestment(
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
                value={delayInInvestment}
                trackLength={400}
                handlerShape='rounded'
                handlerSize={15}
                fillColor='#5fcaba'
                showValue={true}
                valueLabelColor='red'
                handlerColor='#5fcaba'
                showMarkers={false}
                onChange={(value) => setDelayInInvestment(value)}
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
                  onClick={() => handleCostOfDelayCalculation()}
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
        <div class=' result-animation' style={{ display: 'none;' }}>
          <div className='card custom-Calculator-card calculate-box'>
            <div className='inner-calculate-box'>
              <div className='inner-calculate-box'>
                <div>
                  <ul className=' nav-pills tab-for-calculator justify-content-center monthly-sip '>
                    <li className='nav-item'>
                      <a
                        href='#monthly_sip'
                        className='nav-link active result-heading'
                        data-toggle='pill'
                        style={{
                          'border-right': '1px solid #83bfb7',
                          'padding-right': '40px',
                        }}
                        onClick={handleMonthlySip}
                      >
                        Monthly SIP
                      </a>
                    </li>
                  </ul>
                  <ul className=' nav-pills tab-for-calculator justify-content-center one-time-investment'>
                    <li className='nav-item'>
                      <a
                        href='#one_time'
                        className='nav-link active result-heading'
                        data-toggle='pill'
                        onClick={handleOneTimeInvestment}
                      >
                        One Time Investment
                      </a>
                    </li>
                  </ul>
                </div>
                {isShowMonthlySip ? (
                  <MonthlySip
                    monthlySipValueWithUnit={monthlySipValueWithUnit}
                    principleValueWithUnit={principleValueWithUnit}
                    principleValue={principleValue}
                    delayInInvestment={delayInInvestment}
                    interestValue={interestValue}
                    costOfDelayResult={costOfDelayResult}
                    yearValue={yearValue}
                  />
                ) : (
                  ''
                )}
                {showOneTimeInvestment ? (
                  <OneTimeInvestment
                    costOfDelayResult={costOfDelayResult}
                    oneTimeInvestment={oneTimeInvestment}
                    principleValue={principleValue}
                    principleValueWithUnit={principleValueWithUnit}
                    yearValue={yearValue}
                    interestValue={interestValue}
                    delayInInvestment={delayInInvestment}
                  />
                ) : (
                  ''
                )}
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
export default CostOfDelayCalculation
