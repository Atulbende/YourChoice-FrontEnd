import { React, useEffect, useRef, useState } from 'react'
import './actionbar.scss'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables'

import Dialog from '../../common/dialog/Dialog'
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import { root } from '../../../services/root/root.js';
import { useComDeleteMutation } from '../../../rtk/common/common.js';
export default function ActionBar({ ids, setIds, setRefresh, type, actionsButton, activity, tableName }) {
  const [comDelete]=useComDeleteMutation()
  const Navigate = useNavigate();
  const [actionToggle, setActionToggle] = useState('')
  const [isConfirm, setIsConfirm] = useState(false);
  const table = $('#sampleTable').DataTable();
  
  function newRecord() {
    Navigate('/Role', { Id: 0 });
  }
  function resetHandle() {
    setRefresh(true);
  }
  function selectHandle() {
    ids == 0 ? root.grid.selectAll() : root.grid.deselectAll();
    setIds(root.grid.getSelectedIds())
  }
  function confirmatinYes(){
    setIsConfirm(true);

  }
  async function deleteHandle() {
      await root.grid.delete(ids,comDelete,activity,tableName)
      setRefresh(true);
      setIsConfirm(false);
  }
  function toggleActionFn() {
    actionToggle === 'd-none' ? setActionToggle('d-flex') : setActionToggle('d-none')
  }

  return (
    <section className='action-bar'>
      <span className='error_msg'></span>
      <div className='bar-title'>
      </div>
      <div className='bar'>
        <div role='button' onClick={toggleActionFn} className='menu-collaps'><i class={`fa-solid fa-circle-chevron-${actionToggle === 'd-flex' ? 'up' : 'down'}`}></i><span>Actions</span></div>
        <div className='trasition-bar'>
          <ul className={`bar-button ${actionToggle}`} >
            {actionsButton?.map((btn, index) =>
             <li key={index} onClick={btn.action} className={btn.className}><i className={btn.icon} aria-hidden="true"></i><span>{btn.title}</span></li>)
             }
            {type === 'Grid' && table.rows().count() > 0 &&
              <>
                <li onClick={() => { selectHandle() }} className='btn-1'><section className='_count'><span>{ids?.length}</span></section><i className="fa fa-tasks p-1" aria-hidden="true"></i><span>{ids?.length > 0 ? `DeSelect` : `Select All`}</span></li>

                {ids?.length > 0 && <li onClick={() => { confirmatinYes() }} className='btn-1'><i className="fa fa-trash p-1" aria-hidden="true"></i><span>Delete</span></li>}
                <li onClick={() => { resetHandle() }} className='btn-1'><i className="fa fa-redo p-1" aria-hidden="true"></i><span>Reset</span></li>

              </>}
            {/* <li onClick={()=>{saveData()}} ref={BtnSaveFn} className='btn-1'><i className="fa fa-floppy-disk" aria-hidden="true"></i><span>Save</span></li>
              <li onClick={()=>{DeleteData()}} ref={btnUpdate} className='btn-1'><i className="fa fa-trash" aria-hidden="true"></i><span>Delete</span></li>
              <li className='btn-1'><i className="fa fa-trash" aria-hidden="true"></i><span>Print</span></li>
              <li className='btn-1'><i className="fa fa-floppy-disk" aria-hidden="true"></i><span>Send</span></li> */}
          </ul>
        </div>
      </div>
      {/* <Dialog/> */}
      {isConfirm && <ConfirmationDialog
        title={'Delete Record'}
        message={'Are you sure to Delete record!'}
        confirmYes={deleteHandle}
        confirmNo={setIsConfirm} />}
      {/* <ConfirmationDialog></ConfirmationDialog> */}
    </section>
  )
}
