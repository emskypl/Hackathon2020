import './MeetingComponent.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
class MeetingComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Col className="ColMainContentComponent" onClick={() => {
                    this.props.meetingClicked(this.props.id)
                }}>
                    <div className={this.props.point == true ? "test11" : "test22"}>
                    <Col>
                        <Row className="FirstRowParagraphMainContentComponent">
                            <p>{this.props.spotkanieTemat} </p>
                        </Row>
                        <div>
                        
                            <p className={this.props.spotkanieCzyMaPunkty===true ? "AddPointsButton" : "AddPointsButtonBlue"}> {this.props.spotkanieCzyMaPunkty===true ? "Punkty dodane" : "Dodaj point"}</p>
                        </div>
                        <Row className="SecondRowParagraphMainContentComponent">
                            <p>{this.props.spotkanieStart}</p>
                        </Row>
                    </Col>
                    </div>
                </Col>
                

            </>
        );
    }
}
export default MeetingComponent