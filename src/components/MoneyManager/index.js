import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

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
    inputTitle: '',
    inputAmount: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updateTransactionList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionList: updateTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {inputTitle, inputAmount, optionId} = this.state

    const typeOfOption = transactionTypeOptions.find(
      eachType => eachType.optionId === optionId,
    )

    const {displayText} = typeOfOption

    const newTransaction = {
      id: v4(),
      title: inputTitle,
      amount: parseInt(inputAmount),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      inputTitle: ' ',
      inputAmount: ' ',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeInputAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  onChangeInputTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  calculateIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  calculateExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  calculateBalanceAmount = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
      balanceAmount = incomeAmount - expensesAmount
    })
    return balanceAmount
  }

  render() {
    const {inputAmount, inputTitle, optionId, transactionList} = this.state
    const incomeAmount = this.calculateIncome()
    const expensesAmount = this.calculateExpenses()
    const balanceAmount = this.calculateBalanceAmount()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="name-container">
            <h1 className="name">Hi, Richard</h1>
            <p className="wishes">
              Welcome back to your <span className="span">Money Manager</span>
            </p>
          </div>
          <ul className="item-card">
            <MoneyDetails
              balanceAmount={balanceAmount}
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
            />
          </ul>
          <div className="add-transaction-history-container">
            <div className="add-transaction-card">
              <h1 className="heading">Add Transaction</h1>
              <form
                className="input-container"
                onSubmit={this.onAddTransaction}
              >
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  value={inputTitle}
                  onChange={this.onChangeInputTitle}
                  placeholder="TITLE"
                  id="title"
                  className="input-box"
                />
                <label htmlFor="amount" className="label">
                  AMOUNT
                </label>
                <input
                  type="text"
                  value={inputAmount}
                  onChange={this.onChangeInputAmount}
                  placeholder="AMOUNT"
                  id="amount"
                  className="input-box"
                />
                <label htmlFor="select" className="label">
                  TYPE
                </label>
                <select
                  id="select"
                  value={optionId}
                  onChange={this.onChangeOptionId}
                  className="input-box"
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="history-container">
              <h1 className="heading1">History</h1>
              <ul className="transaction-column-container ">
                <li className="transaction-column">
                  <p className="column">Title</p>
                  <p className="column2">Amount</p>
                  <p className="column3">Type</p>
                </li>
                {transactionList.map(eachTransaction => (
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
    )
  }
}

export default MoneyManager
