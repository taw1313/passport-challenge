import React, {Component} from 'react'
import { MyCreateButton } from './Buttons'
import MediaQuery from 'react-responsive'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Header extends Component {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createFactory = () => {
        this.props.createAfactory()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <div className='container-flex fixed-top' style={{ background: '#23244b', color: 'white', zIndex: 2}}>
                <div className='row justify-content-center'>
                    <h1> Passport Challenge </h1>
                </div>
                <MediaQuery minWidth={992}>
                    <div className='row justify-content-center' style={{padding: 10}}>
                        <MyCreateButton action={this.createFactory}/>
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1224} maxWidth={991}>
                    <div className='row' align='right' style={{padding: 10, float: 'right', marginRight: 10}}>
                        <MyCreateButton action={this.createFactory}/>
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={900}>
                    <div className='row' align='right' style={{padding: 10, float: 'right', marginRight: 10}}>
                        <MyCreateButton action={this.createFactory}/>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}

export default Header