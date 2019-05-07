import React, {Component} from 'react'
import uuidv1 from 'uuid/v1'

import Header from '../components/Header'
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
            console.log('DEBUG - Home state ', this.state.factories)

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
        console.log('DEBUG - factoryChanged', factory)
        let factories = this.state.factories
        factories = factories.map( (f) =>  {
            return (f.factoryId === factory.factoryId) ? (factory) : f
        })
        this.setState({factories})
    }

    removeFactory = (factoryId) => {
        let factories = this.state.factories
        factories = factories.filter( (f) =>  f.factoryId !== factoryId )
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    changeRange = (factoryId, sliderValues) => {
        let factories = this.state.factories
        factories = factories.map( (f) =>  {
            if (f.factoryId === factoryId) {
                f.nodeMinRange = sliderValues[0]
                f.nodeMaxRange = sliderValues[1]
            }
            return f
        })
        this.setState({factories})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <div className='col-sm-12'> 
                <Header createAfactory={this.createAfactory}/>
                <div className='container-flex' position='relative' style={{paddingTop: 110}}>
                    <div className='row' align='left' position='relative'>
                        {this.state.factories.map( (f, i) => (
                            <Factory key={`factory${i}`} factoryData={f} index={i} changeRange={this.changeRange}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
/*
                <div className='row container-fluid' style={{position: 'relative'}}>

            <div className='container-fluid' position='relative' float='left'>
*/