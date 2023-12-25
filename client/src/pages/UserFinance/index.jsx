import { useEffect, useState } from "react";
import customFetch from "../../Lib/customFetch";
import { baseUrl } from "../../Lib/constants";

export default function UserFinance(){
    const userId = 1; // just for now
    const [userPayments, setUserPayments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await customFetch(`${baseUrl}/${userId}/finance`, "GET");
                const data = response.data.user_payments;
                setUserPayments(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, [userId]);

    return (
      <div>
        <h2>Your Finances</h2>
        <ul>
          {userPayments.map((payment) => (
            <li key={payment.id}>
              Title: {payment.title}, Date: {payment.date}, Money:{" "}
              {payment.money}
            </li>
          ))}
        </ul>
      </div>
    );
}