import React from 'react'
import { PomodoroCard } from '../PomodoroCard/PomodoroCard'
import "./RecordStyles.css"

interface PropsTypes{
    children: React.ReactNode
}

export const Record = (props:PropsTypes) => {
  return (
    <section className='Record'>
        
        {props.children}
    </section>
  )
}
