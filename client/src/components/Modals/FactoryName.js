import React, {Component} from 'react';
import Modal from 'react-modal';
import './FactoryName.css'

const customStyles = {
    content: {
      top                   : '50%',
      left                  : '50%',
      right                 : '500px',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    },
    overlay: {zIndex: 3}
}

Modal.setAppElement('#root')
  
class FactoryNameModal extends Component {
    state = {
        name: ''
    }

    changeName = e => {
        e.preventDefault()
        let len = e.target.value.length
        if (len <= 20) {
            let re = /^[\w ]+$/
            if ((len === 0) || re.test(e.target.value))
              this.setState({[e.target.name]: e.target.value})
            else {
                alert('Error: Only alphanumeric characters and spaces allowed')
            }
        }
        else {
            alert('Error: Only 20 character factory names are allowed')
        }
    }

    cancelChange = e => {
        e.preventDefault()
        this.props.closeModal(false, this.state.name)
    }

    changeFactoryName = e => {
        e.preventDefault()
        this.props.closeModal(true, this.state.name)
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.props.modalIsOpen} style={customStyles} contentLabel='Factory Name'>
                    <div className='container-flex fixed-top' style={{ background: '#23244b', color: 'white', zIndex: 3}}>
                        <label htmlFor='name'>Factory Name</label>
                    </div>
                    <div className='row d-flex justify-content-around' style={{marginTop: 20}}>
                        <input type='text' name='name' placeholder={this.props.name} value={this.state.name} onChange={this.changeName}/>
                    </div>
                    <div className='d-flex justify-content-around' style={{marginTop: 10}}>
                        <button type='submit' name='submit' onClick={this.changeFactoryName}>submit</button>
                        <button type='submit' name='cancel' onClick={this.cancelChange}>cancel</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default FactoryNameModal