import $ from 'jquery'
import { Screen } from '../../components/common/notifications/toastify';
export const root={
            grid:{
                init:async function(data,columns,Navigate,redirectTo,setIds){
                    var table = $('#sampleTable').DataTable({ 'data': data, 'columns': columns, destroy: true});
                    ($('#sampleTable.dataTable').find('tbody')).on('click', 'tr td', function (event) {
                      $(this).parent().toggleClass('selected');
                      console.log('red:',table)
                      var cellDT = table.cell(this).index();
                      setIds(root.grid.getSelectedIds());
                      if (cellDT) if (cellDT.column === 0) Navigate(redirectTo, { state: table.rows(this).data()[0]});
                    }); 
                },
                getSelectedIds: function(){
                    var table = $('#sampleTable').DataTable();
                    var items = $.map(table.rows('.selected').data(), function (item) {
                      return item.Pid;
                    }); return items;
                },
                selectAll:function(){
                    var table = $('#sampleTable').DataTable();
                    table .rows({page:'current'}).nodes().to$() .addClass('selected');
                    var items = $.map(table.rows('.selected').data(), function (item) {
                      return item.Pid;
                    }); 
                    return items;
                },
                deselectAll:function(){
                    var table=$('#sampleTable').DataTable();
                    table .rows( '.selected' ).nodes().to$() .removeClass( 'selected' );
                },
                resetGrid:function(){
                    ($('#sampleTable.dataTable').find('tbody')).on('click', 'tr td', function (event) {
                        $(this).parent().toggleClass('selected');
                      });
                },
                delete:async function(_id=[],rtk,_activity,_table){
                    console.log(':id:',_id,_activity)
                    const _data={id:_id,activity:_activity,table:_table};
                    const res=await rtk({data:_data});
                    Screen.Notification.Success(Screen.Notification.Msg.Def5,2000);
                    return res;
                }
            },
            form:{
                load:async function(rtk,id,setForm,setRequired){
                    if(id){
                        const res = await rtk({data:id});
                        res?.data?.data?.required.forEach((_v)=>{$(`#_${_v}_`).addClass('required');})
                        setRequired(res?.data?.data?.required);
                        sessionStorage.setItem('formObj',JSON.stringify(res?.data?.data?.result[0]));
                        setForm(res?.data?.data?.result[0]);
                    }
                },
                save:async function(rtk,isRequired,formObj){
                    const flag = await root.validation.valid(isRequired,formObj)
                    if(flag){
                    const res = await rtk({data:formObj});
                    if(res?.data?.data?.result?.id>0){
                        Screen.Notification.Success(res?.data?.data?.result?.Msg,2000);
                    }else{
                        Screen.Notification.Warm(res?.data?.data?.result?.Msg,2000);
                    }
                    }
                    // console.log('isRequired:',isRequired);
                },
            },
            validation:{
                    valid:async function(_fields,formObj){
                        if(JSON.stringify(formObj)===sessionStorage.getItem('formObj')){
                            Screen.Notification.Error("Nothing has been Changed",2000);
                            return false;
                        }
                        const _rf=[];
                        for(let [key,value] of Object.entries(formObj)){
                            if(_fields.includes(key)){
                                $('#'+key).removeClass('border-danger required-msg-shake');
                                if(value==='' || value===undefined || value===null)_rf.push(key);
                            }
                        }
                        if(_rf.length>0){
                            let message='';
                            _rf.forEach((_v)=>{
                                message=_v.match(/[A-Z][a-z]+|[0-9]+/g).join(" ").toString();
                                Screen.Notification.Error(<div>Input Required: <br/>{message}</div>,2000);
                                 $('#'+_v).addClass('border-danger required-msg-shake');
                                 setTimeout(()=>{
                                    $('#'+_v).removeClass('required-msg-shake');
                                 },300);
                            })
                            return false;
                        }
                        return true;
                    }
            }

       
        
    
} 