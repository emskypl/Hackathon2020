import "./SecondMainContentComponentVer2.css";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "react-activity/lib/Dots/Dots.css";
import MeetingComponent from "../MeetingComponent/MeetingComponent";
import UsersListComponent from "../UsersListComponent/UsersListComponent";
import test from '../../Images/Screenshot_1.png'

var tablica;

var axios = require("axios");

class SecondMainContentComponentVer2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            spotkania: [],
            czyPoint: true,
            text: "",
            selectedMeetingId: undefined,
            selectedCheckpoints: undefined
        };
    }
    meetingClicked(id) {
        axios
            .get(
                "http://94.23.91.119:5000/User/CheckIsMeetingActiveAndGetUsers/" +
                id +
                "/true"
            )
            .then((res) => {
                let user = res.data;
                if (user.attendees != null && user.attendees != undefined) {
                    this.setState({ user: user.attendees });
                }
                axios
                    .get(
                        "http://94.23.91.119:5000/User/GetCheckpointsByMeetings/" +
                        id +
                        "/Oskar.Szymanski@Oponeo.pl"
                    )
                    .then((value) => {
                        console.log("CHECKPOINTS " + JSON.stringify(value.data));
                        this.setState({
                            selectedCheckpoints: JSON.parse(JSON.stringify(value.data))
                        })
                    }).catch((e) => {
                        console.log("ERROR: " + e)
                    });
            });
    }
    componentDidMount() {
        axios
            .get("http://94.23.91.119:5000/user/GetUserMeetings/true")
            .then((res) => {
                const spotkania = res.data;
                spotkania.forEach((element) => {
                    let today = new Date();
                    let startDate = new Date(element.endTime);
                    let diff = startDate.getTime() - today.getTime();
                });
                this.setState({ spotkania });
            });
    }
    render() {
        if (this.state.czyPoint) {
            return (
                <>
                    <Row>

                        <Col sm="9" md="9" lg="9" xl="9">
                            <div className="oknoSpotkanie">
                                <img src={test}/>
                            </div>


                            <Col sm="12" md="12" lg="12" xl="12">

                                <Row>
                                    <>
                                        {this.state.spotkania.map(spotkanie => <Col sm="4" md="4" lg="4" xl="4"><MeetingComponent meetingClicked={(meetingId) => {
                                            this.setState({
                                                selectedMeetingId: meetingId
                                            })
                                            this.meetingClicked(meetingId)
                                        }} spotkanieTemat={spotkanie.meetSubject} id={spotkanie.meetId} spotkanieStart={spotkanie.startTime} spotkanieKoniec={spotkanie.endTime} point={spotkanie.isCheckpointsExist} czyUzupelnionePointy={(e) => this.changestatus(e)} /></Col>)}
                                    </>
                                </Row>
                            </Col>
                        </Col>
                        <Col sm="2" md="2" lg="2" xl="2">
                            {<UsersListComponent uzytkownicy={this.state.user} />}
                        </Col>
                    </Row>
                </>
            );
        }
    }
}
export default SecondMainContentComponentVer2;
