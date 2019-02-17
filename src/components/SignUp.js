import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Message,
  Segment,
  Grid,
  Header,
  Container
} from "semantic-ui-react";
import animation from "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/AnimationTicker.mp4";

class _SignUp extends Component {
  signUpClickHandler = e => {
    e.persist();
    fetch("https://tradeup-api.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: e.target.firstNameInput.value,
          last_name: e.target.lastNameInput.value,
          email: e.target.emailInput.value,
          password: e.target.passwordInput.value
        }
      })
    }).then(() => {
      alert("Your account has been created!");
      this.props.history.push("/");
    });
  };
  render() {
    console.log("sign up", this.props.history);
    return (
      <div>
        <segment>
          <Grid
            columns={2}
            relaxed="very"
            textAlign="center"
            style={{
              height: "100%",
              marginTop: "0",
              background: "rgba(0, 0, 68, 10)"
            }}
            verticalAlign="middle"
          >
            <Grid.Column>
              <Container style={{ height: "100%", width: "100%" }}>
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
                    minWidth: `${window.innerWidth}px`,
                    minHeight: `${window.innerHeight}px`
                  }}
                >
                  <source src={animation} type="video/mp4" />
                </video>
              </Container>
            </Grid.Column>
            <Grid.Column style={{ maxWidth: 450 }}>
              {/* <Header as="h2" textAlign="center" color="white">
                Create Account
              </Header> */}
              <Form size="large" onSubmit={e => this.signUpClickHandler(e)}>
                <Segment stacked>
                  <h2>Create Account </h2>
                  <br />
                  <Form.Input placeholder="First Name" name="firstNameInput" />
                  <Form.Input placeholder="Last Name" name="lastNameInput" />
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
                  <Form.Checkbox label="I agree to the Terms and Conditions" />

                  <Button color="black" fluid size="large" type="submit">
                    Sign up
                  </Button>
                </Segment>
              </Form>
              <Message>
                Already have an account? <Link to="/">Log In</Link>
              </Message>
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

export const SignUp = withRouter(_SignUp);
