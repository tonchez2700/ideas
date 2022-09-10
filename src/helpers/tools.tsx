import moment from 'moment';

import { AgendaScheduleDataType, AppointmentsResponseType } from './interfaces/appTypes';
import { ScheduleResponse } from '../helpers/interfaces/appInterfaces';


export const getAgendaScheduleFormatByAppointmentsResponse = (appointment: AppointmentsResponseType ) : AgendaScheduleDataType  => {
    let result = {}
    const start = moment().startOf('month').format('YYYY-MM-DD')
    const end = moment().endOf('year').format('YYYY-MM-DD')
    let events: any = {}

    for(let i = 0; i < appointment.length; i++ ) {
        let item = appointment[i]
        let keyName = appointment[i].appointment_date
        let obj = {
            id: item.id,
            name: item.notes,
            is_done: item.is_done,
            appointment_hour: item.appointment_hour,
            duration: item.duration
        }
        if(!events[keyName]) 
            events = { ...events, [keyName]: [obj] }
        else
            events[keyName] = [ ...events[keyName], obj ]
    }

    for (var m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
        let loopDate = m.format('YYYY-MM-DD')
        if(events[loopDate]){
            result = { ...result, [loopDate]: events[loopDate] }
        }else{
            result = { ...result, [loopDate]: [] }
        }
    }

    return result
}

export const filterObj = (needle: string, key: string, data: Array<T>) => {
    return data.filter((item: any) => {
        if(typeof item[key] !== 'undefined'){
            let value: String = item[key].trim().toLowerCase();
            if( value.includes( needle.trim().toLowerCase() ) ){
                return item;
            }
        }
    })
}