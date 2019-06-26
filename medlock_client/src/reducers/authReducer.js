import {
    FETCH_ROLES_BEGIN, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_FAILURE, 
    AUTH0_REGISTRATION_BEGIN, 
    AUTH0_REGISTRATION_SUCCESS, 
    AUTH0_REGISTRATION_FAILURE 
} from '../actions/types';

const initialState = {
    roles: null, 
    rolesLoading: false, 
    rolesError: null, 
    AMT: null, 
    AMTLoading: false, 
    AMTError: null, 
    userProfile: null, 
    userProfileLoading: false, 
    userProfileError: null 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_ROLES_BEGIN: 
            return {
                ...state, 
                rolesLoading: true, 
                rolesError: null 
            };
        case FETCH_ROLES_SUCCESS: 
            return {
                ...state, 
                rolesLoading: false, 
                roles: action.payload.roles 
            };
        case FETCH_ROLES_FAILURE: 
            return {
                ...state, 
                rolesLoading: false, 
                rolesError: action.payload.error, 
                roles: {} 
            }; 
        case AUTH0_REGISTRATION_BEGIN: 
            return {
                ...state, 
                userProfileLoading: true, 
                userProfileError: null 
            }; 
        case AUTH0_REGISTRATION_SUCCESS: 
            return {
                ...state, 
                userProfileLoading: false, 
                userProfile: action.payload.userProfile 
            };
        case AUTH0_REGISTRATION_FAILURE: 
            return {
                ...state, 
                userProfileLoading: false, 
                userProfileError: action.payload.error 
            }; 
        default:
            return state;
    }
}