import "./SecondMainContentComponentVer2.css";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import contentPhoto from "../../Images/geometry-1023846_1920.jpg";
import contentPhoto2 from "../../Images/school-1019989_1920.jpg";
import { render } from "react-dom";
import Dots from "react-activity/lib/Dots";
import "react-activity/lib/Dots/Dots.css";
import MeetingComponent from "../MeetingComponent/MeetingComponent";
import UsersListComponent from "../UsersListComponent/UsersListComponent";
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
              <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                  <div className="oknoSpotkanie">
                    <p className="StyledPragraph">
                      Oczekiwanie na rozpoczęcie spotkania:
                    </p>
                    <p className="StyledPragraph">
                      Oczekiwanie na rozpoczęcie spotkania:
                    </p>
                              </div>
                              {this.state.selectedCheckpoints == undefined ? <div></div> : JSON.stringify(this.state.selectedCheckpoints)}
                </Col>
              </Row>
              <Row>
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
                                    {this.state.spotkania.map(spotkanie => <Col sm="4" md="4" lg="4" xl="4"><MeetingComponent  meetingClicked={(meetingId) => {
                                        this.setState({
                                                selectedMeetingId: meetingId
                                            })
                                            this.meetingClicked(meetingId)
                                        }} spotkanieTemat={spotkanie.meetSubject} id={spotkanie.meetId} spotkanieStart={spotkanie.startTime} spotkanieKoniec={spotkanie.endTime} point={spotkanie.isCheckpointsExist} czyUzupelnionePointy={(e) => this.changestatus(e)}/></Col>)}
                                </>
                            </Row>
                        </Col>
                        <Col >
                            {<UsersListComponent uzytkownicy={this.state.user} />}
                        </Col>
                    </Row>
                  {this.state.spotkania.map((spotkanie) => (
                    <Col sm="4" md="4" lg="4" xl="4">
                      <MeetingComponent
                        meetingClicked={(meetingId) => {
                          this.setState({
                            selectedMeetingId: meetingId,
                          });
                          this.meetingClicked(meetingId);
                        }}
                        spotkanieTemat={spotkanie.meetSubject}
                        id={spotkanie.meetId}
                        spotkanieStart={spotkanie.startTime}
                        spotkanieKoniec={spotkanie.endTime}
                        point={spotkanie.isCheckpointsExist}
                        czyUzupelnionePointy={(e) => this.changestatus(e)}
                      />
                    </Col>
                  ))}
                </>
                {this.state.selectedMeetingId}
              </Row>
            </Col>
            <Col>
              {this.state.user != undefined ? (
                <UsersListComponent uzytkownicy={this.state.user} />
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </>
      );
    }
  }
}
export default SecondMainContentComponentVer2;
