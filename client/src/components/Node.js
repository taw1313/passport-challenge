import React, {Component} from 'react'

class Node extends Component {
    render() {
        return(
            <pre>
                {`    Node: ${this.props.nodeData.nodeNum}`}
            </pre>
        )
    }
}

export default Node