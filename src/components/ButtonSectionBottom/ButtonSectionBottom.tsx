import React from 'react'
import "./ButtonSectionBottom.css";

interface PropsTypes{
    children: React.ReactNode
}

export const ButtonSectionBottom = (props:PropsTypes) => {
  return (
    <div className='ButtonSectionBottom'>
        {props.children}
    </div>
  )
}
