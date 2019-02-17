import React from "react";
import {
  // Image,
  Button,
  Form,
  Segment,
  Grid,
  Header,
  Message,
  // Divider,
  Container
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
// import background from "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/background.png";

import background from "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/stock_exchange.mp4";

export class _Login extends React.Component {
  login = e => {
    e.preventDefault();
    fetch("https://tradeup-api.herokuapp.com/api/v1/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: e.target.emailInput.value,
        password: e.target.passwordInput.value
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("userID", result.user.id);
        this.goTo("/home");
      });
  };

  goTo = url => {
    this.props.history.push(url);
  };

  render() {
    console.log("login", this.props.history);
    return (
      <div>
        <segment>
          <Grid
            columns={2}
            relaxed="very"
            textAlign="center"
            style={{
              height: "100%",
              marginTop: "0"
              // background: "rgba(60, 60, 60, 20)"

              // padding: "1px"
            }}
            verticalAlign="middle"
          >
            <Grid.Column
              style={{
                maxWidth: 450,
                marginBottom: "0"
              }}
            >
              <Header as="h2" textAlign="center">
                Welcome to Stock City
              </Header>
              <Form size="large" onSubmit={e => this.login(e)}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="emailInput"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="passwordInput"
                  />

                  <Button color="black" fluid size="large" type="submit">
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Open an account <Link to={"/signup"}>Sign Up</Link>
              </Message>
            </Grid.Column>

            <br />
            <Grid.Column
            // style={{
            //   height: `${window.innerHeight}px`,
            //   position: "relative"
            //   // verticalAlign: "middle",
            //   // backgroundPosition: "center",
            //   // right: "0",
            //   // bottom: "0",
            // }}
            >
              {/* <Image src={background} width="100%" height="100%" alt="" /> */}
              <Container style={{ height: "100%" }}>
                <video
                  autoPlay
                  muted
                  loop
                  id="background-video"
                  style={{
                    position: "relative",
                    display: "block",
                    right: "0",
                    bottom: "0",
                    minWidth: "0px",
                    maxHeight: `${window.innerHeight}px`
                    // verticalAlign: "right"
                  }}
                >
                  <source src={background} type="video/mp4" />
                </video>
              </Container>
            </Grid.Column>

            <footer>
              {" "}
              <div>
                <span>Made by Janu 🖤 Copyright © 2019 Janu USA, Inc </span>
              </div>
            </footer>

            <br />
          </Grid>
        </segment>
      </div>
    );
  }
}

export const Login = withRouter(_Login);
