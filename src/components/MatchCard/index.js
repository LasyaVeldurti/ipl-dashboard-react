// Write your code here

import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {result, matchStatus, imgUrl, competingTeam} = matchCardDetails
  let addClass
  if (matchStatus === 'Won') {
    addClass = 'match-won'
  } else {
    addClass = 'match-lost'
  }
  return (
    <li className="li-container">
      <img
        className="team-card-img"
        src={imgUrl}
        alt={`competing team ${competingTeam}`}
      />
      <p className="team-name">{competingTeam} </p>
      <p className="match-result">{result} </p>
      <p className={addClass}>{matchStatus} </p>
    </li>
  )
}

export default MatchCard
