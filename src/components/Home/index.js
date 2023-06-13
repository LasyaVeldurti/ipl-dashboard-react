// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {Link} from 'react-router-dom'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamDetails: [], isLoading: true}

  componentDidMount() {
    this.getTeamDetails()
  }

  getTeamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const formattedData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({teamDetails: formattedData, isLoading: false})
  }

  render() {
    const {teamDetails, isLoading} = this.state

    const loaderSpinner = (
      <div data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
    const displayTeamCard = teamDetails.map(eachItem => (
      <TeamCard teamData={eachItem} key={eachItem.id} />
    ))

    return (
      <Link to="/" className="link">
        <div className="bg-container">
          <div className="logo-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>

          <ul className="ul-container">
            {isLoading ? loaderSpinner : displayTeamCard}
          </ul>
        </div>
      </Link>
    )
  }
}

export default Home
