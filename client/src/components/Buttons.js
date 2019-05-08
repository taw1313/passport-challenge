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
                        <button onClick={this.nameAction} type='submit' 
                            style={{
                                backgroundColor: '#a0a2ca',
                                borderRadius: '12px',
                                paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                                marginLeft: 10,
                                focus: '{outline: 0}'
                            }}>
                            <i className='fas fa-industry fa-2x'></i>
                        </button>
                        </span>
                    </p>
                </div>
            )
        else
            return(
                <div>
                    <button onClick={this.nameAction} type='submit' 
                        style={{
                            backgroundColor: '#a0a2ca',
                            borderRadius: '12px',
                            paddingTop: 0, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                            marginRight: 10,
                            focus: '{outline: 0}'
                        }}>
                        <i className='fas fa-industry fa-2x'></i>
                    </button>
                    <span style={{fontFamily: 'Lato', fontSize: '20px'}}>{this.props.name}</span>
                </div>
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
                    paddingTop: 5, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                    focus: '{outline: 0}'
                }}>
                <i>
                    <IconToGenerate fontSize='30px' rotate={this.props.generating}/>
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
                    paddingTop: 5, paddingRight: 5, paddingBottom: 0, paddingLeft: 5,
                    focus: '{outline: 0}'
                }}>
                <i>
                    <IconToRemove fontSize='30px' shake={this.props.removing}/>
                </i>
            </button>
        )
    }
}

export { MyCreateButton, MyFactoryButton, MyGenerateButton, MyRemoveButton }