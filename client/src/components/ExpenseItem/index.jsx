import { useDispatch } from "react-redux";
import "./item.css"
import { addExpense } from "../../store/userSlice";
import { useEffect } from "react";

export default function ExpenseItem({title, money, date}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addExpense(money));
  }, [dispatch, money]);
  
    return (
        <div className="expense-item">
          <hr />
          <div className="line">
            <h3>{title}</h3>
            <p>{money}₪</p>
          </div>
          <div className="date">{date}</div>
        </div>
    );
}
