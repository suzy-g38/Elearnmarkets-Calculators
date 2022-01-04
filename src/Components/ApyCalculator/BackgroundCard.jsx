import React from 'react'

function BackgroundCard() {
  return (
    <div>
      <p className='Calculator-name paragraph-class paragraph-animation'>
        Atal Pension Yojana
      </p>
      <p className='paragraph-class paragraph-animation'>
        This calculator helps you calculate the monthly premium you need to
        invest in order to receive the desired pension amount after retirement
        (Retirement age considered as 60) under Atal Pension Yojana.
      </p>
      <img
        src='https://www.elearnmarkets.com/site/assets/img/Atal-pension-Yojana.png'
        class='img-fluid mt-2 not-display-in-ph image-class'
        width='250px'
        alt=''
      />
    </div>
  )
}

export default BackgroundCard
