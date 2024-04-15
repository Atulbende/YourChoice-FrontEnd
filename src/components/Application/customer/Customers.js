import React from 'react'
import { useCustomersQuery } from '../../../rtk/app/customer/mq_customer'
import Grid from '../../common/dataTable/Grid';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
    const {data,isLoading} = useCustomersQuery({ refetchOnMount:true });
    const Navigate=useNavigate()
    const redirectToNew=()=> Navigate('/customer',{state:{ Pid: -1}});
    const columns=[
      { title : 'Pid',data:'Pid',render:(data,_)=>{
        return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true}, 
      { title : 'Customer Name',data:'CustomerName', 'visible' : true  },
      { title : 'Mobile No',data:'MobileNo' , 'visible' : true },
      { title : 'Email',data:'Email', 'visible' : true  },
      { title : 'Gender',data:'Gender', 'visible' : true },
      { title : 'DateOfBirth',data:'DateOfBirth', 'visible' : true },
      { title : 'LastVisit',data:'LastVisit', 'visible' : true },
      { title : 'Status',data:'Status', 'Status' : true }
      ];
    // Grid Configuration;
    const actions=[{"title":'New',"icon":'fa fa-plus',"className":'btn-1',"action":redirectToNew}];
    const redirectTo='/customer';
    const activity='com_delete';
    const tableName='customers'
  return (
   <>
       {!isLoading && <Grid actions={actions}   redirectTo={redirectTo} columns={columns} data={data?.data?.customersGrid} activity={activity} tableName={tableName}></Grid>}
   </>
  )
}
