import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

class Node extends Component {
    state = {
        value: 0
    }
    onSliderChange = value => {
        this.setState({value})
    }

    render() {
        const lineRotate = (this.props.evenFactory) ? '45deg' : '-225deg'
        const styleWrapper = {width: 400, marginTop: 150, marginLeft: 5, transform: `rotate(${lineRotate})` }
        return(
            <div style={styleWrapper}>
                <Slider.Range min={1} max={20000} 
                    marks={this.props.marks}
                    defaultValue={[this.props.min, this.props.max]}
                    railStyle={{ height: 2 }}
                    handleStyle={{
                      height: 28, width: 28,
                      marginLeft: -14, marginTop: -14,
                      backgroundColor: "red", border: 0
                    }}
                    trackStyle={{ background: "none" }}
                />
            </div>
        )
    }
}

export default Node
/*
            <pre>
                {`    Node: ${this.props.nodeData.nodeNum}`}
            </pre>

                <Slider min={0} max={120} value={this.state.value} onChange={this.onSliderChange}
                    railStyle={{ height: 2 }}
                    handleStyle={{
                      height: 28, width: 28,
                      marginLeft: -14, marginTop: -14,
                      backgroundColor: "red", border: 0
                    }}
                    trackStyle={{ background: "none" }}
                />
*/