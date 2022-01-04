import React from 'react'
import { useState } from 'react'

function SensitivityAnalysis(props) {
  const [result, setresult] = useState('')
  const interestArr = [
    props.interestValue - 2,
    props.interestValue,
    props.interestValue + 2,
  ]
  const yearArr = [5, 10, 15, 20, 30]
  let data_index_0 = []
  let data_index_1 = []
  let data_index_2 = []
  const tableSipResult = (interestValue, yearValue) => {
    let investment = parseInt(props.principleValue.replace(',', ''))
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
    return val
  }

  return (
    <div>
      <div className='container tab-pane fade active show'>
        <div className='show-value-inner-box'>
          <table className='table table-striped'>
            <th scope='col'>Time/Rate</th>
            {interestArr.map((i) => (
              <th scope='col'>{i}%</th>
            ))}
            <tbody>
              {yearArr.map((i, index) => (
                <tr className='table-row'>
                  <td className='table-cell'>{i} years</td>
                  <td style={{ margin: '20px;' }}>
                    {tableSipResult(props.interestValue - 2, i)}
                  </td>
                  <td>{tableSipResult(props.interestValue, i)}</td>
                  <td>{tableSipResult(props.interestValue + 2, i)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SensitivityAnalysis
