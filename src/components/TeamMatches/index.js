// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchesDetails: [],
    latestMatchData: [],
    recentMatchData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    console.log(match)
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    console.log(response)
    const data = await response.json()

    const updatedData = {
      teamBannerURL: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const updatedLatestMatchData = {
      id: data.latest_match_details.id,
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      imgUrl: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const updatedRecentMatchData = data.recent_matches.map(eachArr => ({
      id: eachArr.id,
      umpires: eachArr.umpires,
      result: eachArr.result,
      manOfTheMatch: eachArr.man_of_the_match,
      date: eachArr.date,
      venue: eachArr.venue,
      competingTeam: eachArr.competing_team,
      imgUrl: eachArr.competing_team_logo,
      firstInnings: eachArr.first_innings,
      secondInnings: eachArr.second_innings,
      matchStatus: eachArr.match_status,
    }))

    this.setState({teamMatchesDetails: updatedData})
    this.setState({
      latestMatchData: updatedLatestMatchData,
      recentMatchData: updatedRecentMatchData,
      isLoading: false,
    })
  }

  render() {
    const {
      teamMatchesDetails,
      latestMatchData,
      recentMatchData,
      isLoading,
    } = this.state

    const loaderSpinner = (
      <div className="loader-container" data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
    const displayMatchCard = recentMatchData.map(eachVal => (
      <MatchCard key={eachVal.id} matchCardDetails={eachVal} />
    ))
    console.log(teamMatchesDetails)
    const {teamBannerURL} = teamMatchesDetails
    return (
      <div className="bg-container">
        {isLoading ? (
          loaderSpinner
        ) : (
          <>
            <img className="banner-img" src={teamBannerURL} alt="team banner" />
            <h1 className="latest-matches">Latest Matches</h1>
            <LatestMatch
              matchDetails={latestMatchData}
              key={latestMatchData.id}
            />
          </>
        )}

        <ul className="ul-container">{displayMatchCard}</ul>
      </div>
    )
  }
}

export default TeamMatches
