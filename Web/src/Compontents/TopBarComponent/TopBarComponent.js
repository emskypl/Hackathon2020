import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './TopBarComponent.css';
import logo from '../../Images/point.png';
import LoginButtonComponent from '../LoginButtonComponent/LoginButtonComponent';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const TopBarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Row>
        <Col sm="12" md="12" lg="12" xl="12">
        <Navbar light expand="md" className="NavBarContainer">
          <Col className="Logo" sm="4" md="4" lg="4" xl="4">
            <NavbarBrand href="/"><img src = {logo}></img></NavbarBrand>
          </Col>
        </Navbar>
        </Col>
      </Row>
    </div>
  );
}

export default TopBarComponent;