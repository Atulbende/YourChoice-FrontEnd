import React, { useEffect } from 'react'
import { useServicesQuery } from '../../../rtk/app/service/mq_service'
import Grid from '../../common/dataTable/Grid';
import { useNavigate } from 'react-router-dom';
import { DialogHeader } from '../../common/dialog/Dialog';
export default function Services() {
    const {data,isLoading} = useServicesQuery();
    const Navigate=useNavigate()
    const redirectToNew=()=> Navigate('/Service',{state:{ Pid: -1}});
    const columns=[
      { title : 'Pid',data:'Pid',render:(data,_)=>{
        return  '<p class="link-primary" >'+  data.toString() +'0000000' +'</p>'}, 'visible' : true}, 
      { title : 'Service Name',data:'ServiceName', 'visible' : true  },
      { title : 'Gender',data:'Gender', 'visible' : true },
      { title : 'Rate',data:'Rate', 'visible' : true  },
      ];
    // Grid Configuration;
    const actions=[{"title":'New',"icon":'fa fa-plus',"className":'btn-1',"action":redirectToNew}];
    const redirectTo='/service';
    const activity='com_delete';
    const tableName='services'
  return (
   <>
       {!isLoading && <Grid actions={actions}   redirectTo={redirectTo} columns={columns} data={data?.data?.servicesGrid} activity={activity} tableName={tableName}></Grid>}
   </>
   

  )
}

