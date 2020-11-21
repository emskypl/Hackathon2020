import './PointsComponent.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import UserComponent from '../UserComponent/UserComponent';
class PointsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Row className="">
                    <Col className="" sm="3" md="3" lg="3" xl="3">
                        <div className="ContainterPoints">
                            <Row className="RowSpotkanie">
                                <Col className="ColSpotkanie" sm="12" md="12" lg="12" xl="12">
                                    <p className="PSpotkaniePierwsze">Spotkanie</p>
                                </Col>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <p className="PSpotkanieDrugie">Oczekiwanie na uczestników spotkania</p>
                                </Col>
                                <Col>
                                {this.props.uzytkownicy != undefined ? this.props.uzytkownicy.map(spotkanie => <Col><UserComponent name={spotkanie.emailAddress.name}/></Col>):<></>}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}
export default PointsComponent