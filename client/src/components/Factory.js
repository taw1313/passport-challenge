import React, {Component} from 'react'
import Node from './Node'
import API from '../helpers/API'

class Factory extends Component {
    state =  {
        nodes: [{test: 'test'}]
    }

    deleteFactory = () => {
        API.delFactory(this.props.factoryData.factoryId)
        .catch( (err) => {
            alert('ERROR - update failed')
        })
    }

    generateNewChildern = () => {
        let ranNumOfChildern = Math.floor(Math.random()*15) + 1
        let factory = this.props.factoryData
        let childern = []
        for(let i=0; i<ranNumOfChildern; i++)
            childern.push({nodeNum: Math.floor(Math.random()*(factory.nodeMaxRange-factory.nodeMinRange) + factory.nodeMinRange)})
        factory.childern = childern.slice(0)
        API.updateFactory(factory)
        .catch( (err) => {
            alert('ERROR - update failed')
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <div>
                {`Factory: ${this.props.factoryData.factoryName}`}
                {<button onClick={this.generateNewChildern} type='submit'>Generate</button>}
                {<button onClick={this.deleteFactory} type='submit'>Delete</button>}
                {this.props.factoryData.childern.map( (child, i) => (
                    <Node key={`node${i}`} nodeData={child}/>
                ))}
            </div>
        )
    }
}

export default Factory