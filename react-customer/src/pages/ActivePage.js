import React, { Component } from 'react'
import ActiveRegister from '../components/ActiveRegister/ActiveRegister'

export default class ActivePage extends Component {

    
    render() {
        const code = this.props.match.match.params;
        return (
            <ActiveRegister code = {code}></ActiveRegister>
        )
    }
}
