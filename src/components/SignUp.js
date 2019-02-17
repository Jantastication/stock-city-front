import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Message,
  Segment,
  Grid,
  Header
} from "semantic-ui-react";
// import { myStockVideo } from "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/stock_exchange.mp4";

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
        <Grid
          textAlign="center"
          style={{ height: "100%", marginTop: 100 }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Create Account
            </Header>
            <Form size="large" onSubmit={e => this.signUpClickHandler(e)}>
              <Segment stacked>
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
        </Grid>
      </div>
    );
  }
}

export const SignUp = withRouter(_SignUp);
