import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs";
import SelectInput from "../Inputs/SelectInput";
import Button from "../Button";
import { categoryOptions, paymentMethodOptions } from "../../Lib/constants";
import "./form.css";
import { addExpense, addNewExpense } from "../../store/userSlice";
import { useSelector } from "react-redux";

export default function FinanceForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userSlice.user)
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const money = formData.get("money");
        const category = formData.get("category");
        const paymentMethod = formData.get("paymentMethod");
        const date = formData.get("date");
        const expense = {
          title,
          money,
          category,
          date,
          payment_method: paymentMethod,
          user_id: user.id,
        };

        try {
            dispatch(addNewExpense({userId: user.id, expense}));
            dispatch(addExpense(expense))
            navigate(`/${user.id}/finance`)
            
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <form onSubmit={submit}>
            <h2>Add New Finance</h2>
            <Input placeholder="Title" name="title"/>
            <Input type="number" placeholder="Money" name="money"/>
            <Input type="date" name="date"/>
            <SelectInput options={categoryOptions} title="Category" name="category"/>
            <SelectInput options={paymentMethodOptions} title="Payment Method" name="paymentMethod"/>
            <Button type="submit" className="btn">Add Finance</Button>
        </form>
    )
}