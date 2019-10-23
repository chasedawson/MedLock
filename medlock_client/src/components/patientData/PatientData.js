import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions'; 
import { fetchDispenser } from '../../actions/dispenserActions';  
import AveragePDISurveyBar from '../graphs/AveragePDISurveyBar';
import '../../css/PatientData.css'; 
import PDISurveyLine from '../graphs/PDISurveyLine';
import PDISurveyStack from '../graphs/PDISurveyStack';
import DispenseScatter from '../graphs/DispenseScatter';
import PDISurveyPie from '../graphs/PDISurveyPie';
import PDISurveyBar from '../graphs/PDISurveyBar';

/** 
 * Component for displaying individual patient data
 * in the patient portal. 
 */

class PatientData extends Component {

    state = {
        retrievedData: false 
    }

    // Fetch Surveys and Dispenses data from database 
    componentWillMount() {
        this.props.fetchPDISurveys(); 
        console.log(this.props);
        this.props.fetchDispenser(this.props.profile.medicalData.dispenser_id); 
    }

    render() {        
        const { allPDISurveys, 
                surveysLoading, 
                surveysLoaded,
                surveyError, 
                dispenser, 
                dispenserLoading, 
                dispenserLoaded,
                dispenserError } = this.props; 

        if(surveyError || dispenserError) {
            return (
                <div>
                    <div>Survey Error: { surveyError ? surveyError.message : null}</div>
                    <div>Dispense Error: {dispenserError ? dispenserError.message : null}</div>
                </div>
            ); 
        }

        if(surveysLoading || dispenserLoading || !surveysLoaded || !dispenserLoaded) {
            return (
                <div>Loading . . . </div>
            )
        }
        if(dispenser != null){
            return (
                <div>
                    <PDISurveyBar data={allPDISurveys} width={800} height={400} />
                    <DispenseScatter data={dispenser.dispenses} width={800} height={400} />
                </div>
                // <div className="pd-container">
                //     <div className="pd-body">
                //         <h1>My Data</h1>
                //         <div>
                //             <PDISurveyBar data={allPDISurveys[0]} />
                //         </div>
                //         <div>
                //             <AveragePDISurveyBar data={allPDISurveys} />
                //         </div>
                //         <div>
                //             <PDISurveyLine data={allPDISurveys} />
                //         </div>
                //         <div>
                //             <PDISurveyStack data={allPDISurveys} />
                //         </div>
                //         <div>
                //             <PDISurveyPie data={allPDISurveys} />
                //         </div>
                //         <div>
                //             <DispenseScatter data={dispenser.dispenses} />
                //         </div>
                //     </div>
                // </div>
            );
        }
        return (
            <div className="pd-container">
                    <div className="pd-body">
                        <h1>My Data</h1>
                        <div>
                            <AveragePDISurveyBar data={allPDISurveys} />
                        </div>
                        <div>
                            <PDISurveyLine data={allPDISurveys} />
                        </div>
                        <div>
                            <PDISurveyStack data={allPDISurveys} />
                        </div>
                        <div>
                            <PDISurveyPie data={allPDISurveys} />
                        </div>
                    </div>
                </div>
        )
    }
}

PatientData.propTypes = {
    fetchPDISurveys: PropTypes.func.isRequired,
    allPDISurveys: PropTypes.array.isRequired, 
    surveysLoading: PropTypes.bool.isRequired,
    surveysLoaded: PropTypes.bool.isRequired,
    surveyError: PropTypes.object,

    
    fetchDispenser: PropTypes.func.isRequired, 
    dispenser: PropTypes.array.isRequired,
    dispenserLoading: PropTypes.bool.isRequired,
    dispenserLoaded: PropTypes.bool.isRequired,
    dispenserError: PropTypes.object
}

const mapStateToProps = state => ({
    allPDISurveys: state.surveyState.responses, 
    surveysLoading: state.surveyState.surveysLoading,
    surveysLoaded: state.surveyState.surveysLoaded,
    surveyError: state.surveyState.error,  
    dispenser: state.dispenseState.dispenser, 
    dispenserLoading: state.dispenseState.dispenserLoading,
    dispenserLoaded: state.dispenseState.dispenserLoaded,
    dispenserError: state.dispenseState.error 

});

export default connect(mapStateToProps, { fetchPDISurveys, fetchDispenser })(PatientData);

