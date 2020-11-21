import './MainContentComponent.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import contentPhoto from '../../Images/geometry-1023846_1920.jpg';
import LoginButtonComponent from '../LoginButtonComponent/LoginButtonComponent';
import contentPhoto2 from '../../Images/school-1019989_1920.jpg';
import microsoftAccount from '../../Images/Mask Group 1.png'
class MainContentComponent extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <>
                <Row className="RowMainContentComponent">
                    <Col className="test" sm="6" md="6" lg="6" xl="6">
                        <h1>Interaktywność</h1>
                        <h2>Nauczanie | Planowanie | Skupienie</h2>
                        <p>Intuicyjna i przejrzysta aplikacja wspomagająca prowadzenie lekcji dzięki intergracji z Microsoft Teams.</p>
                        <LoginButtonComponent metoda={this.props.metoda}/>
                        <img className="imgMicrosoftAccount" src={microsoftAccount}></img>
                    </Col>
                    <Col className="test2" sm="6" md="6" lg="6" xl="6">
                        <img className="img" src={contentPhoto2}></img>
                    </Col>
                </Row>
            </>
        );
    }
}
export default MainContentComponent