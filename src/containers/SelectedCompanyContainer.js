import React from "react";
import { Container, Button, Modal, Image, Header } from "semantic-ui-react";
import { PurchaseShareForm } from "../components/PurchaseShareForm";

import stockPic from "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/stockpic.jpg";

export class SelectedCompanyContainer extends React.Component {
  render() {
    if (!this.props.company)
      return <Image src={stockPic} width="100%" height="95%" alt="" />;
    let previousDayStats = this.props.chart[this.props.chart.length - 1];
    let currentCompany = this.props.company;
    let currentCompanyLogo = this.props.logo.url;
    let currentCompanyNews = this.props.news;
    console.log(this.props);
    return (
      <div>
        {/* <video
          autoPlay
          muted
          loop
          id="background-video"
          style={{
            position: "relative",
            right: "0",
            bottom: "0",
            minWidth: "100%",
            minHeight: "100%"
          }}
        >
          <source src={myStockVideo} type="video/mp4" />
        </video> */}
        <div>
          <Container
            style={{ height: `${window.innerHeight}px`, overflowY: "scroll" }}
          >
            <br />
            <br />
            <h1>{currentCompany.companyName}</h1>
            <img src={currentCompanyLogo} alt="" />

            <p>{currentCompany.description}</p>
            <p>Industry: {currentCompany.industry}</p>
            <p>CEO: {currentCompany.CEO}</p>

            <h2>Stats</h2>
            <p> Last Reported: {previousDayStats.date} </p>
            <p> Open: {previousDayStats.open}</p>
            <p> Close: {previousDayStats.close}</p>
            <p> High: {previousDayStats.high}</p>
            <p> Change: {previousDayStats.changePercent}%</p>

            <Modal trigger={<Button>Purchase Shares</Button>}>
              <Modal.Header>
                Purchase Shares of {currentCompany.companyName}
              </Modal.Header>
              <Modal.Content image>
                <Image wrapped size="medium" src={currentCompanyLogo} />
                <Modal.Description>
                  <Header>Purchase Details</Header>
                  <PurchaseShareForm
                    {...this.props}
                    history={this.props.history}
                  />
                </Modal.Description>
              </Modal.Content>
            </Modal>

            <h2>Recent News</h2>
            <h4>
              <a href={currentCompanyNews[0].url} target="_blank">
                {currentCompanyNews[0].headline} -{" "}
                {currentCompanyNews[0].source}{" "}
              </a>
            </h4>
          </Container>
        </div>
      </div>
    );
  }
}
