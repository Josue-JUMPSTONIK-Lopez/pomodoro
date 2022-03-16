import React from 'react';
import "./TittleStyles.css";

interface PropsTypes{
  title: string
}
export const Tittle = (props: PropsTypes) => {
  return (
    <>
        <h2>{props.title}</h2>
    </>
  )
}
