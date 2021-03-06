import './SecondMainContentComponentVer2.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import contentPhoto from '../../Images/geometry.jpg';
import contentPhoto2 from '../../Images/school.jpg';
import { render } from 'react-dom';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';
import MeetingComponent from '../MeetingComponent/MeetingComponent';
import UsersListComponent from '../UsersListComponent/UsersListComponent'
var tablica;

var axios = require('axios');

class SecondMainContentComponentVer2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { spotkania: [], czyPoint: true, text:"" };
    }
changestatus(e){
    console.log("test change" + JSON.stringify(e.target.id));
    this.setState(state => ({
        czyPoint: true,
        text: e,
        selectedMeetingId: undefined

    }));
    
}
    componentDidMount() {
        axios.get('http://94.23.91.119:5000/user/GetUserMeetings/true')
            .then(res => {
                const spotkania = res.data;
                spotkania.forEach(element => {
                    let today = new Date();
          let startDate = new Date(element.endTime);
          let diff = startDate.getTime() - today.getTime();
          console.log(diff + ' ' + element.meetSubject);
                });
                this.setState({ spotkania });
                console.log(spotkania)
            })
    }
    render() {
        if (this.state.czyPoint) {
            return (
                <>
                    <Row>
                        <Col sm="9" md="9" lg="9" xl="9">
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <div className="oknoSpotkanie">
                                        <p className="StyledPragraph">Oczekiwanie na rozpoczęcie spotkania:</p>
                                        <p className="StyledPragraph">Oczekiwanie na rozpoczęcie spotkania:</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>

                                <>
                                    {this.state.spotkania.map(spotkanie => <Col sm="4" md="4" lg="4" xl="4"><MeetingComponent meetingClicked={(meetingId) => {
                                        this.setState({
                                                selectedMeetingId: meetingId
                                            })
                                        }} spotkanieTemat={spotkanie.meetSubject} id={spotkanie.meetId} spotkanieStart={spotkanie.startTime} spotkanieKoniec={spotkanie.endTime} spotkanieCzyMaPunkty={spotkanie.isCheckpointsExist} czyUzupelnionePointy={(e) => this.changestatus(e)}/></Col>)}
                                </>
                                        {this.state.selectedMeetingId}
                            </Row>
                        </Col>
                        <Col >
                            <UsersListComponent />
                        </Col>
                    </Row>

                </>
            )

        }

    }
}
export default SecondMainContentComponentVer2