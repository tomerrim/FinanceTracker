import { checkAndSendEmail } from "./utils";

export const expenseMiddleware = ({ dispatch }) => (next) => (action) => { 
    //dispatch is for future uses (for example if i want to dispatch another action)
    if (action.type === "userSlice/addExpense/fulfilled") {
        const { payload } = action;
        checkAndSendEmail(payload.user);
    }
    return next(action);
}