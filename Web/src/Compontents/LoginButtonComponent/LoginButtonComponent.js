import './LoginButtonComponent.css'
import React, { useState } from 'react';


class LoginButtonComponent extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
        return (
            <div className="ButtonLogin" onClick={this.props.metoda}>
                Połącz z kontem Microsoft
            </div>
        );
    }
}
export default LoginButtonComponent
