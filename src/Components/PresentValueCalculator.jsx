import '../App.css'
import SideNavBar from './SideNavBar'
import BackgroundCard from './BackgroundCard'
import PresentValueCalculation from './PresentValueCalculator/PresentValueCalculation'
import calculator_details from './calculator_details'

function PresentValueCalculator() {
  
  return (
    <div className='App'>
      <SideNavBar />
      <div
        className='main-card'
        style={{
          background: '#f3f7fb',
          'border-radius': '30px 0px 0px 30px;',

          overflow: 'hidden;',
        }}
      >
        <div className='justify-content-md-center'>
          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-6 pt-2 title-class'>
                <BackgroundCard
                  name={calculator_details.presentValue.name}
                  description={calculator_details.presentValue.description}
                  src={calculator_details.presentValue.src}
                />
              </div>
              <div className='col-lg-6 pt-2 calculator-class'>
                <PresentValueCalculation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresentValueCalculator
