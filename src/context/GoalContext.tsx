import React, { useReducer, createContext } from 'react';
import { Alert } from 'react-native';
import ideasApi from '../api/ideasApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoalReducer, GoalState } from '../reducers/GoalReducer';

type GoalContextProps = {
    fetching: boolean,
    updatePersonalGoal: (personalGoal: string) => Promise<void>;  
    fetchPersonalGoal: () => void;
    setModalVisibilityState: (visibility: boolean) => void;
}

const goalInitialState: GoalState = {
    error: false,
    fetching: false,
    message: '',
    modalVisible: false,
    personalGoal: '',
    progress: {
        policies_sold_amount: 500,
        goal: 1000,
        goal_percentage: 50,
    }
}

export const GoalContext = createContext({} as GoalContextProps);

export const GoalProvider = ({ children }: any ) => {
    const [state, dispatch] = useReducer(GoalReducer, goalInitialState);

    const updatePersonalGoal = async(personalGoal: string) => {
        try {
            if(personalGoal !== ''){
                dispatch({ type: 'goal/fetching', payload: { fetching: true } })
                const localStorage = await AsyncStorage.getItem('userIdeas');
                const user = localStorage != null ? JSON.parse(localStorage) : null
                const { data }: any = await ideasApi.put(`/goals/${user.id}`, { "goal": personalGoal })
                if(typeof data.status !== 'undefined' && !data.status){
                    Alert.alert(
                        "Error al actualizar",
                        "Ya ha asignado una meta personal.",
                        [
                            {
                                text: "Aceptar", 
                                onPress: () => dispatch({ type: 'goal/set_modal_visibility_state', payload: { modalVisible: false } })
                            }
                        ]
                    );
                }else{
                    Alert.alert(
                        "Actualizacion correcta",
                        "Se ha asignado su meta personal correctamente.",
                        [
                            {
                                text: "Aceptar", 
                                onPress: () => dispatch({ 
                                    type: 'goal/update_personal_goal', 
                                    payload: { progress: recalculatePersonalGoal(0, parseInt(personalGoal)) } })
                            }
                        ]
                    );
                }
            }else{
                Alert.alert("Es necesario que introdusca su meta personal.");
            }

        } catch (error) {
            const message = "Por el momento no ha sido posible actualizar su meta personal, favor de intentarlo mas tarde."
            dispatch({ type: 'goal/set_error', payload: { message } })
            Alert.alert(message);
        }
    }

    const recalculatePersonalGoal = (personalGoal: number, goal: number) => {        
        return {
            policies_sold_amount: personalGoal,
            goal: goal,
            goal_percentage: (personalGoal / goal) * 100,
        }
    }

    const fetchPersonalGoal = async() => {
        try {
            dispatch({ type: 'goal/fetching', payload: { fetching: true } })
            const localStorage = await AsyncStorage.getItem('userIdeas');
            const user = localStorage != null ? JSON.parse(localStorage) : null
            const { data }: any = await ideasApi.get(`/goals/calculatepercentage/${user.id}`)
            dispatch({ type: 'goal/update_personal_goal', payload: { progress: data } })
        } catch (error) {
            console.log(error)
        }
    }

    const setModalVisibilityState = (visibility: boolean) => {
        dispatch({ type: 'goal/set_modal_visibility_state', payload: { modalVisible: visibility } })
    }

    return (
        <GoalContext.Provider value={{
            ...state,
            fetchPersonalGoal,
            updatePersonalGoal,
            setModalVisibilityState,
        }}>
            { children }
        </GoalContext.Provider>
    )
}