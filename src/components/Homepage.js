import React from "react";
import { Container, Divider, Grid, Header } from "semantic-ui-react";
import { ScrollBar } from "../containers/ScrollBar";
import { SelectedCompanyContainer } from "../containers/SelectedCompanyContainer";
import { withRouter } from "react-router";
const backgroundUrl =
  "/Users/Janu/Development/Flatiron/Module-projects/stock-city-app/stock-city-front/src/components/images/stock_exchange.mp4";

const url =
  "https://api.iextrading.com/1.0//stock/market/batch?symbols=aapl,fb,tsla,ba,brk.b,dis,ge,hd,nke,sbux,dji,amzn,baba,goog,nflx,adbe,ftnt,grub,irbt,mcd&types=company";

class _Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      companyList: [],
      selectedCompany: {}
    };
  }

  fetchCompanyList = () => {
    fetch(url)
      .then(res => res.json())
      .then(companies => {
        let arrayOfCompanies = [];
        for (const company in companies) {
          if (companies.hasOwnProperty(company)) {
            const element = companies[company];
            arrayOfCompanies.push(element.company);
            // console.log(arrayOfCompanies);
          }
        }
        this.setState({
          companyList: arrayOfCompanies
        });
      });
  };

  fetchExtendedInfo = companySymbol => {
    Promise.all([
      fetch(
        `https://api.iextrading.com/1.0//stock/market/batch?symbols=${companySymbol}&types=company,logo,news,chart&range=ytd`
      ).then(res => res.json()),
      fetch(
        `https://api.iextrading.com/1.0/stock/${companySymbol}/chart/1d`
      ).then(res => res.json())
    ]).then(([companyData, prices]) => {
      this.setState({
        selectedCompany: {
          ...companyData[companySymbol],
          currentPrice: prices[prices.length - 1]
        }
      });
    });
  };

  componentDidMount() {
    this.fetchCompanyList();
  }

  handleClick = companySymbol => {
    this.fetchExtendedInfo(companySymbol);
  };

  render() {
    console.log("Home Page", this.props.history);
    return (
      <div
        // class="ui main center aligned text container clearing segment"
        style={{
          height: `${window.innerHeight}px`,
          overflowY: "scroll",
          marginLeft: "20px",
          marginTop: "20px",
          padding: "20px 60px 20px 60px"
        }}
      >
        <br />
        <Header as="h2">
          <h2>
            {" "}
            📈 <b>STOCKS </b>
          </h2>{" "}
        </Header>
        <br />

        <Grid
          style={{
            border: "thick solid black",
            borderBottom: "5px solid red",
            borderTop: "5px solid red"
          }}
        >
          <Grid.Row columns={2}>
            <Grid.Column inverted color="matte black">
              <ScrollBar
                companyList={this.state.companyList}
                handleClick={this.handleClick}
                currentPrices={this.props.currentPrices}
              />
              <br />

              <div>
                <footer>
                  {" "}
                  <h5>Made by Janu 🖤 </h5>
                </footer>
              </div>
            </Grid.Column>
            <br />
            <br />
            <Grid.Column>
              <SelectedCompanyContainer
                {...this.state.selectedCompany}
                history={this.props.history}
              />
              <br />

              <div>
                <footer>
                  {" "}
                  <h5>Copyright © 2019 Janu USA, Inc </h5>
                </footer>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
      </div>
    );
  }
}
export const Homepage = withRouter(_Homepage);
