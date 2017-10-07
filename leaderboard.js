"use strict";

var LeaderRow = React.createClass({
  displayName: "LeaderRow",

  render: function render() {
    var url = "https://www.freecodecamp.com/" + this.props.username;
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.ranking
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "a",
          { href: url },
          React.createElement("img", { src: this.props.userpic, width: "50px" }),
          "  ",
          this.props.username
        )
      ),
      React.createElement(
        "td",
        null,
        this.props.lastthirty
      ),
      React.createElement(
        "td",
        null,
        this.props.alltime
      )
    );
  }
});

var LeaderTable = React.createClass({
  displayName: "LeaderTable",

  render: function render() {
    var rows = [];
    this.props.campers.forEach(function (camper, index) {
      rows.push(React.createElement(LeaderRow, {
        ranking: index + 1,
        userpic: camper.img,
        username: camper.username,
        lastthirty: camper.recent,
        alltime: camper.alltime
      }));
    });
    return React.createElement(
      "div",
      { id: "leadertable" },
      React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "#"
            ),
            React.createElement(
              "th",
              null,
              "Username"
            ),
            React.createElement(
              "th",
              null,
              "Points in past 30 days"
            ),
            React.createElement(
              "th",
              null,
              "Points for all time"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          rows
        )
      )
    );
  }
});

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement(
      "div",
      { id: "header" },
      React.createElement(
        "h1",
        null,
        "Camper Leaderboard"
      ),
      React.createElement(
        "p",
        null,
        "See who's earned the most points at ",
        React.createElement(
          "a",
          { href: "https://www.freecodecamp.org" },
          "freeCodeCamp"
        ),
        "!"
      ),
      React.createElement(
        "p",
        null,
        "Sort by points earned for:"
      ),
      React.createElement(
        "button",
        { id: "last-thirty", onClick: this.handleClick },
        "Last 30 days"
      ),
      React.createElement(
        "button",
        { id: "all-time", onClick: this.handleClick },
        "All time"
      )
    );
  }, //render

  handleClick: function handleClick(event) {
    event.preventDefault();
    var endpoint = event.target.id === 'last-thirty' ? 'recent' : 'alltime';
    this.props.onSwitch(endpoint);
  } //handleClick

});

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return { campers: [] };
  }, //getInitialState

  componentDidMount: function componentDidMount() {
    //act when component first added to DOM
    axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent").then(function (response) {
      //act when response received
      var campers = response.data;
      this.setState({ campers: campers });
    }.bind(this));
  }, //componentDidMount

  render: function render() {
    return React.createElement(
      "div",
      { id: "main" },
      React.createElement(Header, { onSwitch: this.onSwitch }),
      React.createElement(LeaderTable, { campers: this.state.campers })
    );
  }, //render

  onSwitch: function onSwitch(endpoint) {
    var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/' + endpoint;
    axios.get(url).then(function (response) {
      //same as componentDidMount
      var campers = response.data;
      this.setState({ campers: campers });
    }.bind(this));
  }

});

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));