import React from 'react'
import "./PomodoroListStyles.css"
interface PropsTypes{
    children: React.ReactNode
}

export const PomodoroList = (props: PropsTypes) => {
  return (
    <section className='PomodorosList'>
        {props.children}
    </section>
  )
}
