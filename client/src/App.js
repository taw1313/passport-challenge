import React, { Component } from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from './history'

import Home from './pages/Home'

class App extends Component {
    homePage = () => { 
        return ( <Home/> )
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return(
            <Router history={history}>
                <div id='AppRoot'>
                    <Switch>
                        <Route path="/" component={this.homePage}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App