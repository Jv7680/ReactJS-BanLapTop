import React, { Component } from 'react'

export default class Redirect extends Component {

    componentDidMount() {
        const { link } = this.props
        window.location.replace(link)
    }
}
