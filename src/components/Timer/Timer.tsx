import React from 'react'
import "./TimerStyles.css"

interface PropsTypes{
  time: string
}

export const Timer = (props:PropsTypes) => {
  return (
    <>
    <p className='SelectionTimes'>{props.time}</p>
    </>
  )
}
