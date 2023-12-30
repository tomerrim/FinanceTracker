import "./input.css";

export default function SelectInput({ options, title, name}) {
    return (
        <select name={name} id={name}>
            <option value="">--{title}--</option>
            {options.map(option => (
                <option value={option} key={option}>{option}</option>
            ))}
        </select>
    )
}