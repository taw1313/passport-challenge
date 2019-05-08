import React, {Component} from 'react'

import Node from './Node'
import API from '../helpers/API'
import FactoryNameModal from './Modals/FactoryName'
import {socket} from '../helpers/GlobalData'
import { MyGenerateButton, MyRemoveButton, MyFactoryButton } from './Buttons'

const leftDoubleTreeClass = 'row col-sm-6 d-flex'
const leftSingleTreeClass = 'row col-sm-12 d-flex'
const leftDoubleTreeStyle = {margin: 0, padding: 15, height: 300, borderRightStyle: 'ridge'}
const leftSingleTreeStyle = {marginRight: 50, padding: 15, height: 300, borderRightStyle: 'ridge'}
                
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Factory extends Component {
    state = {
        generating: false,
        removing: false,
        showFactoryNameModal: false,
        factoryLocked: false
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        socket.on('factory_locked', this.lockButtons)
        socket.on('factory_unlocked', this.unlockButtons)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    lockButtons = (factoryId) => {
        console.log('DEBUG - factoryLocked ', factoryId)
        if ( this.props.factoryData.factoryId === factoryId )
            this.setState({factoryLocked: true})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    unlockButtons = (factoryId) => {
        console.log('DEBUG - factoryUnLocked ', factoryId)
        if ( this.props.factoryData.factoryId === factoryId )
            this.setState({factoryLocked: false})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    deleteFactory = () => {
        this.setState({removing: true})
        API.delFactory(this.props.factoryData.factoryId)
        .then( () => {
            socket.emit('client_res_delFactory', this.props.factoryData.factoryId)
            this.setState({removing: false})
        })
        .catch( (err) => {
            alert('ERROR - update failed')
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    generateNewChildern = () => {
        this.setState({generating: true})
        let ranNumOfChildern = Math.floor(Math.random()*15) + 1
        let factory = this.props.factoryData
        let childern = []
        for(let i=0; i<ranNumOfChildern; i++)
            childern.push({nodeNum: Math.floor(Math.random()*(factory.nodeMaxRange-factory.nodeMinRange) + factory.nodeMinRange)})
        factory.childern = childern.slice(0)
        API.updateFactory(factory)
        .then( () => {
            this.setState({generating: false})
            //
            // Nothing to do socket will send updates to all
            //
        })
        .catch( (err) => {
            alert('ERROR - update failed')
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createMarks = (evenFactory, childern) => {
        let marks = {}
        let txtRotate = (evenFactory) ? '-85deg' : '85deg'
        childern.forEach( (c) => {
            marks[c.nodeNum] = {style: {margin: 0, padding: 0, transform: `rotate(${txtRotate})`}, label: `${c.nodeNum}`}
        })
        return marks
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    changeName = () => {
        //
        // lock
        //
        socket.emit('lock_factory', this.props.factoryData.factoryId)
        this.setState({showFactoryNameModal: true})
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    closeFactoryNameModal = (modified, newFactoryName) => {
        this.setState({showFactoryNameModal: false})
        if (modified) {
            let factory = this.props.factoryData
            factory.factoryName = `${newFactoryName}`
            API.updateFactory(factory)
            .then( () => {
            })
            .catch( (err) => {
                alert('ERROR - update failed')
            })
        }

        //
        //  unlock
        //
        socket.emit('unlock_factory', this.props.factoryData.factoryId)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        let evenFactory = (this.props.index % 2)
        let marks = this.createMarks( evenFactory, this.props.factoryData.childern )
        let oneSidedTree = this.props.oneSidedTree
        if (evenFactory) return(
            <div className='row col-sm-6 d-flex' style={{margin: 0, padding: 15, height: 300}}>
                <FactoryNameModal 
                    closeModal={this.closeFactoryNameModal}
                    modalIsOpen={this.state.showFactoryNameModal}
                    name={this.props.factoryData.factoryName}
                />
                <div className='row col-sm-12 d-flex' style={{margin: 10, padding: 0, height: 40, zIndex: 1}}>
                    <div className='col-sm-6' style={{textAlign: 'start'}}>
                        <MyRemoveButton action={this.deleteFactory} removing={this.state.removing} locked={this.state.factoryLocked}/>
                        <MyGenerateButton action={this.generateNewChildern} generating={this.state.generating}/>
                    </div>
                    <div className='col-sm-6' style={{textAlign: 'center'}}>
                        <MyFactoryButton nameLeft={false} name={this.props.factoryData.factoryName} action={this.changeName} locked={this.state.factoryLocked}/>
                    </div>
                </div>
                <div className='row col-sm-12 justify-content-start' style={{margin: 10, padding: 10, height: 100}}>
                    <Node 
                        factoryId={this.props.factoryData.factoryId}
                        min={this.props.factoryData.nodeMinRange} 
                        max={this.props.factoryData.nodeMaxRange} 
                        marks={marks}
                        evenFactory={evenFactory}
                        oneSidedTree={oneSidedTree}
                        changeRange={this.props.changeRange}/>
                </div>
            </div>
        )
        else return(
            <div 
                className={oneSidedTree ? leftSingleTreeClass : leftDoubleTreeClass} 
                style={oneSidedTree ? leftSingleTreeStyle : leftDoubleTreeStyle} 
            >
                <FactoryNameModal 
                    closeModal={this.closeFactoryNameModal}
                    modalIsOpen={this.state.showFactoryNameModal}
                    name={this.props.factoryData.factoryName}
                />
                <div className='row col-sm-12 d-flex'style={{margin: 10, padding: 0, height: 40, zIndex: 1}}>
                    <div className='col-sm-6' style={{textAlign: 'center'}}>
                        <MyFactoryButton nameLeft={true} name={this.props.factoryData.factoryName} action={this.changeName} locked={this.state.factoryLocked}/>
                    </div>
                    <div className='col-sm-6' style={{textAlign: 'end'}}>
                        <MyGenerateButton action={this.generateNewChildern} generating={this.state.generating}/>
                        <MyRemoveButton action={this.deleteFactory} removing={this.state.removing} locked={this.state.factoryLocked}/>
                    </div>
                </div>
                <div className='row col-sm-12 justify-content-end' style={{margin: 10, padding: 10, height: 100}}>
                    <Node 
                        factoryId={this.props.factoryData.factoryId}
                        min={this.props.factoryData.nodeMinRange} 
                        max={this.props.factoryData.nodeMaxRange} 
                        marks={marks}
                        evenFactory={evenFactory}
                        oneSidedTree={oneSidedTree}
                        changeRange={this.props.changeRange}/>
                </div>
            </div>
        )
    }
}

export default Factory