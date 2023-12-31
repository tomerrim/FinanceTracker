import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpenseItem from "../../components/ExpenseItem";
import Button from "../../components/Button";
import SelectInput from "../../components/Inputs/SelectInput";
import "./page.css";
import { sortOptions } from "../../Lib/constants";
import { sortPayments, sumExpenses } from "../../Lib/utils";

export default function UserFinance() {
  const navigate = useNavigate();
  const [userPayments, setUserPayments] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const user = useSelector((state) => state.userSlice.user);
  const payments = useSelector((state) => state.userSlice.payments);
  const totalExpenses = sumExpenses(payments);

  function navToAddExpensePage() {
    navigate(`/${user.id}/addExpense`);
  }

  function handleSortChange(e) {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);
  }

  useEffect(() => { 
    setUserPayments(payments);
  }, [payments]);

  useEffect(() => {
    const sortedPayments = sortPayments(payments, sortBy);
    setUserPayments(sortedPayments);
  }, [sortBy, payments])

  return (
    <>
      <h2>Your Finances</h2>
      <div className="row">
        <h3 className="total">Total: {totalExpenses}₪</h3>
        <Button onClick={navToAddExpensePage}>Add Expense</Button>
      </div>
      <SelectInput
        options={sortOptions}
        title="Sort By"
        name="sortBy"
        className="sortInput"
        onChange={handleSortChange}
      />
      {userPayments.map((payment) => (
        <ExpenseItem {...payment} key={payment.id} />
      ))}
    </>
  );
}
