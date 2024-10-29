import React from 'react'

export const Items = ({name, price, description}) => {
  return (
    <div>
        <h1>{name} </h1>
        <h2>{description}</h2>
        <h2>${price}</h2>
    </div>
  )
}