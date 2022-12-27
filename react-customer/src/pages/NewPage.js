import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import NewAll from '../components/NewAll/NewAll'
export default class NewPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url='/ Tin tức'></LinkHere>
        <NewAll></NewAll>
      </div>
    )
  }
}

