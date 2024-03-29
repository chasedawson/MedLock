import React, { Component } from 'react';
import SearchField from 'react-search-field';
import UserListItem from './UserListItem';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import '../../css/UserList.css';

export default class UserList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            displayedUsers: this.props.users,
            createNewUserForm: false,
        }
    }
    
    userHTML = (users) => {
        console.log("userHTML");
        console.log(this.props.viewUser);
        return this.state.displayedUsers.map(user => (
            <UserListItem 
                className="listItem"
                user={user}
                deleteUser={this.props.deleteUser}
                viewUser={this.props.viewUser} 
                addDispenser={this.props.addDispenser}
            />
        ));
    }

    onFormChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    onSearchChange = (value, e) => {
        e.preventDefault();
        const searchResults = this.props.users.filter(user => {
            return (
                (user.personalData.name.substring(0, value.length) === value) || 
                (user._id.substring(0, value.length) === value) ||
                (user.personalData.email.substring(0, value.length) === value)
            );
        });
        this.setState({ displayedUsers: searchResults });
    }

    createNewUserForm = () => {
        if (this.state.createNewUserForm) {
            return (
                <div className="createNewUserForm">
                    <Form>
                        <FormGroup className="input-form-group">
                            <Label for="newUserName" className="form-heading">Name: </Label>
                            <Input 
                                type="text" 
                                name="newUserName" 
                                id="newUserName"
                                onChange={this.onFormChange}
                            />
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <Label for="newUserEmail" className="form-heading">Email: </Label>
                            <Input 
                                type="text" 
                                name="newUserEmail" 
                                id="newUserEmail"
                                onChange={this.onFormChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <button style={{float: "left"}} className="create-new-btn" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    createNewUserForm: false,
                                });
                                this.props.createNewUser(this.state.newUserName, this.state.newUserEmail);
                            }}>Add Patient</button>
                            <button style={{float: "left"}} className="cancel-button" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    createNewUserForm: false,
                                });
                            }}>Cancel</button>
                        </FormGroup>
                    </Form>
                </div>
            )
        } 
    }
    
    render() {
        console.log(this.props.users);
        return (
            <div className="UserList">
                <div className="UserList-header">
                    <h1 className="header" style={{textAlign: "left", marginBottom: "20px", alignSelf: "center"}}>{this.props.title}</h1>
                    <div className="UserList-ControlPanel">
                        <div className="left">
                            {/* <button className="create-new-btn" onClick={() => this.setState({ createNewUserForm: true })}>+ Create New</button> */}
                            {/* <button className="delete-btn" onClick={() => this.props.deleteAllUsers()}>Delete All</button> */}
                        </div>
                        <div className="right">
                            <SearchField
                                onChange={this.onSearchChange}
                            />
                        </div>
                    </div>
                </div>
                {this.createNewUserForm()}
                <div className="Users-container">{this.userHTML(this.props.users)}</div>
            </div>
        )
    }
}
