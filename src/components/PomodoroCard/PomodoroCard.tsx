import React from 'react'
import "./PomodoroCardStyles.css";

export interface propsTypes{
  id: number;
  date: string,
  task: string,
  type: string,
  time: string,
  removePomodoroCard: Function
}

export const PomodoroCard = (props: propsTypes) => {
  return (
    <div className='PomodoroCard'>
        <p onClick={() => props.removePomodoroCard(props.id)} className='Remove'>X</p>
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
