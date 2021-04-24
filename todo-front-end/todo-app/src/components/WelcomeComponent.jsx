import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../api/HelloWorldService.js';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: '',
            errorMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
                <>
                <h1>Welcome!</h1>
                <div className="container">
                    <div className={this.state.errorMessage.length > 0 ? 'alert alert-danger' : 'hidden'}>
                        {this.state.errorMessage}
                    </div>
                </div>
                <div className="container">
                   Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                   Click here to a get a customized welcome message.
                   <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                   {this.state.welcomeMessage}
                </div>
                </>
        )
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = '';
        if (error.message)
            errorMessage += error.message
        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
        this.setState({ errorMessage: errorMessage })
    }

}
 
export default WelcomeComponent