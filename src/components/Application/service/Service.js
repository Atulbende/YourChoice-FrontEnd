import React,{useEffect,useState} from 'react'
import { root } from '../../../services/root/root';
import { useServiceSaveMutation,useOpenServiceMutation } from '../../../rtk/app/service/mq_service';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ActionBar from '../../layout/actionbar/ActionBar';
import TextFields from '../../common/text-field/TextFields';
import SelectFields from '../../common/select-field/SelectFields';
export default function Service() {
const [openService]=useOpenServiceMutation();
const [serviceSave]=useServiceSaveMutation();
const Navigate=useNavigate()
const [service,setService]=useState({});
const [isRequired,setIsRequired]=useState([]);
const {state:recordId}= useLocation();
const saveHandle=async()=>{
      return await root.form.save(serviceSave,isRequired,service);
}
useEffect(()=>{
  if(!recordId) Navigate('/services');
    root.form.load(openService,recordId,setService,setIsRequired);
  },[recordId])
const GenderOptoins = [{ value: 'Male', label: 'Male' },{ value: 'Female', label: 'Female' }];
const actions=[{"title":'Save',"icon":'fa fa-check',"className":'btn-1',"action":saveHandle}];
  return (
    <>
      <ActionBar type={'Form'} actionsButton={actions}/>
      <div  className='content-form'><br/>
      <TextFields onChangeEvent={setService} val={service?.ServiceName} label='Service Name' id={'ServiceName'} col='col-33'/> 
      <SelectFields onChangeEvent={setService}  val={service?.Gender} options={GenderOptoins} label='Gender' id='Gender' col='col-33'></SelectFields>
      <TextFields onChangeEvent={setService} val={service?.Rate} label='Rate' id={'Rate'} col='col-33'/> 
    </div>
    </>
  )
}
