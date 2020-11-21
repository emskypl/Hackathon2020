import TopBarcomponent from '../TopBarComponent/TopBarComponent'
import React, { useState } from 'react';
import MainContentComponent from '../MainContentComponent/MainContentComponent'
import SecondMainContentComponent from '../SecondMainContentComponent/SecondMainContentComponent'
var test = 2

class MainComponent extends React.Component {
    render() {
        if (test == 1) {
            return (
                <>
                    <TopBarcomponent/>
                    <MainContentComponent/>
                </>
            );
        }
        else {
            return (
                <>
                    <TopBarcomponent/>
                    <SecondMainContentComponent/>
                </>
            );
        }
    }
}
export default MainComponent
