import "./input.css";

export default function SelectInput({ options, title, name, className, onChange}) {
    return (
        <select name={name} id={name} className={className} onChange={onChange}>
            <option value="">--{title}--</option>
            {options.map(option => (
                <option value={option} key={option}>{option}</option>
            ))}
        </select>
    )
}