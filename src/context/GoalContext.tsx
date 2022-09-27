import React, { useReducer, createContext } from 'react';
import ideasApi from '../api/ideasApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoalReducer, GoalState } from '../reducers/GoalReducer';

type GoalContextProps = {
    fetching: boolean,
    updatePersonalGoal: (goal: number) => Promise<void>; 
    updateProgress: (goal: number, currentGoal: number) => Promise<void>; 
    fetchPersonalGoal: () => void;
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

    const updatePersonalGoal = async(goal: number) => {}

    const updateProgress = async(goal: number, currentGoal: number) => {}

    const fetchPersonalGoal = async() => {
        try {
            dispatch({ type: 'goal/fetching', payload: { fetching: true } })
            const localStorage = await AsyncStorage.getItem('userIdeas');
            const user = localStorage != null ? JSON.parse(localStorage) : null
            const { data }: any = await ideasApi.get(`/goals/calculatepercentage/${user.id}`)
            dispatch({ type: 'goal/set_goal_data', payload: { progress: data } })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GoalContext.Provider value={{
            ...state,
            updateProgress,
            fetchPersonalGoal,
            updatePersonalGoal,
        }}>
            { children }
        </GoalContext.Provider>
    )
}