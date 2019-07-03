import React, { Component } from 'react'

export default class PersonalDataView extends Component {
    render() {
        const { name } = this.props.personalData;
        return (
            <div className="personalDataView-container">
                <div className="title">
                    <h2>Personal Data</h2>
                </div>
                <div className="content">
                    <h4>{name}</h4>
                </div>
            </div>
        )
    }
}
