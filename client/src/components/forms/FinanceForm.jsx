import { useDispatch } from "react-redux";
import Input from "../Inputs";
import SelectInput from "../Inputs/SelectInput";
import Button from "../Button";
import { baseUrl, categoryOptions, paymentMethodOptions } from "../../Lib/constants";
import "./form.css";
import customFetch from "../../Lib/customFetch";

export default function FinanceForm() {
    const dispatch = useDispatch();
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const money = formData.get("money");
        const date = formData.get("date");
        const category = formData.get("category");
        const paymentMethod = formData.get("paymentMethod");
        try {
            const response = await customFetch(`${baseUrl}/addExpense`, 'POST', JSON.stringify({
                title,
                money,
                date,
                category,
                payment_method: paymentMethod
            }), {
                'Content-Type': 'application/json'
            })
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error: ", error);
        }
        
    }

    return (
        <form onSubmit={submit}>
            <h2>Add New Finance</h2>
            <Input placeholder="Title" name="title"/>
            <Input type="number" placeholder="Money" name="money"/>
            <Input type="date"/>
            <SelectInput options={categoryOptions} title="Category"/>
            <SelectInput options={paymentMethodOptions} title="Payment Method"/>
            <Button type="submit" className="btn">Add Finance</Button>
        </form>
    )
}