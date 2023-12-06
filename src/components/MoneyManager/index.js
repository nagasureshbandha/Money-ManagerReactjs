import {Component} from 'react'

import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    trasactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {trasactionsList} = this.state

    const updatedTransactionList = trasactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      trasactionsList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      trasactionsList: [...prevState.trasactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getExpenses = () => {
    const {trasactionsList} = this.state
    let expensesAmount = 0

    trasactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {trasactionsList} = this.state
    let incomeAmount = 0
    trasactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {trasactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    trasactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, trasactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="heading-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="header-content">
              Welcome back to your
              <span className="money-manager-text">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-heading">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                id="title"
                className="input"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                type="text"
              />

              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                id="amount"
                className="input"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmountInput}
                type="text"
              />

              <label className="input-label" htmlFor="select">
                TYPE
              </label>

              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <div className="transaction-table-container">
                <ul className="transaction-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>

                  {trasactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
