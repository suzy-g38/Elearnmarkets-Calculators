import React from 'react'

import { useState, useEffect } from 'react'
import 'zingchart/es6'
import ZingChart from 'zingchart-react'

function EmiAmount(props) {
  const [config, setconfig] = useState({})
  const [show, setShow] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [showMinus, setShowMinus] = useState(false)
  const [showPlus, setShowPlus] = useState(true)
  //const [emiDistribution, setEmiDistribution] = useState([])
  Date.prototype.addMonths = function (value) {
    var n = this.getDate()
    this.setDate(1)
    this.setMonth(this.getMonth() + value)
    this.setDate(Math.min(n, this.getDaysInMonth()))
    return this
  }
  Date.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  Date.getDaysInMonth = function (year, month) {
    return [
      31,
      Date.isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][month]
  }

  Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear())
  }

  Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth())
  }

  Date.prototype.addMonths = function (value) {
    var n = this.getDate()
    this.setDate(1)
    this.setMonth(this.getMonth() + value)
    this.setDate(Math.min(n, this.getDaysInMonth()))
    return this
  }

  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let res = props.principleValueWithoutUnit
  const sumValue = (year) => {
    var totalAllArr = {
      principal: 0,
      interest: 0,
      total: 0,
      outstanding: props.principleValueWithoutUnit,
    }
    var totalArr = emiDistribution[year]
    console.log('emiDistribution')
    console.log(emiDistribution[2023])

    for (var i = 0; i < totalArr.length; i++) {
      totalAllArr.principal = totalAllArr.principal + totalArr[i].principal
      totalAllArr.interest = totalAllArr.interest + totalArr[i].interest
      totalAllArr.total = totalAllArr.total + totalArr[i].total
      totalAllArr.outstanding = res - totalArr[i].principal
      res = totalAllArr.outstanding
    }
    console.log('totalAllArr ')
    console.log(totalAllArr)
    return totalAllArr
  }
  let showYear = 0
  const monthdetails = (y) => {
    if (showYear == y) {
      showYear = 0
      return true
    }
    showYear = y
  }
  let emiDistribution = []
  let yearArr = []
  let totalInterest = 0
  let totalPayment = 0
  let restAmount = props.principleValueWithoutUnit
  var today = new Date()
  var dd = props.date.split('/')[1]
  var mm = props.date.split('/')[0]
  var yyyy = props.date.split('/')[2]

  if (dd < 10 && dd.includes('0')) {
    dd = dd
  } else {
    dd = '0' + dd
  }

  if (mm < 10 && mm.includes('0')) {
    mm = mm
  } else {
    mm = '0' + mm
  }

  today = mm + '/' + dd + '/' + yyyy

  let startDate = today
  console.log('today' + today)

  let yearDataArr = []
  var dataprincipal = []
  var interest = []

  totalInterest = 0
  totalPayment = 0
  var nextDate = startDate
  var myDate = new Date(nextDate)
  var year = 0
  var month = 0
  var j = 0
  year = myDate.getFullYear()
  var lastYear = year
  var j = 0
  emiDistribution[year] = []

  yearArr = []
  totalInterest = 0
  totalPayment = 0

  var arr = {
    month: 0,
    principal: 0,
    interest: 0,
    total: 0,
    outstanding: props.principleValueWithoutUnit,
  }
  for (var i = 0; i < props.loanTenureValue * 12; i++) {
    var arr = {
      month: 0,
      principal: 0,
      interest: 0,
      total: 0,
      outstanding: restAmount,
    }
    year = myDate.getFullYear()
    month = myDate.getMonth()

    arr.month = month + 1
    arr.date = nextDate

    arr.interest = restAmount * props.monthlyInterestValue
    arr.principal = props.emiValue - arr.interest
    arr.total = props.emiValue
    arr.interest = arr.interest
    totalInterest = totalInterest + arr.interest
    if (i > 0) {
      if (year != lastYear) {
        j = 0
        emiDistribution[year] = []
        yearDataArr[year] = []
      } else {
        j++
      }
    }
    if (j == 0) {
      yearArr.push(year)
    }

    restAmount = restAmount - arr.principal
    arr.outstanding = restAmount
    emiDistribution[year][j] = arr
    lastYear = year
    nextDate = myDate.addMonths(1)
    myDate = new Date(nextDate)
  }

  totalPayment = totalInterest + props.principleValueWithoutUnit

  dataprincipal = []
  interest = []
  for (var l = 0; l < yearArr.length; l++) {
    yearDataArr[yearArr[l]] = sumValue(yearArr[l], res)
    dataprincipal.push(yearDataArr[yearArr[l]].principal)
    interest.push(yearDataArr[yearArr[l]].interest)
  }

  useEffect(() => {
    setconfig({
      type: 'hbar',

      plotarea: {
        'adjust-layout': true,
      },

      scaleX: {
        values: ['Total Amount Payable', 'Principle', 'Total Interest'],
      },

      series: [
        {
          values: [Math.round(totalInterest)],
          'background-color': '#004aad',
        },

        {
          values: [Math.round(props.principleValueWithoutUnit)],
          'background-color': '#03989e',
        },
        {
          values: [Math.round(totalPayment)],
          text: 'Amount Invested',
          'background-color': '#7b84b2',
        },
      ],
    })
    props.emiAmountResult()
  }, [
    props.principleValueWithoutUnit,
    props.principleValueWithUnit,
    props.emiValue,
    props.emiAmountWithUnit,
    props.annualInterestValue,
    props.loanTenureValue,
  ])
  const handleEmiDistribution = () => {
    setShow(true)
  }
  const handleCloseButton = () => {
    setShow(false)
  }
  const handlePlus = () => {
    setShowChart(true)
    setShowMinus(true)
    setShowPlus(false)
  }
  const handleMinus = () => {
    setShowChart(false)
    setShowPlus(true)
    setShowMinus(false)
  }
  const convertCurrency = (amount) => {
    let val = amount

    /**let val = Math.abs(amount)
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Cr'
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' Lac'
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2) + 'K'
    }*/
    return Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 5,
    }).format(val)
  }
  return (
    <div>
      <div className='background'>
        <p class='calculate-value-for'> Monthly EMI</p>
        <p class='calculate-value-amount'>
          <i class='fa fa-inr' aria-hidden='true'></i> {props.emiAmountWithUnit}
        </p>

        <p class='calculate-value-details'>
          On a principal loan amount of{' '}
          <span>
            {' '}
            <i class='fa fa-inr' aria-hidden='true'></i>{' '}
            {props.principleValueWithUnit}
          </span>{' '}
          at <span>{props.annualInterestValue}%</span> for{' '}
          <span>{props.loanTenureValue} years</span>.
        </p>
        <div id='summary-box'>
          <div class='mt-2'>
            <div class=''>
              <ZingChart data={config} width='362' height='181' />
            </div>
          </div>
        </div>
        <button
          type='button'
          class='btn btn-primary'
          data-toggle='modal'
          data-target='#distributionModal'
          onClick={handleEmiDistribution}
        >
          View Emi Distribution
        </button>
      </div>

      {show ? (
        <div>
          <div>
            <h4 class='modal-title'>
              Emi Distribution (Impact of Rate of Return vs. Time)
            </h4>
            <button
              type='button'
              class='close'
              data-dismiss='modal'
              onClick={handleCloseButton}
            >
              X
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th
                  class='panel-title'
                  width='10%'
                  style={{ 'text-align': 'center' }}
                >
                  Year
                </th>
                <th
                  class='panel-title'
                  width='15%'
                  style={{ 'text-align': 'center' }}
                >
                  Principal(A)
                </th>
                <th
                  class='panel-title'
                  width='15%'
                  style={{ 'text-align': 'center' }}
                >
                  Interest(B)
                </th>
                <th
                  class='panel-title'
                  width='20%'
                  style={{ 'text-align': 'center' }}
                >
                  Total (A+B)
                </th>
                <th
                  class='panel-title'
                  width='20%'
                  style={{ 'text-align': 'center' }}
                >
                  Outstanding
                </th>
                <th
                  class='panel-title'
                  width='20%'
                  style={{ 'text-align': 'center' }}
                >
                  Loan Paid To Date
                </th>
              </tr>
            </thead>
            {yearArr.map((y) => (
              <tbody ng-repeat='y in yearArr'>
                <tr onClick={monthdetails(y)}>
                  <td style={{ 'text-align': 'center' }}>
                    {showPlus ? (
                      <span>
                        <strong>
                          <i class='fa fa-plus' onClick={handlePlus}></i>
                        </strong>
                      </span>
                    ) : (
                      ''
                    )}

                    <div>
                      {showMinus ? (
                        <span>
                          <strong>
                            <i class='fa fa-minus' onClick={handleMinus}></i>
                          </strong>
                        </span>
                      ) : (
                        ''
                      )}
                    </div>

                    <strong>{y}</strong>
                  </td>{' '}
                  <td style={{ 'text-align': 'right' }}>
                    {convertCurrency(Math.round(yearDataArr[y].principal))}
                  </td>{' '}
                  <td style={{ 'text-align': 'right' }}>
                    {convertCurrency(Math.round(yearDataArr[y].interest))}
                  </td>
                  <td style={{ 'text-align': 'right' }}>
                    {convertCurrency(Math.round(yearDataArr[y].total))}
                  </td>{' '}
                  <td style={{ 'text-align': 'right' }}>
                    {convertCurrency(Math.round(yearDataArr[y].outstanding))}
                  </td>
                  <td style={{ 'text-align': 'right' }}>
                    {convertCurrency(
                      Math.abs(
                        ((props.principleValueWithoutUnit -
                          yearDataArr[y].outstanding) *
                          100) /
                          props.principleValueWithoutUnit
                      ).toFixed(2)
                    )}
                    %
                  </td>
                </tr>
                {showChart && showYear == y
                  ? emiDistribution[y].map((x) => (
                      <tr
                        ng-repeat='x in emiDistribution[y]'
                        ng-show='showYear==y'
                        style={{ 'background-color': '#eee' }}
                      >
                        <td style={{ 'text-align': 'center' }}>
                          {monthArr[x.month - 1]}
                        </td>{' '}
                        <td style={{ 'text-align': 'center' }}>
                          {convertCurrency(Math.round(x.principal))}
                        </td>{' '}
                        <td style={{ 'text-align': 'center' }}>
                          {convertCurrency(Math.round(x.interest))}
                        </td>
                        <td style={{ 'text-align': 'center' }}>
                          {convertCurrency(Math.round(x.total))}
                        </td>{' '}
                        <td style={{ 'text-align': 'center' }}>
                          {convertCurrency(Math.round(x.outstanding))}
                        </td>
                        <td style={{ 'text-align': 'center' }}>
                          {convertCurrency(
                            Math.abs(
                              ((props.principleValueWithoutUnit -
                                x.outstanding) *
                                100) /
                                props.principleValueWithoutUnit
                            ).toFixed(2)
                          )}
                          %
                        </td>
                      </tr>
                    ))
                  : ''}
              </tbody>
            ))}
          </table>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default EmiAmount
