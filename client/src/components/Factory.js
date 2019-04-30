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
                Factory
                {this.state.nodes.map( (n, i) => (
                    <Node nodeData={n}/>
                ))}
            </div>
        )
    }
}

export default Factory