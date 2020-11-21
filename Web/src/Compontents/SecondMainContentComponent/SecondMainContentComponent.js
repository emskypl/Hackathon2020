import './SecondMainContentComponent.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import contentPhoto from '../../Images/geometry-1023846_1920.jpg';
import contentPhoto2 from '../../Images/school-1019989_1920.jpg';
import { render } from 'react-dom';
import 'react-activity/lib/Spinner/Spinner.css';
import Spinner from 'react-activity/lib/Spinner';
import MeetingComponent from '../MeetingComponent/MeetingComponent';
import UsersListComponent from '../UsersListComponent/UsersListComponent'
var tablica;

var axios = require('axios');

class SecondMainContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { czyZaladowaneDane: false, items: 'false' };
    }

    componentDidMount() {
        console.log("Poczatek")
        axios.get('http://94.23.91.119:5000/user/GetUserMeetings/true')
            .then(function (response) {
                // handle success
                tablica = response.data.map((spotkanie) => { return <MeetingComponent /> })
                console.log("Testowa tablica w cdm" + { tablica });


                console.log(response.data);
                console.log(tablica);
                console.log('end');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        if (this.props.czyLadowacStrone && tablica.length > 0) {
            this.setState(state => ({
                czyZaladowaneDane: true
            }));
        }

        this.timerID = setInterval(
            () => this.tick(),
            5000
        );
        console.log("pod didmount")
    }
    tick() {
        console.log("TEST start");

        // Make a request for a user with a given ID
        axios.get('http://94.23.91.119:5000/User/GetUserMeetings/true')
            .then(function (response) {
                // handle success
                tablica = response.data.map((spotkanie) => { return <Col sm="4" md="4" lg="4" xl="4"><MeetingComponent spotkanieTemat={spotkanie.meetSubject} spotkanieStart={spotkanie.startTime} spotkanieKoniec={spotkanie.endTime} /></Col> })

                console.log(response.data);
                console.log(tablica);
                console.log('end');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        if (tablica.length === 0) {
            this.setState(state => ({
                czyZaladowaneDane: false
            }));
        }
        else {
            this.setState(state => ({
                czyZaladowaneDane: true
            }));
        }

    };
    render() {
        if (this.state.czyZaladowaneDane) {
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
                                
                                {console.log("test")}
                                {console.log(tablica)}
                                {tablica}

                            </Row>
                        </Col>
                        <Col >
                            <UsersListComponent />
                        </Col>
                    </Row>

                </>
            );
        }
        else {
            return (
                <>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <div className="Spinner">
                                <Spinner color="#5653FD" size="6em"/>
                            </div>    
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <p>Brak spotkań</p>
                        </Col>
                    </Row>
                </>
            )
        }
    }
}
export default SecondMainContentComponent