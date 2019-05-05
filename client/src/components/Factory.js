import React, {Component} from 'react'
import Node from './Node'
import API from '../helpers/API'

import IconToGenerate from 'react-ionicons/lib/IosCogOutline'
import IconToRemove from 'react-ionicons/lib/IosRemoveCircleOutline'

const styleIconContainer = {right: 150}

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
        let txtRotate = (evenFactory) ? '-45deg' : '-135deg'
        this.props.factoryData.childern.forEach((c) => {
            marks[c.nodeNum] = {style: {margin: 0, padding: 0, transform: `rotate(${txtRotate})`}, label: `${c.nodeNum}`}
        })
        if (evenFactory) {
        return(
            <div className='col-sm-6 d-flex'>
                <div>
                    <Node 
                        min={this.props.factoryData.nodeMinRange} 
                        max={this.props.factoryData.nodeMaxRange} 
                        marks={marks}
                        evenFactory={evenFactory}/>
                </div>
                <div>
                    <IconToGenerate fontSize='60px' rotate={this.state.generating} onClick={this.generateNewChildern}/>
                    <IconToRemove fontSize='50px' shake={this.state.removing} onClick={this.deleteFactory}/>
                </div>
            </div>
        )
        }
        else {
        return(
            <div className='col-sm-6 d-flex' style={{borderRightStyle: 'ridge'}}>
                <div>
                    <IconToGenerate fontSize='60px' rotate={this.state.generating} onClick={this.generateNewChildern}/>
                    <IconToRemove fontSize='50px' shake={this.state.removing} onClick={this.deleteFactory}/>
                </div>
                <div>
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