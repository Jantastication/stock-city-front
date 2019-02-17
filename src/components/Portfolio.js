import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { ActivePortfolioTable } from "./ActivePortfolioTable";
import { InactivePortfolioTable } from "./InactivePortfolioTable";

const url =
  "https://api.iextrading.com/1.0//stock/market/batch?symbols=aapl,fb,tsla,ba,brk.b,dis,ge,hd,nke,sbux,dji,amzn,baba,goog,nflx,adbe,ftnt,grub,irbt,mcd&types=chart&range=1d";
const userID = localStorage.getItem("userID");

export class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      myTransactionList: []
    };
  }

  fetchTransactions = () => {
    let myTransactions;
    fetch("https://tradeup-api.herokuapp.com/api/v1/transactions")
      .then(res => res.json())
      .then(transactions => {
        console.log(transactions);
        myTransactions = transactions.filter(
          transaction => (transaction.user_id = userID)
        );
        this.setState({ myTransactionList: myTransactions });

        //TODO SWITCH TO CURRENT USER
      });
  };

  sellShare = transactionInfo => {
    console.log(transactionInfo);
    let sellPrice = this.props.currentPrices[transactionInfo.stock_symbol]
      .close;
    fetch(
      `https://tradeup-api.herokuapp.com/api/v1/transactions/${
        transactionInfo.id
      }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          status: false,
          sold_price: sellPrice
          // TODO SOLD PRICE
        })
      }
    ).then(() => {
      this.fetchTransactions();
    });
  };

  componentDidMount() {
    console.log(userID);
    this.fetchTransactions();
  }
  render() {
    return (
      <div
        style={{
          // border: "thick solid black",
          // borderBottom: "5px solid red",
          // borderTop: "5px solid red",
          padding: "20px 80px 20px 80px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "20px"
          }}
        >
          Current Portfolio
        </h1>
        <ActivePortfolioTable
          myTransactionList={this.state.myTransactionList}
          sellShare={this.sellShare}
          currentPrices={this.props.currentPrices}
        />
        <h2
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "20px"
          }}
        >
          Previously Owned
        </h2>
        <InactivePortfolioTable
          myTransactionList={this.state.myTransactionList}
        />
      </div>
    );
  }
}
