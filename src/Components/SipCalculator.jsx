import '../App.css'
import React, { useState, useEffect } from 'react'
import SideNavBar from './SideNavBar'
import BackgroundCard from './BackgroundCard'
import SipCalculation from './SipCalculator/SipCalculation'
import calculator_details from './calculator_details'
import { useLocation } from 'react-router-dom'

function SipCalculator() {
  /**const [show, setShow] = useState(true)
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      setShow(false)
    } else if (location.pathname === '/SipCalculator') {
      setShow(true)
    }
  }, [])*/
  return (
    <div className='App'>
      {/**show ? <SideNavBar /> : ''*/}
      <SideNavBar />
      <div
        className='main-card'
        style={{
          background: '#f3f7fb',
          'border-radius': '30px 0px 0px 30px;',
          overflow: 'hidden;',
        }}
      >
        <div className=' justify-content-md-center'>
          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-6 pt-2 title-class'>
                <BackgroundCard
                  name={calculator_details.sip.name}
                  description={calculator_details.sip.description}
                  src={calculator_details.sip.src}
                />
              </div>
              <div className='col-lg-6 pt-2 calculator-class'>
                <SipCalculation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SipCalculator
