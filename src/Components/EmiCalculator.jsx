import '../App.css'
import SideNavBar from './SideNavBar'
import BackgroundCard from './BackgroundCard'
import EmiCalculation from './EmiCalculator/EmiCalculation'
import calculator_details from './calculator_details'

function EmiCalculator() {
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
                  name={calculator_details.emi.name}
                  description={calculator_details.emi.description}
                  src={calculator_details.emi.src}
                />
              </div>
              <div className='col-lg-6 pt-2 calculator-class'>
                <EmiCalculation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmiCalculator
