import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import customFetch from "../../Lib/customFetch";
import { dummyPayments } from "../../dummy";
import ExpenseItem from "../../components/ExpenseItem";
import Button from "../../components/Button";
import "./page.css";

export default function UserFinance(){
    const navigate = useNavigate();
    const userId = 1; // just for now
    const [userPayments, setUserPayments] = useState([]);
    // const user = useSelector(state => state.userSlice.user);
    // const totalExpenses = user.payments.reduce((total, payment) => {
    //   return total + Number(payment.money), 0;
    // })
    
    function navToAddExpensePage() {
      navigate("/addExpense");
    }

    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await customFetch(`${userId}/finance`, "GET");
                // const data = response.data.user_payments;
                const data = dummyPayments["user_payments"];
                setUserPayments(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, [userId]);

    return (
      <>
        <h2>Your Finances</h2>
        <div className="row">
          <h3 className="total">Total: </h3>
          <Button onClick={navToAddExpensePage}>Add Expense</Button>
        </div>
        {userPayments.map((payment) => (
          <ExpenseItem {...payment} key={payment.id}/>
        ))}
      </>
    );
}