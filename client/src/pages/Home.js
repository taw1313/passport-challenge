import React, {Component} from 'react'
import uuidv1 from 'uuid/v1'

import Factory from '../components/Factory'
import {socket} from '../helpers/GlobalData'
import API from '../helpers/API'

class Home extends Component {
    state = {
        factories: [
            {factoryName: 'test1', childern: [{nodeNum: 13}, {nodeNum: 15}]},
            {factoryName: 'test2', childern: [{nodeNum: 23}, {nodeNum: 25}]},
            {factoryName: 'test3', childern: [{nodeNum: 33}, {nodeNum: 35}]}
        ]
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

    createAfactory = () => {
        console.log('DEBUG - createAfactory() ')
        let factory = {
            "factoryId": uuidv1(), 
            "factoryName": "abc2123",
            "nodeMinRange": 1,
            "nodeMaxRange": 10000,
          } 
          let ranNumOfChildern = Math.floor(Math.random()*15) + 1
          let childern = []
          for(let i=0; i<ranNumOfChildern; i++)
              childern.push({nodeNum: Math.floor(Math.random()*(factory.nodeMaxRange-factory.nodeMinRange) + factory.nodeMinRange)})
          factory.childern = childern.slice(0)
        API.createFactory(factory)
        .catch( (err) => {
            alert('Failed To Create Factory')
        })
    }

    getData = () => {
        console.log('DEBUG - getData() EMIT')
        socket.emit('initial_data')
        /*
        //
        // ToDo: This API call is only for testing above emit results in the server sending an update
        //
        API.getAllFactories()
        .then( (res) => {
            console.log('DEBUG - getAllFactories() ', res)
        })
        .catch( (err) => {
            alert('Failed To get all factories')
        })
        */
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <div>
                <h1> Home Page </h1>
                <button onClick={this.createAfactory} type='submit'>Create</button>
                {this.state.factories.map( (f, i) => (
                    <Factory key={`factory${i}`} factoryData={f}/>
                ))}
            </div>
        )
    }
}

export default Home