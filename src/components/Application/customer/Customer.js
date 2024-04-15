import React, { useEffect, useState } from 'react'
import { useCustomerSaveMutation, useOpenCustomerMutation } from '../../../rtk/app/customer/mq_customer';
import { root } from '../../../services/root/root';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ActionBar from '../../layout/actionbar/ActionBar';
import TextFields from '../../common/text-field/TextFields';
import SelectFields from '../../common/select-field/SelectFields';
import DateTimePickerField from '../../common/datetimepicker/DateTimePicker';

export default function Customer() {
const [openCustomer]=useOpenCustomerMutation();
const [customerSave]=useCustomerSaveMutation();
const Navigate=useNavigate()

const [customer,setCustomer]=useState({});
const [isRequired,setIsRequired]=useState([]);
const {state:recordId}= useLocation();
const saveHandle=async()=>{
      return await root.form.save(customerSave,isRequired,customer);
}
useEffect(()=>{
  console.log('customer:',customer)
},[customer]);
useEffect(()=>{
  if(!recordId) Navigate('/Customers');
    root.form.load(openCustomer,recordId,setCustomer,setIsRequired);
  },[recordId])
const Statusoptions = [{ value: 'Active', label: 'Active' },{ value: 'DeActive', label: 'DeActive' }];
const GenderOptoins = [{ value: 'Male', label: 'Male' },{ value: 'Female', label: 'Female' }];
const actions=[{"title":'Save',"icon":'fa fa-check',"className":'btn-1',"action":saveHandle}];
  return (
    <>
      <ActionBar type={'Form'} actionsButton={actions}/>
      <div  className='content-form'><br/>
      <TextFields onChangeEvent={setCustomer} val={customer?.CustomerName} label='Customer Name' id={'CustomerName'} col='col-33'/> 
      <TextFields onChangeEvent={setCustomer}val={customer?.MobileNo} label='Mobile No' id='MobileNo' col='col-33'/> 
      <TextFields onChangeEvent={setCustomer}val={customer?.Email} label='Email' id='Email' col='col-33'/> 
      {/* <TextFields onChangeEvent={setCustomer}val={user?.MobileNo} label='Email' id='Email' col='col-33'/> 
      <TextFields onChangeEvent={setCustomer}val={user?.MobileNo} label='Email' id='Email' col='col-33'/> 
    */}
      <SelectFields onChangeEvent={setCustomer}  val={customer?.Gender} options={GenderOptoins} label='Gender' id='Gender' col='col-33'></SelectFields>
      <SelectFields onChangeEvent={setCustomer}  val={customer?.Status} options={Statusoptions} label='Status' id='Status' col='col-33'></SelectFields>
      <DateTimePickerField  onChangeEvent={setCustomer} val={customer?.DateOfBirth} label='Date of Birth' id='DateOfBirth' col='col-33'></DateTimePickerField>
      <DateTimePickerField  onChangeEvent={setCustomer} val={customer?.LastVisit} label='Last visit' id='LastVisit' col='col-33'></DateTimePickerField>
  
    </div>
    </>
  )
}
