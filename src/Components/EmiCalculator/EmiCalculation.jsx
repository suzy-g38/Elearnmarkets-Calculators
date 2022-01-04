import React from 'react'
import { useState } from 'react'
import Slider from 'react-custom-slider'

import EmiAmount from './EmiAmount'

function EmiCalculation() {
  const [principleValue, setPrincipleValue] = useState(
    Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 5,
    }).format(500000)
  )
  const [loanTenureValue, setLoanTenureValue] = useState(12)
  const [annualInterestValue, setAnnualInterestValue] = useState(15)
  const [principleValueWithUnit, setPrincipleValueWithUnit] = useState('')
  const [principleValueWithoutUnit, setPrincipleValueWithoutUnit] = useState(0)
  const [principleNumber, setPrincipleNumber] = useState('5L')
  const [emiValue, setEmiValue] = useState(0)
  const [emiAmountWithUnit, setEmiAmountWithUnit] = useState('')
  const [monthlyInterestValue, setMonthlyInterestValue] = useState(0)
  const [showCalculation, setshowCalculation] = useState(false)
  const [showCalculateButton, setShowCalculateButton] = useState(true)
  const [date, setDate] = useState('')
  const principleValueArr = ['50L', '25L', '5L']

  const emiAmountResult = () => {
    var investment = parseInt(
      principleValue.replace(/â‚¹/g, '').replace(/,/g, '')
    )
    let rectifiedInvestmentAmount = convertCurrency(investment)
    setPrincipleValueWithUnit(rectifiedInvestmentAmount)
    setPrincipleValueWithoutUnit(investment)
    let Emi = 0
    let r = annualInterestValue / 12 / 100
    setMonthlyInterestValue(r)
    let loanTenureMonth = loanTenureValue * 12
    if (loanTenureMonth == 0) {
      Emi = investment
    }
    if (r == 0) {
      if (loanTenureMonth > 0) {
        Emi = investment / loanTenureMonth
      } else {
        Emi = investment
      }
    }

    Emi =
      investment *
      r *
      (Math.pow(1 + r, loanTenureMonth) /
        (Math.pow(1 + r, loanTenureMonth) - 1))
    console.log('emi' + Math.round(Emi))
    setEmiValue(Emi)
    let finalemiValue = Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 10,
    }).format(Math.round(Emi))
    setEmiAmountWithUnit(finalemiValue)
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
    emiAmountResult()
    setshowCalculation(true)

    setShowCalculateButton(false)
  }

  return (
    <div>
      <div className='col-lg-12 card-class'>
        <div className='card custom-Calculator-card '>
          <div className='row mb-1'>
            <div className='col-lg-7'>
              <p className='topic-name item mb-0'>Loan Principal Amount</p>
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
              <p className='topic-name mb-0'>Loan Tenure</p>
            </div>
            <div className='col-lg-5'>
              <input
                value={loanTenureValue}
                type='text'
                className='calculator-input'
                placeholder='10'
                onChange={(e) => {
                  setLoanTenureValue(
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
                value={loanTenureValue}
                trackLength={400}
                handlerShape='rounded'
                handlerSize={15}
                fillColor='#5fcaba'
                showValue={true}
                valueLabelColor='#5fcaba'
                handlerColor='#5fcaba'
                onChange={(value) => setLoanTenureValue(value)}
                valueRenderer={(value) => `${value}`}
              />
            </div>
          </div>
          <div className='row mb-1 item'>
            <div className='col-lg-7'>
              <p className='topic-name mb-0'>Loan Interest Rate(Annual)</p>
            </div>
            <div className='col-lg-5'>
              <input
                value={annualInterestValue}
                type='text'
                className='calculator-input'
                onChange={(e) => {
                  setAnnualInterestValue(
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
                value={annualInterestValue}
                trackLength={400}
                handlerShape='rounded'
                handlerSize={15}
                fillColor='#5fcaba'
                showValue={true}
                valueLabelColor='#5fcaba'
                handlerColor='#5fcaba'
                onChange={(value) => setAnnualInterestValue(value)}
                valueRenderer={(value) => `${value}`}
              />
            </div>
          </div>
          <div class='row mb-2'>
            <div class='col-lg-12'>
              <p class='topic-name mb-0'>EMI payments starting from</p>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-lg-12'>
              <div
                className='input-group date'
                datetimepicker
                id='datetimepicker1'
              >
                <input
                  value={date}
                  type='text'
                  name='userDetailUpdate[date_of_birth]'
                  className='calculator-input datetimepicker'
                  onChange={(e) => {
                    setDate(e.target.value)
                  }}
                />
                <span className='input-group-addon year-value'>
                  <span className='glyphicon glyphicon-calendar'></span>
                </span>
                <span classNaame='year-value'>
                  <i className='fa fa-calendar' aria-hidden='true'></i>
                </span>
              </div>
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
                <EmiAmount
                  date={date}
                  emiAmountWithUnit={emiAmountWithUnit}
                  emiValue={emiValue}
                  principleValueWithUnit={principleValueWithUnit}
                  principleValueWithoutUnit={principleValueWithoutUnit}
                  annualInterestValue={annualInterestValue}
                  emiAmountResult={emiAmountResult}
                  loanTenureValue={loanTenureValue}
                  monthlyInterestValue={monthlyInterestValue}
                  //restAmount={restAmount}
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
export default EmiCalculation
