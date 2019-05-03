import React, {Component} from 'react'
import Factory from '../components/Factory'
import {socket} from '../helpers/GlobalData'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            factories: [
                {factoryName: 'test1', childern: [{nodeNum: 13}, {nodeNum: 15}]},
                {factoryName: 'test2', childern: [{nodeNum: 23}, {nodeNum: 25}]},
                {factoryName: 'test3', childern: [{nodeNum: 33}, {nodeNum: 35}]}
            ]
        }

    }

    componentDidMount() {
        socket.emit('initial_data')
        socket.on('get_data', this.changeData)
        socket.on('get_all_data', this.getData)
    }

    changeData = (data) => {
        console.log('DEBUG - changeData() ', data)
        let factories = data.Items
        this.setState({factories})
    }

    getData = () => {
        console.log('DEBUG - getData() EMIT')
        socket.emit('initial_data')
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <div>
                <h1> Home Page </h1>
                {this.state.factories.map( (f, i) => (
                    <Factory key={`factory${i}`} factoryData={f}/>
                ))}
                <button onClick={this.getData} type='submit'>Test</button>
            </div>
        )
    }
}

export default Home