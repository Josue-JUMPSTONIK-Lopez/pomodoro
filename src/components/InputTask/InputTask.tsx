import React from 'react'
import "./InputTaskStyles.css"

interface PropsTypes{
  value:string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const InputTask = (props:PropsTypes) => {
  return (
    <>
        <input type="text" value={props.value} onChange={props.onChange} placeholder='What task are you doing?'/>
    </>
  )
}
