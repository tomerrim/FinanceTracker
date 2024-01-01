import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './store/index.js';
import SignUp from "./pages/SignUp"; 
import HomePage from './pages/Home';
import SignIn from './pages/SignIn';
import AddExpensePage from './pages/AddExpense';
import UserFinance from './pages/UserFinance';
import UserCharts from './pages/UserCharts';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/:userId/finance" element={<UserFinance />} />
            <Route path="/:userId/charts" element={<UserCharts />} />
            <Route path="/:userId/addExpense" element={<AddExpensePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
