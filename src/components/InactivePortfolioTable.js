import React from "react";
import { Table } from "semantic-ui-react";
import { InactivePortfolioTableHeader } from "./InactivePortfolioTableHeader";

export class InactivePortfolioTable extends React.Component {
  render() {
    let filtered = this.props.myTransactionList.filter(
      transaction => transaction.status === false
    );
    return (
      <Table celled inverted color="black">
        <InactivePortfolioTableHeader />

        {filtered.map(transactionInfo => (
          <Table.Row>
            <Table.Cell>
              <b>{transactionInfo.stock}</b>
            </Table.Cell>
            <Table.Cell>{transactionInfo.purchased_price}</Table.Cell>
            <Table.Cell>{transactionInfo.sold_price}</Table.Cell>
            <Table.Cell>
              {(
                transactionInfo.sold_price - transactionInfo.purchased_price
              ).toFixed(2)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    );
  }
}
