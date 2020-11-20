
import TopBarcomponent from '../TopBarComponent/TopBarComponent'
import React, { useState } from 'react';
import MainContentComponent from '../MainContentComponent/MainContentComponent'
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
                    <MainContentComponent/>
                </>
            );
        }
        

    }
}
export default MainComponent
