import { apiSlice } from "../../apiSlice";
import {app} from "../../../services/api/endPoints";
const mq_service=apiSlice.injectEndpoints({
    endpoints:(build)=>({
            services:build.query({
                query:()=>
                    ({
                    url: app.app_gridServices,
                    method:'GET'
                }),
                providesTags:['services']
            }),
            serviceSave:build.mutation({
                query:({data})=>({
                    url:app.app_serviceSave,
                    method:'POST',
                    data:data
                }),
                invalidatesTags:['services']
            }),
            openService:build.mutation({
                query:({data})=>({
                    url:app.app_openService,
                    method:'POST',
                    data:data
                })
            }),
    })
})

export const {
    useServicesQuery,
    useServiceSaveMutation,
    useOpenServiceMutation
}=mq_service