


import './MainContentComponent.css'
import React, { useState } from 'react';
import { Col,Row } from 'reactstrap';

import contentPhoto  from '../../Images/geometry-1023846_1920.jpg'; 
class MainContentComponent extends React.Component {
    render() {
        return (
            <>
            <Row className="RowMainContentComponent">
                <Col className="test1" sm="6" md="6" lg="6" xl="6">
                test
                </Col>
                <Col className="test2" sm="6" md="6" lg="6" xl="6">
                <img src={contentPhoto}></img>
                </Col>
            </Row>
            </>
        );

    }
}
export default MainContentComponent