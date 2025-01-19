import React, { useEffect, useRef, useState } from 'react'
import { useAppointmentSaveMutation,useAppointmentListsSaveMutation,useAppointmentsListsQuery, useOpenAppointmentMutation,useGetClientInfoMutation,useGetEmployeeListMutation,useGetServiceListMutation
} from '../../../rtk/app/appointment/mq_appointment.js';
import { root } from '../../../services/root/root';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ActionBar from '../../layout/actionbar/ActionBar';
import TextFields from '../../common/text-field/TextFields';
import SelectFields from '../../common/select-field/SelectFields';
import DateTimePickerField from '../../common/datetimepicker/DateTimePicker';
import Button from '../../common/button/Button.js';
import Grid from '../../common/dataTable/Grid.js';
import {useSelector} from 'react-redux';
import { Screen } from '../../common/notifications/toastify.js';
export default function Appointment() {
const {userId}=useSelector((state)=>state.authControls);
const [openAppointment]=useOpenAppointmentMutation();
const [getEmployeeList]=useGetEmployeeListMutation();
const [getServiceList]=useGetServiceListMutation();
const [appointmentListsSave]=useAppointmentListsSaveMutation();
const [appointmentSave]=useAppointmentSaveMutation();
const [getClientInfo]=useGetClientInfoMutation()
const Navigate=useNavigate()
const [Appointment,setAppointment]=useState({});
const [ServiceItem,setServiceItem]=useState({Pid:-1,EmployeeId:undefined,ServiceId:undefined});
const [employeeList,setEmployeeList]=useState([]);
const [serviceList,setServiceList]=useState([]);
const [isRequired,setIsRequired]=useState([]);
const [total,setTotal]=useState(0);
let {state:recordId}= useLocation();
// Services List Start
const { data, error, isLoading } =useAppointmentsListsQuery({AppointmentNo:Appointment?.AppointmentNo})
const saveHandle=async()=>{
  console.log('pp',data?.data)
  if(data?.data?.appointmentListsGrid.length==0 || !Appointment?.ClientName || !Appointment.MobileNo )
  {
    Screen.Notification.Warm('Please Select Client or add Service',2000);
   
    return
  }
    await root.form.save(appointmentSave,isRequired,Appointment);
       setAppointment((ap)=>({...ap,ClientName:'',MobileNo:'',Pid:'-1'}))
       load();
}

const addServiceInCart=async()=>{
      return await root.form.save(appointmentListsSave,['EmployeeId','ServiceId'],{...ServiceItem,UserId:userId});
}
const findClientInfo=async(value)=>{
    const res=await getClientInfo({data:value});
    const Client=res?.data?.data?.result[0];
    if(Client==undefined)setAppointment((pre)=>({...pre,ClientId:'-1'})); 
    if(Client!=undefined)setAppointment((pre)=>({...pre,ClientId:Client.Pid?Client.Pid:'-1',ClientName:Client?.CustomerName,Gender:Client?.Gender,LastVisitDate:Client?.LastVisit,DateOfBirth:Client?.DateOfBirth,Email:Client.Email})); 
}
useEffect(()=>{
  load();
  },[recordId])
  async function load(){
    if(!recordId) Navigate('/Appointments');
   const res=await root.form.load(openAppointment,recordId,setAppointment,setIsRequired);
   setServiceItem((pre)=>({...pre,AppointmentNo:res?.AppointmentNo}))
    const empList = await getEmployeeList();
    const ServiceList = await getServiceList();
    setEmployeeList(empList.data?.data.result);
    setServiceList(ServiceList.data?.data.result);
  }
const GenderOptoins = [{ value: 'Male', label: 'Male' },{ value: 'Female', label: 'Female' }];
const actions=[{"title":'Save',"icon":'fa fa-check',"className":'btn-1',"action":saveHandle}];

    const columns=[
      { title : 'Pid',data:'Pid',render:(data,_)=>{
        return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true}, 
      { title : 'Appointment No',data:'AppointmentNo', 'visible' : true  },
      { title : 'Customer Name',data:'ServiceName', 'visible' : true },
      { title : 'User Name',data:'UserName', 'visible' : true  },
      { title : 'Employee Name',data:'EmployeeName', 'visible' : true  }
      ];
    // Grid Configuration;
    const listActions=[];
    const redirectTo='';
    const activity='com_delete';
    const tableName='appointmentlists' 
// Service List End
useEffect(()=>{
  if(data?.data?.appointmentListsGrid){
    let total=0;
    data?.data?.appointmentListsGrid.forEach(element => {
      total+=Number(element?.ServiceName?.split('-')[2])
    });
    setTotal(total);
  }
},[data])
  return (
    <>
      <ActionBar type={'Form'} actionsButton={actions}/>
      <div  className='content-form'><br/>
      <DateTimePickerField  onChangeEvent={setAppointment} val={Appointment?.VisitDate} label='Date' id='VisitDate' col='col-33'></DateTimePickerField>
      <TextFields onChangeEvent={setAppointment} val={Appointment?.AppointmentNo} label='Appointment No' id={'AppointmentNo'} col='col-50'/> 
      <TextFields onChangeEvent={setAppointment} val={Appointment?.MobileNo} label='Mobile No' id={'MobileNo'} col='col-33'  limit={10} customFN={findClientInfo}/> 
      <TextFields onChangeEvent={setAppointment} val={Appointment?.ClientName} label='Client Name' id={'ClientName'} col='col-33'/> 
      <TextFields onChangeEvent={setAppointment} val={Appointment?.Email} label='Email' id={'Email'} col='col-33'/> 
      <SelectFields onChangeEvent={setAppointment}  val={Appointment?.Gender} options={GenderOptoins} label='Gender' id='Gender' col='col-25'></SelectFields>
      <DateTimePickerField  onChangeEvent={setAppointment} val={Appointment?.DateOfBirth} label='Date Of Birth' id='DateOfBirth' ></DateTimePickerField>

      <DateTimePickerField  onChangeEvent={setAppointment} val={Appointment?.LastVisitDate} label='Last Visit Date' id='LastVisitDate' ></DateTimePickerField>
      <section className="divider col-100" >Add Services</section>
      <SelectFields onChangeEvent={setServiceItem}  val={ServiceItem?.EmployeeId} options={employeeList} label='Select Employee' id='EmployeeId' col='col-33'></SelectFields>
      <SelectFields onChangeEvent={setServiceItem}  val={ServiceItem?.ServiceId} options={serviceList} label='Select Service' id='ServiceId' col='col-33'></SelectFields>
      <Button className={'btn col-15'} icon='fa-sharp fa-solid fa-xmark' title='Add' action={addServiceInCart}  />
      <strong className='col-15 label'>Total: {total}</strong>
      <section className="divider col-100" >Services list</section>
        {!isLoading && data && <Grid actions={listActions}   redirectTo={''} columns={columns} data={data?.data?.appointmentListsGrid} activity={activity} tableName={tableName}></Grid>}
      </div>
    </>
  )
}
