import './UserComponent.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import kolo from '../../Images/ikona_wykres_kolko.png';
import wskaznik from '../../Images/ikona_wykres_wskaznik.png';

class UserComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("render2" + this.props.name)
        return (
            <div className="divUzytkownik">
                <Row>
                    <Col sm="2" md="2" lg="2" xl="2">
                    <img src={kolo} alt="Logo" />;
                </Col>
                    <Col sm="8" md="8" lg="8" xl="8">
                    {this.props.name}
                </Col>
                    <Col sm="2" md="2" lg="2" xl="2">
                    <img src={wskaznik} alt="Logo" />;

                </Col>
                </Row>
            </div>
        );
    }
}
export default UserComponent