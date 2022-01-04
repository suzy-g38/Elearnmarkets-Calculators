import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function SideNavBar() {
  const [active, setActive] = useState(0)
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/sip-calculator' || location.pathname === '/') {
      setActive(1)
    } else if (location.pathname === '/future-value-calculator') {
      setActive(2)
    } else if (location.pathname === '/cost-of-delay-calculator') {
      setActive(3)
    } else if (location.pathname === '/present-value-calculator') {
      setActive(4)
    } else if (location.pathname === '/become-crorepati-calculator') {
      setActive(5)
    } else if (location.pathname === '/emi-calculator') {
      setActive(6)
    } else if (location.pathname === '/apy-calculator') {
      setActive(7)
    }
  }, [])
  return (
    <div>
      <div className='col-lg-3 side-nav'>
        <p
          className='text-center mb-2'
          style={{ fontSize: '1.5rem', color: '#000' }}
        >
          Investment Tools
        </p>
        <ul>
          <li>
            {' '}
            <NavLink
              className={
                active === 1
                  ? 'active-side-menu Calculator-side-menu'
                  : 'Calculator-side-menu'
              }
              to='/sip-calculator'
            >
              SIP
            </NavLink>
          </li>

          <li>
            <NavLink
              className={
                active === 2
                  ? 'active-side-menu Calculator-side-menu'
                  : 'Calculator-side-menu'
              }
              to='/future-value-calculator '
            >
              {' '}
              Future Value
            </NavLink>
          </li>
          <li>
            <NavLink
              className={
                active === 3
                  ? 'active-side-menu Calculator-side-menu'
                  : 'Calculator-side-menu'
              }
              to='/cost-of-delay-calculator'
            >
              {' '}
              Cost Of Delay
            </NavLink>
          </li>

          <li>
            <NavLink
              className={
                active === 4
                  ? 'active-side-menu Calculator-side-menu'
                  : 'Calculator-side-menu'
              }
              to='/present-value-calculator'
            >
              {' '}
              Present Value
            </NavLink>
          </li>

          <li>
            <NavLink
              className={
                active === 5
                  ? 'active-side-menu Calculator-side-menu'
                  : 'Calculator-side-menu'
              }
              to='/become-crorepati-calculator'
            >
              {' '}
              Become a Crorepati
            </NavLink>
          </li>

          <li>
            <NavLink
              className={
                active === 6
                  ? 'active-side-menu Calculator-side-menu'
                  : 'Calculator-side-menu'
              }
              to='/emi-calculator'
            >
              {' '}
              EMI Calculator
            </NavLink>
          </li>

          <li>
            <NavLink
              className={
                active === 7
                  ? 'active-side-menu Calculator-side-menu'
                  : 'Calculator-side-menu'
              }
              to='/apy-calculator'
            >
              {' '}
              Atal Pension Yojana{' '}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideNavBar
