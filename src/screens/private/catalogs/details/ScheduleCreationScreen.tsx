import React, { useState, useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Navigation } from '../../../../helpers/interfaces/appInterfaces';
import useForm from '../../../../hooks/useForm';
import ideasApi from '../../../../api/ideasApi';
import { CustomHeader } from '../../../../components/Layout/CustomHeader';
import CustomButton from '../../../../components/CustomButton';
import CustomInput from '../../../../components/CustomInput';
import { general } from '../../../../theme/customTheme';
import { filterObj, throwAlert } from '../../../../helpers/tools';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface RequestInitialState {
    error: boolean,
    message: string,
    isFetching: boolean,
    appointmentTypes: Array<T>,
    prospects: {
        selected: Object,
        list: Array<any>,
        filtered: Array<any>,
    }
};

type RequestActions =
    | { type: 'SET_ERROR_STATE', payload: { error: boolean, message: string } }
    | { type: 'FETCHING_DATA', payload: { isFetching: boolean } }
    | { type: 'SET_INITIAL_DATA', payload: { prospects: Array<any>, appointmentTypes: Array<any> } }
    | { type: 'SET_FILTERS', payload: { filtered: Array<any> } }
    | { type: 'SET_SELECTED_PROSPECT', payload: { prospect: Object } }
    | { type: 'RESET_FILTERS' }

const initialState = {
    error: false,
    message: '',
    prospects: {
        selected: {},
        list: [],
        filtered: [],
    },
    isFetching: false,
    appointmentTypes: []
}

const datePickerReducer = (state: RequestInitialState = initialState, action: RequestActions): RequestInitialState => {
    switch (action.type) {
        case 'FETCHING_DATA':
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        case 'SET_ERROR_STATE':
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
                message: action.payload.message
            }
        case 'SET_FILTERS':
            return {
                ...state,
                prospects: { ...state.prospects, filtered: action.payload.filtered },
            }
        case 'RESET_FILTERS':
            return {
                ...state,
                prospects: { ...state.prospects, filtered: [] },
            }
        case 'SET_SELECTED_PROSPECT':
            return {
                ...state,
                prospects: { ...state.prospects, selected: action.payload.prospect, filtered: [] },
            }
        case 'SET_INITIAL_DATA':
            return {
                ...state,
                isFetching: false,
                prospects: { ...state.prospects, list: action.payload.prospects },
                appointmentTypes: action.payload.appointmentTypes
            }
        default:
            return state
    }
}

