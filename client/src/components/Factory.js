import React, {Component} from 'react'
import Node from './Node'
import API from '../helpers/API'

import IconToGenerate from 'react-ionicons/lib/IosCogOutline'
// import IconToRemove from 'react-ionicons/lib/IosRemoveCircleOutline'
import IconToRemove from 'react-ionicons/lib/IosCutOutline'

class Factory extends Component {
    state = {
        generating: false,
        removing: false
    }

    deleteFactory = () => {
        this.setState({removing: true})
        API.delFactory(this.props.factoryData.factoryId)
        .then( () => {
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
    render() {
        let marks = {}
        let evenFactory = (this.props.index % 2)
        let txtRotate = (evenFactory) ? '-85deg' : '85deg'
        this.props.factoryData.childern.forEach((c) => {
            marks[c.nodeNum] = {style: {margin: 0, padding: 0, transform: `rotate(${txtRotate})`}, label: `${c.nodeNum}`}
        })
        if (evenFactory) {
        return(
            <div className='row col-sm-6 d-flex' style={{margin: 0, padding: 15, height: 200}}>
                <div className='row col-sm-12 justify-content-start' style={{margin: 0, padding: 0, height: 60}}>
                    <IconToGenerate fontSize='40px' rotate={this.state.generating} onClick={this.generateNewChildern}/>
                    <IconToRemove fontSize='40px' shake={this.state.removing} onClick={this.deleteFactory}/>
                </div>
                <div className='row col-sm-12 justify-content-start' style={{margin: 0, padding: 0, height: 100}}>
                    <Node 
                        min={this.props.factoryData.nodeMinRange} 
                        max={this.props.factoryData.nodeMaxRange} 
                        marks={marks}
                        evenFactory={evenFactory}/>
                </div>
            </div>
        )
        }
        else {
        return(
            <div className='row col-sm-6 d-flex' style={{margin: 0, padding: 15, height: 200, borderRightStyle: 'ridge'}}>
                <div className='row col-sm-12 justify-content-end' style={{margin: 0, padding: 0, height: 60}}>
                    <IconToGenerate fontSize='40px' rotate={this.state.generating} onClick={this.generateNewChildern}/>
                    <IconToRemove fontSize='40px' shake={this.state.removing} onClick={this.deleteFactory}/>
                </div>
                <div className='row col-sm-12 justify-content-end' style={{margin: 0, padding: 0, height: 100}}>
                    <Node 
                        min={this.props.factoryData.nodeMinRange} 
                        max={this.props.factoryData.nodeMaxRange} 
                        marks={marks}
                        evenFactory={evenFactory}/>
                </div>
            </div>
        )

        }
    }
}

export default Factory