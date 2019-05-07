import IconToGenerate from 'react-ionicons/lib/IosCogOutline'
import IconToRemove from 'react-ionicons/lib/IosCutOutline'
import React, {Component} from 'react'

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
                    paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                    focus: '{outline: 0}'
                }}>
                <i className='fas fa-industry fa-3x'></i>
            </button>
        )
    }
}

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
                    paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                    focus: '{outline: 0}'
                }}>
                <i>
                    <IconToGenerate fontSize='40px' rotate={this.props.generating}/>
                </i>
            </button>
        )
    }
}

class MyRemoveButton extends Component {
    removeAction = () => {
        this.props.action()
    }
    render() {
        return(
            <button onClick={this.removeAction} type='submit' 
                style={{
                    backgroundColor: '#a0a2ca',
                    borderRadius: '12px',
                    paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                    focus: '{outline: 0}'
                }}>
                <i>
                    <IconToRemove fontSize='40px' shake={this.props.removing}/>
                </i>
            </button>
        )
    }
}

export { MyCreateButton, MyGenerateButton, MyRemoveButton }