export function sortPayments(payments, field) {
    const sortedPayments = [...payments];

    switch (field) {
      case "date":
        sortedPayments.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "price":
        sortedPayments.sort(
          (a, b) => parseFloat(b.money) - parseFloat(a.money)
        );
        break;
      case "title":
        sortedPayments.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "category":
        sortedPayments.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return sortedPayments;
}

export function sumExpenses(payments) {
  return payments.reduce((total, expense) => {
    const expenseMoney = parseFloat(expense.money);
    return isNaN(expenseMoney) ? total : total + expenseMoney;
  }, 0);
}