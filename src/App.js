import './App.css'
import { Router, Routes, Route } from 'react-router-dom'

import Home from './Components/Home'
import SipCalculator from './Components/SipCalculator.jsx'
import PresentValueCalculator from './Components/PresentValueCalculator'
import FutureValueCalculator from './Components/FutureValueCalculator'
import CostOfDelayCalculator from './Components/CostOfDelayCalculator'
import EmiCalculator from './Components/EmiCalculator'
import ApyCalculator from './Components/ApyCalculator'
import BecomeCrorepatiCalculator from './Components/BecomeCrorepatiCalculator'
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/sip-calculator' element={<SipCalculator />} exact />

        <Route
          path='/future-value-calculator'
          element={<FutureValueCalculator />}
          exact
        />
        <Route
          path='/cost-of-delay-calculator'
          element={<CostOfDelayCalculator />}
          exact
        />
        <Route
          path='/present-value-calculator'
          element={<PresentValueCalculator />}
          exact
        />
        <Route
          path='/become-crorepati-calculator'
          element={<BecomeCrorepatiCalculator />}
          exact
        />
        <Route path='/emi-calculator' element={<EmiCalculator />} exact />
        <Route path='/apy-calculator' element={<ApyCalculator />} exact />
      </Routes>
    </div>
  )
}

export default App
