import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { battle } from "../utils/api";
import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";

function Profile({ info }) {
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul>
        {info.name && <li><b>Name:</b> {info.name}</li>}
        {info.location && <li><b>Location:</b> {info.location}</li>}
        {info.company && <li><b>Company:</b> {info.company}</li>}
        <li><b>Following:</b> {info.following}</li>
        <li><b>Followers:</b> {info.followers}</li>
        <li><b>Public Repos:</b> {info.public_repos}</li>
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

function Player({ label, score, profile }) {
  return (
    <div className="playerCard_wrap">
      <h1 className="header">{label}</h1>
      <h3 className="score">Score: {score}</h3>
      <div className="playerCard"><Profile info={profile} /></div>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }

  componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(
      this.props.location.search
    );

    battle([playerOneName, playerTwoName]).then(results => {
      if (results === null) {
        return this.setState(() => ({
          error:
            "Looks like there was error. Check that both users exist on Github",
          loading: false
        }));
      }

      this.setState(() => ({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false
      }));
    });
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
      return <Loading text="Battling" />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return (
      <div className="row">
        <Player label="Winner" score={winner.score} profile={winner.profile} />
        <Player label="Loser" score={loser.score} profile={loser.profile} />
      </div>
    );
  }
}

export default Results;
