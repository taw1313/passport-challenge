import React, {Component} from 'react'
import Node from './Node'

class Factory extends Component {
    constructor() {
        super()
        this.state =  {
            nodes: [{test: 'test'}]
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <div>
                {`Factory: ${this.props.factoryData.factoryName}`}
                {this.props.factoryData.childern.map( (child, i) => (
                    <Node key={`node${i}`} nodeData={child}/>
                ))}
            </div>
        )
    }
}

export default Factory