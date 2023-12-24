import "./input.css";

export default function SelectInput({ options, title }) {
    return (
        <select name="category" id="category">
            <option value="">--{title}--</option>
            {options.map(option => (
                <option value={option} key={option}>{option}</option>
            ))}
        </select>
    )
}