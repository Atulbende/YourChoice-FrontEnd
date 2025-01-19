import { apiSlice } from "../../apiSlice";
import {app} from "../../../services/api/endPoints";
const mq_service=apiSlice.injectEndpoints({
    endpoints:(build)=>({
            appointments:build.query({
                query:()=>
                    ({
                    url: app.app_gridAppointments,
                    method:'GET'
                }),
                providesTags:['appointments']
            }),
            appointmentsLists: build.query({
                query: (params) => {
                    const queryString = new URLSearchParams(params).toString(); // Converts params to query string
                    return {
                        url: `${app.app_gridAppointmentLists}?${queryString}`,
                        method: 'GET',
                    };
                },
                providesTags:['appointmentItemList']

            }),
            
            getClientInfo:build.mutation({
                query:(data)=>
                    ({
                    url: app.app_getClientInfo,
                    method:'POST',
                    data:data
                }),
            }),
            getEmployeeList:build.mutation({
                query:(data)=>
                    ({
                    url: app.app_getEmployeeList,
                    method:'POST',
                    data:data
                }),
            }),
            getServiceList:build.mutation({
                query:(data)=>
                    ({
                    url: app.app_getServiceList,
                    method:'POST',
                    data:data
                }),
            }),
            appointmentSave:build.mutation({
                query:({data})=>({
                    url:app.app_appointmentSave,
                    method:'POST',
                    data:data
                }),
                invalidatesTags:['appointment','appointmentItemList']
            }),
            appointmentListsSave:build.mutation({
                query:({data})=>({
                    url:app.app_appointmentListsSave,
                    method:'POST',
                    data:data
                }),
                invalidatesTags:['appointmentItemList']
            }),
            openAppointment:build.mutation({
                query:({data})=>({
                    url:app.app_openAppointment,
                    method:'POST',
                    data:data
                })
            }),
    })
})

export const {
    useAppointmentsQuery,
    useAppointmentsListsQuery,
    useAppointmentSaveMutation,
    useOpenAppointmentMutation,
    useGetClientInfoMutation,
    useGetEmployeeListMutation,
    useGetServiceListMutation,
    useAppointmentListsSaveMutation
}=mq_service