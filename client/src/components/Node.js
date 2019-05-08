import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

const Range = createSliderWithTooltip(Slider.Range)

class Node extends Component {
    onSliderChange = sliderValues => {
        this.props.changeRange(this.props.factoryId, sliderValues)
    }

    render() {
        const lineRotate = (this.props.evenFactory) ? '15deg' : '-15deg'
        const styleWrapper = (this.props.oneSidedTree) 
                             ? {paddingTop: 60, width: 550, transform: `rotate(${lineRotate})` }
                             : {paddingTop: 40, width: 400, transform: `rotate(${lineRotate})` }
        return(
            <div style={styleWrapper}>
                <Range min={1} max={20000} 
                    marks={this.props.marks}
                    value={[this.props.min, this.props.max]}
                    onChange={this.onSliderChange}
                    railStyle={{ height: 2 }}
                    handleStyle={{
                      height: 18, width: 18,
                      marginLeft: -9, marginTop: -9,
                      backgroundColor: "#23244b", border: 0
                    }}
                    trackStyle={{ background: "none" }}
                />
            </div>
        )
    }
}

export default Node