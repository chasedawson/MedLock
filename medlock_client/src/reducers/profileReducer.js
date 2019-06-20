import { 
    CREATE_PROFILE_BEGIN,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAILURE,
    LOAD_PROFILE_BEGIN,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
    SAVE_PROFILE_BEGIN,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILURE,
    EDIT_PROFILE,
    ADD_PROFILE_MODULE_BEGIN,
    ADD_PROFILE_MODULE_SUCCESS,
    ADD_PROFILE_MODULE_FAILURE, 
    FETCH_ROLES_BEGIN, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_FAILURE, 
    FETCH_AMT_BEGIN, 
    FETCH_AMT_SUCCESS, 
    FETCH_AMT_FAILURE 
} from '../actions/types';

const initialState = {
    profile: null,
    editable: false,
    profileLoading: false,
    profileLoaded: false,
    profileCreated: false,
    profileCreating: false,
    profileSaving: false, 
    addingNewProfileModule: false,
    profileError: null,
    profileModules: [], 
    roles: null, 
    rolesLoading: false, 
    rolesError: null, 
    AMT: null, 
    AMTLoading: false, 
    AMTError: null 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PROFILE_BEGIN:
            return {
                ...state,
                profileCreating: true,
            };
        case CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileCreating: false,
                profileCreated: true,
                profile: action.payload.profile
            };
        case CREATE_PROFILE_FAILURE:
            return {
                ...state, 
                profileCreating: false,
                profileError: action.payload.error
            };
        case LOAD_PROFILE_BEGIN:
            return {
                ...state,
                profileLoading: true
            };
        case LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                profileLoading: false,
                profileLoaded: true,
                profile: action.payload.profile
            };
        case LOAD_PROFILE_FAILURE:
            return {
                ...state,
                profileLoading: false,
                profileLoaded: true,
                profileError: action.payload.error
            };
        case EDIT_PROFILE: 
            return {
                ...state,
                editable: true,
            };
        case SAVE_PROFILE_BEGIN:
            return {
                ...state,
                editable: false,
                profileSaving: true, 
                profileError: null
            };
        case SAVE_PROFILE_SUCCESS:
            console.log(action.payload.updatedPersonalData);
            return {
                ...state,
                profileSaving: false,
                profile: {
                    personalData: action.payload.updatedPersonalData
                }
            };
        case SAVE_PROFILE_FAILURE:
            return {
                ...state,
                profileSaving: false,
                error: action.payload.error,
            };
        case ADD_PROFILE_MODULE_BEGIN:
            return {
                ...state,
                editable: false,
                addingNewProfileModule: true,
            };
        case ADD_PROFILE_MODULE_SUCCESS: 
            return {
                ...state,
                addingNewProfileModule: false,
                profileModule: action.payload.newProfileModule
            };
        case ADD_PROFILE_MODULE_FAILURE: 
            return {
                ...state,
                addingNewProfileModule: false,
                profileError: action.payload.error
            };
        case FETCH_ROLES_BEGIN: 
            return {
                ...state, 
                rolesLoading: true, 
                rolesError: null 
            }
        case FETCH_ROLES_SUCCESS: 
            return {
                ...state, 
                rolesLoading: false, 
                roles: action.payload.roles 
            }
        case FETCH_ROLES_FAILURE: 
            return {
                ...state, 
                rolesLoading: false, 
                rolesError: action.payload.error, 
                roles: {} 
            }
        case FETCH_AMT_BEGIN: 
            return {
                ...state, 
                AMTLoading: true, 
                AMTError: null 
            }
        case FETCH_AMT_SUCCESS: 
            return {
                ...state, 
                AMTLoading: false, 
                AMT: action.payload.AMT 
            } 
        case FETCH_AMT_FAILURE: 
            return {
                ...state, 
                AMTLoading: false, 
                AMTError: action.payload.error 
            } 
        default:
            return state;
    }
}



