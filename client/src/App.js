import React, {Component} from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from './history'

import { socket } from './helpers/GlobalData'
import Home from './pages/Home'


class App extends Component {

    componentDidMount() {
        console.log('DEBUG - App in componentDidMount()', socket.connected)
        socket.on('connect', () => {
            console.log('DEBUG - App socket in connect ', socket.connected)
            console.log('DEBUG - App socket in connect ', socket.id)
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <Router history={history}>
                <div id='AppRoot'>
                    <Switch>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App