import "./skeletons.css";

export default function ExpenseItemSkeleton() {
    return (
      <div className="expense-item-skeleton">
        <div className="line-skeleton">
          <div className="title-skeleton"></div>
          <div className="money-skeleton"></div>
        </div>
        <div className="line-skeleton">
            <div className="date-skeleton"></div>
        </div>
      </div>
    );
}