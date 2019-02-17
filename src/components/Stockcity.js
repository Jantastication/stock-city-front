import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import myVideo from "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/Stock Market Animation.mp4";
import { Button } from "semantic-ui-react";

class _Stockcity extends React.Component {
  render() {
    return (
      <div>
        <video
          autoPlay
          muted
          loop
          id="background-video"
          style={{
            position: "fixed",
            right: "0",
            bottom: "0",
            minWidth: "100%",
            minHeight: "100%"
          }}
        >
          <source src={myVideo} type="video/mp4" />
        </video>
        <div
          style={{
            position: "fixed",
            bottom: 250,
            background: "rgba(0, 0, 0, 0)",
            color: "#f1f1f1",
            width: "100%",
            padding: "20px",
            textAlign: "center"
          }}
        >
          <h1 style={{ fontSize: 60 }}> STOCK CITY</h1>
          <br />

          <p style={{ fontSize: 18 }}>
            Invest in stocks, options, all commission-free, right from your
            phone or desktop.
          </p>
          <br />

          <Button onClick={() => this.goTo(`/home`)}>Enter Site</Button>
        </div>
      </div>
    );
  }
  goTo = url => {
    this.props.history.push(url);
  };
}
export const Stockcity = withRouter(_Stockcity);
