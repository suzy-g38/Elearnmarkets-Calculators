import '../App.css'
import SideNavBar from './SideNavBar'
import BackgroundCard from './BackgroundCard'
import BecomeCrorepatiCalculation from './BecomeCrorepatiCalculator/BecomeCrorepatiCalculation'
import calculator_details from './calculator_details'

function BecomeCrorepati() {
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
                  name={calculator_details.becomeCrorepati.name}
                  description={calculator_details.becomeCrorepati.description}
                  src={calculator_details.becomeCrorepati.src}
                />
              </div>
              <div className='col-lg-6 pt-2 calculator-class'>
                <BecomeCrorepatiCalculation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeCrorepati
