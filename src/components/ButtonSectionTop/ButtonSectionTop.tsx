import React from 'react'
import "./ButtonSectionTopStyles.css"

interface Propstypes{
    children: React.ReactNode
}

export const ButtonSectionTop = (props: Propstypes) => {
  return (
    <div className='ButtonsSectionTop'>
        {props.children}
    </div>
  )
}
