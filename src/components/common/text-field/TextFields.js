import React, { memo, useEffect, useState } from 'react'
import '../text-field/textfields.css'
 function TextFields({onChangeEvent,onSubmition,col='col-33',label,val,id,limit,customFN}) {

  function HandleOnSubmition(e){
      if( onSubmition &&  e.keyCode===13){
          onSubmition.current.click();
      }
  }
  const  onChangeHandler=(e)=>{
    const { id, value } = e.target;

    onChangeEvent((pre)=>({...pre,[id]:value}));

    if(limit && customFN && value.length==limit){
      customFN(value)
    }
  }
  return (
    <div className={`slideform group-text ` + col }>
      <span className='group-text-labal'>
        <label  id={`_${id}_`} htmlFor="text">{label}</label>       
      </span>
      <input autocomplete="off" id={id} onChange={onChangeHandler}  onKeyUp={HandleOnSubmition} type='text' value={val} maxLength={limit || 100}></input>
    </div>
  )
}
export default memo(TextFields)