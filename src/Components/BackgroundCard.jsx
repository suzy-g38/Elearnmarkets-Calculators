import React from 'react'

function BackgroundCard(props) {
  return (
    <div>
      <p className='Calculator-name  paragraph-animation paragraph-title'>
        {props.name}
      </p>
      <p className='paragraph-class paragraph-animation'>
        {props.description}
      </p>
      <img
        src={props.src}
        className='calculter-input ng-pristine ng-valid ng-not-empty ng-touched'
        width='250px'
        alt=''
      />
    </div>
  )
}

export default BackgroundCard
