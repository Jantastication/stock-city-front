import React from "react";
import {
  Image,
  Button,
  Form,
  Segment,
  Grid,
  Header,
  Message,
  Divider
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import background from "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/background.png";

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
        {/* <segment> */}
        <Grid
          columns={2}
          relaxed="very"
          textAlign="center"
          style={{ height: "100%", marginTop: 100 }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
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
          <Grid.Column
            style={{
              height: `${window.innerHeight}px`,
              position: "relative",
              backgroundSize: "cover"
            }}
          >
            ****insert image or video here
            <Image src={background} width="100%" height="100%" alt="" />
            {/* <div>
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
                  minWidth: "100%",
                  minHeight: "100%"
                }}
              >
                <source src={myLogPic} type="video/mp4" />
              </video>
            </div> */}
            XXXXXXXXXXXXXX not showing
          </Grid.Column>
        </Grid>
        <Divider vertical />
        {/* </segment> */}
      </div>
    );
  }
}

export const Login = withRouter(_Login);
