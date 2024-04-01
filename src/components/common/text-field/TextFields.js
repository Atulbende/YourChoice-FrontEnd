import React, { useEffect, useState } from 'react'
import '../text-field/textfields.css'
export default function TextFields({onChangeEvent,onSubmition,col='col-33',label,val,id}) {

  function HandleOnSubmition(e){
      if( onSubmition &&  e.keyCode===13){
          onSubmition.current.click();
      }
  }
  const  onChangeHandler=(e)=>{
    onChangeEvent((pre)=>({...pre,[e.target.id]:e.target.value}))
  }
  return (
    <div className={`slideform group-text ` + col }>
      <span className='group-text-labal'>
        <label  id={`_${id}_`} htmlFor="text">{label}</label>       
      </span>
      <input id={id} onChange={onChangeHandler}  onKeyUp={HandleOnSubmition} type='text' value={val}></input>
    </div>
  )
}
