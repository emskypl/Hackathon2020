import './SecondMainContentComponent.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import contentPhoto from '../../Images/geometry-1023846_1920.jpg';
import contentPhoto2 from '../../Images/school-1019989_1920.jpg';
class SecondMainContentComponent extends React.Component {
    render() {
        return (
            <>
                <Row className="RowMainContentComponent">
                    <Col className="test" sm="6" md="6" lg="6" xl="6">
                        <h1>Lorem Ipsum</h1>
                        <h2>Lorem | Ipsum | Paris | Platynov</h2>
                        <p>Przyjaciół nie kupiłem, dlatego nie sprzedam zakręcony jak spirala andromeda</p>
                    </Col>
                    <Col className="test2" sm="6" md="6" lg="6" xl="6">
                        <img className="img" src={contentPhoto2}></img>
                    </Col>
                </Row>
            </>
        );

    }
}
export default SecondMainContentComponent