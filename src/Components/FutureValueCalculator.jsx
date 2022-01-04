import '../App.css'
import SideNavBar from './SideNavBar'
import BackgroundCard from './BackgroundCard'
import CostOfDelayCalculation from './FutureValueCalculator/FutureValueCalculation'
import calculator_details from './calculator_details'

function FutureValueCalculator() {
  return (
    <div className='App'>
      <SideNavBar />
      <div
        className='main-card'
        style={{
          background: '#f3f7fb',
          'border-radius': '30px 0px 0px 30px;',
          'margin-right': '0 !important',
          overflow: 'hidden;',
        }}
      >
        <div className='justify-content-md-center'>
          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-6 pt-2 title-class'>
                <BackgroundCard
                  name={calculator_details.futureValue.name}
                  description={calculator_details.futureValue.description}
                  src={calculator_details.futureValue.src}
                />
              </div>
              <div className='col-lg-6 pt-2 calculator-class'>
                <CostOfDelayCalculation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FutureValueCalculator
