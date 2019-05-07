import React, {Component} from 'react'
import Node from './Node'
import API from '../helpers/API'

import {socket} from '../helpers/GlobalData'
import { MyGenerateButton, MyRemoveButton } from './Buttons'

class Factory extends Component {
    state = {
        generating: false,
        removing: false
    }

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
    render() {
        let evenFactory = (this.props.index % 2)
        let marks = this.createMarks( evenFactory, this.props.factoryData.childern )
        if (evenFactory) {
        return(
            <div className='row col-sm-6 d-flex' style={{margin: 0, padding: 15, height: 200}}>
                <div className='row col-sm-12 justify-content-start' style={{margin: 10, padding: 0, height: 40, zIndex: 99}}>
                    <MyRemoveButton action={this.deleteFactory} removing={this.state.removing} />
                    <MyGenerateButton action={this.generateNewChildern} generating={this.state.generating}/>
                </div>
                <div className='row col-sm-12 justify-content-start' style={{margin: 10, padding: 10, height: 100}}>
                    <Node 
                        factoryId={this.props.factoryData.factoryId}
                        min={this.props.factoryData.nodeMinRange} 
                        max={this.props.factoryData.nodeMaxRange} 
                        marks={marks}
                        evenFactory={evenFactory}
                        changeRange={this.props.changeRange}/>
                </div>
            </div>
        )
        }
        else {
        return(
            <div className='row col-sm-6 d-flex' style={{margin: 0, padding: 15, height: 200, borderRightStyle: 'ridge'}}>
                <div className='row col-sm-12 justify-content-end' style={{margin: 10, padding: 0, height: 40, zIndex: 99}}>
                    <MyGenerateButton action={this.generateNewChildern} generating={this.state.generating}/>
                    <MyRemoveButton action={this.deleteFactory} removing={this.state.removing} />
                </div>
                <div className='row col-sm-12 justify-content-end' style={{margin: 10, padding: 10, height: 100}}>
                    <Node 
                        factoryId={this.props.factoryData.factoryId}
                        min={this.props.factoryData.nodeMinRange} 
                        max={this.props.factoryData.nodeMaxRange} 
                        marks={marks}
                        evenFactory={evenFactory}
                        changeRange={this.props.changeRange}/>
                </div>
            </div>
        )

        }
    }
}

export default Factory