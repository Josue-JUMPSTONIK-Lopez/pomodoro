import React from 'react'
import "./SelectionStyles.css"

interface PropsTypes{
    children: React.ReactNode
}
export const Selection = (props: PropsTypes) => {
  return (
    <section className='Selection'>
        {props.children}
    </section>
  )
}
