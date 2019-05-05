import React, {Component} from 'react'
import uuidv1 from 'uuid/v1'

import Factory from '../components/Factory'
import {socket} from '../helpers/GlobalData'
import API from '../helpers/API'

class Home extends Component {
    state = {
        factories: []
    }

    componentDidMount() {
        socket.on('connect', () => {
            console.log('DEBUG - Home socket in connect ', socket.id)

            API.getAllFactories()
            .then( (res) => {
                this.setState({factories: res.data.Items})
            })
            .catch( (err) => {
                alert('Failed To retrieve all Factories')
            })

            socket.on('new_factory', this.newFactory)
            socket.on('factory_updated', this.factoryChanged)
            socket.on('factory_deleted', this.removeFactory)

            /*  ToDo factory lock and unlock events
            socket.on('factory_locked', this.lockFactory)
            socket.on('factory_unlocked', this.unlockFactory)
            */
            
        })
    }

    newFactory = (factory) => {
        let factories = this.state.factories
        factories.push(factory)
        this.setState({factories})
    }

    factoryChanged = (factory) => {
        let factories = this.state.factories
        factories = factories.map( (f) =>  {
            return (f.factoryId === factory.factoryId) ? (factory) : f
        })
        this.setState({factories})
    }

    removeFactory = (factory) => {
        let factories = this.state.factories
        factories = factories.filter( (f) =>  f.factoryId !== factory.factoryId )
        this.setState({factories})
    }

    createAfactory = () => {
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
        .then( () => {
            //
            // Nothing to do but wait for the new_facgtory event to be recieved
            //
        })
        .catch( (err) => {
            alert('Failed To Create Factory')
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        console.log('DEBUG - Home - render()')
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