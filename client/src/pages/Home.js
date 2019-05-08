import React, {Component} from 'react'
import uuidv1 from 'uuid/v1'
import MediaQuery from 'react-responsive'

import Header from '../components/Header'
import Factory from '../components/Factory'
import {socket} from '../helpers/GlobalData'
import API from '../helpers/API'

const Aux = props => props.children

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Home extends Component {
    state = {
        factories: [],
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        socket.on('connect', () => {
            API.getAllFactories()
            .then( (res) => {
                this.setState({factories: res.data.Items})
                socket.emit('loadedFactories')
            })
            .catch( (err) => {
                alert('Failed To retrieve all Factories')
            })

            socket.on('new_factory', this.newFactory)
            socket.on('factory_updated', this.factoryChanged)
            socket.on('factory_deleted', this.removeFactory)
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    newFactory = (factory) => {
        let factories = this.state.factories
        factories.push(factory)
        this.setState({factories})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    factoryChanged = (factory) => {
        let factories = this.state.factories
        factories = factories.map( (f) =>  {
            return (f.factoryId === factory.factoryId) ? (factory) : f
        })
        this.setState({factories})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    removeFactory = (factoryId) => {
        let factories = this.state.factories
        factories = factories.filter( (f) =>  f.factoryId !== factoryId )
        this.setState({factories})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createAfactory = () => {
        let factory = {
            "factoryId": uuidv1(), 
            "factoryName": "Default Name",
            "nodeMinRange": 1000,
            "nodeMaxRange": 15000,
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
                <Header createAfactory={this.createAfactory} />
                <div className='container-flex' position='relative' style={{paddingTop: 110}}>
                    <div className='row' align='left' position='relative'>
                        {this.state.factories.map( (f, i) => (
                            <Aux key={`a${i}`}> 
                                <MediaQuery key={`dsk${i}`} minWidth={992}>
                                    <Factory 
                                        key={`factoryA${i}`} 
                                        factoryData={f} 
                                        index={i} 
                                        changeRange={this.changeRange}
                                        oneSidedTree={false}
                                    />
                                </MediaQuery>
                                <MediaQuery key={`dskScaled${i}`} minDeviceWidth={1224} maxWidth={991}>
                                    <Factory 
                                        key={`factoryB${i}`} 
                                        factoryData={f} 
                                        index={0} 
                                        changeRange={this.changeRange}
                                        oneSidedTree={true}
                                    />
                                </MediaQuery>
                                <MediaQuery key={`mobile${i}`} maxDeviceWidth={900}>
                                    <Factory 
                                        key={`factoryB${i}`} 
                                        factoryData={f} 
                                        index={0} 
                                        changeRange={this.changeRange}
                                        oneSidedTree={true}
                                    />
                                </MediaQuery>
                            </Aux>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home