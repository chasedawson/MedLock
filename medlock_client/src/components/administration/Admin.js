import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import { fetchAMT } from '../../auth/AuthManagement'; 
import { auth0Registration, assignRoles } from '../../actions/authActions'; 
import { createProviderProfile } from '../../actions/providerActions'; 
import { MEDLOCK_API } from '../../config/servers';

const axios = require('axios'); 


class Admin extends Component {
 
    state = {};

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        });
        
    }

    createNewProvider = (e) => {
        e.preventDefault(); 

        fetchAMT() 
            .then(res => {
                console.log(res); 
                const AMT = res.data.access_token; 
                
                const password = Math.random().toString(36).slice(-12); 

                const newProvider = {
                    "name": this.state.name, 
                    "email": this.state.email,
                    "password": password,
                    "connection": "Username-Password-Authentication"
                };

                // Create New Provider in Auth0 
                this.props.auth0Registration(newProvider, AMT) 
                    .then(() => {
                        // Send Temporary Password 
                        this.newProviderEmail(newProvider); 

                        // Create New Provider in MongoDB 
                        const user_id = this.props.userProfile.user_id; 
                        this.props.createProviderProfile({
                            _id: user_id.substring(6), 
                            personalData: {
                                name: this.state.name, 
                                email: this.state.email 
                            }
                        // Eventually create administrator roles and query user roles. 
                        }, "Admin"); 

                        // Assign Provider Role to New User 
                        this.props.assignRoles(user_id, AMT, "Provider"); 


                    }) 
                    .catch(error => console.log(error)); 
            }) 
            .catch(error => console.log(error)); 
    }

    newProviderEmail = (newProvider) => {
        var url = `${MEDLOCK_API}/email`;
        axios.post(url, newProvider); 
    }

    deleteAllProviders = () => {
        var url = `${MEDLOCK_API}/admin/provider`;
        axios.delete(url)
            .then(console.log("All Providers Deleted Successfully"))
            .catch(err => console.log(err));
    }

    deletePatient = (patientId) => {
        console.log(patientId);
        var url = `${MEDLOCK_API}/admin/patient?_id=${patientId}&deleteAll=false`;
        fetchAMT()
            .then(res => {
                const AMT = res.data.access_token; 
                axios.delete(url, {
                    data: {
                        AMT
                    }
                })
                    .then((err) => {
                        if(err) {console.log(err); throw Error(err)};
                        alert(`Patient ${patientId} deleted successfully`);
                    })
                    .catch(err => alert(`Error On Delete: ${err}`));
            });            
    }

    deleteAllPatients = () => {
        var url = `${MEDLOCK_API}/admin/patient?_id=0&deleteAll=true`;
        axios.delete(url)
            .then(alert(`All patients deleted successfully`))
            .catch(err => alert(`Error On Delete: ${err}`));
    }

    render() {
        return (
            <div>
                <h1>Administration</h1>
                <div>
                    <h1>Create New Provider</h1>
                    <form onSubmit={this.createNewProvider}>
                        <p>Name: <input type="text" name="name" onChange={this.onChange} /></p>
                        <p>Email: <input type="text" name="email" onChange={this.onChange} /></p>
                        <button type="submit">Create New Provider </button>
                    </form>
                </div>
                <div>
                    <h1>DANGER ZONE</h1>
                    <button onClick={this.deleteAllProviders}>DELETE ALL PROVIDERS</button>
                </div>
                <div>
                    <form>
                        <label>
                            User ID To Delete:
                            <input type="text" name="_id" onChange={this.onChange} />
                        </label>
                        {/* <button onClick={this.deletePatient}>DELETE PATIENT</button> */}
                    </form>
                    <button onClick={() => this.deletePatient(this.state._id)}>DELETE SPECIFIED PATIENT</button>
                </div>
                <div>
                <button onClick={this.deleteAllPatients}>DELETE ALL PATIENTS</button>
                </div>
            

            </div>
        )
    }
} 

const mapStateToProps = state => ({
    userProfile: state.authState.userProfile 
});

export default connect(mapStateToProps, { auth0Registration, createProviderProfile, assignRoles })(Admin); 