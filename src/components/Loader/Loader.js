import React from 'react';
import './loader.css'

const Loader = ({color}) => {
  return (
    <div className={`lds-ellipsis`}><div className={`${color}`}></div><div className={`${color}`}></div><div className={`${color}`}></div><div className={`${color}`}></div></div>
  )
}

export default Loader