import React, {Component} from 'react'
import ReactDOM from 'react-dom'
//import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import URL from 'url-parse'

class SafeURL extends Component {
    isSafe(dangerousURL) {
        const url = URL(dangerousURL, {})
        console.log('DEBUG - isSafe() ', url)
        if (url.protocol === 'http:') return true
        if (url.protocol === 'https:') return true
        return false
    }

    render() {
        const dangerousURL = window.location.href
        console.log('DEBUG - dangerousURL ', dangerousURL)
        const safeURL = this.isSafe( dangerousURL ) ? <App/> : null
        console.log('DEBUG - safeURL ', safeURL)

        return(safeURL)
    }
}

//
// Did not seem to help on injection testing
//
// ReactDOM.render(<SafeURL />, document.getElementById('root'))

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
