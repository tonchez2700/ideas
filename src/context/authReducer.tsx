import { User } from "../helpers/interfaces/appInterfaces";

export interface AuthState {
    errorMessage:   string;
    status:         'checking' | 'authenticated' | 'no-authenticated';
    token:          string | null;
    user:           User | null;
    expires_at:     Date | null;
}

type AuthAction =
    | { type: 'singUp', payload: { token: string | null, user: User, expires_at: Date }}
    | { type: 'refreshToken', payload: { expires_at: Date } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }


export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                status: 'no-authenticated',
                token: null,
                user: null
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'singUp':
            return {
                ...state,
                errorMessage: '',
                expires_at: action.payload.expires_at,
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case 'refreshToken':
            return {
                ...state,
                errorMessage: '',
                expires_at: action.payload.expires_at,
                status: 'authenticated'
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'no-authenticated',
                token: null,
                user: null
            }
    
        default:
            return state;
    }
}