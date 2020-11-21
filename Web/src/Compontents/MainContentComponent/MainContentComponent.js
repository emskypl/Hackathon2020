import './MainContentComponent.css'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import contentPhoto from '../../Images/geometry.jpg';
import LoginButtonComponent from '../LoginButtonComponent/LoginButtonComponent';
import contentPhoto2 from '../../Images/school.jpg';
import microsoftAccount from '../../Images/mask.png'
class MainContentComponent extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <>
                <Row className="RowMainContentComponent">
                    <Col className="test" sm="6" md="6" lg="6" xl="6">
                        <h1>Lorem Ipsum</h1>
                        <h2>Lorem | Ipsum | Paris | Platynov</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris urna, congue non facilisis eget,
                        commodo sit amet nunc. Fusce lectus libero, gravida vitae urna ac, mollis suscipit quam. Suspendisse sit
                        amet tortor facilisis, molestie tortor vitae, ultrices eros. Cras laoreet massa mauris, non eleifend risus
                        tristique non. Proin fringilla rutrum massa vel posuere. Nullam in nibh sollicitudin magna commodo faucibus
                             tristique non. Proin fringilla rutrum massa vel posuere. Nullam in nibh sollicitudin magna commodo faucibus</p>
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