import React from 'react'
import './radiobutton.css'
export default function ({label,val,isChecked,fn}) {
    
  return (
    <div className='rd-box' >
            <input type='radio' value={val} onChange={(e)=>{fn(e)}} checked={isChecked}/>
                    <span>
                        {label}
                    </span>
    </div>
  )
}
