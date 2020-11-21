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
                <Col className="ColMainContentComponent" onClick={() => this.props.czyUzupelnionePointy(this.props.meetId)}>
                    <div className={this.props.point == true ? "test11" : "test22"}>
                    <Col>
                        <Row className="FirstRowParagraphMainContentComponent">
                            <p>{this.props.spotkanieTemat} </p>
                        </Row>
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