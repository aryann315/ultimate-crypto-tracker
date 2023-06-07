import { createSlice } from "@reduxjs/toolkit";

const initialCurrencyState = { currency: "USD", symbol: "$", multiplier: 1 };

const currencySlice = createSlice({
    name: "currency",
    initialState: initialCurrencyState,
    reducers: {
        changeCurrency(state,action) {
            if(action.payload === "INR"){
                state.currency = "INR";
                state.symbol = "₹";
                state.multiplier = 81.97;
            }
            if(action.payload === "USD"){
                state.currency = "USD";
                state.symbol = "$";
                state.multiplier = 1;
            }
            if(action.payload === "EUR"){
                state.currency = "EUR";
                state.symbol = "€";
                state.multiplier = 0.95;
            }
            if(action.payload === "RUB"){
                state.currency = "RUB";
                state.symbol = "₽";
                state.multiplier = 76.05;
            }
        }
    },
});

export const currencyActions = currencySlice.actions;
export default currencySlice.reducer;
