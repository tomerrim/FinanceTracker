import { backgroundColors } from "./constants";
import customFetch from "./customFetch";

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

export function preparePieData(payments) {
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
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
}

export function prepareBarData(payments) {
  const monthlyExpenses = {};
  payments.forEach((payment) => {
    const date = new Date(payment.date);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!monthlyExpenses[month]) {
      monthlyExpenses[month] = 0;
    }

    monthlyExpenses[month] += payment.money;
  })

  return {
    labels: Object.keys(monthlyExpenses),
    datasets: [
      {
        label: "Expense by Month",
        data: Object.values(monthlyExpenses),
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
}

export function prepareLineData(payments) {
  const expensesByDate = {};
  payments.forEach((payment) => {
    const date = payment.date;
    if (!expensesByDate[date]) {
      expensesByDate[date] = parseFloat(payment.money);
    } else {
      expensesByDate[date] += parseFloat(payment.money);
    }
  });
  const dateLabels = Object.keys(expensesByDate);
  const expenseAmounts = Object.values(expensesByDate);

  return {
    labels: dateLabels,
    datasets: [
      {
        label: "Expenses Over Time",
        data: expenseAmounts,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };
}

function calculateTotalExpenseForCurrentMonth(user) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const expensesForCurrentMonth = user.payments.filter((payment) => {
    const paymentDate = new Date(payment.date);
    return paymentDate.getMonth() + 1 === currentMonth;
  });

  const totalExpenseForCurrentMonth = expensesForCurrentMonth.reduce(
    (total, payment) => total + parseFloat(payment.money), 0
  )
  
  return totalExpenseForCurrentMonth;
}

export async function checkAndSendEmail(user) {
  const totalExpenseForCurrentMonth = calculateTotalExpenseForCurrentMonth(user);
  const threshold = 1000;

  if (totalExpenseForCurrentMonth > threshold) {
    try {
      const response = await customFetch(
        "send-email-notification",
        "POST",
        JSON.stringify({ email: user.email }),
        {
          "Content-Type": "application/json",
        }
      );

      if (response.ok) {
        console.log("Email notification sent successfully!");
      } else {
        console.error("Failed to send email notification");
      }
    } catch (error) {
      console.error("Error occurred while sending email:", error);
    }
  }
}