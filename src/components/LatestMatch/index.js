// Write your code here
import './index.css'

const LatestMatch = props => {
  const {matchDetails} = props
  const {
    umpires,
    result,
    date,
    manOfTheMatch,
    venue,
    competingTeam,
    imgUrl,
    firstInnings,
    secondInnings,
  } = matchDetails

  return (
    <div className="latest-match-banner">
      <div className="team-details">
        <p className="title">{competingTeam} </p>
        <p>{date} </p>
        <p>{venue} </p>
        <p>{result} </p>
      </div>
      <img
        className="team-banner-img"
        src={imgUrl}
        alt={`latest match ${competingTeam}`}
      />

      <div className="result">
        <p>First Innings </p>
        <p>{firstInnings} </p>
        <p>Second Innings </p>
        <p>{secondInnings} </p>
        <p>Man of the Match </p>
        <p>{manOfTheMatch} </p>
        <p>Umpires</p>
        <p>{umpires} </p>
      </div>
    </div>
  )
}
export default LatestMatch
