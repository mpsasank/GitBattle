import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Github Battle</h1>
        <p className="subtitle">Compare developers or View popular developers</p>

        <Link className="button" to="/battle">
          Battle
        </Link>
        <Link className="button" to="/popular">
          Popular
        </Link>
      </div>
    )
  }
}

export default Home;