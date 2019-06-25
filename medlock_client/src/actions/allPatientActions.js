import { 
  FETCH_ALL_PATIENTS_BEGIN,
  FETCH_ALL_PATIENTS_SUCCESS,
  FETCH_ALL_PATIENTS_FAILURE,
  ADD_PATIENT_BEGIN,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE
} from './types'; 
import auth0client from '../auth/Auth'; 

const axios = require('axios'); 

// Helper functions give access to the status of the request 
export const fetchAllPatientsBegin = () => ({
    type: FETCH_ALL_PATIENTS_BEGIN
  });
  
export const fetchAllPatientsSuccess = allPatients => ({
    type: FETCH_ALL_PATIENTS_SUCCESS,
    payload: {
        allPatients
    }
  });
  
export const fetchAllPatientsFailure = error => ({
    type: FETCH_ALL_PATIENTS_FAILURE,
    payload: {
        error
    }
  });
  
  // Fetch surveys for a particular user with Access Token 
export function fetchAllPatients() {
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
    
    return dispatch => {
        dispatch(fetchAllPatientsBegin());
            // Change this URL ??? 
        return axios.get(`${API_URL}/provider/allPatients`, { headers })
            .then(res => {
              console.log(res.data);
              dispatch(fetchAllPatientsSuccess(res.data));
            })
            .catch(error => dispatch(fetchAllPatientsFailure(error)));
    };
}

const addPatientBegin = () => ({
  type: ADD_PATIENT_BEGIN
});


const addPatientSuccess = allPatients => ({
  type: ADD_PATIENT_SUCCESS,
  payload: {
    allPatients
  }
});
  
const addPatientFailure = error => ({
    type: ADD_PATIENT_FAILURE,
    payload: {
      error
    }
});

export function addPatient(patient) {
  const { getAccessToken } = auth0client;
  const API_URL = 'http://localhost:5000/api/allPatients';
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

  return dispatch => {
    dispatch(addPatientBegin());
    return axios.post(API_URL, patient, { headers })
      .then(res => dispatch(addPatientSuccess(res.data)))
      .catch(error => {
        console.log(error);
        dispatch(addPatientFailure(error));
      });
  }
}