import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import { Button } from 'reactstrap';
import { editProfile, saveProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profilePic from './profile_pic.png';
import editPic from './edit-profile.png';
import '../../css/Profile.css';
import ReactGA from 'react-ga'; 

class Profile extends Component {
    onProfileSave = (updatedPersonalData) => {
        console.log(updatedPersonalData);
        //
        ReactGA.event({
            category: 'Profile Interaction', 
            action: 'Updated Personal Data', 
            label: 'Click Save after Edit Profile'
        }); 
        this.props.saveProfile(updatedPersonalData, this.props.role);
    }

    onProfileEdit = () => {
        ReactGA.event({
            category: 'Profile Interaction', 
            action: 'Opened Edit Profile Form', 
            label: 'Click Edit Profile'
        }); 
        this.props.editProfile();
    }

    profileModulesHTML = profileModules => {
        var merged = [].concat.apply([], profileModules);
        profileModules = merged;
        return profileModules.map(profileModule => (
            <ProfileModule name={profileModule.name} content={profileModule.content} editable={this.props.editable} />
        ));
    };

    // addProfileModule = () => { 
    //     this.setState(prevState => ({
    //         profileModules: [...prevState.profileModules, 
    //             {
    //                 name: "Name",
    //                 content: "Content",
    //                 editable: true   
    //             }
    //         ]
    //     }));
    // }

    render() {
        const { personalData, profileSaving, error, editable, role } = this.props;

        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            )
        }

        if (profileSaving) {
            return (
                <div>
                    Saving profile . . .
                </div>
            )
        }

        return (
            <div className="profile-container" align="center">
                <h1 className="header">Profile</h1>
                <div className="main" align="center">
                    <img className="profilePic" src={profilePic} />
                    <Button variant="light" onClick={this.onProfileEdit} className="editProfile">Edit Profile<img src={editPic} width="30" height="30" /></Button>
                    <div className="personalInfo-container">
                        <PersonalInfo personalData={personalData} onProfileSave={this.onProfileSave} onProfileEdit={this.onProfileEdit} editable={editable} role={role} />
                    </div>
                    {/* <div className="profileModules-container">
                        {this.profileModulesHTML(this.state.profileModules)}
                        <Button onClick={this.addProfileModule}>+</Button>
                    </div>                 */}
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    editable: PropTypes.object.isRequired,
    personalData: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    userData: state.authState.userData.personalData,
    editable: state.profileState.editable,
    profileLoading: state.profileState.loadingProfile,
    profileSaving: state.profileState.profileSaving,
    error: state.profileState.error,
    roles: state.authState.roles,
});

export default connect(mapStateToProps, { editProfile, saveProfile })(Profile);