const ScheduleCreationScreen = ({ navigation }: Navigation) => {
    const [state, dispatch] = useReducer(datePickerReducer, initialState);

    const [open, setOpen] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [visibilityDateTimePicket, setVisibilityDateTimePicket] = useState(false);
    const [datePickerType, setDatePickerType] = useState('date');
    const [appointmentType, setAppointmentType] = useState(null);

    const { prospect, duration, appointment_date, appointment_hour, onChange } = useForm({
        prospect: '',
        duration: '',
        appointment_date: "",
        appointment_hour: "",
        // appointment_date: new Date(), Formato para IOS
        // appointment_hour: new Date(),
    });

    useEffect(() => {
        onInit()
    }, [])

    useEffect(() => {
        const timeOutId = setTimeout(() => handleSearchProspects(prospect), 200);
        return () => clearTimeout(timeOutId);
    }, [prospect])

    const handleSetSelectedProspect = (prospect: any) => {
        setVisibility(true);
        dispatch({ type: 'SET_SELECTED_PROSPECT', payload: { prospect } })
        onChange(`${prospect.name} ${prospect.second_surname}`, 'prospect')
    }

    const handleSearchProspects = (value: string) => {
        if (value.length > 3) {
            setVisibility(false);
            const filtered = filterObj(value, 'name', state.prospects.list);
            dispatch({ type: 'SET_FILTERS', payload: { filtered } })
        } else if (value.trim().length === 0) {
            dispatch({ type: 'RESET_FILTERS' })
        }

    }

    const handleAddReques = async (prospect: string, appointmentType: any, duration: string, date: string, time: string) => {
        try {
            const validated = validateRequestData(prospect, appointmentType, duration, date, time);
            if (!validated.error) {
                //const filtered = filterObj(prospect, 'name', state.prospects.list);
                dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true } })
                const localStorage = await AsyncStorage.getItem('userIdeas');
                const user = localStorage != null ? JSON.parse(localStorage) : null
                const request = {
                    appointment_date: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
                    appointment_hour: `${time}:00`,
                    duration: duration,
                    agent_id: user.agent_id,
                    is_done: "0",
                    prospect_id: "1",
                    appointment_type_id: appointmentType
                }
                const { data } = await ideasApi.post('/appointments', request);
                dispatch({ type: 'FETCHING_DATA', payload: { isFetching: false } })
                if (data) {
                    navigation.navigate('ScheduleList')
                } else {
                    throwAlert("Error", "No ha sido posible guardar el registro.");
                }
            } else {
                throwAlert("Error", validated.message);
            }
        } catch (error) {
            throwAlert("Error", "El servico por el momento no está disponible favor de intentarlo mas tarde");
        }
    }

    const validateRequestData = (prospect: string, appointmentType: string, duration: string, date: string, time: string) => {
        let result = { error: false, message: '' }
        if (prospect.trim() === '')
            return { error: true, message: "Es necesario que seleccione un contacto valido de la lista de opciones." }

        if (appointmentType === null)
            return { error: true, message: "Es necesario que seleccione un tipo de cita." }

        if (duration.trim() === '')
            return { error: true, message: "Es necesario que introdusca la duración de la cita." }

        if (date.trim() === '')
            return { error: true, message: "Es necesario que introdusca una fecha." }

        if (time.trim() === '')
            return { error: true, message: "Es necesario que capture la hora de la cita." }

        return result;

    }

    const onInit = async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true } })
            /**
             * OBTENEMOS EL LISTADO DE PROSPECTOS
             */
            const localStorage = await AsyncStorage.getItem('userIdeas');
            const user = localStorage != null ? JSON.parse(localStorage) : null
            const { data: prospects }: any = await ideasApi.get<ProspectsResponse>(`/prospects`, {
                params: { agent_id: user.agent_id }
            });

            /**
             * OBTENEMOS EL LISTADO TIPOS DE POLIZA
             */
            const { data: appointmentTypes }: any = await ideasApi.get(`/appointment_types`);
            let list: any[] = []
            appointmentTypes.map((item: any, i: number) => {
                list = [
                    ...list,
                    {
                        label: item.name,
                        value: item.id
                    }
                ]
            })
            dispatch({
                type: 'SET_INITIAL_DATA',
                payload: {
                    prospects,
                    appointmentTypes: list
                }
            })
        } catch (error) {
            dispatch({
                type: 'SET_ERROR_STATE',
                payload: {
                    error: true,
                    message: "Por el momento el servicio no esta disponible, favor de intentarlo mas tarde."
                }
            })
        }



    }

    const handleVisibilityDatePicker = (type: string) => {
        setDatePickerType(type)
        setVisibilityDateTimePicket(!visibilityDateTimePicket);
    }

    const setDateValue = (date: string, type: string) => {
        const format = type === "date" ? "DD-MM-YYYY" : "HH:mm";
        const fomatedDate = moment(date).format(format)
        setVisibilityDateTimePicket(false);
        if (type === "date") {
            onChange(fomatedDate, "appointment_date")
        } else {
            onChange(fomatedDate, "appointment_hour")
        }
    }

    const getFormatedDate = (type: string) => {
        if (appointment_date !== '' && appointment_hour !== '') {
            const format = type === "date" ? "DD-MM-YYYY" : "HH:mm"
            const currentDate = type === "date" ? appointment_date : appointment_hour
            return new Date(moment(currentDate, format).format())
        }
        return new Date();
    }

    const IosDatePicket = () => {
        return (
            <View>
                <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Fecha</Text>
                <DateTimePicker
                    display="inline"
                    minimumDate={new Date()}
                    value={appointment_date}
                    onChange={(event: any, date: any) => onChange(date, 'appointment_date')}
                />
                <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Hora</Text>
                <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={appointment_hour}
                    onChange={(event: any, date: any) => onChange(date, 'appointment_hour')}
                />
            </View>
        );
    }

    const AndroidDatePicket = () => {
        return (
            <View>

                <Text style={{ fontSize: 20, marginBottom: 10 }}>Fecha</Text>
                <TouchableOpacity
                    onPress={() => handleVisibilityDatePicker('date')}
                >
                    <CustomInput
                        maxLength={10}
                        keyboardType='numeric'
                        editable={false}
                        value={appointment_date}
                    />

                </TouchableOpacity>

                <Text style={{ fontSize: 20, marginBottom: 10 }}>Hora</Text>
                <TouchableOpacity
                    onPress={() => handleVisibilityDatePicker('time')}
                >
                    <CustomInput
                        maxLength={10}
                        keyboardType='numeric'
                        editable={false}
                        value={appointment_hour}
                    />

                </TouchableOpacity>
                {visibilityDateTimePicket
                    ? <DateTimePicker
                        mode={datePickerType}
                        minimumDate={new Date()}
                        value={getFormatedDate(datePickerType)}
                        onChange={(event: any, date: any) => {
                            if (event.type === "dismissed") {
                                setVisibilityDateTimePicket(!visibilityDateTimePicket)
                            } else {
                                setDateValue(date, datePickerType)
                            }
                        }}
                    />
                    : null
                }

            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            style={general.fullScreen}
        >
            <CustomHeader
                isHome={true}
                navigation={navigation}
                title='Agregar cita'
            />

            {state.isFetching
                ? <ActivityIndicator size="small" color="#0000ff" />
                : <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[general.global_margin, { marginVertical: 33, }]}
                >

                    <View>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Contácto</Text>
                        <Autocomplete
                            hideResults={visibility}
                            data={state.prospects.filtered}
                            value={prospect}
                            onChangeText={(value: string) => onChange(value, 'prospect')}
                            containerStyle={{ marginBottom: 15 }}
                            flatListProps={{
                                keyExtractor: (_: any, idx: any) => idx,
                                renderItem: ({ item }: any) => {
                                    return (<TouchableOpacity
                                        onPress={() => handleSetSelectedProspect(item)}
                                        style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Text style={{ fontSize: 20 }}>{item.name} {item.second_surname}</Text>
                                    </TouchableOpacity>)
                                },
                            }}
                        />
                    </View>

                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Tipo de cita</Text>
                    <DropDownPicker
                        placeholder="Selecciones una opción"
                        open={open}
                        value={appointmentType}
                        items={state.appointmentTypes}
                        setOpen={setOpen}
                        setValue={setAppointmentType}
                        style={{
                            borderColor: 'transparent',
                            marginBottom: 20,
                        }}
                        textStyle={{
                            fontSize: 20,
                            color: '#23233C'
                        }}
                    />

                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Duración</Text>
                    <CustomInput
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={(value: string) => onChange(value, 'duration')}
                        placeholder='Duración (horas)'
                        value={duration}
                    />

                    {
                        Platform.OS === 'ios'
                            ? IosDatePicket()
                            : AndroidDatePicket()
                    }

                    <CustomButton
                        onPress={() => handleAddReques(prospect, appointmentType, duration, appointment_date, appointment_hour)}
                        title='Agregar'
                    />

                </ScrollView>}
        </KeyboardAvoidingView>
    )
}

export default ScheduleCreationScreen;


const styles = StyleSheet.create({})