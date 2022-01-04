import React from 'react'
import { useState, useEffect } from 'react'
import Slider from 'react-custom-slider'
//import WealthCreatedCard from './WealthCreated-Card'
import SensitivityAnalysis from './SensitivityAnalysis'
import WealthCreatedCard from './WealthCreatedCard'

function SipCalculation() {
  const [principleNumber, setPrincipleNumber] = useState('3k')
  const [yearValue, setYearValue] = useState(15)
  const [interestValue, setInterestValue] = useState(10)
  const [principleValue, setPrincipleValue] = useState(
    Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 5,
    }).format(3000)
  )
  const [isShowBarChart, setIsShowBarChart] = useState(false)
  const [sipValueWithUnit, setSipValueWithUnit] = useState('')
  const [sipValueWithoutUnit, setSipValueWithoutUnit] = useState(0)
  const [showSensitivityAnalysis, setshowSensitivityAnalysis] = useState(false)
  const [showCalculation, setshowCalculation] = useState(false)
  const [showCalculateButton, setShowCalculateButton] = useState(true)
  const principleValueArr = ['10k', '5k', '3k']

  const sipResult = () => {
    console.log(yearValue + ' ' + interestValue + ' ' + principleValue)
    let investment = parseInt(principleValue.replace(',', ''))
    let annualRate = interestValue
    let monthlyRate = annualRate / 12 / 100
    let years = yearValue
    let months = years * 12
    let futureValue = 0
    futureValue =
      (investment *
        (Math.pow(1 + monthlyRate, months) - 1) *
        (1 + monthlyRate)) /
      monthlyRate
    futureValue = Math.round(futureValue)
    console.log(futureValue)
    if (annualRate == 0) {
      futureValue = investment * months
    }
    let val = Math.abs(futureValue)
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Cr'
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' Lac'
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2) + 'K'
    }
    console.log(val)
    setSipValueWithUnit(val)
    setSipValueWithoutUnit(futureValue)
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
    if (amount.toString().includes('k')) {
      rectifiedAmount = amount.split('k')[0] * 1000
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

  const handleSipCalculation = () => {
    sipResult()
    setshowCalculation(true)
    setIsShowBarChart(true)
    setshowSensitivityAnalysis(false)
    setShowCalculateButton(false)
  }

  const handleSensitivityAnalysis = () => {
    setshowSensitivityAnalysis(true)
    setIsShowBarChart(false)
  }
  const handleWealthCreated = () => {
    setIsShowBarChart(true)
    setshowSensitivityAnalysis(false)
  }
  return (
    <div>
      <div className='col-lg-12 card-class'>
        <div className='card custom-Calculator-card '>
          <div className='row mb-1'>
            <div className='col-lg-7'>
              <p className='topic-name item mb-0'>
                How much would you like to invest every month?
              </p>
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
              <p className='topic-name mb-0'>
                Number of years for which you want to invest?
              </p>
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
              <p className='topic-name mb-0'>Expected annual rate of return?</p>
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
                showMarkers={false}
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
                  onClick={() => handleSipCalculation()}
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
        <div class='col-lg-12 result-animation' style={{ display: 'none;' }}>
          <div className='card custom-Calculator-card calculate-box'>
            <div className='inner-calculate-box'>
              <div className='inner-calculate-box'>
                <div>
                  <ul className=' nav-pills tab-for-calculator justify-content-center wealth-created '>
                    <li className='nav-item'>
                      <a
                        onClick={handleWealthCreated}
                        href='#wealth_created'
                        className='nav-link active result-heading'
                        data-toggle='pill'
                        style={{
                          'border-right': '1px solid #83bfb7',
                          'padding-right': '40px',
                        }}
                      >
                        Wealth Created
                      </a>
                    </li>
                  </ul>
                  <ul className=' nav-pills tab-for-calculator justify-content-center sensitivity-analysis'>
                    <li className='nav-item'>
                      <a
                        href='#sensitivity_analysis'
                        className='nav-link active result-heading'
                        data-toggle='pill'
                        onClick={handleSensitivityAnalysis}
                      >
                        Sensitivity Analysis
                      </a>
                    </li>
                  </ul>
                </div>
                {isShowBarChart ? (
                  <WealthCreatedCard
                    id='wealth_created'
                    sipValueWithoutUnit={sipValueWithoutUnit}
                    sipValueWithUnit={sipValueWithUnit}
                    principleValue={principleValue}
                    yearValue={yearValue}
                    interestValue={interestValue}
                    sipResult={sipResult}
                  />
                ) : (
                  ''
                )}
                {showSensitivityAnalysis ? (
                  <SensitivityAnalysis
                    sipValueWithoutUnit={sipValueWithoutUnit}
                    sipValueWithUnit={sipValueWithUnit}
                    principleValue={principleValue}
                    yearValue={yearValue}
                    interestValue={interestValue}
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
export default SipCalculation
