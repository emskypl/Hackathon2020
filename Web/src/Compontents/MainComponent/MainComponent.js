import TopBarcomponent from '../TopBarComponent/TopBarComponent'
import React, { useState } from 'react';
import MainContentComponent from '../MainContentComponent/MainContentComponent'
import SecondMainContentComponent from '../SecondMainContentComponent/SecondMainContentComponent'
var test = 1

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {czyGlownaStrona: true};
  }

  changestatus(){
    console.log("test change")
    this.setState(state => ({
      czyGlownaStrona: false
    }));
  }
    render() {
     
        if (this.state.czyGlownaStrona) {
            return (
                <>
                    <TopBarcomponent/>
                    <MainContentComponent metoda={() => this.changestatus()}/>
                </>
            );
        }
        else {
            return (
                <>
                    <TopBarcomponent/>
                    <SecondMainContentComponent czyLadowacStrone={this.state.czyGlownaStrona}/>
                </>
            );
        }
    }
}
export default MainComponent
