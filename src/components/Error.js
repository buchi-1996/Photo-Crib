import React from 'react'

const Error = ({errColor, border, errMessage}) => {
  return (
    <div className={`${errColor}  border-[1.8px] ${border} rounded bg-opacity-10 w-full py-3 px-4 my-4 text-sm`}>
        <p className='text-black'>{errMessage}</p>
    </div>
  )
}

export default Error