import React, { useState, useEffect } from 'react'
import SideNavBar from './SideNavBar'
import SipCalculator from './SipCalculator.jsx'
import PresentValueCalculator from './PresentValueCalculator'
import FutureValueCalculator from './FutureValueCalculator'
import CostOfDelayCalculator from './CostOfDelayCalculator'
import EmiCalculator from './EmiCalculator'
import ApyCalculator from './ApyCalculator'
import BecomeCrorepatiCalculator from './BecomeCrorepatiCalculator'
import { Router, Routes, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
      <SipCalculator />
    </div>
  )
}

export default Home
