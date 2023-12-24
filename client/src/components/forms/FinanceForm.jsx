import Input from "../Inputs";
import SelectInput from "../Inputs/SelectInput";
import Button from "../Button";
import { categoryOptions, paymentMethodOptions } from "../../Lib/constants";
import "./form.css";

export default function FinanceForm() {
    async function submit(e) {
        e.preventDefault();
        console.log("sumit");
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