
import TopBarcomponent from '../TopBarComponent/TopBarComponent'
import React, { useState } from 'react';
import MainContentComponent from '../MainContentComponent/MainContentComponent'
class MainComponent extends React.Component {
    render() {
        return (
            <>
                <TopBarcomponent/>
                <MainContentComponent/>
            </>
        );

    }
}
export default MainComponent
