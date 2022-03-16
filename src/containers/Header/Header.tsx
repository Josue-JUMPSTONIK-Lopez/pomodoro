import React from 'react'
import "./HeaderStyles.css"

interface propsType{
    children: React.ReactNode
  }

export const Header = (props: propsType) => {
  return (
    <header className="App-header">
             {props.children}
      </header>
  )
}
