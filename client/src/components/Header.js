import React, {Component} from 'react'

class Header extends Component {
    createFactory = () => {
        console.log('DEBUG - Header.js createAfactory() ')
        this.props.createAfactory()
    }

    render() {
        return(
            <div className='container-flex fixed-top' style={{ background: '#23244b', color: 'white'}}>
                <div className='row justify-content-center'>
                    <h1> Passport Challenge </h1>
                </div>
                <div className='row justify-content-center' style={{padding: 10}}>
                    <button onClick={this.createFactory} type='submit' 
                            style={{
                                backgroundColor: '#a0a2ca',
                                borderRadius: '12px',
                                paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                                focus: '{outline: 0}'
                            }}>
                        <i className='fas fa-industry fa-3x'></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Header
/*
            <div className='col-sm-12 center-block text-center' style={{position: 'fixed', height: 60}}>
*/