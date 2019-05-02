import axios from 'axios'
import https from 'https'
require('dotenv').config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"
const URL=process.env.REACT_APP_API_URL

const axiosOverride = axios.create({
    baseURL: URL,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false,
        globalAgent: {
            options: {
                rejectUnauthorized: false
            }
        }
    })
})

const htmlHeadersWithToken = () => {
    return  {headers:  {'Authorization': `Bearer ${sessionStorage.getItem('id_token')}`}}
}

export default {
    getGreeting: () => {
        return axiosOverride.get('/api/greeting', htmlHeadersWithToken())
    },
    updateGreeting: (message) => {
        return axiosOverride.post('/api/greeting', message, htmlHeadersWithToken())
    },
    getUsers: () => {
        return axiosOverride.get('/api/users', htmlHeadersWithToken())
    },
    validateEmailAndGetSecret: (emailAddress) => {
        return axiosOverride.get('/api/users/' + emailAddress)
    },
    updateUser: (user) => {
        return axiosOverride.post('/api/users', user, htmlHeadersWithToken())
    },
    deleteUser: (id) => {
        return axiosOverride.delete('/api/users/' + id, htmlHeadersWithToken())
    },
    getTransactions: () => {
        return axiosOverride.get('/api/getTransactions', htmlHeadersWithToken())
    },
    getTransaction: (date) => {
        return axiosOverride.get('/api/getTransactions/' + date, htmlHeadersWithToken())
    },
    deleteTransaction: (date) => {
        return axiosOverride.delete('/api/getTransactions/' + date, htmlHeadersWithToken())
    },
    getFranchisee: (id) => {
        return axiosOverride.get('/api/franchisees/' + id, htmlHeadersWithToken())
    },
    getFranchisees: () => {
        return axiosOverride.get('/api/franchisees', htmlHeadersWithToken())
    },
    updateFranchisee: (franchisee) => {
        return axiosOverride.post('/api/franchisees/', franchisee, htmlHeadersWithToken())
    },
    emailTransaction: (sendObj) => {
        return axiosOverride.post('/api/emailRegisters/', sendObj, htmlHeadersWithToken())
    },
    uploadCheckFile: (file) => {
        const data = new FormData()
        data.append('file', file)
        return axiosOverride.post( '/api/uploadFile', data, {headers: {'Content-Type': 'multipart/form-data'}} ) 
    },
    uploadEmailFile: (file) => {
        const data = new FormData()
        data.append('file', file)
        return axiosOverride.post( '/api/uploadEmailFile', data, {headers: {'Content-Type': 'multipart/form-data'}} ) 
    },
    createEmail: (emailData) => {
        return axiosOverride.post('/api/email', emailData, htmlHeadersWithToken())
    },
    updateEmail: (id, emailData) => {
        return axiosOverride.post('/api/email/' + id, emailData, htmlHeadersWithToken())
    },
    deleteEmail: (id) => {
        return axiosOverride.delete('/api/email/' + id, htmlHeadersWithToken())
    }
}