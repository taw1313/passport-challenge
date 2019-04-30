import React, {Component} from 'react'
import Factory from '../components/Factory'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            factories: [
                {test1: 'test'},
                {test2: 'test'}
            ]
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <div>
                Home Page Page
                {this.state.factories.map( (f, i) => (
                    <Factory factoryData={f}/>
                ))}
            </div>
        )
    }
}

export default Home