import IconToGenerate from 'react-ionicons/lib/IosCogOutline'
import IconToRemove from 'react-ionicons/lib/IosCutOutline'
import React, {Component} from 'react'

const factoryButtonStyle = {
    backgroundColor: '#a0a2ca',
    borderRadius: '12px',
    paddingTop: '0', paddingRight: '5', paddingBottom: '0', paddingLeft: '5',
    marginLeft: '10',
    disabled: {
        backgroundColor: '#83468f',
        color: '#83468f'
    }
}

const removeButtonStyle = {}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Button that creates a new factory off of the Root
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MyCreateButton extends Component {
    createAction = () => {
        this.props.action()
    }
    render() {
        return(
            <button onClick={this.createAction} type='submit' 
                style={{
                    backgroundColor: '#a0a2ca',
                    borderRadius: '12px',
                    paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5
                }}>
                <i className='fas fa-industry fa-3x'></i>
            </button>
        )
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button that allows the factory name to change
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MyFactoryButton extends Component {
    nameAction = (e) => {
        e.preventDefault()
        this.props.action()
    }
    render() {
        if (this.props.nameLeft)
            return(
                <div>
                    <p style={{fontFamily: 'Lato', fontSize: '20px'}}>{this.props.name}
                        <span>
                        <button disabled={this.props.locked}
                            onClick={this.nameAction} type='submit' 
                            style={factoryButtonStyle}>
                            <i className='fas fa-industry fa-2x'></i>
                        </button>
                        </span>
                    </p>
                </div>
            )
        else
            return(
                <div>
                    <button disabled={this.props.locked}
                            onClick={this.nameAction} type='submit' 
                        style={{
                            backgroundColor: '#a0a2ca',
                            borderRadius: '12px',
                            paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                            marginRight: 10
                        }}>
                        <i className='fas fa-industry fa-2x'></i>
                    </button>
                    <span style={{fontFamily: 'Lato', fontSize: '20px'}}>{this.props.name}</span>
                </div>
            )
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Button to generate new nodes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MyGenerateButton extends Component {
    generateAction = () => {
        this.props.action()
    }
    render() {
        return(
            <button onClick={this.generateAction} type='submit' 
                style={{
                    backgroundColor: '#a0a2ca',
                    borderRadius: '12px',
                    paddingTop: 5, paddingRight: 5, paddingBottom: 0, paddingLeft: 5
                }}>
                <i>
                    <IconToGenerate fontSize='30px' rotate={this.props.generating}/>
                </i>
            </button>
        )
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Button to remove a factory
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MyRemoveButton extends Component {

    removeAction = () => {
        this.props.action()
    }

    render() {
        return(
            <button disabled={this.props.locked}
                onClick={this.removeAction} type='submit' 
                style={{
                    backgroundColor: '#a0a2ca',
                    borderRadius: '12px',
                    paddingTop: 5, paddingRight: 5, paddingBottom: 0, paddingLeft: 5
                }}>
                <i>
                    <IconToRemove fontSize='30px' shake={this.props.removing}/>
                </i>
            </button>
        )
    }
}

export { MyCreateButton, MyFactoryButton, MyGenerateButton, MyRemoveButton }