import React from "react";
import { Table, Button } from "semantic-ui-react";
import { ActivePortfolioTableHeader } from "./ActivePortfolioTableHeader";

export class ActivePortfolioTable extends React.Component {
  render() {
    let filtered = this.props.myTransactionList.filter(
      transaction => transaction.status === true
    );
    return (
      <Table celled inverted color="blue">
        <ActivePortfolioTableHeader />

        {filtered.map(transactionInfo => (
          <Table.Row>
            <Table.Cell>
              <b>{transactionInfo.stock}</b>
            </Table.Cell>
            <Table.Cell>{transactionInfo.purchased_price}</Table.Cell>
            <Table.Cell>
              {this.props.currentPrices[transactionInfo.stock_symbol]
                ? this.props.currentPrices[transactionInfo.stock_symbol].close
                : null}
            </Table.Cell>
            <Table.Cell>
              {this.props.currentPrices[transactionInfo.stock_symbol]
                ? (
                    this.props.currentPrices[transactionInfo.stock_symbol]
                      .close - transactionInfo.purchased_price
                  ).toFixed(2)
                : null}
            </Table.Cell>
            <Table.Cell>
              <Button
                color="green"
                style={{ color: "black" }}
                onClick={this.props.sellShare.bind(this, transactionInfo)}
              >
                Sell Share
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    );
  }
}
