import React, { Component } from "react";
import { connect } from "react-redux";
import { RadioGroup, Radio } from "react-radio-group";

class UnconnectedPlayerCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: "",
      userId: "",
      createdEvents: "",
      createdTeams: "",

      selectedSport: "",
      playerFirstName: "",
      playerLastName: "",
      playerNumber: "",
      playerPosition: "",
      playerId: "",
      playerImage: ""
    };
  }
  playerIdGenerator = () => {
    return Math.floor(Math.random() * 100000000);
  };
  playerSubmitHandler = async evt => {
    let playerId = this.playerIdGenerator();
    evt.preventDefault();
    let data = new FormData();
    data.append("firstName", this.state.playerFirstName);
    data.append("lastName", this.state.playerLastName);
    data.append("number", this.state.playerNumber);
    data.append("position", this.state.playerPosition);
    data.append("playerId", playerId);
    data.append("sport", this.state.selectedSport);
    data.append("playerImage", this.state.playerImage);
    data.append("userEmail", this.props.userEmail);
    const response = await fetch("/playercreator", {
      method: "POST",
      body: data
    });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (!parsed.success) return alert(parsed.message);
  };
  sportSelectHandler = value => {
    console.log(value);
    this.setState({
      selectedSport: value
    });
  };
  positionSelectHandler = value => {
    this.setState({
      playerPosition: value
    });
  };
  firstNameHandler = evt => {
    this.setState({
      playerFirstName: evt.target.value
    });
  };
  lastNameHandler = evt => {
    this.setState({
      playerLastName: evt.target.value
    });
  };
  numberHandler = evt => {
    this.setState({
      playerNumber: evt.target.value
    });
  };
  playerImageHandler = evt => {
    this.setState({
      playerImage: evt.target.file
    });
  };
  render = () => {
    let positionRender = () => {
      if (this.state.selectedSport === "hockey")
        return (
          <RadioGroup
            name="hockey"
            selectedValue={this.state.playerPosition}
            onChange={this.positionSelectHandler}
          >
            <Radio name="left wing" value="left wing" />
            Left winger
            <Radio name="right wing" value="right wing" />
            Right winger
            <Radio name="center" value="center" />
            Center
            <Radio name="left defense" value="left defense" />
            Left defenseman
            <Radio name="right defense" value="right defense" />
            Right defenseman
            <Radio name="goaltender" value="goaltender" />
            Goaltender
          </RadioGroup>
        );
      if (this.state.selectedSport === "soccer")
        return (
          <RadioGroup
            name="soccer"
            selectedValue={this.state.playerPosition}
            onChange={this.positionSelectHandler}
          >
            <Radio name="right fullback" value="right fullback" />
            Left fullback
            <Radio name="left fullback" value="left fullback" />
            Right fullback
            <Radio name="center back" value="center back" />
            Center back
            <Radio name="defending midfielder" value="defending midfielder" />
            Defending midfielder
            <Radio name="left midfielder" value="left midfielder" />
            Left midfielder
            <Radio name="right midfielder" value="right midfielder" />
            Right midfielder
            <Radio name="striker" value="striker" />
            Striker
            <Radio name="attacking midfielder" value="attacking midfielder" />
            Attacking midfielder
            <Radio name="left midfielder" value="left midfielder" />
            Left midfielder
            <Radio name="goalkeeper" value="goalkeeper" />
            Goalkeeper
          </RadioGroup>
        );
      if (this.state.selectedSport === "football")
        return (
          <RadioGroup
            name="football"
            selectedValue={this.state.playerPosition}
            onChange={this.positionSelectHandler}
          >
            <div>
              <h4>Offense</h4>
            </div>
            <div>
              <Radio
                name="offensive left tackle"
                value="offensive left tackle"
              />
              Offensive tackle
            </div>
            <div>
              <Radio
                name="offensive right tackle"
                value="offensive right tackle"
              />
              Offensive right tackle
            </div>
            <div>
              <Radio name="left guard" value="left guard" />
              Left guard
            </div>
            <div>
              <Radio name="right guard" value="right guard" />
              Right guard
            </div>
            <div>
              <Radio name="running back" value="running back" />
              Running back
            </div>
            <div>
              <Radio name="quarterback" value="quarterback" />
              Quarterback
            </div>
            <div>
              <Radio name="fullback" value="fullback" />
              Fullback
            </div>
            <div>
              <Radio name="halfback" value="halfback" />
              Halfback
            </div>
            <div>
              <Radio name="left wide receiver" value="left wide receiver" />
              Left wide receiver
            </div>
            <div>
              <Radio name="right wide receiver" value="right wide receiver" />
              Right wide receiver
            </div>
            <div>
              <Radio name="tight end" value="tight end" />
              Tight end
            </div>
            <div>
              <h4>Defense</h4>
            </div>
            <div>
              <Radio
                name="defensive left tackle"
                value="defensive left tackle"
              />
              Defensive left tackle
            </div>
            <div>
              <Radio name="left defensive end" value="left defensive end" />
              Left defensive end
            </div>
            <div>
              <Radio name="right defensive end" value="right defensive end" />
              Right defensive end
            </div>
            <div>
              <Radio name="left cornerback" value="left cornerback" />
              Left cornerback
            </div>
            <div>
              <Radio name="right cornerback" value="right cornerback" />
              Right cornerback
            </div>
            <div>
              <Radio
                name="left outside linebacker"
                value="left outside linebacker"
              />
              Left outside linebacker
            </div>
            <div>
              <Radio
                name="right outside linebacker"
                value="right outside linebacker"
              />
              Right outside linebacker
            </div>
            <div>
              <Radio name="middle linebacker" value="middle linebacker" />
              Middle linebacker
            </div>
            <div>
              <Radio name="strong safety" value="strong safety" />
              Strong safety
            </div>
            <div>
              <Radio name="free safety" value="free safety" />
              Free safety
            </div>
            <div>
              <h4>Special Teams</h4>
            </div>
            <div>
              <Radio name="placekicker" value="placekicker" />
              Placekicker
            </div>
            <div>
              <Radio name="punter" value="punter" />
              Punter
            </div>
            <div>
              <Radio name="punt returner" value="punt returner" />
              Punt returner
            </div>
            <div>
              <Radio name="long snapper" value="long snapper" />
              Long snapper
            </div>
            <div>
              <Radio name="utility" value="utility" />
              Utility
            </div>
            <div>
              <Radio name="gunner" value="gunner" />
              Gunner
            </div>
            <div>
              <Radio name="upback" value="upback" />
              Upback
            </div>
          </RadioGroup>
        );
      if (this.state.selectedSport === "basketball")
        return (
          <RadioGroup
            name="basketball"
            selectedValue={this.state.playerPosition}
            onChange={this.positionSelectHandler}
          >
            <Radio name="power forward" value="power forward" />
            Power forward
            <Radio name="center" value="center" />
            Center
            <Radio name="shooting guard" value="shooting guard" />
            Shooting guard
            <Radio name="small forward" value="small forward" />
            Small forward
            <Radio name="point guard" value="point guard" />
            Point guard
          </RadioGroup>
        );
      if (this.state.selectedSport === "baseball")
        return (
          <RadioGroup
            name="baseball"
            selectedValue={this.state.playerPosition}
            onChange={this.positionSelectHandler}
          >
            <div>
              <Radio name="catcher" value="catcher" />
              Catcher
            </div>
            <div>
              <Radio name="pitcher" value="pitcher" />
              Pitcher
            </div>
            <div>
              <Radio name="first base" value="first base" />
              First base
            </div>
            <div>
              <Radio name="second base" value="second base" />
              Second base
            </div>
            <div>
              <Radio name="third base" value="third base" />
              Third base
            </div>
            <div>
              <Radio name="shortstop" value="shortstop" />
              Shortstop
            </div>
            <div>
              <Radio name="left field" value="left field" />
              Left field
            </div>
            <div>
              <Radio name="right field" value="right field" />
              Right field
            </div>
            <div>
              <Radio name="center field" value="center field" />
              Center field
            </div>
          </RadioGroup>
        );
    };
    return (
      <div>
        <h2>Player Creator</h2>
        <form onSubmit={this.playerSubmitHandler}>
          <h4>What is your player's first name?</h4>
          <input
            type="text"
            className="capitalized"
            onChange={this.firstNameHandler}
          />
          <button>Next</button>
          <h4>What is your player's last name?</h4>
          <input
            type="text"
            className="capitalized"
            onChange={this.lastNameHandler}
          />
          <button>Next</button>
          <h4>What sport does this player play in?</h4>
          <RadioGroup
            name="sports"
            selectedValue={this.state.selectedsport}
            onChange={this.sportSelectHandler}
          >
            <Radio name="hockey" value="hockey" />
            Hockey
            <Radio name="soccer" value="soccer" />
            Soccer
            <Radio name="football" value="football" />
            Football
            <Radio name="basketball" value="basketball" />
            Basketball
            <Radio name="baseball" value="baseball" />
            Baseball
          </RadioGroup>
          <button>Next</button>
          <h4>What number does this player wear?</h4>
          <input type="number" min="0" max="99" onChange={this.numberHandler} />
          <button>Next</button>
          <h4>What position does this player play?</h4>
          {positionRender()}
          <button>Next</button>
          <h4>
            (optional) Would you like to include a picture for this player?
          </h4>
          <input type="file" accept="image/*" />
          <input type="submit" />
        </form>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    loggedIn: false,
    userEmail: st.userEmail,
    createdTeams: st.createdTeams,
    createdEvents: st.createdEvents,
    userId: st.userId
  };
};
let PlayerCreator = connect(mapStateToProps)(UnconnectedPlayerCreator);
export default PlayerCreator;
