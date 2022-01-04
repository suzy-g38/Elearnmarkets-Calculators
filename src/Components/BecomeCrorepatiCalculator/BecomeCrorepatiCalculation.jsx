import React from 'react'
import { useState, useEffect } from 'react'
import Slider from 'react-custom-slider'
import { NavLink, withRouter } from 'react-router-dom'
import MonthlySip from './MonthlySip'
import WealthCreatedCard from './MonthlySip'
import OneTimeInvestment from './OneTimeInvestment'
import SensitivityAnalysis from './OneTimeInvestment'

function BecomeCrorepatiCalculation() {
  const [currentAge, setCurrentAge] = useState(25)
  const [targetAge, setTargetAge] = useState(50)
  const [interestValue, setInterestValue] = useState(15)
  const [isShowMonthlySip, setIsShowMonthlySip] = useState(false)
  const [monthlySipValueWithUnit, setMonthlySipValueWithUnit] = useState('')
  const [showOneTimeInvestment, setShowOneTimeInvestment] = useState(false)
  const [oneTimeInvestment, setOneTimeInvestment] = useState(0)
  const [showCalculation, setshowCalculation] = useState(false)
  const [showCalculateButton, setShowCalculateButton] = useState(true)

  const becomeCrorepatiResult = () => {
    let monthlyinvestmentgoal = 0
    let onetimeinvestmentgoal = 0
    let current_age = currentAge
    let anualRateGoal = interestValue

    let yeargoals = targetAge - current_age

    let monthgoals = yeargoals * 12
    let goalfutureValue = 10000000

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
    console.log('monthlyinvestmentgoal' + monthlyinvestmentgoal)
    onetimeinvestmentgoal =
      goalfutureValue / Math.pow(1 + anualRateGoal / 100, yeargoals)

    if (anualRateGoal == 0) {
      monthlyinvestmentgoal = goalfutureValue / monthgoals
    }
    let monthlyinvestment = convertCurrency(monthlyinvestmentgoal)
    setMonthlySipValueWithUnit(monthlyinvestment)
    let amount_invest = monthlyinvestmentgoal * monthgoals
    let amount_profit = goalfutureValue - amount_invest
    let oneinvestment = convertCurrency(onetimeinvestmentgoal)
    setOneTimeInvestment(oneinvestment)
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

  const handleBecomeCrorepatiCalculation = () => {
    becomeCrorepatiResult()
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
          <div className='row mb-1 item'>
            <div className='col-lg-7'>
              <p className='topic-name mb-0'>Current Age</p>
            </div>
            <div className='col-lg-5'>
              <input
                value={currentAge}
                type='text'
                className='calculator-input'
                placeholder='10'
                onChange={(e) => {
                  setCurrentAge(
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
                value={currentAge}
                markersSize={20}
                trackLength={400}
                handlerShape='rounded'
                handlerSize={20}
                fillColor='#5fcaba'
                showValue={true}
                valueLabelColor='#5fcaba'
                handlerColor='#5fcaba'
                onChange={(value) => setCurrentAge(value)}
                valueRenderer={(value) => `${value}`}
              />
            </div>
          </div>
          <div className='row mb-1 item'>
            <div className='col-lg-7'>
              <p className='topic-name mb-0'>
                Age when you want to be Crorepati
              </p>
            </div>
            <div className='col-lg-5'>
              <input
                value={targetAge}
                type='text'
                className='calculator-input'
                placeholder='10'
                onChange={(e) => {
                  setTargetAge(
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
                value={targetAge}
                markersSize={20}
                trackLength={400}
                handlerShape='rounded'
                handlerSize={15}
                fillColor='#5fcaba'
                showValue={true}
                valueLabelColor='#5fcaba'
                handlerColor='#5fcaba'
                onChange={(value) => setTargetAge(value)}
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
          <div className='row'>
            {showCalculateButton ? (
              <div className='col-lg-12 text-center'>
                <a
                  type='submit'
                  className='btn calculate-btn'
                  onClick={() => handleBecomeCrorepatiCalculation()}
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
        <div className='col-lg-6 result-animation' style={{ display: 'none;' }}>
          <div className='card custom-Calculator-card calculate-box'>
            <div className='inner-calculate-box'>
              <div className='inner-calculate-box'>
                <div>
                  <ul className=' nav-pills tab-for-calculator justify-content-center wealth-created '>
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
                  <ul className=' nav-pills tab-for-calculator justify-content-center sensitivity-analysis'>
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
                    interestValue={interestValue}
                    becomeCrorepatiResult={becomeCrorepatiResult}
                    targetAge={targetAge}
                    currentAge={currentAge}
                  />
                ) : (
                  ''
                )}
                {showOneTimeInvestment ? (
                  <OneTimeInvestment
                    becomeCrorepatiResult={becomeCrorepatiResult}
                    oneTimeInvestment={oneTimeInvestment}
                    interestValue={interestValue}
                    targetAge={targetAge}
                    currentAge={currentAge}
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
export default BecomeCrorepatiCalculation
