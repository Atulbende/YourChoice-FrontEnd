import React, { useEffect } from 'react'
import { useAppointmentsQuery } from '../../../rtk/app/appointment/mq_appointment'
import Grid from '../../common/dataTable/Grid';
import { useNavigate } from 'react-router-dom';
export default function Appointments() {
    const {data,isLoading} = useAppointmentsQuery();
    const Navigate=useNavigate()
    const redirectToNew=()=> Navigate('/Appointment',{state:{ Pid: -1}});
    const columns=[
      { title : 'Pid',data:'Pid',render:(data,_)=>{
      return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true},
      { title : 'Visit Date',data:'VisitDate', 'visible' : true  },
      { title : 'Appointment No',data:'AppointmentNo', 'visible' : true  },
      { title : 'Customer Name',data:'ClientName', 'visible' : true },
      { title : 'Mobile No',data:'MobileNo', 'visible' : true  },
      ];
    // Grid Configuration;
    const actions=[{"title":'New',"icon":'fa fa-plus',"className":'btn-1',"action":redirectToNew}];
    const redirectTo='/appointment';
    const activity='com_delete';
    const tableName='appointments' 
  return (
   <>
        <Grid actions={actions}   redirectTo={redirectTo} columns={columns} data={data?.data?.appointmentsGrid} activity={activity} tableName={tableName}></Grid>
   </>
  )
  
}

