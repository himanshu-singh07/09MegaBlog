/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Children } from 'react'

function Button({
    children,
    type='button',
    bgcolor='bg-blue-600',
    texxtcolor='text-white',
    className='',
    ...props

    
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgcolor} ${texxtcolor}`} {...props}>
        {children}
    </button>
  )
}

export default Button