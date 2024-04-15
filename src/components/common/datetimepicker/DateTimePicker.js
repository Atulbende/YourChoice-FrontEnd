import React from 'react'
import $ from 'jquery'
import DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../datetimepicker/datetimepicker.css'
export default function DateTimePickerField({onChangeEvent,val,label,col='col-33',id}) {
    const  onChangeHandler=(data,event)=>{
           onChangeEvent((pre)=>({...pre,[$('#'+id)[0].id]:data}));
           }
  return (
    <>
      <div className={`slideform group-text ` + col }>
            <span className='group-text-labal'>
                <label  id={`_${id}_`} htmlFor="text">{label}</label>       
            </span>
        <DatePicker autoComplete='off'  isClearable   id={id} selected={val} onChange={(data,event)=>onChangeHandler(data,event)} showIcon />
    </div>
    </>
  )
}
