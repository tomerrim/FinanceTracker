import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpenseItem from "../../components/ExpenseItem";
import Button from "../../components/Button";
import "./page.css";

export default function UserFinance(){
    const navigate = useNavigate();
    const [userPayments, setUserPayments] = useState([]);
    const user = useSelector(state => state.userSlice.user);
    const payments = useSelector(state => state.userSlice.payments);
    // console.log("payments: ",payments)
    const totalExpenses = payments.reduce((total, expense) => {
      const expenseMoney = parseFloat(expense.money);
      return isNaN(expenseMoney) ? total : total + expenseMoney;
    }, 0);
    
    function navToAddExpensePage() {
      navigate(`/${user.id}/addExpense`);
    }

    useEffect(() => {
        async function fetchData() {
            try {
              setUserPayments(payments);
            } catch (error) {
              console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, [payments]);

    return (
      <>
        <h2>Your Finances</h2>
        <div className="row">
          <h3 className="total">Total: {totalExpenses}₪</h3>
          <Button onClick={navToAddExpensePage}>Add Expense</Button>
        </div>
        {userPayments.map((payment) => (
          <ExpenseItem {...payment} key={payment.id} />
        ))}
      </>
    );
}