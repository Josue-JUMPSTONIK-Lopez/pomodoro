import React from 'react'
import "./PomodoroCardStyles.css";

export interface PomodoroCard{
  date: string,
  task: string,
  type: string,
  time: string,
}

export const PomodoroCard = (props: PomodoroCard) => {
  return (
    <div className='PomodoroCard'>
        <div className='TopCardInfo'>
            <p className='topParaph'>{props.date}</p>
            <p className='topParaph'>{props.type}</p>
        </div>
        <hr />
        <div className='ContentCardInfo'>
            <p className='task'>{props.task}</p>
            <p className='time'>{props.time}</p>
        </div>
    </div>
  )
}
