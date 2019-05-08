import React, {Component} from 'react'
import { MyCreateButton } from './Buttons'

class Header extends Component {
    createFactory = () => {
        console.log('DEBUG - Header.js createAfactory() ')
        this.props.createAfactory()
    }

    render() {
        return(
            <div className='container-flex fixed-top' style={{ background: '#23244b', color: 'white', zIndex: 2}}>
                <div className='row justify-content-center'>
                    <h1> Passport Challenge </h1>
                </div>
                <div className='row justify-content-center' style={{padding: 10}}>
                    <MyCreateButton action={this.createFactory}/>
                </div>
            </div>
        )
    }
}

export default Header