import React, { useMemo,useState } from 'react'
import Select from 'react-select'
import '../select-field/selectfields.css'
import {colourStyles} from './style.js'
export default function SelectFields({id,onChangeEvent,options,label,col,val}) {
  const optionValue=useMemo(()=>{
    const a = options.find((_v)=>_v.value==val);
    return a;
  },[val]);
const onChangeHandle=(e)=>{
  onChangeEvent((pre)=>({...pre,[id]:e?.value}))
}
  return (
    <div className={`group-select ${col}` }>
      <span className='group-select-labal'>
        <label id={`_${id}_`} htmlFor="select">{label}</label>
      </span>
      <Select id={id} onChange={onChangeHandle} isClearable styles={colourStyles} defaultValue={'--Select--'} options={options} value={optionValue}/>
    </div>
  )
}
