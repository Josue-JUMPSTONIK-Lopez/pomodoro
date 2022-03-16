import React from 'react'
import "./ButtonStyle.css"
interface PropTypes{
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = (props: PropTypes) => {
  return (
    <>
        <button className='button' onClick={props.onClick}>{props.text}</button>
    </>
  )
}
