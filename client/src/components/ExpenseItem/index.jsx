import "./item.css"

export default function ExpenseItem({title, money, date}) {  
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
