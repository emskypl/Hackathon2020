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
                <Col className="ColMainContentComponent">
                    <div className="ContainterMeetingComponent">
                        <Row className="FirstRowParagraphMainContentComponent">
                            <p>{this.props.spotkanieTemat}</p>
                        </Row>
                        <Row className="SecondRowParagraphMainContentComponent">
                            <p>{this.props.spotkanieStart}</p>
                        </Row>
                    </div>
                </Col>
            </>
        );
    }
}
export default MeetingComponent