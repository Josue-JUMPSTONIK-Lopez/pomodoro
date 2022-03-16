import React from 'react';
import "./MainStyles.css";

interface Propstypes{
    children: React.ReactNode,
    type: string
}
export const Main = (props: Propstypes) => {
  return (
    <main className={props.type}> 
        {props.children}
      </main>
  )
}
