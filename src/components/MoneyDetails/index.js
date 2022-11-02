// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props
  return (
    <>
      <div className="balance-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image"
        />
        <div className="balance-content">
          <h1 className="balance">Your Balance</h1>
          <p className="amount">Rs {balanceAmount}</p>
        </div>
      </div>
      <div className="income-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="balance"
          className="image"
        />
        <div className="balance-content">
          <h1 className="balance">Your Income</h1>
          <p className="amount">Rs {incomeAmount}</p>
        </div>
      </div>

      <div className="expenses-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="balance"
          className="image"
        />
        <div className="balance-content">
          <h1 className="balance">Your Expenses</h1>
          <p className="amount">Rs {expensesAmount}</p>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails
