import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

class Node extends Component {
    onSliderChange = sliderValues => {
        this.props.changeRange(this.props.factoryId, sliderValues)
    }

    render() {
        const lineRotate = (this.props.evenFactory) ? '15deg' : '-15deg'
        const styleWrapper = (this.props.evenFactory) 
                             ? {paddingTop: 40, width: 400, transform: `rotate(${lineRotate})` }
                             : {paddingTop: 40, width: 400, transform: `rotate(${lineRotate})` }
        console.log('DEBUG - node.js min max', this.props.min, this.props.max)
        return(
            <div style={styleWrapper}>
                <Slider.Range min={1} max={20000} 
                    marks={this.props.marks}
                    value={[this.props.min, this.props.max]}
                    onChange={this.onSliderChange}
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