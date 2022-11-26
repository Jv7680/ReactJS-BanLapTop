import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import Profile from '../components/Profile/Profile'

export default class ProfilePage extends Component {
  render() {
    return (
        <div>
        <LinkHere url='/ Cá nhân'></LinkHere>
        <Profile></Profile>
      </div>
    )
  }
}
