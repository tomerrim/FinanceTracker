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

export function prepareChartData(payments) {
  const categories = {};
  payments.forEach((payment) => {
    if (!categories[payment.category]) {
      categories[payment.category] = parseFloat(payment.money);
    } else {
      categories[payment.category] += parseFloat(payment.money);
    }
  });

  const categoryLabels = Object.keys(categories);
  const categoryValues = Object.values(categories);

  return {
    labels: categoryLabels,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          // Add more colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };
}